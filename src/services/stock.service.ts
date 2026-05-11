// src/services/stock.service.ts
import apiClient from "@/services/api";
import type { StockDetailData } from "@/types/stock";
import type { SearchStockItem } from "@/types/simulation";

interface StockDetailResponse {
  success: boolean;
  data: StockDetailData;
  message?: string;
}

interface RecommendedStocksResponse {
  success: boolean;
  data: {
    user_risk_profile: string;
    mapped_risk_level: string;
    recommendations: SearchStockItem[];
  };
  message?: string;
}

interface ExploreStocksResponse {
  success: boolean;
  data: {
    all_stocks: SearchStockItem[];
    gainers: SearchStockItem[];
    losers: SearchStockItem[];
  };
  message?: string;
}

/**
 * Fetch detail data for a single stock by its ticker symbol.
 * This is the single source of truth for the /stocks/detail/:ticker endpoint.
 */
export async function fetchStockDetail(ticker: string): Promise<StockDetailData> {
  const response = await apiClient.get<StockDetailResponse>(`/stocks/detail/${ticker}`);
  return response.data.data;
}

/**
 * Fetch recommended stocks based on user's risk profile.
 */
export async function fetchRecommendedStocks(): Promise<SearchStockItem[]> {
  const response = await apiClient.get<RecommendedStocksResponse>("/stocks/recommendations");
  return response.data.data.recommendations;
}

/**
 * Fetch all stocks to be used for search/explore.
 */
export async function searchStocks(): Promise<SearchStockItem[]> {
  const response = await apiClient.get<ExploreStocksResponse>("/stocks/explore");
  return response.data.data.all_stocks;
}
