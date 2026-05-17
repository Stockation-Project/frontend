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

      <div className="w-full bg-background-primary border border-border-primary rounded-2xl shadow-sm overflow-hidden">
        {/* Header Section — Nama, Info, Ringkasan Saldo */}
        <div className="p-6 pb-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            {/* Kiri: Identitas Portfolio */}
            <div>
              <p className="text-sm text-text-muted mb-1">Nama dompet</p>
              <h3 className="font-bold text-2xl text-text-primary">
                {portfolioName}
              </h3>
            </div>

            {/* Kanan: Ringkasan Saldo */}
            <div className="text-right">
              <p className="text-sm text-text-muted mb-1">Total Investasi</p>
              <h3 className="font-bold text-2xl text-text-primary">
                {formatCurrencyIDR(investedBalance, { absolute: true })}
              </h3>
              {investedBalance > 0 && (
                <p
                  className={`text-sm font-medium mt-1 ${isProfit ? "text-brand" : "text-error-500"}`}
                >
                  ({isProfit ? "+" : ""}{totalProfitPercentage.toFixed(1)}%){" "}
                  {isProfit ? "+" : ""}
                  {formatCurrencyIDR(totalProfitAmount, { absolute: false })}
                </p>
              )}
            </div>
          </div>

          {/* Allocation Bar + Legend */}
          <div className="mt-4">
            <p className="text-sm text-text-secondary mb-3">Persentase alokasi aset</p>
            {/* Progress Bar */}
            <div className="w-full h-3 flex rounded-full overflow-hidden bg-border-secondary mb-3 gap-1">
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
