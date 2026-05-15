import { useState, useEffect } from "react";
import { getWatchlist, toggleWatchlist } from "../services/explore.service";
import type { StockMarketMovers } from "../types/explore";
import { toast } from "sonner";

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<StockMarketMovers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWatchlist = async () => {
    setIsLoading(true);
    try {
      const response = await getWatchlist();
      setWatchlist(response.data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleWatchlist = async (ticker: string) => {
    try {
      const result = await toggleWatchlist(ticker);
      if (result.success) {
        toast.success(result.message);
        fetchWatchlist(); // Refresh
      }
    } catch (err: any) {
      toast.error("Gagal mengubah watchlist");
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return { 
    watchlist, 
    isLoading, 
    toggleWatchlist: handleToggleWatchlist, 
    refresh: fetchWatchlist 
  };
};
