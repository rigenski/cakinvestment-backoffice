export type DiscountType = "percentage" | "fixed";

export interface Promo {
  id: string;
  code: string;
  discountType: DiscountType;
  discount: number;
  minPurchase: number;
  maxDiscount: number;
  validFrom: Date;
  validUntil: Date;
  usageLimit: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PromoFormData {
  code: string;
  discountType: DiscountType;
  discount: number;
  minPurchase: number;
  maxDiscount: number;
  validFrom: string; // ISO datetime string
  validUntil: string; // ISO datetime string
  usageLimit: number;
}


