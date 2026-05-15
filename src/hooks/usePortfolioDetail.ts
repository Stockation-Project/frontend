// src/hooks/usePortfolioDetail.ts
import { useState, useEffect, useCallback } from "react";
import {
  fetchPortfolioDetail,
  fetchStockPrice,
} from "@/services/portfolio.service";
import type {
  PortfolioDetailData,
  EnrichedHolding,
} from "@/types/portfolio";
import type { Allocation } from "@/components/shared/cards/PortfolioCard";

// Warna UI untuk alokasi saham di bar/legenda
const ALLOCATION_COLORS = [
  "bg-brand",
  "bg-brand-500",
  "bg-brand-300",
  "bg-emerald-600",
  "bg-teal-500",
];

interface UsePortfolioDetailReturn {
  portfolio: PortfolioDetailData | null;
  enrichedHoldings: EnrichedHolding[];
  allocations: Allocation[];
  totalProfitAmount: number;
  totalProfitPercentage: number;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

/**
 * Custom hook untuk memisahkan business logic detail portfolio dari UI.
 * Menangani: fetching data, enriching holdings dengan harga real-time,
 * dan menghitung alokasi/lot/profit.
 */
export function usePortfolioDetail(
  portfolioId: string | undefined,
): UsePortfolioDetailReturn {
  const [portfolio, setPortfolio] = useState<PortfolioDetailData | null>(null);
  const [enrichedHoldings, setEnrichedHoldings] = useState<EnrichedHolding[]>(
    [],
  );
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [totalProfitAmount, setTotalProfitAmount] = useState(0);
  const [totalProfitPercentage, setTotalProfitPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Enrich holdings dengan data harga live dari stock API
   * lalu hitung semua derived values (lot, investedAmount, profit, allocations)
   */
  const enrichHoldings = useCallback(
    async (data: PortfolioDetailData) => {
      const holdings = data.portfolio_holdings;

      if (holdings.length === 0) {
        setEnrichedHoldings([]);
        setAllocations([]);
        setTotalProfitAmount(0);
        setTotalProfitPercentage(0);
        return;
      }

      // Fetch harga real-time untuk setiap ticker secara paralel
      const pricePromises = holdings.map((h) => fetchStockPrice(h.ticker));
      const priceResults = await Promise.all(pricePromises);

      // Map ticker -> { name, current_price }
      const priceMap = new Map<
        string,
        { name: string; current_price: number }
      >();
      priceResults.forEach((result) => {
        priceMap.set(result.ticker, {
          name: result.name,
          current_price: result.current_price,
        });
      });

      // Enrich setiap holding
      const enriched: EnrichedHolding[] = holdings.map((h) => {
        const stockInfo = priceMap.get(h.ticker) || {
          name: h.ticker,
          current_price: 0,
        };

        const investedAmount = h.total_shares * h.avg_buy_price;
        const currentValue = h.total_shares * stockInfo.current_price;
        const profitLossAmount = currentValue - investedAmount;
        const profitLossPercentage =
          investedAmount > 0 ? (profitLossAmount / investedAmount) * 100 : 0;

        return {
          id: h.id,
          ticker: h.ticker,
          name: stockInfo.name,
          totalShares: h.total_shares,
          totalLots: Math.floor(h.total_shares / 100),
          avgBuyPrice: h.avg_buy_price,
          currentPrice: stockInfo.current_price,
          investedAmount,
          currentValue,
          profitLossAmount,
          profitLossPercentage,
          isProfit: profitLossAmount >= 0,
        };
      });

      setEnrichedHoldings(enriched);

      // Hitung total profit/loss keseluruhan
      const totalInvested = enriched.reduce(
        (sum, h) => sum + h.investedAmount,
        0,
      );
      const totalCurrent = enriched.reduce(
        (sum, h) => sum + h.currentValue,
        0,
      );
      const totalProfit = totalCurrent - totalInvested;
      const totalProfitPct =
        totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;

      setTotalProfitAmount(totalProfit);
      setTotalProfitPercentage(totalProfitPct);

      // Hitung alokasi % untuk bar & legenda
      const computedAllocations: Allocation[] = enriched.map((h, idx) => ({
        ticker: h.ticker,
        percentage: totalInvested > 0
          ? parseFloat(((h.investedAmount / totalInvested) * 100).toFixed(1))
          : 0,
        color: ALLOCATION_COLORS[idx % ALLOCATION_COLORS.length],
      }));

      setAllocations(computedAllocations);
    },
    [],
  );

  const refreshData = useCallback(async () => {
    if (!portfolioId) return;

    try {
      const response = await fetchPortfolioDetail(portfolioId);
      if (response.success) {
        setPortfolio(response.data);
        await enrichHoldings(response.data);
      } else {
        setError(response.message || "Gagal memuat detail portofolio.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan saat memuat detail portofolio.");
      }
    }
  }, [portfolioId, enrichHoldings]);

  useEffect(() => {
    let isMounted = true;

    const loadDetail = async () => {
      if (!portfolioId) {
        setPortfolio(null);
        setEnrichedHoldings([]);
        setAllocations([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetchPortfolioDetail(portfolioId);

        if (isMounted) {
          if (response.success) {
            setPortfolio(response.data);
            await enrichHoldings(response.data);
          } else {
            setError(
              response.message || "Gagal memuat detail portofolio.",
            );
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Terjadi kesalahan saat memuat detail portofolio.");
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDetail();

    return () => {
      isMounted = false;
    };
  }, [portfolioId, enrichHoldings]);

  return {
    portfolio,
    enrichedHoldings,
    allocations,
    totalProfitAmount,
    totalProfitPercentage,
    isLoading,
    error,
    refreshData,
  };
}
