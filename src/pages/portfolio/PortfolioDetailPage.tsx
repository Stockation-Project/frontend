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
import { usePageTour, ProductTour } from "@/features/product-tour";
import {
  PORTFOLIO_TOUR_STEPS,
  PORTFOLIO_DETAIL_TOUR_STEPS,
} from "@/features/product-tour/steps";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth";

const ALLOCATION_COLORS = [
  "bg-brand",
  "bg-brand-500",
  "bg-brand-300",
  "bg-brand-600",
  "bg-brand-400",
];

const PortfolioDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    portfolio,
    enrichedHoldings,
    allocations,
    totalProfitAmount,
    totalProfitPercentage,
    isLoading: isDetailLoading,
    error: detailError,
  } = usePortfolioDetail(id);

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

  // Product Tour — pilih steps sesuai mode halaman
  const isListView = !id;
  const tourSteps = isListView ? PORTFOLIO_TOUR_STEPS : PORTFOLIO_DETAIL_TOUR_STEPS;
  const storageKey = isListView ? "stockation_tour_portfolio" : "stockation_tour_portfolio_detail";

  const {
    isActive,
    currentStep,
    nextStep,
    endTour,

  } = usePageTour({
    steps: tourSteps,
    storageKey,
    autoStart: true,
    userId: user?.id,
  });

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
          <h3 className="text-lg font-bold text-text-primary mb-2">
            Gagal Memuat Detail Portofolio
          </h3>
          <p className="text-sm text-text-muted max-w-md">
            {detailError ||
              "Data portofolio tidak tersedia. Silakan coba lagi nanti."}
          </p>
        </div>
      </motion.div>
    );
  }

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
      className="w-full h-full flex flex-col overflow-hidden"
    >
      {/* Header */}
      <PageHeader
        title="Portofolio"
        description={portfolio ? `Melihat isi dari dompet: ${portfolio.name}` : "Pilih dompet untuk melihat detail"}
        showBackButton={false}
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-6 space-y-8 no-scrollbar">
        {/* Card Section — data-tour untuk list view */}
        <div data-tour="portfolio-card-list">
          <PortfolioSection
            portfolios={portfoliosWithColors}
            userRiskProfile={dashboardData?.user_info?.risk_profile || ""}
            onAddClick={() => setIsCreatePortoOpen(true)}
            onCardClick={(portfolioId) =>
              navigate(`/portfolio/${portfolioId}`)
            }
            activePortfolioId={id}
            createButtonDataTour="portfolio-create-btn"
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

        {/* Detail Portfolio */}
        {!id || !portfolio ? (
          <div data-tour="portfolio-summary">
            <EmptyState
              icon={Briefcase}
              title="Pilih Dompet Investasi"
              description="Silakan pilih salah satu dompet di atas untuk melihat rincian saham, alokasi, dan performanya."
            />
          </div>
        ) : (
          <div data-tour="portfolio-detail-info">
            <PortfolioDetailCard
              portfolioName={portfolio.name}
              portfolioId={portfolio.id}
              investedBalance={portfolio.invested_balance}
              totalProfitAmount={totalProfitAmount}
              totalProfitPercentage={totalProfitPercentage}
              allocations={allocations}
              holdings={enrichedHoldings}
              actionDataTour="portfolio-detail-actions"
            />
          </div>
        )}
      </div>

      {/* Product Tour */}
      <ProductTour
        isActive={isActive}
        currentStep={currentStep}
        steps={tourSteps}
        onNext={nextStep}
        onEnd={endTour}
      />
    </motion.div>
  );
};

export default PortfolioDetailPage;
