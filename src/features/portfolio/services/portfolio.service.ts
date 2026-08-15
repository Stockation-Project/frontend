// src/features/portfolio/services/portfolio.service.ts
import apiClient from "@/lib/axios";
import type { PortfolioDetailApiResponse } from "../types/portfolio";

/**
 * Fetch detail sebuah portofolio berdasarkan ID.
 * Endpoint: GET /api/portfolios/:id
 */
export const fetchPortfolioDetail = async (
  portfolioId: string,
): Promise<PortfolioDetailApiResponse> => {
  try {
    const response = await apiClient.get<PortfolioDetailApiResponse>(
      `/portfolios/${portfolioId}`,
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Gagal mengambil detail portofolio",
    );
  }
};

/**
 * Fetch harga real-time sebuah saham dari endpoint stock detail.
 * Mengembalikan { ticker, name, current_price }.
 */
export const fetchStockPrice = async (
  ticker: string,
): Promise<{ ticker: string; name: string; current_price: number }> => {
  try {
    const response = await apiClient.get(`/stocks/detail/${ticker}`);
    const data = response.data.data;
    return {
      ticker: data.ticker,
      name: data.name,
      current_price: data.current_price,
    };
  } catch {
    // Fallback jika gagal fetch — return harga 0
    return { ticker, name: ticker, current_price: 0 };
  }
};

export interface OptimizePortfolioResponse {
  success: boolean;
  data: {
    weights: Record<string, number>;
    metrics: {
      expected_return: number;
      volatility: number;
      cvar: number;
      sharpe_ratio: number;
    };
    method: string;
    risk_profile: string;
    metadata?: {
      risk_tolerance: number;
      slider_overridden: boolean;
      cvar_confidence: number;
      volatility_source?: "forecast" | "historical";
      volatility_per_ticker?: Record<string, "forecast" | "historical">;
      pairwise_downside?: Array<{
        ticker_a: string;
        ticker_b: string;
        level: "rendah" | "sedang" | "tinggi";
        conditional_probability: number;
        lower_tail_dependence: number;
        kendall_tau: number;
        tail_quantile: number;
        observations: number;
        model: "clayton";
      }>;
    };
  };
}

export const optimizePortfolio = async (
  tickers: string[],
  riskTolerance?: number | null,
  method?: string,
  periodKey?: string,
): Promise<OptimizePortfolioResponse> => {
  try {
    const response = await apiClient.post<OptimizePortfolioResponse>(
      "/portfolios/optimize",
      {
        tickers,
        risk_tolerance: riskTolerance,
        method,
        period_key: periodKey,
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Gagal mengoptimalkan portofolio",
    );
  }
};


