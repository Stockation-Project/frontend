// src/components/simulation/SimulationSummaryPanel.tsx
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import type { AllocationChartItem, CartItem } from "../types/simulation";
import type { DashboardPortfolio } from "@/features/dashboard";

import type { OptimizationMetrics, PairwiseDownsideRisk } from "../hooks/useSimulationBuy";
import { Sparkles, BrainCircuit, Info } from "lucide-react";

interface SimulationSummaryPanelProps {
  cart: CartItem[];
  selectedPortfolio: DashboardPortfolio | null;
  donutChartData: AllocationChartItem[];
  totalInvestment: number;
  remainingBalance: number;
  isBuying: boolean;
  onConfirmBuy: () => void;
  optimizationMetrics?: OptimizationMetrics | null;
  pairwiseDownside?: PairwiseDownsideRisk[];
  confirmDataTour?: string;
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
  pairwiseDownside = [],
  confirmDataTour,
}) => {
  const totalUnit = cart.length;
  const totalLot = cart.reduce((acc, item) => acc + item.lots, 0);
  const totalShares = totalLot * 100;
  const isBalanceSufficient = remainingBalance >= 0;
  const estimatedAnnualReturnValue = totalInvestment * (optimizationMetrics?.expectedReturn ?? 0);
  const estimatedWorstLossValue = totalInvestment * (optimizationMetrics?.cvar ?? 0);

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
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto no-scrollbar pr-1 pb-2">
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand" />
                  <span className="text-xs text-brand font-medium">Penjelasan Alokasi AI</span>
                </div>
                {/* Badge sumber risiko: prediksi vs historis */}
                {optimizationMetrics.volatilitySource === "forecast" && (
                  <span className="flex items-center gap-1 text-[8px] font-medium text-brand-800 bg-white/70 px-1.5 py-0.5 rounded-full border border-brand-200">
                    <BrainCircuit className="w-2.5 h-2.5" />
                    Risiko Prediksi AI
                  </span>
                )}
              </div>

              {/* Narasi Alasan Penentuan Bobot — Mean-CVaR */}
              <p className="text-[10px] text-text-secondary font-regular leading-relaxed text-justify">
                {optimizationMetrics.method === "mean_cvar" && optimizationMetrics.riskTolerance <= 0.35 && (
                  "Sesuai pilihanmu yang condong AMAN, AI memakai metode Mean-CVaR untuk menekan potensi kerugian pada skenario terburuk. AI memilih kombinasi yang paling stabil dari saham yang kamu pilih, walau potensi keuntungannya jadi lebih terbatas."
                )}
                {optimizationMetrics.method === "mean_cvar" && optimizationMetrics.riskTolerance > 0.35 && optimizationMetrics.riskTolerance < 0.65 && (
                  "Sesuai pilihanmu yang SEIMBANG, AI memakai metode Mean-CVaR untuk menyeimbangkan antara peluang keuntungan dan perlindungan terhadap skenario kerugian terburuk dari saham yang kamu pilih."
                )}
                {optimizationMetrics.method === "mean_cvar" && optimizationMetrics.riskTolerance >= 0.65 && (
                  "Sesuai pilihanmu yang condong BERANI, AI memakai metode Mean-CVaR untuk mengejar peluang keuntungan lebih tinggi. Konsekuensinya, potensi kerugian pada skenario terburuk juga ikut lebih besar."
                )}
                {optimizationMetrics.method === "max_sharpe" && "AI memakai Max Sharpe untuk mencari kombinasi dengan rasio potensi imbal hasil terhadap risiko paling efisien dari saham pilihanmu."}
                {optimizationMetrics.method === "min_volatility" && "AI memakai Minimisasi Volatilitas untuk mencari kombinasi dengan pergerakan nilai paling stabil dari saham pilihanmu."}
                {optimizationMetrics.method === "max_return" && "AI memakai Max Return untuk memprioritaskan potensi imbal hasil historis tertinggi. Akibatnya, alokasi dapat lebih terkonsentrasi pada saham tertentu."}
                {optimizationMetrics.method === "risk_parity" && "AI memakai Risk Parity untuk membagi kontribusi risiko lebih merata antar saham, bukan sekadar membagi nominal uang sama rata."}
                {optimizationMetrics.method === "equal_weight" && "AI memakai Bobot Sama Rata sebagai pembanding sederhana: setiap saham memperoleh porsi yang setara sebelum dikonversi menjadi lot."}
                {optimizationMetrics.volatilitySource === "forecast" && (
                  " Estimasi risiko di bawah memakai prediksi volatilitas model AI (proyeksi ke depan), bukan sekadar data masa lalu."
                )}
              </p>

              {/* Metrik Kuantitatif AI — diberi label akurat agar tidak salah tangkap */}
              <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-brand-100/60">
                <div className="flex flex-col items-center p-1.5 bg-white/80 rounded-lg border border-brand-100/40 text-center">
                  <span className="text-[8px] text-slate-400 font-medium mb-0.5">Estimasi Imbal Hasil / thn</span>
                  <span className={`text-[11px] font-semibold ${
                    optimizationMetrics.expectedReturn >= 0 ? "text-brand" : "text-error-600"
                  }`}>
                    {optimizationMetrics.expectedReturn >= 0 ? "+" : "−"}
                    {Math.abs(optimizationMetrics.expectedReturn * 100).toFixed(1)}%
                  </span>
                  <span className="text-[8px] text-slate-500 mt-0.5">
                    {estimatedAnnualReturnValue >= 0 ? "+" : "−"}
                    {formatCurrencyIDR(Math.abs(estimatedAnnualReturnValue))}
                  </span>
                </div>
                <div className="flex flex-col items-center p-1.5 bg-white/80 rounded-lg border border-brand-100/40 text-center">
                  <span className="text-[8px] text-slate-400 font-medium mb-0.5">Estimasi Kerugian Terburuk</span>
                  <span className="text-[11px] font-semibold text-error-600">
                    −{(optimizationMetrics.cvar * 100).toFixed(1)}%
                  </span>
                  <span className="text-[8px] text-slate-500 mt-0.5">
                    −{formatCurrencyIDR(estimatedWorstLossValue)}
                  </span>
                </div>
                <div className="flex flex-col items-center p-1.5 bg-white/80 rounded-lg border border-brand-100/40 text-center">
                  <span className="text-[8px] text-slate-400 font-medium mb-0.5">Sharpe Ratio</span>
                  <span className={`text-[11px] font-semibold ${
                    optimizationMetrics.sharpeRatio >= 1.0
                      ? "text-brand"
                      : optimizationMetrics.sharpeRatio >= 0.5
                      ? "text-brand-800"
                      : "text-warning-700"
                  }`}>
                    {optimizationMetrics.sharpeRatio.toFixed(2)}
                  </span>
                  <span className="text-[8px] text-slate-500 mt-0.5">
                    {optimizationMetrics.sharpeRatio >= 1.0
                      ? "Baik"
                      : optimizationMetrics.sharpeRatio >= 0.5
                      ? "Cukup"
                      : optimizationMetrics.sharpeRatio >= 0
                      ? "Rendah"
                      : "Kurang ideal"}
                  </span>
                </div>
              </div>

              {optimizationMetrics.pairwiseDownside.length > 0 && (
                <div className="pt-2 border-t border-brand-100/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-medium text-slate-700">
                      Risiko Jatuh Bersama
                    </span>
                    <span className="text-[8px] text-slate-400">Clayton Copula</span>
                  </div>
                  <p className="text-[8px] leading-relaxed text-slate-500 mb-2">
                    Kemungkinan kedua saham turun tajam secara bersamaan berdasarkan
                    data historis.
                  </p>
                  <div className="space-y-1.5">
                    {optimizationMetrics.pairwiseDownside.slice(0, 10).map((pair) => {
                      const tone = pair.level === "tinggi"
                        ? "bg-red-50 border-red-200 text-red-700"
                        : pair.level === "sedang"
                        ? "bg-amber-50 border-amber-200 text-amber-700"
                        : "bg-emerald-50 border-emerald-200 text-emerald-700";
                      return (
                        <div
                          key={`${pair.ticker_a}-${pair.ticker_b}`}
                          className={`flex items-center justify-between rounded-lg border px-2 py-1.5 ${tone}`}
                        >
                          <span className="text-[9px] font-semibold">
                            {pair.ticker_a} + {pair.ticker_b}
                          </span>
                          <span className="text-[9px] font-semibold capitalize">
                            {pair.level} · {(pair.conditional_probability * 100).toFixed(1)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[8px] leading-relaxed text-slate-500 mt-2">
                    Pasangan teratas paling rentan jatuh bersama, sehingga manfaat
                    diversifikasinya dapat melemah saat pasar buruk. Perhitungan
                    berfokus pada 5% kondisi penurunan paling ekstrem.
                  </p>
                </div>
              )}

              {/* Disclaimer agar user tidak salah tangkap */}
              <div className="flex items-start gap-1.5 pt-1.5 border-t border-brand-100/60">
                <Info className="w-3 h-3 text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="text-[8px] text-slate-400 leading-relaxed text-justify">
                  Angka ini estimasi berbasis data, bukan jaminan. "Kerugian terburuk" (CVaR) adalah
                  rata-rata kerugian pada skenario paling buruk dalam setahun — makin besar, makin berisiko.
                  Hasil nyata bisa berbeda.
                </p>
              </div>
            </div>
          )}
          {!optimizationMetrics && pairwiseDownside.length > 0 && (
            <div className="mt-2 mb-4 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-800">Risiko Jatuh Bersama</span>
                <span className="text-[8px] text-slate-400">Analisis historis</span>
              </div>
              <p className="text-[9px] leading-relaxed text-slate-500 mb-2">
                Kemungkinan kedua saham turun tajam secara bersamaan. Jumlah lot manualmu tidak diubah.
              </p>
              <div className="space-y-1.5">
                {pairwiseDownside.slice(0, 10).map((pair) => {
                  const tone = pair.level === "tinggi"
                    ? "bg-red-50 border-red-200 text-red-700"
                    : pair.level === "sedang"
                    ? "bg-amber-50 border-amber-200 text-amber-700"
                    : "bg-emerald-50 border-emerald-200 text-emerald-700";
                  return (
                    <div key={`${pair.ticker_a}-${pair.ticker_b}`} className={`flex justify-between rounded-lg border px-2 py-1.5 ${tone}`}>
                      <span className="text-[9px] font-semibold">{pair.ticker_a} + {pair.ticker_b}</span>
                      <span className="text-[9px] font-semibold capitalize">{pair.level} · {(pair.conditional_probability * 100).toFixed(1)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="pt-3 mt-auto bg-background-primary border-t border-border-primary/50">
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
          <div data-tour={confirmDataTour}>
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
      </div>
    </div>
  );
};

export default SimulationSummaryPanel;
