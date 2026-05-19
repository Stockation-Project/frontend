// src/components/simulation/SimulationSummaryPanel.tsx
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import type { AllocationChartItem, CartItem } from "../types/simulation";
import type { DashboardPortfolio } from "@/features/dashboard";

import type { OptimizationMetrics } from "../hooks/useSimulationBuy";
import { Sparkles } from "lucide-react";

interface SimulationSummaryPanelProps {
  cart: CartItem[];
  selectedPortfolio: DashboardPortfolio | null;
  donutChartData: AllocationChartItem[];
  totalInvestment: number;
  remainingBalance: number;
  isBuying: boolean;
  onConfirmBuy: () => void;
  optimizationMetrics?: OptimizationMetrics | null;
}

const SimulationSummaryPanel: React.FC<SimulationSummaryPanelProps> = ({
  cart,
  selectedPortfolio,
  donutChartData,
  totalInvestment,
  remainingBalance,
  isBuying,
  onConfirmBuy,
  optimizationMetrics = null,
}) => {
  const totalUnit = cart.length;
  const totalLot = cart.reduce((acc, item) => acc + item.lots, 0);
  const totalShares = totalLot * 100;
  const isBalanceSufficient = remainingBalance >= 0;

  // Recharts needs valid hex colors, but we have tailwind classes.
  // We'll map the tailwind classes back to hex for recharts.
  const colorMap: Record<string, string> = {
    "bg-brand": "var(--color-brand)",
    "bg-brand-500": "var(--color-brand-500)",
    "bg-green-300": "#86efac",
    "bg-emerald-600": "#059669",
    "bg-teal-500": "#14b8a6",
  };

  return (
    <div className="bg-background-primary border border-border-primary rounded-lg p-3 flex flex-col h-[600px]">
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
                    innerRadius={70}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="percentage"
                    stroke="none"
                  >
                    {donutChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colorMap[entry.color] || "var(--color-brand)"}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Inner Circle Info */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] text-slate-400 font-medium">
                  Total
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {donutChartData.length} Saham
                </span>
              </div>
            </div>

            {/* Legend Right */}
            <div className="ml-4 flex flex-col gap-2 overflow-y-auto max-h-[160px] no-scrollbar">
              {donutChartData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`}
                  />
                  <span className="text-[10px] font-medium text-slate-600">
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
        <h3 className="font-medium text-slate-900 mb-4 text-sm">
          Rincian Pembayaran
        </h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Total Unit Saham</span>
            <span className="font-medium text-slate-900">{totalUnit}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Total Lot</span>
            <span className="font-medium text-slate-900">
              {totalLot} Lot ({totalShares} Lembar)
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Total Investasi</span>
            <span className="font-medium text-slate-900">
              {formatCurrencyIDR(totalInvestment)}
            </span>
          </div>
          <div className="flex justify-between text-xs pt-3 border-t border-slate-200/60">
            <span className="text-slate-700 font-medium">Sisa Saldo</span>
            <span
              className={`font-medium ${
                !isBalanceSufficient ? "text-error-500" : "text-slate-900"
              }`}
            >
              {selectedPortfolio
                ? formatCurrencyIDR(remainingBalance)
                : "-"}
            </span>
          </div>
        </div>

        {/* Explainable AI (XAI) Panel for Laypeople */}
        {optimizationMetrics && (
          <div className="mt-2 mb-4 p-3 bg-gradient-to-b from-brand-100 to-brand-50 border border-brand-200 rounded-xl flex flex-col gap-2.5 animate-fade-in shadow-sm">
            {/* Header Widget */}
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-brand" />
              <span className="text-xs text-brand font-medium">Penjelasan Alokasi AI</span>
            </div>

            {/* Narasi Alasan Penentuan Bobot */}
            <p className="text-[10px] text-text-secondary font-regular leading-relaxed text-justify">
              {optimizationMetrics.method === "min_volatility" && (
                "Karena kamu bertipe Konservatif (sangat hati-hati), AI menyusun alokasi ini dengan metode Keamanan Utama (Minimasi Volatilitas). Ini bertujuan agar nilainya stabil dan terhindar dari naik-turun harga yang ekstrem."
              )}
              {optimizationMetrics.method === "max_sharpe" && (
                "Karena kamu bertipe Moderat (sedang), AI menyusun alokasi ini dengan metode Keseimbangan Optimal (Max Sharpe Ratio). AI menyeimbangkan antara potensi profit terbaik dan tingkat risiko yang wajar."
              )}
              {optimizationMetrics.method === "max_return" && (
                "Karena kamu bertipe Agresif (pemberani), AI menyusun alokasi ini dengan metode Profit Maksimal (Maksimalkan Return). AI fokus mengejar keuntungan tertinggi sesuai dengan batas keberanian risikomu."
              )}
            </p>

            {/* Metrik Kuantitatif AI Sederhana */}
            <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-brand-100/60">
              <div className="flex flex-col items-center p-1.5 bg-white/80 rounded-lg border border-brand-100/40">
                <span className="text-[8px] text-slate-400 font-medium mb-0.5">Potensi Profit</span>
                <span className="text-[10px] font-medium text-brand">
                  +{(optimizationMetrics.expectedReturn * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex flex-col items-center p-1.5 bg-white/80 rounded-lg border border-brand-100/40">
                <span className="text-[8px] text-slate-400 font-medium mb-0.5">Tingkat Risiko</span>
                <span className="text-[10px] font-medium text-text-secondary">
                  {(optimizationMetrics.volatility * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex flex-col items-center p-1.5 bg-white/80 rounded-lg border border-brand-100/40">
                <span className="text-[8px] text-slate-400 font-medium mb-0.5">Skor Kinerja AI</span>
                <span className={`text-[10px] font-medium ${
                  optimizationMetrics.sharpeRatio > 1.0 ? "text-brand" : "text-brand-800"
                }`}>
                  {optimizationMetrics.sharpeRatio > 1.0 ? "Sangat Sehat" : "Cukup Optimal"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Validation Errors */}
        {!isBalanceSufficient && selectedPortfolio && (
          <p className="text-xs text-error-500 font-regular mb-3 text-start">
            Saldo tidak mencukupi untuk pembelian ini.
          </p>
        )}
        {!selectedPortfolio && (
          <p className="text-xs text-warning-500 font-medium mb-3 text-center">
            Pilih dompet terlebih dahulu di atas.
          </p>
        )}

        {/* Action Button */}
        <button
          onClick={onConfirmBuy}
          disabled={
            isBuying || cart.length === 0 || !isBalanceSufficient || !selectedPortfolio
          }
          className={`w-full py-3 mt-auto rounded-xl font-medium text-sm transition-all shadow-md ${
            isBuying || cart.length === 0 || !isBalanceSufficient || !selectedPortfolio
              ? "bg-border-primary text-slate-400 cursor-not-allowed shadow-none"
              : "bg-brand hover:bg-brand-800 active:bg-brand-900 text-white shadow-brand/20 active:scale-[0.98]"
          }`}
        >
          {isBuying ? "Memproses..." : "Konfirmasi Beli"}
        </button>
      </div>
    </div>
  );
};

export default SimulationSummaryPanel;
