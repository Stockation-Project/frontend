import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { 
  useDashboard, 
  mapRecommendedStocks, 
  mapPortfoliosToAllocations,
  WalletSummary,
  RiskProfileWidget,
  DashboardSkeleton,
  PortfolioSection
} from "@/features/dashboard";
import { useWallet } from "@/features/wallet";
import { useAuth } from "@/features/auth";
import GlobalWalletCard from "@/components/shared/wallet/GlobalWalletCard";
import StockTable from "@/components/shared/cards/StockTable";
import TopUpModal from "@/components/shared/modal/TopUpModal";
import CreatePortfolioModal from "@/components/shared/modal/CreatePortfolioModal";
import AllocateModal from "@/components/shared/modal/AllocateModal";
import PageHeader from "@/components/shared/layout/PageHeader";

const DashboardPages: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, error, refreshData } = useDashboard();
  const { user } = useAuth();
  
  const { actions, selectedPortfolioId, setSelectedPortfolioId, portfolios: walletPortfolios } = useWallet({ 
    onSuccess: refreshData 
  });
  const { handleTopUp, handleCreatePortfolio, handleAllocate } = actions;

  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isCreatePortoOpen, setIsCreatePortoOpen] = useState(false);
  const [isAllocateOpen, setIsAllocateOpen] = useState(false);

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
          <div className="w-16 h-16 bg-error-50 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-error-500" />
          </div>
          <h3 className="text-lg font-bold text-text-primary mb-2">
            Gagal Memuat Dashboard
          </h3>
          <p className="text-sm text-text-muted max-w-md">
            {error || "Data dashboard tidak tersedia. Silakan coba lagi nanti."}
          </p>
        </div>
      </motion.div>
    );
  }

  // --- Destructure data from API ---
  const { user_info, wallet_summary, portfolios, recommended_stocks } = data;

  // Ambil nama user
  const userName = user?.first_name || "Pengguna";

  // Map recommended stocks ke format StockTable
  const mappedStocks = mapRecommendedStocks(recommended_stocks);

  // Map portfolios ke format WalletSummary melalui utilitas terpusat
  const walletAllocations = mapPortfoliosToAllocations(portfolios);

  // Map warna UI untuk masing-masing saham di dalam setiap dompet
  const ALLOCATION_COLORS = ["bg-brand", "bg-brand-700", "bg-brand-500", "bg-brand-800", "bg-brand-600"];
  const portfoliosWithColors = portfolios.map(p => ({
    ...p,
    allocations: (p.allocations || []).map((alloc, idx) => ({
      ...alloc,
      color: ALLOCATION_COLORS[idx % ALLOCATION_COLORS.length]
    }))
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full flex flex-col overflow-hidden"
    >
      <PageHeader title="Dasboard" description={user_info.greeting} />
      <div className="grid grid-cols-1 xl:grid-cols-10 gap-8 flex-1 overflow-y-auto p-4 pb-6 no-scrollbar">
        <div className="xl:col-span-7 space-y-8">
          <GlobalWalletCard
            balance={wallet_summary.main_wallet_balance}
            onTopUpClick={() => setIsTopUpOpen(true)}
            onAllocateClick={() => setIsAllocateOpen(true)}
          />

          <TopUpModal
            isOpen={isTopUpOpen}
            onClose={() => setIsTopUpOpen(false)}
            currentBalance={data?.wallet_summary?.main_wallet_balance || 0}
            onSuccess={handleTopUp}
          />

          <AllocateModal
            isOpen={isAllocateOpen}
            onClose={() => setIsAllocateOpen(false)}
            portfolios={portfolios}
            selectedPortfolioId={selectedPortfolioId || ""}
            onPortfolioSelect={setSelectedPortfolioId}
            currentBalance={wallet_summary.main_wallet_balance}
            onSuccess={handleAllocate}
          />

          <PortfolioSection
            portfolios={portfoliosWithColors}
            userRiskProfile={user_info.risk_profile}
            onAddClick={() => setIsCreatePortoOpen(true)}
            onCardClick={(portfolioId) =>
              navigate(`/portfolio/${portfolioId}`)
            }
            cardVariant="dashboard"
          />

          <CreatePortfolioModal
            isOpen={isCreatePortoOpen}
            onClose={() => setIsCreatePortoOpen(false)}
            currentBalance={data?.wallet_summary?.main_wallet_balance || 0}
            onSuccess={handleCreatePortfolio}
          />

          <StockTable
            title="Sesuai dengan Profil Resikomu"
            stocks={mappedStocks}
          />
        </div>

        <div className="xl:col-span-3 space-y-8">
          <WalletSummary
            totalWallet={wallet_summary.total_assets}
            allocations={walletAllocations}
          />

          <RiskProfileWidget
            score={user_info.risk_score || 0}
            profileKey={user_info.risk_profile}
            userName={userName}
            updatedAt=""
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPages;
