// src/features/product-tour/types/index.ts

export interface TourStep {
  /** Unique identifier */
  id: string;
  /** Title shown in tooltip */
  title: string;
  /** Description text in tooltip */
  description: string;
  /** `data-tour` attribute value to target. `null` = centered welcome */
  target: string | null;
  /** Button text (default: "Lanjut") */
  buttonText?: string;
  /** True = last step, shows "Selesai" */
  isLast?: boolean;
  /** Position preference */
  position?: TooltipPosition;
  /** True = show logo header (welcome step only) */
  showLogo?: boolean;
}

export type TooltipPosition = "top" | "bottom" | "left" | "right" | "center";

export interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface TourState {
  isActive: boolean;
  currentStep: number;
}

export interface UseProductTourOptions {
  /** Whether user has portfolios (used to decide if tour should start) */
  hasPortfolio: boolean;
  /** Whether dashboard data is still loading */
  isLoading: boolean;
  /** User ID untuk per-user localStorage key */
  userId?: string;
}
