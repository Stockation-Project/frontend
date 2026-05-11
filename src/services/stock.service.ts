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
 * Map raw backend data to SearchStockItem
 */
const mapToSearchStockItem = (raw: any): SearchStockItem => ({
  ticker: raw.ticker,
  name: raw.name,
  currentPrice: raw.current_price || 0,
  changePercent: raw.change_percent || 0,
  isPositive: (raw.change_percent || 0) >= 0,
});

/**
 * Fetch recommended stocks based on user's risk profile.
 */
export async function fetchRecommendedStocks(): Promise<SearchStockItem[]> {
  const response = await apiClient.get<any>("/stocks/recommendations");
  const rawData = response.data.data.recommendations || [];
  return rawData.map(mapToSearchStockItem);
}

/**
 * Fetch all stocks to be used for search/explore.
 */
export async function searchStocks(): Promise<SearchStockItem[]> {
  const response = await apiClient.get<any>("/stocks/explore");
  const rawData = response.data.data.all_stocks || [];
  return rawData.map(mapToSearchStockItem);
}
