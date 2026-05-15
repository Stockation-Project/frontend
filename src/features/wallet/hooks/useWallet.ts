import { useState, useEffect, useCallback } from "react";
import {
  getWallets,
  getPortfolios,
  getActivityHistory,
  topUpWallet as topUpApi,
  allocateFunds as allocateApi,
  withdrawFunds as withdrawApi,
  createPortfolio as createApi,
} from "../services/wallet.service";
import type { Portfolio, Wallet, Activity, WalletStats } from "../types/wallet";
import { toast } from "sonner";

// Toast Styles
const TOAST_CLASS_SUCCESS = {
  title: "!text-brand !font-semibold",
  description: "!text-slate-500",
  toast: "!bg-white !border !border-brand-400 !shadow-lg !rounded-xl",
} as const;

const TOAST_CLASS_ERROR = {
  title: "!text-error-700 !font-semibold",
  description: "!text-slate-500",
  toast: "!bg-white !border !border-error-400 !shadow-lg !rounded-xl",
} as const;

const TOAST_DURATION = 5000;

export const useWallet = () => {
  const [globalWallet, setGlobalWallet] = useState<Wallet | null>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(
    null
  );
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [walletsData, portfoliosData] = await Promise.all([
        getWallets(),
        getPortfolios(),
      ]);

      setGlobalWallet(walletsData[0] || null);
      setPortfolios(portfoliosData);

      // Jika belum ada yang dipilih, pilih yang pertama jika ada
      if (!selectedPortfolioId && portfoliosData.length > 0) {
        setSelectedPortfolioId(portfoliosData[0].id);
      }
    } catch (err: any) {
      setError(err.message || "Gagal mengambil data dompet");
    } finally {
      setIsLoading(false);
    }
  }, [selectedPortfolioId]);

  const fetchHistory = useCallback(async () => {
    try {
      const historyData = await getActivityHistory(
        selectedPortfolioId || undefined,
        filter
      );
      setActivities(historyData);
    } catch (err: any) {
      console.error("Gagal mengambil riwayat:", err);
    }
  }, [selectedPortfolioId, filter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Actions
  const handleTopUp = async (amount: number) => {
    try {
      await topUpApi(amount);
      await fetchData();
      await fetchHistory();
      toast.success("Top Up Berhasil!", {
        description: `Saldo sebesar Rp ${amount.toLocaleString("id-ID")} telah masuk ke dompet utama.`,
        classNames: TOAST_CLASS_SUCCESS,
        duration: TOAST_DURATION,
      });
    } catch (error: any) {
      toast.error("Top Up Gagal", {
        description: error.message || "Terjadi kesalahan sistem.",
        classNames: TOAST_CLASS_ERROR,
      });
    }
  };

  const handleAllocate = async (amount: number) => {
    if (!selectedPortfolioId) return;
    try {
      await allocateApi(selectedPortfolioId, amount);
      await fetchData();
      await fetchHistory();
      toast.success("Alokasi Berhasil!", {
        description: `Dana sebesar Rp ${amount.toLocaleString("id-ID")} telah dipindahkan ke portofolio.`,
        classNames: TOAST_CLASS_SUCCESS,
        duration: TOAST_DURATION,
      });
    } catch (error: any) {
      toast.error("Alokasi Gagal", {
        description: error.message || "Terjadi kesalahan sistem.",
        classNames: TOAST_CLASS_ERROR,
      });
    }
  };

  const handleWithdraw = async (amount: number) => {
    if (!selectedPortfolioId) return;
    try {
      await withdrawApi(selectedPortfolioId, amount);
      await fetchData();
      await fetchHistory();
      toast.success("Penarikan Berhasil!", {
        description: `Dana sebesar Rp ${amount.toLocaleString("id-ID")} telah ditarik ke dompet utama.`,
        classNames: TOAST_CLASS_SUCCESS,
        duration: TOAST_DURATION,
      });
    } catch (error: any) {
      toast.error("Penarikan Gagal", {
        description: error.message || "Terjadi kesalahan sistem.",
        classNames: TOAST_CLASS_ERROR,
      });
    }
  };

  const handleCreatePortfolio = async (name: string, amount: number) => {
    try {
      await createApi(name, amount);
      await fetchData();
      toast.success("Dompet Berhasil Dibuat!", {
        description: `Dompet ${name} sudah siap digunakan.`,
        classNames: TOAST_CLASS_SUCCESS,
        duration: TOAST_DURATION,
      });
    } catch (error: any) {
      toast.error("Gagal Membuat Dompet", {
        description: error.message || "Terjadi kesalahan sistem.",
        classNames: TOAST_CLASS_ERROR,
      });
      throw error;
    }
  };

  const selectedPortfolio = portfolios.find((p) => p.id === selectedPortfolioId);

  const stats: WalletStats = {
    totalBalance: selectedPortfolio
      ? Number(selectedPortfolio.cash_balance) +
        Number(selectedPortfolio.invested_balance)
      : 0,
    availableBalance: selectedPortfolio ? Number(selectedPortfolio.cash_balance) : 0,
    investedBalance: selectedPortfolio
      ? Number(selectedPortfolio.invested_balance)
      : 0,
    totalStocks: selectedPortfolio?.portfolio_holdings?.reduce(
      (sum, holding) => sum + holding.total_shares,
      0
    ) || 0,
  };

  return {
    globalWallet,
    portfolios,
    selectedPortfolioId,
    setSelectedPortfolioId,
    selectedPortfolio,
    activities,
    isLoading,
    error,
    filter,
    setFilter,
    stats,
    actions: {
      handleTopUp,
      handleAllocate,
      handleWithdraw,
      handleCreatePortfolio,
      refresh: fetchData,
    },
  };
};
