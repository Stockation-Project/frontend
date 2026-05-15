import React, { useState } from "react";
import GlobalWalletCard from "@/components/shared/wallet/GlobalWalletCard";
import PortfolioSidebarList from "@/features/wallet/components/PortfolioSidebarList";
import WalletDetailView from "@/features/wallet/components/WalletDetailView";
import { useWallet } from "@/features/wallet";
import { Skeleton } from "@/components/ui/skeleton";
import TopUpModal from "@/components/shared/modal/TopUpModal";
import CreatePortfolioModal from "@/components/shared/modal/CreatePortfolioModal";

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

      {/* TODO: Implement Allocate & Withdraw Modals when components are ready */}
      {isAllocateOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Alokasi Saldo</h3>
            <p className="text-slate-500 mb-6 text-sm">
              Gunakan Modal Alokasi untuk memindahkan saldo dari Dompet Utama ke Portofolio ini.
            </p>
            <button 
              onClick={() => setIsAllocateOpen(false)}
              className="w-full bg-brand text-white py-2 rounded-lg font-bold"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;
