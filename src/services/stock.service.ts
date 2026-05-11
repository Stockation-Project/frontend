// src/services/stock.service.ts
import apiClient from "@/services/api";
import type { StockDetailData } from "@/types/stock";

interface StockDetailResponse {
  success: boolean;
  data: StockDetailData;
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
