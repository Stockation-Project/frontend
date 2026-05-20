// src/features/stock/hooks/useSimulationBuy.ts
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { fetchDashboardData, type DashboardPortfolio } from "@/features/dashboard";
import { searchStocks, fetchRecommendedStocks } from "../services/stock.service";
import { bulkBuyStockService, optimizePortfolio } from "@/features/portfolio";
import type {
  CartItem,
  SearchStockItem,
  BuyStockPayload,
  AllocationChartItem,
} from "../types/simulation";
import { toast } from "sonner";

export interface OptimizationMetrics {
  expectedReturn: number;
  volatility: number;
  sharpeRatio: number;
  method: string;
  riskProfile: string;
}

export const useSimulationBuy = () => {
  // --- States ---
  const [portfolios, setPortfolios] = useState<DashboardPortfolio[]>([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);

  const [recommendedStocks, setRecommendedStocks] = useState<SearchStockItem[]>([]);
  const [allStocks, setAllStocks] = useState<SearchStockItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const prefillStock = location.state?.prefillStock;

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (prefillStock) {
      // Membersihkan state location agar tidak ter-trigger lagi jika di-refresh
      window.history.replaceState({}, document.title);
      return [{
        ticker: prefillStock.ticker,
        name: prefillStock.name,
        currentPrice: prefillStock.currentPrice,
        lots: 1,
        isExpanded: false,
      }];
    }
    return [];
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isBuying, setIsBuying] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationMetrics, setOptimizationMetrics] = useState<OptimizationMetrics | null>(null);
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

  useEffect(() => {
    setOptimizationMetrics(null);
  }, [selectedPortfolioId]);

  // --- Derived State & Calculations ---

  const selectedPortfolio = useMemo(() => {
    return portfolios.find((p) => p.id === selectedPortfolioId) || null;
  }, [portfolios, selectedPortfolioId]);

  const filteredStocks = useMemo(() => {
    if (!searchQuery) return allStocks;
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
  const CHART_COLORS = ["bg-brand", "bg-brand-500", "bg-brand-300", "bg-emerald-600", "bg-teal-500"];
  
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
    setOptimizationMetrics(null);
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
    toast.success(`Berhasil ditambahkan`,{
      description: `${stock.ticker} masuk ke daftar antrean grup transaksi Anda.`,
    });
  };

  const removeStockFromCart = (ticker: string) => {
    setOptimizationMetrics(null);
    setCart((prev) => prev.filter((item) => item.ticker !== ticker));
  };

  const updateStockLot = (ticker: string, lots: number) => {
    if (lots < 1) return;
    setOptimizationMetrics(null);
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

  const handleAutoAllocation = async () => {
    if (cart.length < 2) {
      toast.error("Tambahkan minimal 2 saham ke dalam keranjang untuk alokasi otomatis!");
      return;
    }
    if (!selectedPortfolio) {
      toast.error("Silakan pilih dompet simulasi terlebih dahulu!");
      return;
    }

    try {
      setIsOptimizing(true);
      const tickers = cart.map((item) => item.ticker);
      
      // 1. Panggil API Optimasi
      const res = await optimizePortfolio(tickers);
      const weights = res.data.weights; // format: { "BBCA": 0.45, "TLKM": 0.55 }
      
      // 2. Terapkan kalkulasi lot otomatis
      const totalCash = selectedPortfolio.cash_balance;
      const updatedCart = cart.map((item) => {
        const weight = weights[item.ticker] || 0;
        const allocatedFund = weight * totalCash;
        const calculatedShares = allocatedFund / item.currentPrice;
        const lots = Math.max(1, Math.floor(calculatedShares / 100)); // Min 1 lot, floor agar tidak overbudget
        
        return {
          ...item,
          lots,
        };
      });

      setCart(updatedCart);
      setOptimizationMetrics({
        expectedReturn: res.data.metrics.expected_return,
        volatility: res.data.metrics.volatility,
        sharpeRatio: res.data.metrics.sharpe_ratio,
        method: res.data.method,
        riskProfile: res.data.risk_profile,
      });
      toast.success("Alokasi Berhasil!", {
        description: "Jumlah lot berhasil disesuaikan otomatis oleh sistem untuk hasil yang lebih optimal.",
      });
    } catch (err: any) {
      toast.error(err.message || "Gagal mengalokasikan!", {
        description: "Silakan coba lagi nanti.",
      });
    } finally {
      setIsOptimizing(false);
    }
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
      
      toast.success("Pembelian Berhasil!", {
        description: ` ${cart.length} Saham berhasil dibeli. Total investasi Anda sebesar ${totalInvestment.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}.`,
      });
      
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
      isOptimizing,
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
      optimizationMetrics,
    },
    handlers: {
      setSearchQuery,
      handleSelectPortfolio,
      addStockToCart,
      removeStockFromCart,
      updateStockLot,
      toggleExpandStock,
      handleConfirmBuy,
      handleAutoAllocation,
    },
  };
};
