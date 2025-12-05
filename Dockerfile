# Use the official Node.js 20 Alpine image as base
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@latest

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@latest

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Generate Prisma Client explicitly before build
RUN pnpm prisma generate

# Build the application
RUN pnpm build

# Verify standalone output was created
RUN echo "=== Checking standalone output ===" && \
    ls -la .next/standalone 2>/dev/null || echo "WARNING: .next/standalone not found!" && \
    ls -la .next/standalone/server.js 2>/dev/null && echo "✓ server.js found" || echo "✗ server.js NOT found in standalone"

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create system user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public folder
COPY --from=builder /app/public ./public

# Create .next directory and set permissions
RUN mkdir -p .next
RUN chown nextjs:nodejs .next

# Copy standalone output from Next.js build
# The standalone folder contains server.js at its root
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma generated client (custom output location)
COPY --from=builder --chown=nextjs:nodejs /app/generated ./generated

# Copy Prisma binaries and client from node_modules
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

# Verify server.js exists before switching user
RUN ls -la server.js || (echo "ERROR: server.js not found after copy!" && ls -la && exit 1)

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables for runtime
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]