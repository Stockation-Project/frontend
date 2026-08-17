// src/pages/simulation/SimulationBuyPage.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/shared/layout/PageHeader";
import {
  useSimulationBuy,
  WalletSelectCard,
  StockSearchPanel,
  CartListPanel,
  SimulationSummaryPanel,
  RiskToleranceSlider,
} from "@/features/stock";
import { Loader2, Sparkles } from "lucide-react";
import SimulationBuySkeleton from "@/features/stock/components/SimulationBuySkeleton";
import CreatePortfolioModal from "@/components/shared/modal/CreatePortfolioModal";
import { useWallet } from "@/features/wallet";

import { usePageTour, ProductTour } from "@/features/product-tour";
import { SIMULATION_TOUR_STEPS } from "@/features/product-tour/steps";
import { useAuth } from "@/features/auth";

const SimulationBuyPage: React.FC = () => {
  const { user } = useAuth();
  const { state, handlers } = useSimulationBuy();
  const [mainTab, setMainTab] = useState<"Rekomendasi" | "Manual">("Manual");
  const [isCreatePortoOpen, setIsCreatePortoOpen] = useState(false);

  const { actions, globalWallet } = useWallet({
    onSuccess: () => handlers.refreshPortfolios?.(),
  });

  const {
    isActive,
    currentStep,
    nextStep,
    endTour,
    startTour,  } = usePageTour({
    steps: SIMULATION_TOUR_STEPS,
    storageKey: "stockation_tour_simulation",
    autoStart: true,
    userId: user?.id,
  });

  if (state.isLoading) {
    return (
      <SimulationBuySkeleton />
    );
  }

  if (state.error) {
    return (
      <div className="w-full p-10 text-center">
        <p className="text-error-500 font-bold text-xl mb-2">Terjadi Kesalahan</p>
        <p className="text-slate-500">{state.error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full h-full flex flex-col overflow-hidden"
    >
      <PageHeader 
        title="" 
        showBackButton={true} 
        showTutorialButton={true}
        onTutorialClick={startTour}
      />

      <div className="w-full mx-auto flex-1 overflow-y-auto p-4 pb-6 no-scrollbar">
        {/* SECTION 1: Pilih Dompet */}
        <div className="flex flex-col py-2 gap-2" data-tour="simulation-wallet-select">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide">
            Pilih dompet
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {state.portfolios.map((portfolio) => (
              <WalletSelectCard
                key={portfolio.id}
                name={portfolio.name}
                cashBalance={portfolio.cash_balance}
                isSelected={state.selectedPortfolioId === portfolio.id}
                onClick={() => handlers.handleSelectPortfolio(portfolio.id)}
              />
            ))}
            {/* Add new wallet placeholder */}
            <WalletSelectCard
              name="Tambah"
              cashBalance={0}
              isSelected={false}
              isAddCard={true}
              onClick={() => setIsCreatePortoOpen(true)}
            />
          </div>
        </div>

        {/* SECTION 2: Tabs Rekomendasi / Manual */}
        <div>
          <div className="flex border-b border-border-primary mb-4">
            <button
              className={`flex-1 py-2 text-center font-medium text-sm transition-colors ${
                mainTab === "Rekomendasi"
                  ? "border-b-2 border-brand text-brand"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              onClick={() => setMainTab("Rekomendasi")}
            >
              Rekomendasi
            </button>
            <button
              className={`flex-1 py-2 text-center font-medium text-sm transition-colors ${
                mainTab === "Manual"
                  ? "border-b-2 border-brand text-brand"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              onClick={() => setMainTab("Manual")}
            >
              Manual
            </button>
          </div>

          {/* TAB CONTENT: Rekomendasi */}
          {mainTab === "Rekomendasi" && (
            <div className="grid grid-cols-1 xl:grid-cols-10 gap-6 items-start animate-fade-in">
              <div className="xl:col-span-3 w-full flex flex-col gap-4 xl:h-[650px]">
                {/* Banner Informasi Mode Alokasi Otomatis */}
                <div className="p-4 bg-gradient-to-b from-brand-100 to-brand/5 border border-brand-200 rounded-xl shadow-sm flex flex-col gap-2">
                  <h4 className="text-xs font-medium text-brand flex items-center gap-1.5 animate-pulse">
                   <Sparkles className="w-3.5 h-3.5 text-brand animate-pulse" />
                    Mode Alokasi Otomatis Aktif
                  </h4>
                  <p className="text-[10px] font-regular text-text-secondary leading-relaxed text-justify">
                    Sistem sedang mengoptimalkan portofoliomu secara otomatis berdasarkan profil risikomu. Untuk menjaga akurasi strategi sistem, jumlah lot tidak dapat diubah manual di mode ini. Kamu tetap bisa menghapus atau mengurangi jenis saham terpilih.
                  </p>
                </div>

                <div className="w-full flex-1 min-h-0 overflow-hidden [&>div]:!h-[320px] xl:[&>div]:!h-full" data-tour="simulation-stock-search">
                  <StockSearchPanel
                    searchQuery={state.searchQuery}
                    setSearchQuery={handlers.setSearchQuery}
                    recommendedStocks={state.recommendedStocks}
                    filteredStocks={state.filteredStocks}
                    onAddStock={handlers.addStockToCart}
                  />
                </div>
              </div>

              <div className="xl:col-span-4 w-full flex flex-col gap-4 xl:h-[685px]">
                {state.cart.length >= 2 && (
                  <RiskToleranceSlider
                    value={state.riskTolerance}
                    defaultValue={state.defaultRiskTolerance}
                    isCustomized={state.isToleranceCustomized}
                    onChange={handlers.handleChangeRiskTolerance}
                    onReset={handlers.handleResetRiskTolerance}
                    disabled={state.isOptimizing}
                  />
                )}
                {state.cart.length >= 2 && (
                  <div className="grid grid-cols-1 gap-3 p-4 bg-background-primary border border-border-primary rounded-xl shadow-sm [&>label:first-child]:hidden">
                    <label className="flex flex-col gap-1.5 text-xs font-medium text-text-primary">
                      Strategi optimasi
                      <select value={state.optimizationMethod} disabled className="w-full rounded-lg border border-border-primary bg-white px-3 py-2 text-xs font-normal text-text-primary disabled:opacity-50">
                        <option value="mean_cvar">Mean-CVaR — seimbangkan return & risiko ekstrem</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-1.5 text-xs font-medium text-text-primary">
                      Periode data historis
                      <select value={state.optimizationPeriod} onChange={(event) => handlers.setOptimizationPeriod(event.target.value)} disabled={state.isOptimizing} className="w-full rounded-lg border border-border-primary bg-white px-3 py-2 text-xs font-normal text-text-primary disabled:opacity-50">
                        <option value="3_bulan">3 bulan</option><option value="6_bulan">6 bulan</option><option value="1_tahun">1 tahun</option><option value="3_tahun">3 tahun</option><option value="5_tahun">5 tahun</option><option value="10_tahun">10 tahun</option>
                      </select>
                    </label>
                    <p className="text-[10px] leading-relaxed text-text-secondary">Ubah periode dan toleransi risiko untuk membandingkan hasil Mean-CVaR. Tidak ada bobot minimum; saham yang tidak menerima alokasi cukup untuk satu lot tidak akan ikut dibeli.</p>
                  </div>
                )}
                {state.cart.length >= 2 && (
                  <button
                    onClick={handlers.handleAutoAllocation}
                    disabled={state.isOptimizing}
                    className={`w-full py-3 rounded-xl font-medium text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
                      state.isOptimizing
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                        : "bg-brand hover:bg-brand-950 text-white shadow-brand/20 active:scale-[0.98] cursor-pointer"
                    }`}
                  >
                    {state.isOptimizing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Mengoptimasi Portofolio...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-background-primary" />
                        Alokasi Otomatis (Optimisasi AI)
                      </>
                    )}
                  </button>
                )}

                <div className="w-full flex-1 min-h-0 overflow-hidden [&>div]:!h-auto xl:[&>div]:!h-full" data-tour="simulation-cart">
                  <CartListPanel
                    selectedPortfolio={state.selectedPortfolio}
                    cart={state.cart}
                    onRemove={handlers.removeStockFromCart}
                    onUpdateLot={handlers.updateStockLot}
                    onToggleExpand={handlers.toggleExpandStock}
                    isReadOnlyLots={true}
                    cartItemDataTour="simulation-cart-item"
                  />
                </div>
              </div>

              <div className="xl:col-span-3 w-full flex flex-col gap-4 xl:h-[685px]">
                <div className="w-full flex-1 min-h-0 overflow-hidden [&>div]:!h-auto xl:[&>div]:!h-full" data-tour="simulation-summary">
                  <SimulationSummaryPanel
                    cart={state.cart}
                    selectedPortfolio={state.selectedPortfolio}
                    donutChartData={state.donutChartData}
                    totalInvestment={state.totalInvestment}
                    remainingBalance={state.remainingBalance}
                    isBuying={state.isBuying}
                    onConfirmBuy={() => handlers.handleConfirmBuy()}
                    optimizationMetrics={state.optimizationMetrics}
                    confirmDataTour="simulation-confirm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: Manual */}
          {mainTab === "Manual" && (
            <div className="grid grid-cols-1 xl:grid-cols-10 gap-6 items-start">
              <div className="xl:col-span-3 w-full flex flex-col gap-4 xl:h-[685px]">
                <div className="w-full flex-1 min-h-0 overflow-hidden [&>div]:!h-[320px] xl:[&>div]:!h-full" data-tour="simulation-stock-search">
                  <StockSearchPanel
                    searchQuery={state.searchQuery}
                    setSearchQuery={handlers.setSearchQuery}
                    recommendedStocks={state.recommendedStocks}
                    filteredStocks={state.filteredStocks}
                    onAddStock={handlers.addStockToCart}
                  />
                </div>
              </div>

              <div className="xl:col-span-4 w-full flex flex-col gap-4 xl:h-[685px]">
                {state.cart.length >= 2 && (
                  <div className="p-3 bg-background-primary border border-border-primary rounded-xl shadow-sm">
                    <label className="flex flex-col gap-1.5 text-xs font-medium text-text-primary">
                      Periode analisis historis
                      <select
                        value={state.optimizationPeriod}
                        onChange={(event) => handlers.setOptimizationPeriod(event.target.value)}
                        disabled={state.isOptimizing}
                        className="w-full rounded-lg border border-border-primary bg-white px-3 py-2 text-xs font-normal"
                      >
                        <option value="3_bulan">3 bulan</option><option value="6_bulan">6 bulan</option>
                        <option value="1_tahun">1 tahun</option><option value="3_tahun">3 tahun</option>
                        <option value="5_tahun">5 tahun</option><option value="10_tahun">10 tahun</option>
                      </select>
                    </label>
                    <button
                      onClick={handlers.handleManualRiskAnalysis}
                      disabled={state.isOptimizing}
                      className="w-full mt-3 py-2.5 rounded-lg bg-brand text-white text-xs font-medium flex items-center justify-center gap-2 disabled:bg-slate-200 disabled:text-slate-400"
                    >
                      {state.isOptimizing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                      {state.isOptimizing ? "Menganalisis..." : "Analisis Risiko Jatuh Bersama"}
                    </button>
                    <p className="mt-2 text-[9px] text-text-secondary">Analisis tidak mengubah saham maupun jumlah lot manual.</p>
                  </div>
                )}
                <div className="w-full flex-1 min-h-0 overflow-hidden [&>div]:!h-auto xl:[&>div]:!h-full" data-tour="simulation-cart">
                  <CartListPanel
                    selectedPortfolio={state.selectedPortfolio}
                    cart={state.cart}
                    onRemove={handlers.removeStockFromCart}
                    onUpdateLot={handlers.updateStockLot}
                    onToggleExpand={handlers.toggleExpandStock}
                    cartItemDataTour="simulation-cart-item"
                  />
                </div>
              </div>

              <div className="xl:col-span-3 w-full flex flex-col gap-4 xl:h-[685px]">
                <div className="w-full flex-1 min-h-0 overflow-hidden [&>div]:!h-auto xl:[&>div]:!h-full" data-tour="simulation-summary">
                  <SimulationSummaryPanel
                    cart={state.cart}
                    selectedPortfolio={state.selectedPortfolio}
                    donutChartData={state.donutChartData}
                    totalInvestment={state.totalInvestment}
                    remainingBalance={state.remainingBalance}
                    isBuying={state.isBuying}
                    onConfirmBuy={() => handlers.handleConfirmBuy(() => {
                    })}
                    optimizationMetrics={null}
                    pairwiseDownside={state.manualPairwiseDownside}
                    confirmDataTour="simulation-confirm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <CreatePortfolioModal
        isOpen={isCreatePortoOpen}
        onClose={() => setIsCreatePortoOpen(false)}
        currentBalance={Number(globalWallet?.balance || 0)}
        onSuccess={async (name, amount) => {
          await actions.handleCreatePortfolio(name, amount);
          await handlers.refreshPortfolios();
          setIsCreatePortoOpen(false);
        }}
      />

      <ProductTour
        isActive={isActive}
        currentStep={currentStep}
        steps={SIMULATION_TOUR_STEPS}
        onNext={nextStep}
        onEnd={endTour}
      />
    </motion.div>
  );
};

export default SimulationBuyPage;
