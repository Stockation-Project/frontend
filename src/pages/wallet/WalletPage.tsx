import React, { useState } from "react";
import GlobalWalletCard from "@/components/shared/wallet/GlobalWalletCard";
import PortfolioSidebarList from "@/features/wallet/components/PortfolioSidebarList";
import WalletDetailView from "@/features/wallet/components/WalletDetailView";
import { useWallet } from "@/features/wallet";
import { Skeleton } from "@/components/ui/skeleton";
import TopUpModal from "@/components/shared/modal/TopUpModal";
import CreatePortfolioModal from "@/components/shared/modal/CreatePortfolioModal";
import AllocateModal from "@/components/shared/modal/AllocateModal";
import WithdrawModal from "@/components/shared/modal/WithdrawModal";
import PageHeader from "@/components/shared/layout/PageHeader";
import { usePageTour, ProductTour } from "@/features/product-tour";
import { WALLET_TOUR_STEPS } from "@/features/product-tour/steps";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useAuth } from "@/features/auth";

const WalletPage: React.FC = () => {
  const { user } = useAuth();
  const { globalWallet,
    portfolios,
    selectedPortfolioId,
    setSelectedPortfolioId,
    selectedPortfolio,
    activities,
    isLoading,
    isLoadingHistory,
    filter,
    setFilter,
    stats,
    actions 
  } = useWallet();

  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isCreatePortoOpen, setIsCreatePortoOpen] = useState(false);
  const [isAllocateOpen, setIsAllocateOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const {
    isActive,
    currentStep,
    nextStep,
    endTour,
    startTour,  } = usePageTour({
    steps: WALLET_TOUR_STEPS,
    storageKey: "stockation_tour_wallet",
    autoStart: true,
    userId: user?.id,
  });

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <PageHeader 
        title="Dompet"
        description="Kelola aset digital dan portofolio Anda"
        showTutorialButton={true}
        onTutorialClick={startTour}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 overflow-y-auto p-4 pb-6 no-scrollbar">
        <div className="lg:col-span-4 space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-text-muted">
              Dompet Utama
            </h3>
            {isLoading ? (
              <Skeleton className="h-48 w-full rounded-xl" />
            ) : (
              <div data-tour="wallet-balance">
                <GlobalWalletCard
                  balance={Number(globalWallet?.balance || 0)}
                  onTopUpClick={() => setIsTopUpOpen(true)}
                  onAllocateClick={() => setIsAllocateOpen(true)}
                  topUpDataTour="wallet-topup"
                />
              </div>
            )}
          </div>

          <div data-tour="wallet-portfolio-list">
            <PortfolioSidebarList
              portfolios={portfolios}
              selectedId={selectedPortfolioId}
              onSelect={setSelectedPortfolioId}
              isLoading={isLoading}
              onCreateNew={() => setIsCreatePortoOpen(true)}
            />
          </div>
        </div>
       <div className="lg:col-span-8">
          <div data-tour="wallet-activities">
            <WalletDetailView
              portfolio={selectedPortfolio || null}
              activities={activities}
              stats={stats}
              filter={filter}
              onFilterChange={setFilter}
              isLoading={isLoading}
              isLoadingHistory={isLoadingHistory}
              onTopUp={() => {
                setIsAllocateOpen(true);
              }}
              onWithdraw={() => {
                setIsWithdrawOpen(true);
              }}
            />
          </div>
        </div>
      </div>

      <TopUpModal
        isOpen={isTopUpOpen}
        onClose={() => setIsTopUpOpen(false)}
        currentBalance={Number(globalWallet?.balance || 0)}
        onSuccess={actions.handleTopUp}
      />

      <CreatePortfolioModal
        isOpen={isCreatePortoOpen}
        onClose={() => setIsCreatePortoOpen(false)}
        currentBalance={Number(globalWallet?.balance || 0)}
        onSuccess={actions.handleCreatePortfolio}
      />

      <AllocateModal
        isOpen={isAllocateOpen}
        onClose={() => setIsAllocateOpen(false)}
        currentBalance={Number(globalWallet?.balance || 0)}
        portfolios={portfolios}
        onSuccess={actions.handleAllocate}
        initialPortfolioId={selectedPortfolioId}
      />

      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        portfolio={selectedPortfolio || null}
        onSuccess={actions.handleWithdraw}
      />

      <ProductTour
        isActive={isActive}
        currentStep={currentStep}
        steps={WALLET_TOUR_STEPS}
        onNext={nextStep}
        onEnd={endTour}
      />
    </div>
  );
};

export default WalletPage;
