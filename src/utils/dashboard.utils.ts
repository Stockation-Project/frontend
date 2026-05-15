// src/utils/dashboard.utils.ts
import type { DashboardRecommendedStock, DashboardPortfolio } from "@/types/dashboard";
import type { StockItem } from "@/components/shared/cards/StockTable";

// Warna untuk setiap portfolio berdasarkan index (dapat diperluas)
const PORTFOLIO_COLORS = [
  "bg-brand",
  "bg-brand-400",
  "bg-brand-300",
  "bg-teal-500",
  "bg-emerald-400",
];

/**
 * Memetakan data saham rekomendasi dari format API ke format yang dibutuhkan StockTable.
 */
export function mapRecommendedStocks(stocks: DashboardRecommendedStock[]): StockItem[] {
  return stocks.map((stock, index) => ({
    id: index + 1,
    ticker: stock.ticker,
    name: stock.name,
    price: stock.current_price,
    change: Math.abs(parseFloat(stock.change_percent.toFixed(2))),
    isPositive: stock.change_percent >= 0,
  }));
}

interface WalletAllocation {
  id: string;
  name: string;
  amount: number;
  color: string;
}

/**
 * Memetakan data portfolios dari format API ke format alokasi yang dibutuhkan WalletSummary.
 */
export function mapPortfoliosToAllocations(portfolios: DashboardPortfolio[]): WalletAllocation[] {
  return portfolios.map((portfolio, index) => ({
    id: portfolio.id || String(index + 1),
    name: portfolio.name,
    amount: portfolio.total_value,
    color: PORTFOLIO_COLORS[index] ?? "bg-brand-400",
  }));
}
