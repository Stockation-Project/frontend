import React, { useState } from "react";
import GlobalWalletCard from "@/components/shared/wallet/GlobalWalletCard";
import PortfolioSidebarList from "@/features/wallet/components/PortfolioSidebarList";
import WalletDetailView from "@/features/wallet/components/WalletDetailView";
import { useWallet } from "@/features/wallet";
import { Skeleton } from "@/components/ui/skeleton";
import TopUpModal from "@/components/shared/modal/TopUpModal";
import CreatePortfolioModal from "@/components/shared/modal/CreatePortfolioModal";
import AllocateModal from "@/components/shared/modal/AllocateModal";

const WalletPage: React.FC = () => {
  const {
    globalWallet,
    portfolios,
    selectedPortfolioId,
    setSelectedPortfolioId,
    selectedPortfolio,
    activities,
    isLoading,
    filter,
    setFilter,
    stats,
    actions 
  } = useWallet();

  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isCreatePortoOpen, setIsCreatePortoOpen] = useState(false);
  const [isAllocateOpen, setIsAllocateOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Dompet</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Kolom Kiri - 30% */}
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Dompet Utama
            </h3>
            {isLoading ? (
              <Skeleton className="h-48 w-full rounded-xl" />
            ) : (
              <GlobalWalletCard
                balance={Number(globalWallet?.balance || 0)}
                onTopUpClick={() => setIsTopUpOpen(true)}
                onAllocateClick={() => setIsAllocateOpen(true)}
              />
            )}
          </div>

          <PortfolioSidebarList
            portfolios={portfolios}
            selectedId={selectedPortfolioId}
            onSelect={setSelectedPortfolioId}
            isLoading={isLoading}
            onCreateNew={() => setIsCreatePortoOpen(true)}
          />
        </div>

        {/* Kolom Kanan - 70% */}
        <div className="lg:col-span-8">
          <WalletDetailView
            portfolio={selectedPortfolio || null}
            activities={activities}
            stats={stats}
            filter={filter}
            onFilterChange={setFilter}
            onTopUp={() => {
              setIsAllocateOpen(true);
            }}
            onWithdraw={() => {
              setIsWithdrawOpen(true);
            }}
          />
        </div>
      </div>

      {/* Modals */}
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
    </div>
  );
};

export default WalletPage;
