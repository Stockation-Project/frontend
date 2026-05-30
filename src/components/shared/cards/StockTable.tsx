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
  title?: string;
  stocks: StockItem[];
}

const StockTable: React.FC<StockTableProps> = ({ title, stocks }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {title && <SectionHeader title={title} />}

      <div className="flex flex-col border border-border-primary max-h-[380px] overflow-y-auto px-4 rounded-xl">
        {/* Header Table */}
        <div className="flex items-center justify-between py-3 border-b border-border-primary px-2 -mx-2 text-[10px] font-medium text-text-muted uppercase tracking-wider">
          <div className="flex-1 min-w-[120px] md:min-w-[150px]">Emiten</div>
          <div className="hidden md:block flex-1 text-center">Chart (1D)</div>
          <div className="hidden md:block flex-1 text-center min-w-[100px]">Harga</div>
          <div className="hidden md:block flex-1 text-right min-w-[80px]">Perubahan (%)</div>
          <div className="block md:hidden flex-1 text-right min-w-[100px]">Harga / Ubah</div>
        </div>

        {stocks.map((stock, index) => (
          <motion.div
            key={stock.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => navigate(`/stock/${stock.ticker}`)}
            data-tour={index === 0 ? "stock-row-first" : `stock-row-${stock.ticker}`}
            className="group flex items-center justify-between py-2.5 border-b border-border-primary hover:bg-background-secondary px-2 -mx-2 transition-colors cursor-pointer"
          >
            {/* Col 1: Ticker & Nama */}
            <div className="flex-1 min-w-[120px] md:min-w-[150px]">
              <h4 className="font-medium text-text-primary text-xs">
                {stock.ticker}
              </h4>
              <p className="text-[10px] font-regular text-text-muted truncate max-w-[100px] sm:max-w-none">{stock.name}</p>
            </div>

            {/* Col 2: Grafik Mini */}
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
                      stroke="var(--color-brand)"
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
                        <stop stopColor="var(--color-brand)" />
                        <stop offset="1" stopColor="var(--color-brand)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </>
                ) : (
                  <>
                    <path
                      d="M0 5 L10 10 L20 2 L30 15 L40 8 L50 20 L60 22"
                      stroke="var(--color-error-500)"
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
                        <stop stopColor="var(--color-error-500)" />
                        <stop offset="1" stopColor="var(--color-error-500)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </>
                )}
              </svg>
            </div>

            {/* Col 3: Harga saat ini */}
            <div className="hidden md:block flex-1 text-center min-w-[100px]">
              <span className="font-medium text-text-primary text-xs md:text-sm">
                {formatCurrencyIDR(stock.price)}
              </span>
            </div>

            {/* Col 4: Indikator % */}
            <div className="hidden md:flex flex-1 justify-end items-center min-w-[80px]">
              <span
                className={`flex items-center text-xs md:text-sm font-medium ${stock.isPositive ? "text-brand" : "text-error-500"}`}
              >
                <svg
                  className="w-3 h-3 mr-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  {stock.isPositive ? (
                    <path d="M12 4l8 16H4z" />
                  ) : (
                    <path d="M12 20l8-16H4z" /> 
                  )}
                </svg>
                {stock.change}%
              </span>
            </div>

            {/* Col 5: Harga & Perubahan - Mobile Only */}
            <div className="flex md:hidden flex-col items-end justify-center flex-1 min-w-[100px] text-right">
              <span className="font-semibold text-text-primary text-xs">
                {formatCurrencyIDR(stock.price)}
              </span>
              <span
                className={`flex items-center text-[10px] font-medium mt-0.5 ${stock.isPositive ? "text-brand" : "text-error-500"}`}
              >
                <svg
                  className="w-2.5 h-2.5 mr-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  {stock.isPositive ? (
                    <path d="M12 4l8 16H4z" />
                  ) : (
                    <path d="M12 20l8-16H4z" />
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
