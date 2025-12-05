export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  metaPixelId: string;
}

export interface ReferralConfig {
  inviterPercentage: number; // Orang yang mengajak
  inviteePercentage: number; // Orang yang diajak
}

export interface ConfigData {
  seo: SEOConfig;
  referral: ReferralConfig;
}



