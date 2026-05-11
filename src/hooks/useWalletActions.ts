// src/hooks/useWalletActions.ts
import { useCallback } from "react";
import { toast } from "sonner";
import { topUpWalletService } from "@/services/wallet.services";
import { createPortfolioService } from "@/services/portfolio.service";

// Konfigurasi class Sonner toast yang konsisten untuk seluruh aksi wallet
const TOAST_CLASS_SUCCESS = {
  title: "!text-green-700 !font-semibold",
  description: "!text-slate-500",
  toast: "!bg-white !border !border-green-400 !shadow-lg !rounded-xl !font-[Zalando_Sans_SemiExpanded]",
} as const;

const TOAST_CLASS_ERROR = {
  title: "!text-red-700 !font-semibold",
  description: "!text-slate-500",
  toast: "!bg-white !border !border-red-400 !shadow-lg !rounded-xl !font-[Zalando_Sans_SemiExpanded]",
} as const;

const TOAST_DURATION = 10000;

interface UseWalletActionsParams {
  /** Callback untuk me-refresh data dashboard setelah aksi berhasil */
  onRefresh: () => Promise<void>;
}

interface UseWalletActionsReturn {
  handleTopUp: (amount: number) => Promise<void>;
  handleCreatePortfolio: (name: string, amount: number) => Promise<void>;
}

/**
 * Custom hook yang mengelola aksi-aksi wallet di Dashboard:
 * top up saldo dan pembuatan dompet baru, termasuk toast notification.
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
      // Lempar error agar state loading di modal berhenti
      throw error;
    }
  }, [onRefresh]);

  return { handleTopUp, handleCreatePortfolio };
}
