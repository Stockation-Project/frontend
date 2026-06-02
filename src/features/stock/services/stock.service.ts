// src/features/stock/services/stock.service.ts
import apiClient from "@/lib/axios";
import type { StockDetailData } from "../types/stock";
import type { SearchStockItem } from "../types/simulation";

interface StockDetailResponse {
  success: boolean;
  data: StockDetailData;
  message?: string;
}

/**
 * Fetch detail data for a single stock by its ticker symbol.
 */
export async function fetchStockDetail(ticker: string): Promise<StockDetailData> {
  const response = await apiClient.get<StockDetailResponse>(`/stocks/detail/${ticker}`);
  return response.data.data;
}

interface RawStockItem {
  ticker: string;
  name: string;
  current_price?: number;
  change_percent?: number;
}

interface RecommendedStocksResponse {
  success: boolean;
  data: {
    recommendations: RawStockItem[];
  };
  message?: string;
}

interface ExploreStocksResponse {
  success: boolean;
  data: {
    all_stocks: RawStockItem[];
  };
  message?: string;
}

/**
 * Map raw backend data to SearchStockItem
 */
const mapToSearchStockItem = (raw: RawStockItem): SearchStockItem => ({
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
  const response = await apiClient.get<RecommendedStocksResponse>("/stocks/recommendations");
  const rawData = response.data.data.recommendations || [];
  return rawData.map(mapToSearchStockItem);
}

/**
 * Fetch all stocks to be used for search/explore.
 */
export async function searchStocks(): Promise<SearchStockItem[]> {
  const response = await apiClient.get<ExploreStocksResponse>("/stocks/explore");
  const rawData = response.data.data.all_stocks || [];
  return rawData.map(mapToSearchStockItem);
}

const stockService = {
  fetchStockDetail,
  fetchRecommendedStocks,
  searchStocks,
};

export default stockService;
