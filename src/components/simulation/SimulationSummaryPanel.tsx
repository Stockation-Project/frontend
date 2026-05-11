// src/components/simulation/SimulationSummaryPanel.tsx
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import type { AllocationChartItem, CartItem } from "@/types/simulation";
import type { DashboardPortfolio } from "@/types/dashboard";

interface SimulationSummaryPanelProps {
  cart: CartItem[];
  selectedPortfolio: DashboardPortfolio | null;
  donutChartData: AllocationChartItem[];
  totalInvestment: number;
  remainingBalance: number;
  isBuying: boolean;
  onConfirmBuy: () => void;
}

const SimulationSummaryPanel: React.FC<SimulationSummaryPanelProps> = ({
  cart,
  selectedPortfolio,
  donutChartData,
  totalInvestment,
  remainingBalance,
  isBuying,
  onConfirmBuy,
}) => {
  const totalUnit = cart.length;
  const totalLot = cart.reduce((acc, item) => acc + item.lots, 0);
  const totalShares = totalLot * 100;
  const isBalanceSufficient = remainingBalance >= 0;

  // Recharts needs valid hex colors, but we have tailwind classes.
  // We'll map the tailwind classes back to hex for recharts.
  const colorMap: Record<string, string> = {
    "bg-[#329B0D]": "#329B0D",
    "bg-green-500": "#22c55e",
    "bg-green-300": "#86efac",
    "bg-emerald-600": "#059669",
    "bg-teal-500": "#14b8a6",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col h-[600px] shadow-sm">
      {/* Donut Chart Area */}
      <div className="h-[200px] flex items-center justify-center mb-6 relative">
        {donutChartData.length > 0 ? (
          <>
            <div className="w-[180px] h-[180px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="percentage"
                    stroke="none"
                  >
                    {donutChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colorMap[entry.color] || "#329B0D"}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Inner Circle Info */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] text-slate-400 font-bold">
                  Total
                </span>
                <span className="text-sm font-extrabold text-slate-800">
                  {donutChartData.length} Saham
                </span>
              </div>
            </div>

            {/* Legend Right */}
            <div className="ml-4 flex flex-col gap-2 overflow-y-auto max-h-[160px] no-scrollbar">
              {donutChartData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${item.color} flex-shrink-0`}
                  />
                  <span className="text-xs font-semibold text-slate-600">
                    {item.ticker} {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="w-[160px] h-[160px] rounded-full border-8 border-slate-100 flex items-center justify-center">
            <span className="text-xs text-slate-400 text-center px-4">
              Pilih saham untuk melihat alokasi
            </span>
          </div>
        )}
      </div>

      {/* Rincian Pembayaran */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-extrabold text-slate-900 mb-4 text-lg">
          Rincian Pembayaran
        </h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Total Unit Saham</span>
            <span className="font-bold text-slate-900">{totalUnit}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Total Lot</span>
            <span className="font-bold text-slate-900">
              {totalLot} Lot ({totalShares} Lembar)
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Total Investasi</span>
            <span className="font-bold text-slate-900">
              {formatCurrencyIDR(totalInvestment)}
            </span>
          </div>
          <div className="flex justify-between text-sm pt-3 border-t border-slate-200/60">
            <span className="text-slate-500 font-semibold">Sisa Saldo</span>
            <span
              className={`font-extrabold ${
                !isBalanceSufficient ? "text-red-500" : "text-slate-900"
              }`}
            >
              {selectedPortfolio
                ? formatCurrencyIDR(remainingBalance)
                : "-"}
            </span>
          </div>
        </div>

        {/* Validation Errors */}
        {!isBalanceSufficient && selectedPortfolio && (
          <p className="text-xs text-red-500 font-medium mb-3 text-center">
            Saldo tidak mencukupi untuk pembelian ini.
          </p>
        )}
        {!selectedPortfolio && (
          <p className="text-xs text-amber-500 font-medium mb-3 text-center">
            Pilih dompet terlebih dahulu di atas.
          </p>
        )}

        {/* Action Button */}
        <button
          onClick={onConfirmBuy}
          disabled={
            isBuying || cart.length === 0 || !isBalanceSufficient || !selectedPortfolio
          }
          className={`w-full py-4 mt-auto rounded-2xl font-bold text-lg transition-all shadow-md ${
            isBuying || cart.length === 0 || !isBalanceSufficient || !selectedPortfolio
              ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              : "bg-[#329B0D] hover:bg-green-800 text-white shadow-green-700/20 active:scale-[0.98]"
          }`}
        >
          {isBuying ? "Memproses..." : "Konfirmasi Beli"}
        </button>
      </div>
    </div>
  );
};

export default SimulationSummaryPanel;
