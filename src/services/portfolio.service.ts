import apiClient from "./api";
import type { PortfolioDetailApiResponse } from "@/types/portfolio";

export interface CreatePortfolioPayload {
  name: string;
  allocated_fund: number;
}

export const createPortfolioService = async (
  payload: CreatePortfolioPayload,
) => {
  try {
    const response = await apiClient.post("/portfolios", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Gagal membuat portofolio",
    );
  }
};

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
