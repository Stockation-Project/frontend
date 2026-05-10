import type { RiskProfileKey } from "@/data/riskProfile";

// --- Sub-interfaces ---

export interface DashboardUserInfo {
  greeting: string;
  risk_profile: RiskProfileKey;
  risk_score: number;
  profile_description: string;
}

export interface DashboardWalletSummary {
  main_wallet_balance: number;
  total_assets: number;
  total_allocated_to_portfolio: number;
  allocation_percentage: string; // e.g. "0.0%"
}

export interface DashboardRecommendedStock {
  ticker: string;
  name: string;
  risk_level: string;
  is_anomaly: boolean;
  current_price: number;
  change_percent: number; // raw number, e.g. -6.443299
}

// --- Main response interface ---

export interface DashboardData {
  user_info: DashboardUserInfo;
  wallet_summary: DashboardWalletSummary;
  portfolios: DashboardPortfolio[];
  recommended_stocks: DashboardRecommendedStock[];
}

export interface DashboardPortfolio {
  id: string;
  name: string;
  cash_balance: number;
  invested_balance: number;
  total_value: number;
  allocations?: {
    ticker: string;
    percentage: number;
    color: string;
  }[];
  profitPercentage?: number;
  profitAmount?: number;
}

export interface DashboardApiResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}
