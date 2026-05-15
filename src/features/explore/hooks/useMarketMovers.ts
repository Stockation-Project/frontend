import { useState, useEffect } from "react";
import { getMarketMovers } from "../services/explore.service";
import type { MarketMoversResponse } from "../types/explore";

export const useMarketMovers = () => {
  const [data, setData] = useState<MarketMoversResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await getMarketMovers();
      setData(result);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Gagal memuat data pasar");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error, refresh: fetchData };
};
