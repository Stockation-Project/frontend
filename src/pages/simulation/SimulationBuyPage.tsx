// src/pages/simulation/SimulationBuyPage.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/shared/layout/PageHeader";
import { 
  useSimulationBuy, 
  WalletSelectCard, 
  StockSearchPanel, 
  CartListPanel, 
  SimulationSummaryPanel 
} from "@/features/stock";
import { Loader2 } from "lucide-react";

const SimulationBuyPage: React.FC = () => {
  const { state, handlers } = useSimulationBuy();
  const [mainTab, setMainTab] = useState<"Rekomendasi" | "Manual">("Manual");

  if (state.isLoading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center text-slate-500">
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
      className="w-full"
    >
      <PageHeader title="" showBackButton={true} />

      <div className="w-full mx-auto">
        {/* SECTION 1: Pilih Dompet */}
        <div className="flex flex-col p-4 gap-2">
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
            <div className="py-10 text-center bg-background-secondary rounded-2xl border border-border-primary border-dashed">
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
            <div className="flex gap-4 items-start">
              {/* Kolom Kiri: Search */}
              <div className="w-full min-w-[300px] max-w-[30%]">
                <StockSearchPanel
                  searchQuery={state.searchQuery}
                  setSearchQuery={handlers.setSearchQuery}
                  recommendedStocks={state.recommendedStocks}
                  filteredStocks={state.filteredStocks}
                  onAddStock={handlers.addStockToCart}
                />
              </div>

              {/* Kolom Tengah: Cart */}
              <div className="w-full min-w-[300px] max-w-[40%]">
                <CartListPanel
                  selectedPortfolio={state.selectedPortfolio}
                  cart={state.cart}
                  onRemove={handlers.removeStockFromCart}
                  onUpdateLot={handlers.updateStockLot}
                  onToggleExpand={handlers.toggleExpandStock}
                />
              </div>

              {/* Kolom Kanan: Summary */}
              <div className="w-full min-w-[300px] max-w-[30%]">
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
