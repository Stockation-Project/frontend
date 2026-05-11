import React from "react";
import { motion } from "framer-motion";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import SectionHeader from "@/components/shared/SectionHeader";

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
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <SectionHeader title={title} />

      <div className="flex flex-col border border-slate-200 max-h-[380px] overflow-y-auto px-4 rounded-xl">
        {stocks.map((stock, index) => (
          <motion.div
            key={stock.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => navigate(`/dashboard/stock/${stock.ticker}`)}
            className="group flex items-center justify-between py-2 border-b border-slate-200 hover:bg-slate-100 px-2 -mx-2  transition-colors cursor-pointer"
          >
            {/* Kolom 1: Ticker & Nama */}
            <div className="flex-1 min-w-[150px]">
              <h4 className="font-medium text-slate-900 text-sm">
                {stock.ticker}
              </h4>
              <p className="text-xs font-regular text-slate-500 truncate">{stock.name}</p>
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
              <span className="font-medium text-slate-900 text-sm md:text-sm">
                {formatCurrencyIDR(stock.price)}
              </span>
            </div>

            {/* Kolom 4: Indikator % */}
            <div className="flex-1 flex justify-end items-center min-w-[80px]">
              <span
                className={`flex items-center text-xs md:text-sm font-medium ${stock.isPositive ? "text-[#329B0D]" : "text-red-500"}`}
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
