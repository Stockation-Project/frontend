// src/components/shared/cards/StockTable.tsx
import React from "react";
import { motion } from "framer-motion";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";

export interface StockItem {
  id: number;
  ticker: string;
  name: string;
  price: number;
  change: number;
  isPositive: boolean;
}

interface StockTableProps {
  title: string;
  stocks: StockItem[];
}

const StockTable: React.FC<StockTableProps> = ({ title, stocks }) => {
  return (
    <div className="w-full">
      <h3 className="text-base font-medium text-slate-600 mb-2">{title}</h3>

      <div className="flex flex-col border-t border-slate-100">
        {stocks.map((stock, index) => (
          <motion.div
            key={stock.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group flex items-center justify-between py-4 border-b border-slate-100 hover:bg-slate-50 px-2 -mx-2 rounded-xl transition-colors cursor-pointer"
          >
            {/* Kolom 1: Ticker & Nama */}
            <div className="flex-1 min-w-[150px]">
              <h4 className="font-bold text-slate-900 text-base">
                {stock.ticker}
              </h4>
              <p className="text-sm text-slate-500 truncate">{stock.name}</p>
            </div>

            {/* Kolom 2: Grafik Mini (Sparkline) */}
            <div className="hidden md:flex flex-1 justify-center items-center px-4">
              <svg
                width="60"
                height="24"
                viewBox="0 0 60 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {stock.isPositive ? (
                  <>
                    <path
                      d="M0 20 L10 15 L20 22 L30 10 L40 18 L50 5 L60 2"
                      stroke="#329B0D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M0 20 L10 15 L20 22 L30 10 L40 18 L50 5 L60 2 V24 H0 V20 Z"
                      fill={`url(#paint0_linear_green_${stock.id})`}
                      opacity="0.2"
                    />
                    <defs>
                      <linearGradient
                        id={`paint0_linear_green_${stock.id}`}
                        x1="30"
                        y1="2"
                        x2="30"
                        y2="24"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#329B0D" />
                        <stop offset="1" stopColor="#329B0D" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </>
                ) : (
                  <>
                    <path
                      d="M0 5 L10 10 L20 2 L30 15 L40 8 L50 20 L60 22"
                      stroke="#EF4444"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M0 5 L10 10 L20 2 L30 15 L40 8 L50 20 L60 22 V24 H0 V5 Z"
                      fill={`url(#paint0_linear_red_${stock.id})`}
                      opacity="0.2"
                    />
                    <defs>
                      <linearGradient
                        id={`paint0_linear_red_${stock.id}`}
                        x1="30"
                        y1="2"
                        x2="30"
                        y2="24"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#EF4444" />
                        <stop offset="1" stopColor="#EF4444" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </>
                )}
              </svg>
            </div>

            {/* Kolom 3: Harga saat ini */}
            <div className="flex-1 text-right md:text-center min-w-[100px]">
              <span className="font-semibold text-slate-900 text-sm md:text-base">
                {formatCurrencyIDR(stock.price)}
              </span>
            </div>

            {/* Kolom 4: Indikator % */}
            <div className="flex-1 flex justify-end items-center min-w-[80px]">
              <span
                className={`flex items-center text-sm md:text-base font-bold ${stock.isPositive ? "text-[#329B0D]" : "text-red-500"}`}
              >
                {/* Segitiga Solid Kustom */}
                <svg
                  className="w-3 h-3 mr-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  {stock.isPositive ? (
                    <path d="M12 4l8 16H4z" /> // Segitiga hadap atas
                  ) : (
                    <path d="M12 20l8-16H4z" /> // Segitiga hadap bawah
                  )}
                </svg>
                {stock.change}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StockTable;
