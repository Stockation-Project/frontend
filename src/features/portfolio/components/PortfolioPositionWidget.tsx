import React from "react";
import { Button } from "@/components/ui/button";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";

interface PortfolioPositionWidgetProps {
  symbol: string;
  holding: any; // Data dari database (avg_buy_price, total_shares)
  currentPrice: number; // Harga realtime dari API saham
  onBuy?: () => void;
  onSell?: () => void;
  actionsDataTour?: string;
}

const PortfolioPositionWidget: React.FC<PortfolioPositionWidgetProps> = ({
  symbol,
  holding,
  currentPrice,
  onBuy,
  onSell,
  actionsDataTour,
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
    <div className="bg-background-primary border border-border-primary rounded-xl p-3">
      <h3 className="text-base font-medium text-text-primary mb-1">Posisi kamu</h3>

      <div className=" text-sm">
        <div className="flex justify-between items-center py-1">
          <span className="text-text-muted font-regular text-xs">Kepemilikan</span>
          <span className="font-medium text-text-primary text-xs">
            {isOwned ? `${lots} lot (${totalShares} lembar)` : "0 lot"}
          </span>
        </div>

        <div className="flex justify-between items-center py-1">
          <span className="text-text-muted font-regular text-xs">Harga beli rata-rata</span>
          <span className="font-medium text-text-primary text-xs">
            {formatCurrencyIDR(avgPrice)}
          </span>
        </div>

        <div className="flex justify-between items-center border-t border-border-secondary pt-2">
          <span className="text-text-muted font-regular text-xs">Laba/Rugi</span>
          <span
            className={`font-medium text-xs ${isOwned
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

      <div className="grid grid-cols-2 gap-3 mt-4" data-tour={actionsDataTour}>
        <Button
          onClick={onBuy}
          className="w-full h-10 bg-brand hover:bg-brand-950 text-text-inverse rounded-xl text-sm font-medium shadow-sm shadow-brand/10 transition-all cursor-pointer"
        >
          Beli
        </Button>
        <Button
          onClick={onSell}
          disabled={!isOwned}
          className="w-full h-10 bg-error hover:bg-error-900 text-text-inverse rounded-xl text-sm font-medium shadow-sm shadow-error-500/10 transition-all cursor-pointer disabled:bg-background-secondary disabled:text-text-subtle disabled:shadow-none"
        >
          Jual
        </Button>
      </div>
    </div>
  );
};

export default PortfolioPositionWidget;
