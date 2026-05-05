// ──────────────────────────────────────────────
// Settings & Product Types — CTA Apparels ERP
// ──────────────────────────────────────────────

export interface AppSettings {
  id: string;
  key: string;
  value: string;
  updatedAt: Date;
}

export interface GlobalConfig {
  currency: string; // e.g. "INR"
  currencySymbol: string; // e.g. "₹"
  currencyLocale: string; // e.g. "en-IN"
  location: string; // e.g. "India"
  companyName: string; // e.g. "CTA Apparels"
  timezone: string; // e.g. "Asia/Kolkata"
}

export type ProductStatus = "active" | "draft" | "archived";

export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string | null;
  category: string | null;
  price: number; // stored in the configured currency (INR)
  costPrice: number | null;
  stockQty: number;
  minStockLevel: number;
  unit: string; // e.g. "pcs", "meters", "kg"
  imageUrl: string | null;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type SampleStatus =
  | "requested"
  | "in-progress"
  | "submitted"
  | "approved"
  | "rejected"
  | "revision";

export interface Sample {
  id: string;
  orderId: string | null;
  productId: string | null;
  name: string;
  buyer: string;
  status: SampleStatus;
  submittedDate: Date | null;
  feedbackDate: Date | null;
  feedbackNotes: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
