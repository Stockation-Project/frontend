// src/components/shared/cards/PortfolioCard.tsx
import React from "react";
import { Wallet } from "lucide-react";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import PortfolioLegend from "./PortfolioLegend";

export interface Allocation {
  ticker: string;
  percentage: number;
  color: string; // Tailwind class misal: 'bg-green-700'
}

export interface PortfolioCardProps {
  id: string;
  name: string;
  allocations: Allocation[];
  cashBalance: number;
  investedBalance: number;
  profitAmount: number;
  profitPercentage: number;
  isActive?: boolean;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  id,
  name,
  allocations = [],
  cashBalance,
  investedBalance,
  profitAmount,
  profitPercentage,
  isActive = false,
}) => {
  const isProfit = profitAmount >= 0;

  return (
    <div className={`h-full min-w-[320px] w-[320px] border rounded-xl flex flex-col justify-between hover:shadow-md transition-all cursor-pointer overflow-hidden ${
      isActive 
        ? "bg-background-primary border-brand ring-1 ring-brand" 
        : "bg-background-primary border-border-primary hover:border-slate-300"
    }`}>
      {/* 1. Bagian Atas (Header) */}
      <div className={`px-4 py-3 flex items-start gap-3 ${
        isActive ? "bg-brand" : "bg-background-secondary border-b border-border-secondary"
      }`}>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isActive ? "bg-white/20" : "bg-background-primary border border-border-primary"
        }`}>
          <Wallet className={`w-5 h-5 stroke-[1.5px] ${
            isActive ? "text-white" : "text-slate-400"
          }`} />
        </div>
        <div>
          <h4 className={`font-semibold text-sm leading-tight mb-1 ${
            isActive ? "text-white" : "text-slate-900"
          }`}>{name}</h4>
          <p className={`text-[10px] font-medium uppercase tracking-wider truncate max-w-[200px] ${
            isActive ? "text-white/70" : "text-slate-500"
          }`}>{id}</p>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* 2. Bagian Tengah (Progress Bar Alokasi) */}
        <div className="mb-4">
        {/* Bar */}
        <div className="w-full h-2 flex rounded-full overflow-hidden bg-border-secondary mb-2 gap-0.5">
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
            <div className="w-full h-full bg-slate-200" />
          )}
        </div>

        {/* Legenda */}
        <PortfolioLegend allocations={allocations} isDarkBg={false} />
      </div>

      {/* 3. Bagian Bawah (Footer: Terpakai & Tersedia) */}
      <div className="flex items-end justify-between pt-4 border-t border-border-secondary min-h-[60px]">
        {/* Kiri: Tersedia (Cash) */}
        <div>
          <p className="text-[10px] font-medium mb-0.5 text-slate-500">
            Saldo Tersedia
          </p>
          <p className="text-sm font-semibold text-slate-900">
            {formatCurrencyIDR(cashBalance, { absolute: true })}
          </p>
        </div>

        {/* Kanan: Terpakai (Invested) */}
        <div className="text-right flex flex-col items-end">
          <p className="text-[10px] font-medium mb-0.5 text-slate-500">
            Terpakai
          </p>
          <p className="text-sm font-semibold text-slate-900">
            {formatCurrencyIDR(investedBalance, { absolute: true })}
          </p>
          {/* Teks Profit/Loss */}
          {investedBalance > 0 && (
            <p
              className={`text-[10px] font-medium mt-0.5 ${
                isProfit ? "text-brand" : "text-error-500"
              }`}
            >
              ({isProfit ? "+" : ""}{profitPercentage.toFixed(1)}%) {isProfit ? "+" : ""}
              {formatCurrencyIDR(profitAmount, { absolute: false })}
            </p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
