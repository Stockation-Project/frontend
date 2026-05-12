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
    <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col h-[600px]">
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
          className="pl-9 bg-slate-50 border-slate-200 rounded-xl"
        />
      </div>

      {/* Mini Toggle */}
      <div className="flex justify-end mb-4">
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "Rekomendasi"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
            onClick={() => setActiveTab("Rekomendasi")}
          >
            Rekomendasi
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "Manual"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
            onClick={() => setActiveTab("Manual")}
          >
            Manual
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pr-1">
        {displayList.map((stock) => (
          <div
            key={stock.ticker}
            className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="flex-1 min-w-0 pr-3">
              <h4 className="font-bold text-slate-900 truncate">
                {stock.ticker}
              </h4>
              <p className="text-xs text-slate-500 truncate">{stock.name}</p>
            </div>
            
            <div className="text-right pr-4">
              <p className="text-sm font-bold text-slate-900">
                {formatCurrencyIDR(stock.currentPrice).replace("Rp", "Rp ")}
              </p>
              <p
                className={`text-[10px] font-bold ${
                  stock.isPositive ? "text-[#329B0D]" : "text-red-500"
                }`}
              >
                {stock.isPositive ? "▲" : "▼"} {stock.changePercent.toFixed(2)}%
              </p>
            </div>

            <button
              onClick={() => onAddStock(stock)}
              className="w-8 h-8 flex-shrink-0 flex items-center justify-center border border-[#329B0D] text-[#329B0D] rounded-lg hover:bg-green-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
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
