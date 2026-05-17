// src/components/portfolio/PortfolioDetailCard.tsx
import React from "react";
import { Wallet } from "lucide-react";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import { PortfolioLegend, type Allocation } from "@/features/dashboard";
import PortfolioDetailTable from "./PortfolioDetailTable";
import SectionHeader from "@/components/shared/SectionHeader";
import type { EnrichedHolding } from "../types/portfolio";

interface PortfolioDetailCardProps {
  portfolioName: string;
  portfolioId: string;
  investedBalance: number;
  totalProfitAmount: number;
  totalProfitPercentage: number;
  allocations: Allocation[];
  holdings: EnrichedHolding[];
}

/**
 * Card besar pembungkus halaman Detail Portfolio.
 * Menampilkan ringkasan portfolio (saldo, profit), legenda alokasi,
 * dan tabel detail holdings.
 */
const PortfolioDetailCard: React.FC<PortfolioDetailCardProps> = ({
  portfolioName,
  portfolioId,
  investedBalance,
  totalProfitAmount,
  totalProfitPercentage,
  allocations,
  holdings,
}) => {
  const isProfit = totalProfitAmount >= 0;

  return (
    <div className="w-full">
      <SectionHeader title="Detail Portofolio" />

      <div className="w-full bg-background-primary border border-border-primary rounded-xl overflow-hidden">
        {/* Header Section — Nama, Info, Ringkasan Saldo */}
        <div className="p-6 pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 border-b border-slate-100 pb-6">
            {/* Kiri: Identitas Portfolio (Kapsul Aktif Premium) */}
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-brand uppercase tracking-wider mb-2">
                Dompet Investasi
              </span>
              <h3 className="font-bold text-sm md:text-base text-slate-800 bg-slate-50 border border-slate-200/50 px-3 py-1.5 rounded-xl w-fit flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
                {portfolioName}
              </h3>
            </div>

            {/* Kanan: Ringkasan Saldo */}
            <div className="text-left md:text-right">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Total Investasi
              </span>
              <h3 className="font-bold text-base md:text-lg text-slate-800">
                {formatCurrencyIDR(investedBalance, { absolute: true })}
              </h3>
              {investedBalance > 0 && (
                <p
                  className={`text-[10px] font-bold mt-1.5 px-2.5 py-0.5 rounded-full w-fit md:ml-auto border ${
                    isProfit 
                      ? "bg-brand-50 text-brand border-brand-200/60" 
                      : "bg-error-50 text-error-500 border-error-200/60"
                  }`}
                >
                  {isProfit ? "▲" : "▼"} {totalProfitPercentage.toFixed(1)}% ({isProfit ? "+" : ""}{formatCurrencyIDR(totalProfitAmount, { absolute: false })})
                </p>
              )}
            </div>
          </div>

          {/* Allocation Bar + Legend */}
          <div className="mt-4">
            <p className="text-sm text-text-secondary mb-3">Persentase alokasi aset</p>
            {/* Progress Bar */}
            <div className="w-full h-2 flex rounded-full overflow-hidden bg-border-secondary mb-3 gap-1">
              {allocations.length > 0 ? (
                allocations.map((item, idx) => (
                  <div
                    key={idx}
                    className={`h-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                    title={`${item.ticker} - ${item.percentage}%`}
                  />
                ))
              ) : (
                <div className="w-full h-full bg-border-primary" />
              )}
            </div>
            <PortfolioLegend allocations={allocations} />
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 border-b border-border-primary"></div>

        {/* Body Section — Tabel Detail Holdings */}
        <PortfolioDetailTable holdings={holdings} portfolioId={portfolioId} />
      </div>
    </div>
  );
};

export default PortfolioDetailCard;
