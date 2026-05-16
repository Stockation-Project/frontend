// src/features/stock/hooks/useStockDetail.ts
import { useState, useEffect } from "react";
import { fetchStockDetail } from "../services/stock.service";
import type { StockDetailData } from "../types/stock";

export const useStockDetail = (ticker: string | undefined) => {
  const [data, setData] = useState<StockDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStockDetail = async () => {
      if (!ticker) return;

      try {
        setIsLoading(true);
        // Delegasikan HTTP call ke layer service
        const stockData = await fetchStockDetail(ticker);
        setData(stockData);
      } catch (err: any) {
        setError(err.response?.data?.message || "Gagal memuat detail saham.");
      } finally {
        setIsLoading(false);
      }
    };

    loadStockDetail();
  }, [ticker]);

  return { data, isLoading, error };
};
