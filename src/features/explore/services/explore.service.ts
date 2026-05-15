import apiClient from "@/lib/axios";
import type { MarketMoversResponse, WatchlistResponse } from "../types/explore";

export const getMarketMovers = async (): Promise<MarketMoversResponse> => {
  const response = await apiClient.get("/explore/market-movers");
  return response.data.data;
};

export const getWatchlist = async (): Promise<WatchlistResponse> => {
  const response = await apiClient.get("/explore/watchlist");
  return response.data;
};

export const toggleWatchlist = async (ticker: string) => {
  const response = await apiClient.post("/explore/watchlist/toggle", { ticker });
  return response.data;
};
