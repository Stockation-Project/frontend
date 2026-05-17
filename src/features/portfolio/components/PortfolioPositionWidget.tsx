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
    <div className="bg-background-primary border border-border-primary rounded-3xl p-6 shadow-sm">
      <h3 className="text-base font-bold text-text-primary mb-4">Posisi kamu</h3>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-text-muted font-medium text-xs">Kepemilikan</span>
          <span className="font-bold text-text-primary text-sm">
            {isOwned ? `${lots} lot (${totalShares} lembar)` : "0 lot"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-text-muted font-medium text-xs">Harga beli rata-rata</span>
          <span className="font-bold text-text-primary text-sm">
            {formatCurrencyIDR(avgPrice)}
          </span>
        </div>

        <div className="flex justify-between items-center border-t border-border-secondary pt-4">
          <span className="text-text-muted font-medium text-xs">Laba/Rugi</span>
          <span
            className={`font-bold text-sm ${isOwned
                ? (isProfit ? "text-brand" : "text-error-500")
                : "text-text-subtle"
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

      <div className="grid grid-cols-2 gap-3 mt-8">
        <Button
          onClick={onBuy}
          className="w-full h-11 bg-brand hover:bg-brand-700 text-text-inverse rounded-xl text-sm font-bold shadow-md shadow-brand/10 transition-all cursor-pointer"
        >
          Beli
        </Button>
        <Button
          onClick={onSell}
          disabled={!isOwned}
          className="w-full h-11 bg-error-500 hover:bg-error-700 text-text-inverse rounded-xl text-sm font-bold shadow-md shadow-error-500/10 transition-all cursor-pointer disabled:bg-background-secondary disabled:text-text-subtle disabled:shadow-none"
        >
          Jual
        </Button>
      </div>
    </div>
  );
};

export default PortfolioPositionWidget;
