export interface StockMarketMovers {
  ticker: string;
  name: string;
  current_price: number;
  change: number;
  change_percent: number;
  is_anomaly: boolean;
  sector: string;
}

export interface MarketMoversResponse {
  gainers: StockMarketMovers[];
  losers: StockMarketMovers[];
  all_stocks: StockMarketMovers[];
}

export interface WatchlistResponse {
  success: boolean;
  data: StockMarketMovers[];
}
