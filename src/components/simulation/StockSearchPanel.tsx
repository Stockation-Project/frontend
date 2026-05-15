// src/components/simulation/StockSearchPanel.tsx
import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import type { SearchStockItem } from "@/types/simulation";

interface StockSearchPanelProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  recommendedStocks: SearchStockItem[];
  filteredStocks: SearchStockItem[];
  onAddStock: (stock: SearchStockItem) => void;
}

const StockSearchPanel: React.FC<StockSearchPanelProps> = ({
  searchQuery,
  setSearchQuery,
  recommendedStocks,
  filteredStocks,
  onAddStock,
}) => {
  const [activeTab, setActiveTab] = useState<"Rekomendasi" | "Manual">("Rekomendasi");

  const displayList =
    activeTab === "Rekomendasi" && !searchQuery
      ? recommendedStocks
      : filteredStocks;

  return (
    <div className="bg-background-primary border border-border-primary rounded-lg p-2 flex flex-col h-[600px]">
      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Cari"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value && activeTab === "Rekomendasi") {
              setActiveTab("Manual"); // auto switch if typing
            }
          }}
          className="pl-9 bg-background-secondary border-border-primary rounded-lg"
        />
      </div>

      {/* Mini Toggle */}
      <div className="flex justify-end mb-4">
        <div className="bg-background-secondary p-1 rounded-xl border border-border-secondary flex overflow-x-auto no-scrollbar text-xs font-medium">
          <button
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === "Rekomendasi"
                ? "bg-background-primary text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
            onClick={() => setActiveTab("Rekomendasi")}
          >
            Rekomendasi
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "Manual"
                ? "bg-background-primary text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
            onClick={() => setActiveTab("Manual")}
          >
            Semua
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {displayList.map((stock) => (
          <div
            key={stock.ticker}
            className="flex gap-2 items-center justify-between py-3 px-2 border-b border-border-primary hover:bg-background-secondary transition-colors "
          >
            <div className="min-w-0 max-w-[160px] ">
              <h4 className="font-medium text-slate-900 truncate text-xs">
                {stock.ticker}
              </h4>
              <p className="text-[10px] text-slate-500 truncate">{stock.name}</p>
            </div>
            
            <div className="text-right flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-900">
                {formatCurrencyIDR(stock.currentPrice).replace("Rp", "Rp ")}
              </p>
              <p
                className={`text-[10px] font-regular ${
                  stock.isPositive ? "text-brand" : "text-error-500"
                }`}
              >
                {stock.isPositive ? "▲" : "▼"} {stock.changePercent.toFixed(2)}%
              </p>
            </div>

            <button
              onClick={() => onAddStock(stock)}
              className="w-6 h-6 bg-brand flex-shrink-0 flex items-center justify-center border border-brand text-white rounded-sm hover:bg-brand-800 transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        ))}

        {displayList.length === 0 && (
          <div className="text-center text-slate-500 text-sm py-10">
            Tidak ada saham ditemukan.
          </div>
        )}
      </div>
    </div>
  );
};

export default StockSearchPanel;
