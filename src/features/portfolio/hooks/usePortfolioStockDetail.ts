// src/features/portfolio/hooks/usePortfolioStockDetail.ts
import { useState, useEffect } from "react";
import apiClient from "@/lib/axios";

export const usePortfolioStockDetail = (
  portfolioId: string | undefined,
  ticker: string | undefined,
) => {
  const [holding, setHolding] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPortfolioData = async () => {
    if (!portfolioId || !ticker) return;
    setLoading(true);
    try {
      // 1. Fetch data portfolio untuk mencari holding saham spesifik
      const portfolioRes = await apiClient.get(`/portfolios/${portfolioId}`);
      // Backend mengembalikan field 'portfolio_holdings'
      const currentHolding = portfolioRes.data.data.portfolio_holdings?.find(
        (h: any) => h.ticker === ticker,
      );
      setHolding(currentHolding || null);

      // 2. Fetch riwayat transaksi
      const txRes = await apiClient.get(
        `/transactions/portfolio/${portfolioId}/stock/${ticker}`,
      );
      setTransactions(txRes.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data portfolio:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!portfolioId || !ticker) return;
    fetchPortfolioData();
  }, [portfolioId, ticker]);

  return { holding, transactions, loading, refetch: fetchPortfolioData };
};
