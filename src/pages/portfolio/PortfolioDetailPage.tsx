// src/pages/portfolio/PortfolioDetailPage.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, Briefcase } from "lucide-react";

// Features (New Architecture)
import { 
  usePortfolioDetail, 
  PortfolioDetailCard, 
  PortfolioDetailSkeleton,
} from "@/features/portfolio";
import { useWallet } from "@/features/wallet";
import { 
  useDashboard, 
  PortfolioSection 
} from "@/features/dashboard";
import PageHeader from "@/components/shared/layout/PageHeader";
import CreatePortfolioModal from "@/components/shared/modal/CreatePortfolioModal";
import EmptyState from "@/components/shared/states/EmptyState";

// Warna alokasi (konsisten dengan DashboardPages)
const ALLOCATION_COLORS = [
  "bg-brand",
  "bg-brand-500",
  "bg-green-300",
  "bg-emerald-600",
  "bg-teal-500",
];

const PortfolioDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Hook untuk detail portfolio yang sedang dilihat
  const {
    portfolio,
    enrichedHoldings,
    allocations,
    totalProfitAmount,
    totalProfitPercentage,
    isLoading: isDetailLoading,
    error: detailError,
  } = usePortfolioDetail(id);

  // Hook untuk slider daftar portfolio (reuse dari dashboard)
  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    refreshData,
  } = useDashboard();

  const { actions } = useWallet({
    onSuccess: refreshData,
  });
  const { handleCreatePortfolio } = actions;

  const [isCreatePortoOpen, setIsCreatePortoOpen] = useState(false);

  // Loading state
  if (isDetailLoading || isDashboardLoading) {
    return <PortfolioDetailSkeleton />;
  }

  // Error state
  if (detailError || (id && !portfolio)) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <PageHeader
          title="Detail Portofolio"
          showBackButton
        />
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-error-50 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-error-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            Gagal Memuat Detail Portofolio
          </h3>
          <p className="text-sm text-slate-500 max-w-md">
            {detailError ||
              "Data portofolio tidak tersedia. Silakan coba lagi nanti."}
          </p>
        </div>
      </motion.div>
    );
  }

  // Map warna alokasi untuk slider portfolio (konsisten dengan DashboardPages)
  const portfoliosWithColors = (dashboardData?.portfolios || []).map((p) => ({
    ...p,
    allocations: (p.allocations || []).map((alloc, idx) => ({
      ...alloc,
      color: ALLOCATION_COLORS[idx % ALLOCATION_COLORS.length],
    })),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Header dengan tombol kembali */}
      <PageHeader
        title="Portofolio"
        description={portfolio ? `Melihat isi dari dompet: ${portfolio.name}` : "Pilih dompet untuk melihat detail"}
        showBackButton={false}
      />

      {/* Section 1: Slider Daftar Portfolio (sama seperti dashboard) */}
      <div className="mb-8">
        <PortfolioSection
          portfolios={portfoliosWithColors}
          userRiskProfile={dashboardData?.user_info?.risk_profile || ""}
          onAddClick={() => setIsCreatePortoOpen(true)}
          onCardClick={(portfolioId) =>
            navigate(`/portfolio/${portfolioId}`)
          }
          activePortfolioId={id}
        />

        <CreatePortfolioModal
          isOpen={isCreatePortoOpen}
          onClose={() => setIsCreatePortoOpen(false)}
          currentBalance={
            dashboardData?.wallet_summary?.main_wallet_balance || 0
          }
          onSuccess={handleCreatePortfolio}
        />
      </div>

      {/* Section 2: Detail Portfolio Card atau Empty State */}
      {!id || !portfolio ? (
        <EmptyState
          icon={Briefcase}
          title="Pilih Dompet Investasi"
          description="Silakan pilih salah satu dompet di atas untuk melihat rincian saham, alokasi, dan performanya."
        />
      ) : (
        <PortfolioDetailCard
          portfolioName={portfolio.name}
          portfolioId={portfolio.id}
          investedBalance={portfolio.invested_balance}
          totalProfitAmount={totalProfitAmount}
          totalProfitPercentage={totalProfitPercentage}
          allocations={allocations}
          holdings={enrichedHoldings}
        />
      )}
    </motion.div>
  );
};

export default PortfolioDetailPage;
