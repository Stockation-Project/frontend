import type { DashboardRecommendedStock, DashboardPortfolio } from "../types/dashboard";
import type { StockItem } from "@/components/shared/cards/StockTable";

const PORTFOLIO_COLORS = [
  "bg-brand",
  "bg-brand-400",
  "bg-brand-300",
  "bg-teal-500",
  "bg-emerald-400",
];

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

export function mapPortfoliosToAllocations(portfolios: DashboardPortfolio[]): WalletAllocation[] {
  return portfolios.map((portfolio, index) => ({
    id: portfolio.id || String(index + 1),
    name: portfolio.name,
    amount: portfolio.total_value,
    color: PORTFOLIO_COLORS[index] ?? "bg-brand-400",
  }));
}

export const ALLOCATION_COLORS = ["bg-brand", "bg-brand-700", "bg-brand-500", "bg-brand-800", "bg-brand-600"];

export function assignPortfolioColors(portfolios: DashboardPortfolio[]) {
  return portfolios.map(p => ({
    ...p,
    allocations: (p.allocations || []).map((alloc, idx) => ({
      ...alloc,
      color: ALLOCATION_COLORS[idx % ALLOCATION_COLORS.length]
    }))
  }));
}
