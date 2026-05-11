import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";
import { useWalletActions } from "@/hooks/useWalletActions";
import { mapRecommendedStocks, mapPortfoliosToAllocations } from "@/utils/dashboard.utils";
import GlobalWalletCard from "@/components/shared/wallet/GlobalWalletCard";
import StockTable from "@/components/shared/cards/StockTable";
import WalletSummary from "@/components/dashboard/WalletSummary";
import RiskProfileWidget from "@/components/dashboard/RiskProfileWidget";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import TopUpModal from "@/components/shared/modal/TopUpModal";
import CreatePortfolioModal from "@/components/shared/modal/CreatePortfolioModal";
import PageHeader from "@/components/shared/layout/PageHeader";
import PortfolioSection from "@/components/dashboard/PortfolioSection";

const DashboardPages: React.FC = () => {
  const { data, isLoading, error, refreshData } = useDashboard();
  const { handleTopUp, handleCreatePortfolio } = useWalletActions({ onRefresh: refreshData });

  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isCreatePortoOpen, setIsCreatePortoOpen] = useState(false);

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

  // Map portfolios ke format WalletSummary melalui utilitas terpusat
  const walletAllocations = mapPortfoliosToAllocations(portfolios);

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
            onSuccess={handleTopUp}
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
            onSuccess={handleCreatePortfolio}
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
