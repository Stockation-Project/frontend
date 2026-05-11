// src/pages/simulation/SimulationBuyPage.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/shared/layout/PageHeader";
import WalletSelectCard from "@/components/simulation/WalletSelectCard";
import StockSearchPanel from "@/components/simulation/StockSearchPanel";
import CartListPanel from "@/components/simulation/CartListPanel";
import SimulationSummaryPanel from "@/components/simulation/SimulationSummaryPanel";
import { useSimulationBuy } from "@/hooks/useSimulationBuy";
import { Loader2 } from "lucide-react";

const SimulationBuyPage: React.FC = () => {
  const { state, handlers } = useSimulationBuy();
  const [mainTab, setMainTab] = useState<"Rekomendasi" | "Manual">("Manual");

  if (state.isLoading) {
    return (
      <div className="w-full h-[600px] flex flex-col items-center justify-center text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin text-[#329B0D] mb-4" />
        <p className="font-semibold">Memuat data simulasi...</p>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="w-full p-10 text-center">
        <p className="text-red-500 font-bold text-xl mb-2">Terjadi Kesalahan</p>
        <p className="text-slate-500">{state.error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full p-6 md:p-10 pb-20"
    >
      <PageHeader title="" showBackButton={true} />

      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* SECTION 1: Pilih Dompet */}
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">
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
          <div className="flex border-b border-slate-200 mb-6">
            <button
              className={`flex-1 pb-4 text-center font-bold text-base transition-colors ${
                mainTab === "Rekomendasi"
                  ? "border-b-2 border-[#329B0D] text-[#329B0D]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              onClick={() => setMainTab("Rekomendasi")}
            >
              Rekomendasi
            </button>
            <button
              className={`flex-1 pb-4 text-center font-bold text-base transition-colors ${
                mainTab === "Manual"
                  ? "border-b-2 border-[#329B0D] text-[#329B0D]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              onClick={() => setMainTab("Manual")}
            >
              Manual
            </button>
          </div>

          {/* TAB CONTENT: Rekomendasi */}
          {mainTab === "Rekomendasi" && (
            <div className="py-10 text-center bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
              <h3 className="text-lg font-bold text-slate-700 mb-2">Mode Rekomendasi Cepat</h3>
              <p className="text-slate-500 max-w-lg mx-auto">
                Fitur ini akan secara otomatis membelikan komposisi saham terbaik sesuai profil risiko Anda tanpa perlu memilih manual. (Segera Hadir)
              </p>
              <button 
                className="mt-6 px-6 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
                onClick={() => setMainTab("Manual")}
              >
                Gunakan Mode Manual Saja
              </button>
            </div>
          )}

          {/* TAB CONTENT: Manual (The 3 Columns) */}
          {mainTab === "Manual" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Kolom Kiri: Search */}
              <div className="lg:col-span-3">
                <StockSearchPanel
                  searchQuery={state.searchQuery}
                  setSearchQuery={handlers.setSearchQuery}
                  recommendedStocks={state.recommendedStocks}
                  filteredStocks={state.filteredStocks}
                  onAddStock={handlers.addStockToCart}
                />
              </div>

              {/* Kolom Tengah: Cart */}
              <div className="lg:col-span-6">
                <CartListPanel
                  selectedPortfolio={state.selectedPortfolio}
                  cart={state.cart}
                  onRemove={handlers.removeStockFromCart}
                  onUpdateLot={handlers.updateStockLot}
                  onToggleExpand={handlers.toggleExpandStock}
                />
              </div>

              {/* Kolom Kanan: Summary */}
              <div className="lg:col-span-3">
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
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SimulationBuyPage;
