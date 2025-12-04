export type PlanStatus = "active" | "inactive";

export interface Plan {
  id: string;
  title: string;
  description: string;
  duration: number; // in months
  originalPrice: number;
  discountPrice: number;
  features: string[];
  isRecommended: boolean;
  status: PlanStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlanFormData {
  title: string;
  description: string;
  duration: number;
  originalPrice: number;
  discountPrice: number;
  features: string[];
  isRecommended: boolean;
  status: PlanStatus;
}

