import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";
import type { DashboardRecommendedStock } from "@/types/dashboard";
import type { StockItem } from "@/components/shared/cards/StockTable";
import PageHeader from "@/components/shared/layout/PageHeader";
import GlobalWalletCard from "@/components/shared/wallet/GlobalWalletCard";
import StockTable from "@/components/shared/cards/StockTable";
import PortfolioSection from "@/components/dashboard/PortfolioSection";
import WalletSummary from "@/components/dashboard/WalletSummary";
import RiskProfileWidget from "@/components/dashboard/RiskProfileWidget";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";

// --- Helper Functions ---

/**
 * Map recommended stocks dari format backend ke format StockItem (UI).
 * - `change_percent` dibulatkan maks 2 angka di belakang koma.
 * - `isPositive` ditentukan dari nilai `change_percent`.
 */
function mapRecommendedStocks(
  stocks: DashboardRecommendedStock[]
): StockItem[] {
  return stocks.map((stock, index) => ({
    id: index + 1,
    ticker: stock.ticker,
    name: stock.name,
    price: stock.current_price,
    change: Math.abs(
      parseFloat(stock.change_percent.toFixed(2))
    ),
    isPositive: stock.change_percent >= 0,
  }));
}

const DashboardPages: React.FC = () => {
  const { data, isLoading, error } = useDashboard();

  // --- Loading State ---
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // --- Error State ---
  if (error || !data) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <PageHeader title="Dashboard" />
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
    amount: portfolio.investedBalance + portfolio.cashBalance,
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
      {/* Header Halaman — Greeting dari backend */}
      <PageHeader
        title="Dashboard"
        description={user_info.greeting}
      />

      {/* Grid Utama (70% Kiri, 30% Kanan) */}
      <div className="grid grid-cols-1 xl:grid-cols-10 gap-8">
        {/* KOLOM KIRI (70% - xl:col-span-7) */}
        <div className="xl:col-span-7 space-y-8">
          {/* Global Wallet Card — Saldo dompet utama */}
          <GlobalWalletCard balance={wallet_summary.main_wallet_balance} />

          {/* Portfolio Section — Dompet investasi */}
          <PortfolioSection
            portfolios={portfolios}
            userRiskProfile={user_info.risk_profile}
          />

          {/* Recommended Stocks — Saham sesuai profil risiko */}
          <StockTable
            title="Sesuai dengan Profil Resikomu"
            stocks={mappedStocks}
          />
        </div>

        {/* KOLOM KANAN (30% - xl:col-span-3) */}
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
