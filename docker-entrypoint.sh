#!/bin/sh
set -e

echo "=========================================="
echo "Starting Next.js Application"
echo "=========================================="
echo "PORT: ${PORT:-3000}"
echo "HOSTNAME: ${HOSTNAME:-0.0.0.0}"
echo "NODE_ENV: ${NODE_ENV:-production}"
echo "SKIP_ENV_VALIDATION: ${SKIP_ENV_VALIDATION:-false}"
echo ""

# Check if server.js exists
if [ ! -f "server.js" ]; then
  echo "ERROR: server.js not found!"
  echo "Current directory: $(pwd)"
  echo "Files in current directory:"
  ls -la
  exit 1
fi

# Check if .next/static exists
if [ ! -d ".next/static" ]; then
  echo "WARNING: .next/static directory not found!"
fi

# Check environment variables
if [ -z "$NEXT_PUBLIC_FE_URL" ] || [ -z "$NEXT_PUBLIC_BE_URL" ]; then
  if [ "$SKIP_ENV_VALIDATION" != "true" ]; then
    echo "WARNING: NEXT_PUBLIC_FE_URL or NEXT_PUBLIC_BE_URL not set!"
    echo "Set SKIP_ENV_VALIDATION=true in Dokploy to bypass this check."
    echo "Or set the required environment variables:"
    echo "  - NEXT_PUBLIC_FE_URL (e.g., https://your-domain.com)"
    echo "  - NEXT_PUBLIC_BE_URL (e.g., https://api.your-domain.com)"
  else
    echo "INFO: Environment validation skipped (SKIP_ENV_VALIDATION=true)"
  fi
else
  echo "Environment variables configured:"
  echo "  NEXT_PUBLIC_FE_URL: $NEXT_PUBLIC_FE_URL"
  echo "  NEXT_PUBLIC_BE_URL: $NEXT_PUBLIC_BE_URL"
fi

echo ""
echo "Starting server..."
echo "=========================================="

# Start the server
exec node server.js

