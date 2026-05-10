import { useState, useEffect } from "react";
import apiClient from "@/services/api";
import type { StockDetailData } from "@/types/stock";

export const useStockDetail = (ticker: string | undefined) => {
  const [data, setData] = useState<StockDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockDetail = async () => {
      if (!ticker) return;

      try {
        setIsLoading(true);
        // 1. Ambil data asli dari Backend
        const response = await apiClient.get(`/stocks/detail/${ticker}`);
        const realData = response.data.data;

        // // 2. Gabungkan dengan MOCK DATA untuk fitur yang belum ada di backend
        // const mergedData: StockDetailData = {
        //   ...realData,
        //   sector: "Keuangan", // MOCK
        //   about_company: `PT Bank Central Asia Tbk merupakan salah satu bank swasta terbesar di Indonesia.`, // MOCK
        //   ai_summary: `${realData.name} (${realData.ticker}) adalah salah satu saham perbankan terbesar dan paling stabil di Indonesia. Perusahaan ini sudah berdiri puluhan tahun dan dipercaya oleh jutaan nasabah... Secara keseluruhan ini adalah pilihan solid untuk pemula.`, // MOCK
        //   anomaly_history: [
        //     // MOCK
        //     {
        //       id: "1",
        //       period: "12 jan - 18 jan 2024",
        //       price_movement: "Rp1.800 -> Rp2.300",
        //       status: "Naik drastis",
        //     },
        //     {
        //       id: "2",
        //       period: "3 mar - 7 mar 2025",
        //       price_movement: "Rp2.400 -> Rp2.050",
        //       status: "Turun drastis",
        //     },
        //     {
        //       id: "3",
        //       period: "20 jan - 23 jan 2026",
        //       price_movement: "Rp1.950 -> Rp2.200",
        //       status: "Naik drastis",
        //     },
        //   ],
        // };

        setData(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Gagal memuat detail saham.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockDetail();
  }, [ticker]);

  return { data, isLoading, error };
};
