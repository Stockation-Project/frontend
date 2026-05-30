// src/components/portfolio/PortfolioDetailTable.tsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import type { EnrichedHolding } from "../types/portfolio";

interface PortfolioDetailTableProps {
  holdings: EnrichedHolding[];
  portfolioId: string;
  actionDataTour?: string;
}

const PortfolioDetailTable: React.FC<PortfolioDetailTableProps> = ({
  holdings,
  portfolioId,
  actionDataTour,
}) => {
  const navigate = useNavigate();

  if (holdings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-sm text-text-muted">
          Belum ada saham di dalam portofolio ini.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-1.5 md:gap-4 px-3 md:px-6 py-3.5 text-[9px] md:text-xs font-semibold text-text-muted uppercase tracking-wider border-b border-border-primary bg-background-primary/50">
        <div className="col-span-4 md:col-span-3">Emiten</div>
        <div className="col-span-3 md:col-span-3 text-center">Alokasi</div>
        <div className="col-span-2 md:col-span-2 text-center">Jumlah Lot</div>
        <div className="col-span-2 md:col-span-2 text-center">Laba/Rugi</div>
        <div className="col-span-1 md:col-span-2 text-right hidden md:block">Aksi</div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col">
        {holdings.map((holding, index) => (
          <motion.div
            key={holding.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() =>
              navigate(`/portfolio/${portfolioId}/stocks/${holding.ticker}`)
            }
            className="grid grid-cols-12 gap-1.5 md:gap-4 items-center px-3 md:px-6 py-2.5 md:py-3 border-b border-border-secondary hover:bg-background-secondary/70 active:bg-background-secondary/90 transition-colors cursor-pointer"
          >
            {/* col 1 */}
            <div className="col-span-4 md:col-span-3">
              <div className="flex items-center gap-2">
                <div>
                  <h4 className="font-semibold text-text-primary text-[11px] sm:text-xs md:text-sm">
                    {holding.ticker}
                  </h4>
                  <p className="text-[9px] sm:text-[10px] md:text-xs text-text-muted truncate max-w-[65px] sm:max-w-[120px] md:max-w-[180px] mt-0.5">
                    {holding.name}
                  </p>
                </div>
              </div>
            </div>

            {/* col 2*/}
            <div className="col-span-3 md:col-span-3 text-center">
              <p className="font-medium text-text-primary text-[10px] sm:text-xs md:text-sm">
                {formatCurrencyIDR(holding.investedAmount)}
              </p>
              <p className="text-[9px] sm:text-[10px] md:text-xs text-text-muted mt-0.5">
                {holding.investedAmount > 0
                  ? `${((holding.investedAmount / holdings.reduce((sum, h) => sum + h.investedAmount, 0)) * 100).toFixed(0)}% Porto`
                  : "0%"}
              </p>
            </div>

            {/* col 3 */}
            <div className="col-span-2 md:col-span-2 text-center">
              <p className="font-medium text-text-primary text-[10px] sm:text-xs md:text-sm">
                {holding.totalLots} Lot
              </p>
              <p className="text-[9px] sm:text-[10px] md:text-xs text-text-muted mt-0.5">
                {holding.totalShares.toLocaleString("id-ID")} Lbr
              </p>
            </div>

            {/* col 4 */}
            <div className="col-span-2 md:col-span-2 text-center">
              <div className="flex flex-col items-center gap-0.5">
                {/* Persentase */}
                <span
                  className={`flex items-center text-[10px] sm:text-xs md:text-sm font-medium ${holding.isProfit ? "text-brand" : "text-error-500"}`}
                >
                  <svg
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 mr-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {holding.isProfit ? (
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    ) : (
                      <path d="M12 5v14M19 12l-7 7-7-7" />
                    )}
                  </svg>
                  {Math.abs(holding.profitLossPercentage).toFixed(2)}%
                </span>
                {/* Nominal */}
                <span
                  className={`flex items-center text-[8px] sm:text-[10px] md:text-xs font-medium ${holding.isProfit ? "text-brand" : "text-error-500"}`}
                >
                  <svg
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 mr-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {holding.isProfit ? (
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    ) : (
                      <path d="M12 5v14M19 12l-7 7-7-7" />
                    )}
                  </svg>
                  {formatCurrencyIDR(holding.profitLossAmount, {
                    absolute: true,
                  })}
                </span>
              </div>
            </div>

            {/* col 5: Aksi*/}
            <div className="col-span-1 md:col-span-2 flex justify-end items-center">
              <div className="block md:hidden">
                <svg
                  className="w-3.5 h-3.5 text-slate-400 hover:text-brand transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              {/* Tombol Aksi di Desktop */}
              <div className="hidden md:block" data-tour={actionDataTour}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/portfolio/${portfolioId}/stocks/${holding.ticker}`);
                  }}
                  className="px-4 py-1.5 text-xs font-medium text-text-secondary bg-background-primary border border-border-primary rounded-lg hover:bg-background-secondary transition-all cursor-pointer flex items-center gap-1"
                >
                  Detail
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioDetailTable;
