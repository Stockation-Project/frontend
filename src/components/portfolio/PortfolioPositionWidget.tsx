import React from "react";
import { Button } from "@/components/ui/button";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";

interface PortfolioPositionWidgetProps {
  symbol: string;
  holding: any; // Data dari database (avg_buy_price, total_shares)
  currentPrice: number; // Harga realtime dari API saham
  onBuy?: () => void;
  onSell?: () => void;
}

const PortfolioPositionWidget: React.FC<PortfolioPositionWidgetProps> = ({
  symbol,
  holding,
  currentPrice,
  onBuy,
  onSell,
}) => {
  const isOwned = holding && holding.total_shares > 0;
  const avgPrice = isOwned ? holding.avg_buy_price : 0;
  const totalShares = isOwned ? holding.total_shares : 0;
  const lots = totalShares / 100;

  // Kalkulasi Laba/Rugi
  const profitLossRaw = (currentPrice - avgPrice) * totalShares;
  const profitLossPercentage = isOwned
    ? ((currentPrice - avgPrice) / avgPrice) * 100
    : 0;
  const isProfit = profitLossRaw >= 0;

  return (
    <div className="bg-white border border-border-primary rounded-lg p-4">
      <h3 className="text-base font-medium text-slate-600 mb-4">Posisi kamu</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-regular text-xs">Kepemilikan</span>
          <span className="font-medium text-slate-800 text-xs">
            {isOwned ? `${lots} lot (${totalShares} lembar)` : "0 lot"}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-regular text-xs">Harga beli rata-rata</span>
          <span className="font-medium text-slate-800 text-xs">
            {formatCurrencyIDR(avgPrice)}
          </span>
        </div>

        <div className="flex justify-between items-center border-t border-slate-50">
          <span className="text-slate-500 font-regular text-xs">Laba/Rugi</span>
          <span
            className={`font-medium text-slate-800 text-xs ${
              isOwned 
                ? (isProfit ? "text-[#329B0D]" : "text-red-500") 
                : "text-slate-300"
            }`}
          >
            {isOwned ? (
              <>
                {isProfit ? "+" : ""}
                {formatCurrencyIDR(profitLossRaw)} ({profitLossPercentage.toFixed(2)}%)
              </>
            ) : "-"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <Button
          onClick={onBuy}
          className="w-full h-10 bg-brand hover:bg-brand-950 active:bg-brand text-white rounded-xl text-sm font-regular shadow-lg shadow-brand/20 transition-all duration-200 cursor-pointer"
        >
          Beli
        </Button>
        <Button
          onClick={onSell}
          disabled={!isOwned}
          className="w-full h-10 bg-error hover:bg-error-900 active:bg-error-800 text-white rounded-xl text-sm font-regular shadow-lg shadow-error/20 transition-all duration-200 cursor-pointer disabled:bg-slate-100 disabled:text-slate-300 disabled:shadow-none"
        >
          Jual
        </Button>
      </div>
    </div>
  );
};

export default PortfolioPositionWidget;
