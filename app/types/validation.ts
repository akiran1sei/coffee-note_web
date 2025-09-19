// =========================
// types/validation.ts
// =========================
export interface CoffeeInfo {
  imageUrl: string;
  imageAlt: string;
  coffeeName: string;
  productionArea: string;
}

export interface SelfInfo {
  variety: string;
  roastingDegree: string;
}

export interface ExtractionInfo {
  extractionMethod: string;
  extractionMaker: string;
  measurementMethod: string;
  grindSize: string;
  extractionTime: number;
  temperature: number;
  coffeeAmount: number;
  waterAmount: number;
}

export interface ShopInfo {
  shopName: string;
  shopPrice: number | string;
  shopDate: Date;
  shopAddress: string;
  shopUrl: string;
}

export interface ReviewChart {
  acidity: number;
  bitterness: number;
  body: number;
  aroma: number;
  aftertaste: number;
  overall: number;
}

export interface ReviewInfo {
  chart: ReviewChart;
  memo: string;
}

export interface ValidationRule<T = unknown> {
  field: keyof T | string;
  message: string;
  validator: (value: unknown) => boolean;
}

export type ValidationResult = {
  isValid: boolean;
  message?: string;
};
