import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bookmark, HelpCircle } from "lucide-react";
import {
  StockAreaChart,
  useStockDetail,
  useChartFilter,
  AnomalyTable
} from "@/features/stock";
import {
  usePortfolioStockDetail,
  TransactionHistoryList,
  PortfolioPositionWidget,
  SellStockModal,
  PortfolioStockDetailSkeleton
} from "@/features/portfolio";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import StatCard from "@/components/shared/cards/StatCard";
import PageHeader from "@/components/shared/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { toggleWatchlist } from "@/features/explore/services/explore.service";
import { toast } from "sonner";
import { usePageTour, ProductTour } from "@/features/product-tour";
import { PORTFOLIO_STOCK_DETAIL_TOUR_STEPS } from "@/features/product-tour/steps";
import { useAuth } from "@/features/auth";

const PortfolioStockDetailPage: React.FC = () => {
  const { portfolioId, ticker } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);

  const {
    isActive,
    currentStep,
    nextStep,
    endTour,
    startTour,
  } = usePageTour({
    steps: PORTFOLIO_STOCK_DETAIL_TOUR_STEPS,
    storageKey: "stockation_tour_portfolio_stock",
    autoStart: true,
    userId: user?.id,
  });

  const {
    holding,
    transactions,
    loading: loadingPortfolio,
    refetch: refetchPortfolio,
  } = usePortfolioStockDetail(portfolioId, ticker);

  const { data: stockData, isLoading: loadingStock } = useStockDetail(ticker);

  useEffect(() => {
    if (stockData) {
      setIsWatchlist(!!stockData.is_watchlist);
    }
  }, [stockData]);

  const handleToggleWatchlist = async () => {
    if (!ticker) return;

    try {
      const result = await toggleWatchlist(ticker);
      if (result.success) {
        setIsWatchlist(!isWatchlist);
        toast.success(result.message);
      }
    } catch (err: any) {
      toast.error("Gagal mengubah daftar pantau");
    }
  };

  const chartRawData = stockData?.chart_data || stockData?.chart_1M || [];
  const { activeFilter, setActiveFilter, filteredChartData, priceChange } =
    useChartFilter(chartRawData, stockData?.current_price);

  const handleBuy = () => {
    navigate("/simulation", {
      state: {
        prefillStock: {
          ticker: stockData.ticker,
          name: stockData.name,
          currentPrice: stockData.current_price
        }
      }
    });
  };

  const handleSell = () => {
    setIsSellModalOpen(true);
  };

  const handleSellSuccess = () => {
    refetchPortfolio();
  };

  if (loadingPortfolio || loadingStock) return <PortfolioStockDetailSkeleton />;

  if (!stockData) {
    return (
      <div className="p-8 text-center text-red-500 font-bold">
        Data saham tidak ditemukan.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full h-full flex flex-col overflow-hidden"
    >
      {/* HEADER  */}
      <PageHeader
        title=""
        showBackButton={true}
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={startTour}
            className="text-xs gap-1.5 rounded-xl"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Tur Halaman
          </Button>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 flex-1 min-h-0 overflow-y-auto xl:overflow-hidden p-4 pb-6 no-scrollbar">
        <div className="xl:col-span-7 flex flex-col gap-6 xl:h-full xl:overflow-y-auto pr-2 pb-6 scrollbar-thin">
          {/* INFO PERUSAHAAN */}
          <div className="flex justify-between items-start" data-tour="portfolio-stock-info">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary mb-0.5 tracking-tight">
                {stockData.ticker}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-text-muted mb-1">{stockData.name}</p>
              <span
                className="inline-block px-2.5 py-0.5 text-[10px] font-medium bg-gradient-to-b from-brand-100 to-brand-25 text-brand border border-brand rounded-full whitespace-nowrap"
              >
                Sektor: {stockData.sector || "Umum"}
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleToggleWatchlist}
              className={`rounded-lg h-10 w-10 border-border-primary transition-all active:scale-95 ${isWatchlist
                ? "bg-brand text-text-inverse border-brand hover:bg-brand-950"
                : "text-text-subtle hover:text-background-primary bg-background-secondary hover:bg-border-secondary"
                }`}
            >
              <Bookmark className={`w-5 h-5 ${isWatchlist ? "fill-current" : ""}`} />
            </Button>
          </div>

          {/*HARGA SAHAM REALTIME*/}
          <div className="flex items-end gap-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text-primary tracking-tight leading-none">
              {formatCurrencyIDR(stockData.current_price)}
            </h2>
            <span
              className={`text-xs sm:text-sm font-semibold mb-0.5 ${priceChange.isPositive ? "text-brand" : "text-error-500"}`}
            >
              {priceChange.isPositive ? "▲" : "▼"} {priceChange.percent}%
            </span>
          </div>
          {/* CHART AREA*/}
          <div data-tour="portfolio-stock-chart">
            <StockAreaChart
              data={filteredChartData}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              isPositive={priceChange.isPositive}
            />
          </div>
          <div data-tour="portfolio-stock-transactions">
            <TransactionHistoryList transactions={transactions} />
          </div>
        </div>

        <div className="xl:col-span-5 flex flex-col gap-4 xl:h-full xl:overflow-y-auto pb-6 xl:pb-0 relative scrollbar-thin">
          <div data-tour="portfolio-stock-position">
            <PortfolioPositionWidget
              symbol={ticker!}
              holding={holding}
              currentPrice={stockData.current_price}
              onBuy={handleBuy}
              onSell={handleSell}
              actionsDataTour="portfolio-stock-actions"
            />
          </div>
          {/* WIDGET STATISTIK SAHAM */}
          <div className="bg-background-primary" data-tour="portfolio-stock-stats">
            <h3 className="text-base font-medium text-text-secondary mb-2">Statistik Saham</h3>
            <div className="grid grid-cols-2 gap-2">
              <StatCard
                title="Rata-rata tumbuh per tahun"
                value={stockData.cagr ? `${(stockData.cagr * 100).toFixed(1)}%` : "+15.4%"}
                tooltipText="CAGR dalam 3 tahun terakhir."
                stockSymbol={stockData.ticker}
                metricValue={stockData.cagr ? `${(stockData.cagr * 100).toFixed(1)}%` : "+15.4%"}
                showOnboardingEnabled={true}
              />
              <StatCard
                title="Tingkat hutang perusahaan"
                value={stockData.der ? `${(stockData.der / 100).toFixed(1)}x` : "0.5x"}
                tooltipText="Debt to Equity Ratio (DER)."
                stockSymbol={stockData.ticker}
                metricValue={stockData.der ? `${(stockData.der / 100).toFixed(1)}x` : "0.5x"}
              />
              <StatCard
                title="Harga vs keuntungan"
                value={stockData.per ? `${stockData.per.toFixed(1)}x` : "12.5x"}
                tooltipText="Price to Earnings Ratio (PER)."
                stockSymbol={stockData.ticker}
                metricValue={stockData.per ? `${stockData.per.toFixed(1)}x` : "12.5x"}
              />
              <StatCard
                title="Penghasilan tanpa jual saham"
                value={stockData.dividend ? `${(stockData.dividend * 100).toFixed(1)}%` : "4.2%"}
                tooltipText="Dividend Yield."
                stockSymbol={stockData.ticker}
                metricValue={stockData.dividend ? `${(stockData.dividend * 100).toFixed(1)}%` : "4.2%"}
              />
              <StatCard
                title="Harga terendah tahun ini"
                value={formatCurrencyIDR(stockData.day_low || 4489)}
                tooltipText="Harga terendah dalam 52 minggu terakhir."
                stockSymbol={stockData.ticker}
                metricValue={formatCurrencyIDR(stockData.day_low || 4489)}
              />
              <StatCard
                title="Harga tertinggi tahun ini"
                value={formatCurrencyIDR(stockData.day_high || 9000)}
                tooltipText="Harga tertinggi dalam 52 minggu terakhir."
                stockSymbol={stockData.ticker}
                metricValue={formatCurrencyIDR(stockData.day_high || 9000)}
              />
            </div>
          </div>

          {/*PERGERAKAN ANOMALI */}
          <div className="bg-background-primary" data-tour="portfolio-stock-anomaly">
            <h3 className="text-base font-medium text-text-secondary mb-2">
              Pergerakan Anomali
            </h3>
            <AnomalyTable data={stockData.anomaly_history || []} stockSymbol={stockData.ticker} />
          </div>

          {/* RANGKUMAN PERUSAHAAN */}
          <div className="px-2" data-tour="portfolio-stock-summary">
            <h3 className="text-base font-medium text-text-secondary mb-2">Rangkuman</h3>
            <div className="max-h-37 overflow-y-auto">
              <p className="text-sm text-text-muted leading-relaxed text-justify">
                {stockData.about_company || `${stockData.name} (${stockData.ticker}) adalah salah satu perusahaan terkemuka di sektornya. Perusahaan ini memiliki fundamental yang kuat dan prospek pertumbuhan yang menjanjikan dalam jangka panjang.`}
              </p>
            </div>
          </div> 
        </div>
      </div>

      <SellStockModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        ticker={ticker!}
        portfolioId={portfolioId!}
        maxLots={holding?.total_shares / 100 || 0}
        currentPrice={stockData.current_price}
        onSuccess={handleSellSuccess}
      />

      <ProductTour
        isActive={isActive}
        currentStep={currentStep}
        steps={PORTFOLIO_STOCK_DETAIL_TOUR_STEPS}
        onNext={nextStep}
        onEnd={endTour}
      />
    </motion.div>
  );
};

export default PortfolioStockDetailPage;
