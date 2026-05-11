// src/components/simulation/CartListPanel.tsx
import React from "react";
import { X, ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import type { CartItem } from "@/types/simulation";
import type { DashboardPortfolio } from "@/types/dashboard";

interface CartListPanelProps {
  selectedPortfolio: DashboardPortfolio | null;
  cart: CartItem[];
  onRemove: (ticker: string) => void;
  onUpdateLot: (ticker: string, lots: number) => void;
  onToggleExpand: (ticker: string) => void;
}

const CartListPanel: React.FC<CartListPanelProps> = ({
  selectedPortfolio,
  cart,
  onRemove,
  onUpdateLot,
  onToggleExpand,
}) => {
  return (
    <div className="bg-[#F8FDF6] border border-slate-200 rounded-2xl flex flex-col h-[600px] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200/60 bg-[#F1F8EE] flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
            DOMPET TERPILIH
          </p>
          <h3 className="font-extrabold text-slate-900">
            {selectedPortfolio ? selectedPortfolio.name : "Pilih Dompet"}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">
            {selectedPortfolio
              ? `${formatCurrencyIDR(selectedPortfolio.cash_balance)} tersedia`
              : "-"}
          </p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {cart.map((item) => (
          <div
            key={item.ticker}
            className="border-b border-slate-200/60 bg-white"
          >
            {/* Header Item */}
            <div
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => onToggleExpand(item.ticker)}
            >
              <div>
                <h4 className="font-bold text-slate-900">{item.ticker}</h4>
                <p className="text-xs text-slate-500 truncate max-w-[150px]">
                  {item.name}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-sm font-bold text-slate-900">
                  {formatCurrencyIDR(item.currentPrice)}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(item.ticker);
                    }}
                    className="w-7 h-7 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center border border-slate-200 rounded-lg text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors">
                    {item.isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Body */}
            {item.isExpanded && (
              <div className="p-4 bg-slate-50/50 border-t border-slate-100">
                {/* Mock Chart Area (kept simple for performance) */}
                <div className="w-full h-24 bg-gradient-to-t from-green-50 to-transparent border-b-2 border-[#329B0D] mb-6 rounded-t-xl opacity-50 relative">
                  <span className="absolute bottom-2 left-2 text-[10px] text-slate-400 font-medium">Chart trend</span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">
                      Harga per Lembar
                    </span>
                    <span className="font-bold text-slate-900">
                      {formatCurrencyIDR(item.currentPrice)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Jumlah Lot</span>
                    <div className="flex items-center border border-slate-200 rounded-xl bg-white overflow-hidden">
                      <button
                        onClick={() => onUpdateLot(item.ticker, item.lots - 1)}
                        className="px-3 py-2 text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.lots}
                        onChange={(e) =>
                          onUpdateLot(
                            item.ticker,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-12 text-center text-sm font-bold border-x border-slate-200 py-2 outline-none appearance-none"
                      />
                      <button
                        onClick={() => onUpdateLot(item.ticker, item.lots + 1)}
                        className="px-3 py-2 text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
                    <span className="text-sm text-slate-500">Nilai posisi</span>
                    <span className="font-extrabold text-slate-900">
                      {formatCurrencyIDR(item.currentPrice * item.lots * 100)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {cart.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">Keranjang masih kosong</p>
            <p className="text-sm text-slate-400 mt-1">
              Tambahkan saham dari panel pencarian di sebelah kiri
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartListPanel;
