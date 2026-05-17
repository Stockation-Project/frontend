// src/components/portfolio/PortfolioDetailTable.tsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import type { EnrichedHolding } from "../types/portfolio";

interface PortfolioDetailTableProps {
  holdings: EnrichedHolding[];
  portfolioId: string;
}

/**
 * Tabel detail holdings di dalam sebuah portfolio.
 * Menampilkan kolom: Emiten, Alokasi, Jumlah Lot, Laba/Rugi, Aksi.
 */
const PortfolioDetailTable: React.FC<PortfolioDetailTableProps> = ({
  holdings,
  portfolioId,
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
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 text-xs font-medium text-text-muted capitalize tracking-wide border-b border-border-primary bg-background-primary">
        <div className="col-span-3">Emiten</div>
        <div className="col-span-3 text-center">Alokasi</div>
        <div className="col-span-2 text-center">Jumlah Lot</div>
        <div className="col-span-2 text-center">Laba/Rugi</div>
        <div className="col-span-2 text-center">Aksi</div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col">
        {holdings.map((holding, index) => (
          <motion.div
            key={holding.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center px-4 py-3 border-b border-border-secondary hover:bg-background-secondary/70 transition-colors"
          >
            {/* Kolom 1: Emiten — Ticker & Nama */}
            <div className="md:col-span-3">
              <div className="flex items-center gap-2">
                <div>
                  <h4 className="font-medium text-text-primary text-sm">
                    {holding.ticker}
                  </h4>
                  <p className="text-xs text-text-muted truncate max-w-[180px] mt-0.5">
                    {holding.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Kolom 2: Alokasi — Jumlah investasi & persentase */}
            <div className="md:col-span-3 text-center">
              <p className="font-medium text-text-primary text-sm">
                {formatCurrencyIDR(holding.investedAmount)}
              </p>
              <p className="text-xs text-text-muted mt-0.5">
                {holding.investedAmount > 0
                  ? `${((holding.investedAmount / holdings.reduce((sum, h) => sum + h.investedAmount, 0)) * 100).toFixed(0)}% dari investasi`
                  : "0%"}
              </p>
            </div>

            {/* Kolom 3: Jumlah Lot */}
            <div className="md:col-span-2 text-center">
              <p className="font-medium text-text-primary text-sm">
                {holding.totalLots} Lot
              </p>
              <p className="text-xs text-text-muted mt-0.5">
                {holding.totalShares.toLocaleString("id-ID")} Lembar
              </p>
            </div>

            {/* Kolom 4: Laba/Rugi */}
            <div className="md:col-span-2 text-center">
              <div className="flex flex-col items-center gap-0.5">
                {/* Persentase */}
                <span
                  className={`flex items-center text-sm font-medium ${holding.isProfit ? "text-brand" : "text-error-500"}`}
                >
                  <svg
                    className="w-3.5 h-3.5 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {holding.isProfit ? (
                      <>
                        <path d="M12 19V5M5 12l7-7 7 7" />
                      </>
                    ) : (
                      <>
                        <path d="M12 5v14M19 12l-7 7-7-7" />
                      </>
                    )}
                  </svg>
                  {Math.abs(holding.profitLossPercentage).toFixed(2)}%
                </span>
                {/* Nominal */}
                <span
                  className={`flex items-center text-sm font-medium ${holding.isProfit ? "text-brand" : "text-error-500"}`}
                >
                  <svg
                    className="w-3.5 h-3.5 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {holding.isProfit ? (
                      <>
                        <path d="M12 19V5M5 12l7-7 7 7" />
                      </>
                    ) : (
                      <>
                        <path d="M12 5v14M19 12l-7 7-7-7" />
                      </>
                    )}
                  </svg>
                  {formatCurrencyIDR(holding.profitLossAmount, {
                    absolute: false,
                  })}
                </span>
              </div>
            </div>

            {/* Kolom 5: Aksi */}
            <div className="md:col-span-2 flex justify-center">
              <button
                onClick={() =>
                  navigate(`/portfolio/${portfolioId}/stocks/${holding.ticker}`)
                }
                className="px-4 py-1.5 text-xs font-medium text-text-secondary bg-background-primary border border-border-primary rounded-lg hover:bg-background-secondary transition-all cursor-pointer flex items-center gap-1"
              >
                Detail
                <svg
                  className="w-3 h-3"
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
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioDetailTable;
