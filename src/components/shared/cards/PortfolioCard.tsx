// src/components/shared/cards/PortfolioCard.tsx
import React from "react";
import { Wallet } from "lucide-react";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";

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
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  id,
  name,
  allocations = [],
  cashBalance,
  investedBalance,
  profitAmount,
  profitPercentage,
}) => {
  const isProfit = profitAmount >= 0;

  return (
    <div className="min-w-[320px] w-[320px] bg-white border border-slate-200 rounded-xl p-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      {/* 1. Bagian Atas (Header) */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 bg-[#329B0D] rounded-xl flex items-center justify-center flex-shrink-0">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 leading-tight">{name}</h4>
          <p className="text-xs text-slate-400 font-medium">{id}</p>
        </div>
      </div>

      {/* 2. Bagian Tengah (Progress Bar Alokasi) */}
      <div className="mb-6">
        {/* Bar */}
        <div className="w-full h-2 flex rounded-full overflow-hidden bg-slate-100 mb-2 gap-0.5">
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
        <div className="flex flex-wrap gap-2">
          {allocations.length > 0 ? (
            allocations.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-[10px] font-bold text-slate-600">
                  {item.ticker} {item.percentage}%
                </span>
              </div>
            ))
          ) : (
            <span className="text-[10px] text-slate-400">
              Belum ada saham dialokasikan
            </span>
          )}
        </div>
      </div>

      {/* 3. Bagian Bawah (Footer: Terpakai & Tersedia) */}
      <div className="flex items-start justify-between items-end pt-4 border-t border-slate-100">
        {/* Kiri: Terpakai (Invested) */}
        <div>
          <p className="text-[10px] text-slate-500 font-medium mb-0.5">
            Saldo Terpakai
          </p>
          <p className="text-sm font-bold text-slate-900 mb-0.5">
            {formatCurrencyIDR(investedBalance, { absolute: true })}
          </p>
          {/* Teks Profit/Loss */}
          {investedBalance > 0 && (
            <p
              className={`text-[10px] font-bold ${isProfit ? "text-[#329B0D]" : "text-red-500"}`}
            >
              ({isProfit ? "+" : "-"}
              {Math.abs(profitPercentage)}%) {isProfit ? "+" : "-"}
              {formatCurrencyIDR(profitAmount, { absolute: true })}
            </p>
          )}
        </div>

        {/* Kanan: Tersedia (Cash) */}
        <div className="text-right">
          <p className="text-[10px] text-slate-500 font-medium mb-0.5">
            Saldo Tersedia
          </p>
          <p className="text-sm font-bold text-slate-900">
            {formatCurrencyIDR(cashBalance, { absolute: true })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
