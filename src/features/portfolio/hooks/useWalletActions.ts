// src/features/portfolio/hooks/useWalletActions.ts
import { useCallback } from "react";
import { toast } from "sonner";
import { topUpWalletService, createPortfolioService } from "../services/portfolio.service";

// Konfigurasi class Sonner toast yang konsisten
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

const TOAST_DURATION = 10000;

interface UseWalletActionsParams {
  onRefresh: () => Promise<void>;
}

interface UseWalletActionsReturn {
  handleTopUp: (amount: number) => Promise<void>;
  handleCreatePortfolio: (name: string, amount: number) => Promise<void>;
}

/**
 * Custom hook yang mengelola aksi-aksi wallet di Dashboard:
 * top up saldo dan pembuatan dompet baru.
 */
export function useWalletActions({ onRefresh }: UseWalletActionsParams): UseWalletActionsReturn {
  const handleTopUp = useCallback(async (amount: number) => {
    try {
      await topUpWalletService(amount);
      await onRefresh();

      toast.success("Top Up Berhasil!", {
        description: `Saldo sebesar Rp ${amount.toLocaleString("id-ID")} telah masuk ke dompet utama.`,
        classNames: TOAST_CLASS_SUCCESS,
        duration: TOAST_DURATION,
      });
    } catch (error: any) {
      toast.error("Top Up Gagal!", {
        description: error.message || "Terjadi kesalahan saat menambahkan saldo.",
        classNames: TOAST_CLASS_ERROR,
        duration: TOAST_DURATION,
      });
    }
  }, [onRefresh]);

  const handleCreatePortfolio = useCallback(async (name: string, amount: number) => {
    try {
      await createPortfolioService({ name, allocated_fund: amount });
      await onRefresh();

      toast.success("Dompet Berhasil Dibuat!", {
        description: `Dompet ${name} sudah siap digunakan untuk investasi.`,
        classNames: TOAST_CLASS_SUCCESS,
        duration: TOAST_DURATION,
      });
    } catch (error: any) {
      toast.error("Gagal Membuat Dompet", {
        description: error.message || "Terjadi kesalahan sistem.",
        classNames: TOAST_CLASS_ERROR,
        duration: TOAST_DURATION,
      });
      throw error;
    }
  }, [onRefresh]);

  return { handleTopUp, handleCreatePortfolio };
}
