// src/features/stock/hooks/useSimulationBuy.ts
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { fetchDashboardData, type DashboardPortfolio } from "@/features/dashboard";
import { searchStocks, fetchRecommendedStocks } from "../services/stock.service";
import { bulkBuyStockService, optimizePortfolio } from "@/features/portfolio";
import { useAuth } from "@/features/auth";
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
  cvar: number;
  sharpeRatio: number;
  method: string;
  riskProfile: string;
  riskTolerance: number;
  volatilitySource: "forecast" | "historical";
  forecastCount: number;
  totalCount: number;
}

/**
 * Posisi default slider (0.0–1.0) berdasarkan persona profil risiko user.
 * Selaras dengan default_risk_tolerance di config ML:
 *   konservatif (turtle, hippo) → 0.20
 *   moderat     (capybara)      → 0.50
 *   agresif     (wolf, lion)    → 0.80
 */
export const getDefaultRiskTolerance = (riskProfile?: string | null): number => {
  const profile = (riskProfile || "").toLowerCase();
  if (profile === "turtle" || profile === "hippo") return 0.2;
  if (profile === "wolf" || profile === "lion") return 0.8;
  return 0.5; // capybara / default
};

export const useSimulationBuy = () => {
  const { user } = useAuth();

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

  // Ref untuk debounce auto-optimize saat slider berubah
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Tandai bahwa user sudah pernah klik tombol "Alokasi Otomatis" minimal sekali.
  // Auto-trigger via slider hanya aktif setelah optimasi pertama berhasil.
  const hasOptimizedOnce = useRef(false);

  // --- Risk Tolerance Slider ---
  // Default mengikuti persona profil risiko user; bisa digeser manual.
  const defaultRiskTolerance = useMemo(
    () => getDefaultRiskTolerance(user?.risk_profile),
    [user?.risk_profile]
  );
  const [riskTolerance, setRiskTolerance] = useState<number>(defaultRiskTolerance);
  // Tandai apakah user sudah menggeser slider (untuk membedakan default vs manual)
  const [isToleranceCustomized, setIsToleranceCustomized] = useState(false);

  // Sinkronkan default begitu data user tersedia (jika belum digeser manual)
  useEffect(() => {
    if (!isToleranceCustomized) {
      setRiskTolerance(defaultRiskTolerance);
    }
  }, [defaultRiskTolerance, isToleranceCustomized]);

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

  // Auto-optimize saat slider digeser (dipanggil via useEffect + debounce)
  // Dibungkus useCallback agar useEffect dependencies stabil.
  const triggerAutoOptimizeDebounced = useCallback(
    (currentCart: typeof cart, currentIsOptimizing: boolean) => {
      // Hanya auto-optimize jika:
      // 1. User sudah pernah klik "Alokasi Otomatis" minimal sekali
      // 2. Ada minimal 2 saham di cart
      // 3. Tidak sedang dalam proses optimasi
      if (!hasOptimizedOnce.current || currentCart.length < 2 || currentIsOptimizing) {
        return;
      }

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        handleAutoAllocation();
      }, 600);
    },
    // handleAutoAllocation didefinisikan di bawah, jadi kita ikat via ref trick —
    // tapi karena urutan deklarasi, kita gunakan pola sederhana: panggil langsung.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Ubah nilai slider toleransi risiko (0.0–1.0)
  const handleChangeRiskTolerance = (value: number) => {
    const clamped = Math.min(1, Math.max(0, value));
    setRiskTolerance(clamped);
    setIsToleranceCustomized(true);
    // Hasil optimasi lama tidak lagi relevan setelah slider berubah
    setOptimizationMetrics(null);
  };

  // Kembalikan slider ke default sesuai profil risiko user
  const handleResetRiskTolerance = () => {
    setRiskTolerance(defaultRiskTolerance);
    setIsToleranceCustomized(false);
    setOptimizationMetrics(null);
  };

  // ── AUTO-OPTIMIZE EFFECT ──
  // Saat riskTolerance berubah (user geser slider), trigger ulang optimasi
  // secara otomatis dengan debounce 600ms — HANYA jika optimasi pernah
  // dilakukan sebelumnya (hasOptimizedOnce) agar tidak spam API saat mount.
  useEffect(() => {
    triggerAutoOptimizeDebounced(cart, isOptimizing);

    // Cleanup debounce timer saat component unmount atau effect re-run
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riskTolerance]);

  const addStockToCart = (stock: SearchStockItem) => {
    setOptimizationMetrics(null);
    // Reset flag agar user harus klik tombol lagi setelah komposisi saham berubah
    hasOptimizedOnce.current = false;
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
    // Reset flag agar user harus klik tombol lagi setelah komposisi saham berubah
    hasOptimizedOnce.current = false;
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

      // 1. Panggil API Optimasi dengan toleransi risiko dari slider.
      //    Jika user belum menggeser slider, kirim null agar backend/ML
      //    memakai default sesuai profil risiko user.
      const tolerancePayload = isToleranceCustomized ? riskTolerance : null;
      const res = await optimizePortfolio(tickers, tolerancePayload);
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
      const meta = res.data.metadata;
      const perTicker = meta?.volatility_per_ticker || {};
      const forecastCount = Object.values(perTicker).filter((s) => s === "forecast").length;
      const totalCount = Object.keys(perTicker).length || cart.length;
      setOptimizationMetrics({
        expectedReturn: res.data.metrics.expected_return,
        volatility: res.data.metrics.volatility,
        cvar: res.data.metrics.cvar,
        sharpeRatio: res.data.metrics.sharpe_ratio,
        method: res.data.method,
        riskProfile: res.data.risk_profile,
        riskTolerance: meta?.risk_tolerance ?? riskTolerance,
        volatilitySource: meta?.volatility_source ?? "historical",
        forecastCount,
        totalCount,
      });
      // Tandai bahwa optimasi pertama sudah berhasil — slider sekarang bisa
      // men-trigger auto-optimize secara otomatis saat nilainya berubah.
      hasOptimizedOnce.current = true;
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
      riskTolerance,
      defaultRiskTolerance,
      isToleranceCustomized,
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
      handleChangeRiskTolerance,
      handleResetRiskTolerance,
    },
  };
};
