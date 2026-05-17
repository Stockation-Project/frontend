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
      sharpe_ratio: number;
    };
    method: string;
    risk_profile: string;
  };
}

export const optimizePortfolio = async (
  tickers: string[],
): Promise<OptimizePortfolioResponse> => {
  try {
    const response = await apiClient.post<OptimizePortfolioResponse>(
      "/portfolios/optimize",
      { tickers },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Gagal mengoptimalkan portofolio",
    );
  }
};


