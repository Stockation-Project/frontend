// src/hooks/useSimulationBuy.ts
import { useState, useEffect, useMemo } from "react";
import { fetchDashboardData } from "@/services/dashboard.service";
import { searchStocks, fetchRecommendedStocks } from "@/services/stock.service";
import { bulkBuyStockService } from "@/services/transaction.service";
import type { DashboardPortfolio } from "@/types/dashboard";
import type {
  CartItem,
  SearchStockItem,
  BuyStockPayload,
  AllocationChartItem,
} from "@/types/simulation";
import { toast } from "sonner";

export const useSimulationBuy = () => {
  // --- States ---
  const [portfolios, setPortfolios] = useState<DashboardPortfolio[]>([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);

  const [recommendedStocks, setRecommendedStocks] = useState<SearchStockItem[]>([]);
  const [allStocks, setAllStocks] = useState<SearchStockItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [cart, setCart] = useState<CartItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isBuying, setIsBuying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Initial Data Fetching ---
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch dashboard data for portfolios, recommended stocks, and all stocks parallelly
        const [dashboardRes, recommendedRes, exploreRes] = await Promise.all([
          fetchDashboardData(),
          fetchRecommendedStocks(),
          searchStocks(),
        ]);

        const fetchedPortfolios = dashboardRes.data.portfolios || [];
        setPortfolios(fetchedPortfolios);
        if (fetchedPortfolios.length > 0) {
          setSelectedPortfolioId(fetchedPortfolios[0].id); // Auto-select first wallet
        }

        setRecommendedStocks(recommendedRes);
        setAllStocks(exploreRes);
      } catch (err: any) {
        setError(err.message || "Gagal memuat data simulasi.");
        toast.error("Gagal memuat data simulasi.");
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // --- Derived State & Calculations ---

  const selectedPortfolio = useMemo(() => {
    return portfolios.find((p) => p.id === selectedPortfolioId) || null;
  }, [portfolios, selectedPortfolioId]);

  const filteredStocks = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return allStocks.filter(
      (s) =>
        s.ticker.toLowerCase().includes(query) ||
        s.name.toLowerCase().includes(query)
    );
  }, [searchQuery, allStocks]);

  const totalInvestment = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.lots * 100 * item.currentPrice, 0);
  }, [cart]);

  const remainingBalance = useMemo(() => {
    const cash = selectedPortfolio?.cash_balance || 0;
    return cash - totalInvestment;
  }, [selectedPortfolio, totalInvestment]);

  // Donut chart colors
  const CHART_COLORS = ["bg-[#329B0D]", "bg-green-500", "bg-green-300", "bg-emerald-600", "bg-teal-500"];
  
  const donutChartData = useMemo<AllocationChartItem[]>(() => {
    if (totalInvestment === 0) return [];

    return cart.map((item, index) => {
      const cost = item.lots * 100 * item.currentPrice;
      const percentage = (cost / totalInvestment) * 100;
      return {
        ticker: item.ticker,
        percentage: Number(percentage.toFixed(1)),
        totalCost: cost,
        color: CHART_COLORS[index % CHART_COLORS.length],
      };
    });
  }, [cart, totalInvestment]);

  // --- Handlers ---

  const handleSelectPortfolio = (id: string) => {
    setSelectedPortfolioId(id);
  };

  const addStockToCart = (stock: SearchStockItem) => {
    setCart((prev) => {
      // Check if already in cart
      const existing = prev.find((item) => item.ticker === stock.ticker);
      if (existing) {
        // Just increase lot by 1
        return prev.map((item) =>
          item.ticker === stock.ticker
            ? { ...item, lots: item.lots + 1 }
            : item
        );
      }
      // Add new
      return [
        ...prev,
        {
          ticker: stock.ticker,
          name: stock.name,
          currentPrice: stock.currentPrice,
          lots: 1,
          isExpanded: false,
        },
      ];
    });
    toast.success(`${stock.ticker} ditambahkan ke keranjang`);
  };

  const removeStockFromCart = (ticker: string) => {
    setCart((prev) => prev.filter((item) => item.ticker !== ticker));
  };

  const updateStockLot = (ticker: string, lots: number) => {
    if (lots < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.ticker === ticker ? { ...item, lots } : item))
    );
  };

  const toggleExpandStock = (ticker: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.ticker === ticker ? { ...item, isExpanded: !item.isExpanded } : item
      )
    );
  };

  const handleConfirmBuy = async (onSuccessCallback?: () => void) => {
    if (!selectedPortfolioId) {
      toast.error("Pilih dompet terlebih dahulu!");
      return;
    }
    if (cart.length === 0) {
      toast.error("Keranjang kosong!");
      return;
    }
    if (remainingBalance < 0) {
      toast.error("Saldo tidak mencukupi!");
      return;
    }

    try {
      setIsBuying(true);
      const payloads: BuyStockPayload[] = cart.map((item) => ({
        portfolio_id: selectedPortfolioId,
        ticker: item.ticker,
        lots: item.lots,
        current_price: item.currentPrice,
      }));

      await bulkBuyStockService(payloads);
      
      toast.success("Pembelian saham berhasil!");
      
      // Clear cart
      setCart([]);
      
      // Re-fetch dashboard to update balances
      const dashboardRes = await fetchDashboardData();
      setPortfolios(dashboardRes.data.portfolios || []);

      if (onSuccessCallback) {
        onSuccessCallback();
      }

    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan saat membeli saham.");
    } finally {
      setIsBuying(false);
    }
  };

  return {
    state: {
      isLoading,
      isBuying,
      error,
      portfolios,
      selectedPortfolioId,
      selectedPortfolio,
      searchQuery,
      recommendedStocks,
      filteredStocks,
      cart,
      totalInvestment,
      remainingBalance,
      donutChartData,
    },
    handlers: {
      setSearchQuery,
      handleSelectPortfolio,
      addStockToCart,
      removeStockFromCart,
      updateStockLot,
      toggleExpandStock,
      handleConfirmBuy,
    },
  };
};
