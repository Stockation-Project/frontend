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
} from "@/features/stock";
import { Loader2 } from "lucide-react";

const SimulationBuyPage: React.FC = () => {
  const { state, handlers } = useSimulationBuy();
  const [mainTab, setMainTab] = useState<"Rekomendasi" | "Manual">("Manual");

  if (state.isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin text-brand mb-4" />
        <p className="font-medium">Memuat data simulasi...</p>
      </div>
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
      <PageHeader title="" showBackButton={true} />

      <div className="w-full mx-auto flex-1 overflow-y-auto p-4 pb-6 no-scrollbar">
        {/* SECTION 1: Pilih Dompet */}
        <div className="flex flex-col py-2 gap-2">
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
              onClick={() => {
                // In future: Open CreatePortfolioModal
                // For now, no-op or toast
              }}
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
              {/* Kolom Kiri: Search & Banner Info */}
              <div className="xl:col-span-3 w-full flex flex-col gap-4 xl:h-[650px]">
                {/* Banner Informasi Mode Alokasi Otomatis */}
                <div className="p-4 bg-gradient-to-b from-brand-100 to-brand/5 border border-brand-200 rounded-xl shadow-sm flex flex-col gap-2">
                  <h4 className="text-xs font-medium text-brand-900 flex items-center gap-1.5">
                    ✨ Mode Alokasi Otomatis Aktif
                  </h4>
                  <p className="text-[10px] font-regular text-brand leading-relaxed text-justify">
                    Sistem sedang mengoptimalkan portofoliomu secara otomatis berdasarkan profil risikomu. Untuk menjaga akurasi strategi sistem, jumlah lot tidak dapat diubah manual di mode ini. Kamu tetap bisa menghapus atau mengurangi jenis saham terpilih.
                  </p>
                </div>

                {/* Tinggi dibatasi 320px (4-5 baris saham) di HP/tablet, dan mengisi penuh sisa kolom di desktop */}
                <div className="w-full flex-1 min-h-0 overflow-hidden [&>div]:!h-[320px] xl:[&>div]:!h-full">
                  <StockSearchPanel
                    searchQuery={state.searchQuery}
                    setSearchQuery={handlers.setSearchQuery}
                    recommendedStocks={state.recommendedStocks}
                    filteredStocks={state.filteredStocks}
                    onAddStock={handlers.addStockToCart}
                  />
                </div>
              </div>

              {/* Kolom Tengah: Cart & Tombol Trigger AI */}
              <div className="xl:col-span-4 w-full flex flex-col gap-4 xl:h-[650px]">
                {state.cart.length >= 2 && (
                  <button
                    onClick={handlers.handleAutoAllocation}
                    disabled={state.isOptimizing}
                    className={`w-full py-3 rounded-xl font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
                      state.isOptimizing
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                        : "bg-brand hover:bg-brand-800 text-white shadow-brand/20 active:scale-[0.98] cursor-pointer"
                    }`}
                  >
                    {state.isOptimizing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Mengoptimasi Portofolio...
                      </>
                    ) : (
                      <>
                        <span>🤖</span> Alokasi Otomatis (Optimisasi AI)
                      </>
                    )}
                  </button>
                )}

                {/* Hug-content (auto) di HP/tablet, dan mengisi penuh sisa kolom di desktop */}
                <div className="w-full flex-1 min-h-0 overflow-hidden [&>div]:!h-auto xl:[&>div]:!h-full">
                  <CartListPanel
                    selectedPortfolio={state.selectedPortfolio}
                    cart={state.cart}
                    onRemove={handlers.removeStockFromCart}
                    onUpdateLot={handlers.updateStockLot}
                    onToggleExpand={handlers.toggleExpandStock}
                    isReadOnlyLots={true} // Kunci input lot manual
                  />
                </div>
              </div>

              {/* Kolom Kanan: Summary */}
              <div className="xl:col-span-3 w-full flex flex-col gap-4 xl:h-[650px]">
                {/* Hug-content (auto) di HP/tablet, dan mengisi penuh sisa kolom di desktop */}
                <div className="w-full flex-1 min-h-0 overflow-hidden [&>div]:!h-auto xl:[&>div]:!h-full">
                  <SimulationSummaryPanel
                    cart={state.cart}
                    selectedPortfolio={state.selectedPortfolio}
                    donutChartData={state.donutChartData}
                    totalInvestment={state.totalInvestment}
                    remainingBalance={state.remainingBalance}
                    isBuying={state.isBuying}
                    onConfirmBuy={() => handlers.handleConfirmBuy()}
                    optimizationMetrics={state.optimizationMetrics}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: Manual (The 3 Columns) */}
          {mainTab === "Manual" && (
            <div className="grid grid-cols-1 xl:grid-cols-10 gap-6 items-start">
              {/* Kolom Kiri: Search */}
              <div className="xl:col-span-3 w-full flex flex-col gap-4 xl:h-[650px]">
                {/* Tinggi dibatasi 320px (4-5 baris saham) di HP/tablet, dan mengisi penuh sisa kolom di desktop */}
                <div className="w-full flex-1 min-h-0 overflow-hidden [&>div]:!h-[320px] xl:[&>div]:!h-full">
                  <StockSearchPanel
                    searchQuery={state.searchQuery}
                    setSearchQuery={handlers.setSearchQuery}
                    recommendedStocks={state.recommendedStocks}
                    filteredStocks={state.filteredStocks}
                    onAddStock={handlers.addStockToCart}
                  />
                </div>
              </div>

              {/* Kolom Tengah: Cart */}
              <div className="xl:col-span-4 w-full flex flex-col gap-4 xl:h-[650px]">
                {/* Hug-content (auto) di HP/tablet, dan mengisi penuh sisa kolom di desktop */}
                <div className="w-full flex-1 min-h-0 overflow-hidden [&>div]:!h-auto xl:[&>div]:!h-full">
                  <CartListPanel
                    selectedPortfolio={state.selectedPortfolio}
                    cart={state.cart}
                    onRemove={handlers.removeStockFromCart}
                    onUpdateLot={handlers.updateStockLot}
                    onToggleExpand={handlers.toggleExpandStock}
                  />
                </div>
              </div>

              {/* Kolom Kanan: Summary */}
              <div className="xl:col-span-3 w-full flex flex-col gap-4 xl:h-[650px]">
                {/* Hug-content (auto) di HP/tablet, dan mengisi penuh sisa kolom di desktop */}
                <div className="w-full flex-1 min-h-0 overflow-hidden [&>div]:!h-auto xl:[&>div]:!h-full">
                  <SimulationSummaryPanel
                    cart={state.cart}
                    selectedPortfolio={state.selectedPortfolio}
                    donutChartData={state.donutChartData}
                    totalInvestment={state.totalInvestment}
                    remainingBalance={state.remainingBalance}
                    isBuying={state.isBuying}
                    onConfirmBuy={() => handlers.handleConfirmBuy(() => {
                      // Optional callback on success, e.g. navigate back to portfolio detail
                    })}
                    optimizationMetrics={state.optimizationMetrics}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SimulationBuyPage;
