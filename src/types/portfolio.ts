// src/types/portfolio.ts

/**
 * Interface yang sesuai dengan JSON response dari endpoint:
 * GET /api/portfolios/:id
 */

// Satu item holding saham di dalam portfolio
export interface PortfolioHolding {
  id: string;
  ticker: string;
  updated_at: string;
  total_shares: number;
  avg_buy_price: number;
}

// Response data utama dari API detail portfolio
export interface PortfolioDetailData {
  id: string;
  user_id: string;
  updated_at: string;
  name: string;
  cash_balance: number;
  invested_balance: number;
  portfolio_holdings: PortfolioHolding[];
}

// Wrapper response API
export interface PortfolioDetailApiResponse {
  success: boolean;
  message: string;
  data: PortfolioDetailData;
}

// ---- Computed/Enriched types untuk UI ----

// Holding yang sudah diperkaya dengan data harga real-time dan kalkulasi
export interface EnrichedHolding {
  id: string;
  ticker: string;
  name: string; // nama perusahaan (dari stock detail)
  totalShares: number;
  totalLots: number; // total_shares / 100
  avgBuyPrice: number;
  currentPrice: number;
  investedAmount: number; // total_shares * avg_buy_price
  currentValue: number; // total_shares * current_price
  profitLossAmount: number; // currentValue - investedAmount
  profitLossPercentage: number; // (profitLossAmount / investedAmount) * 100
  isProfit: boolean;
}
