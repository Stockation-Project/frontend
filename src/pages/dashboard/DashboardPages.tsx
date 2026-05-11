import React from "react";
import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";
import { topUpWalletService } from "@/services/wallet.services";
import type { DashboardRecommendedStock } from "@/types/dashboard";
import type { StockItem } from "@/components/shared/cards/StockTable";
// import { HeaderContext } from "@/components/layout/DashboardLayout";
import GlobalWalletCard from "@/components/shared/wallet/GlobalWalletCard";
import StockTable from "@/components/shared/cards/StockTable";
import WalletSummary from "@/components/dashboard/WalletSummary";
import RiskProfileWidget from "@/components/dashboard/RiskProfileWidget";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import TopUpModal from "@/components/shared/modal/TopUpModal";
import { toast } from "sonner";
import CreatePortfolioModal from "@/components/shared/modal/CreatePortfolioModal";
import { createPortfolioService } from "@/services/portfolio.service";
import PageHeader from "@/components/shared/layout/PageHeader";
import PortfolioSection from "@/components/dashboard/PortfolioSection";

function mapRecommendedStocks(
  stocks: DashboardRecommendedStock[],
): StockItem[] {
  return stocks.map((stock, index) => ({
    id: index + 1,
    ticker: stock.ticker,
    name: stock.name,
    price: stock.current_price,
    change: Math.abs(parseFloat(stock.change_percent.toFixed(2))),
    isPositive: stock.change_percent >= 0,
  }));
}

const DashboardPages: React.FC = () => {
  const { data, isLoading, error, refreshData } = useDashboard();
  // const headerContext = useContext(HeaderContext);
  // ini buat kebutuhan top tup
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isCreatePortoOpen, setIsCreatePortoOpen] = useState(false);

  // Update header saat data berhasil dimuat
  // useEffect(() => {
  //   if (data?.user_info && headerContext) {
  //     headerContext.setHeader({
  //       title: "Dashboard",
  //       description: data.user_info.greeting,
  //     });
  //   }
  // }, [data?.user_info, headerContext]);

  const handleTopUpSuccess = async (amount: number) => {
    try {
      await topUpWalletService(amount);

      await refreshData();

      toast.success("Top Up Berhaasil !", {
        description: `Saldo sebesar Rp ${amount.toLocaleString("id-ID")} telah masuk ke dompet utama.`,
         classNames: {
            title: "!text-green-700 !font-semibold",
            description: "!text-slate-500",
            toast: "!bg-white !border !border-green-400 !shadow-lg !rounded-xl !font-[Zalando_Sans_SemiExpanded]",
          },
          duration: 10000,
        // Kamu bisa tambahkan className khusus di sini jika ingin warna hijau)
      });
    } catch (error: any) {
      toast.error("Top Up Gagal!", {
        description:
          error.message || "Terjadi kesalahan saat menambahkan saldo.",
          classNames: {
            title: "!text-red-700 !font-semibold",
            description: "!text-slate-500",
            toast: "!bg-white !border !border-red-400 !shadow-lg !rounded-xl !font-[Zalando_Sans_SemiExpanded]",
          },
          duration: 10000,
      });
    }
  };

  const handleCreatePortfolioSuccess = async (name: string, amount: number) => {
    try {
      // Ingat, backend kamu minta variabel bernama 'allocated_fund'
      await createPortfolioService({ name, allocated_fund: amount });

      // Refresh UI
      await refreshData();

      // Toast Berhasil
      toast.success("Dompet Berhasil Dibuat!", {
        description: `Dompet ${name} sudah siap digunakan untuk investasi.`,
        classNames: {
            title: "!text-green-700 !font-semibold",
            description: "!text-slate-500",
            toast: "!bg-white !border !border-green-400 !shadow-lg !rounded-xl !font-[Zalando_Sans_SemiExpanded]",
          },
          duration: 10000,
      });
    } catch (error: any) {
      // Toast Gagal
      toast.error("Gagal Membuat Dompet", {
        description: error.message || "Terjadi kesalahan sistem.",
        classNames: {
            title: "!text-red-700 !font-semibold",
            description: "!text-slate-500",
            toast: "!bg-white !border !border-red-400 !shadow-lg !rounded-xl !font-[Zalando_Sans_SemiExpanded]",
          },
          duration: 10000,
      });
      // Melempar error agar state loading di modal berhenti dan modal tidak tertutup otomatis
      throw error;
    }
  };

  // ini buat loading ya lek yaa
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // klo ini buat error ya lek yaa
  if (error || !data) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <PageHeader
          title="Dashboard"
        />
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            Gagal Memuat Dashboard
          </h3>
          <p className="text-sm text-slate-500 max-w-md">
            {error || "Data dashboard tidak tersedia. Silakan coba lagi nanti."}
          </p>
        </div>
      </motion.div>
    );
  }

  // --- Destructure data from API ---
  const { user_info, wallet_summary, portfolios, recommended_stocks } = data;

  // Map recommended stocks ke format StockTable
  const mappedStocks = mapRecommendedStocks(recommended_stocks);

  // Map wallet summary ke format WalletSummary (saat ini portfolios kosong = allocations kosong)
  // Allocations diambil dari portfolios jika ada, jika kosong tampilkan empty state
  const walletAllocations = portfolios.map((portfolio, index) => ({
    id: portfolio.id || String(index + 1),
    name: portfolio.name,
    amount: portfolio.total_value,
    color: index === 0 ? "bg-green-700" : "bg-green-400",
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <PageHeader title="Dasboard" description={user_info.greeting} />
      {/* Grid Utama (70% Kiri, 30% Kanan) */}
      <div className="grid grid-cols-1 xl:grid-cols-10 gap-8">
        {/* KOLOM KIRI  */}
        <div className="xl:col-span-7 space-y-8">
          {/* Global Wallet Card — Saldo dompet utama */}
          <GlobalWalletCard
            balance={wallet_summary.main_wallet_balance}
            onTopUpClick={() => setIsTopUpOpen(true)}
          />

          <TopUpModal
            isOpen={isTopUpOpen}
            onClose={() => setIsTopUpOpen(false)}
            currentBalance={data?.wallet_summary?.main_wallet_balance || 0}
            onSuccess={handleTopUpSuccess}
          />

          {/* Portfolio Section — Dompet investasi */}
          <PortfolioSection
            portfolios={portfolios}
            userRiskProfile={user_info.risk_profile}
            onAddClick={() => setIsCreatePortoOpen(true)}
          />

          <CreatePortfolioModal
            isOpen={isCreatePortoOpen}
            onClose={() => setIsCreatePortoOpen(false)}
            currentBalance={data?.wallet_summary?.main_wallet_balance || 0}
            onSuccess={handleCreatePortfolioSuccess}
          />

          {/* Recommended Stocks — Saham sesuai profil risiko */}
          <StockTable
            title="Sesuai dengan Profil Resikomu"
            stocks={mappedStocks}
          />
        </div>

        {/* KOLOM KANAN */}
        <div className="xl:col-span-3 space-y-8">
          {/* Wallet Summary — Ringkasan alokasi dompet */}
          <WalletSummary
            totalWallet={wallet_summary.total_assets}
            allocations={walletAllocations}
          />

          {/* Risk Profile Widget — Profil risiko user */}
          <RiskProfileWidget
            score={user_info.risk_score || 0}
            profileKey={user_info.risk_profile}
            updatedAt=""
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPages;
