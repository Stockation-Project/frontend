import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bookmark, ChevronLeft } from "lucide-react";
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

const PortfolioStockDetailPage = () => {
  const { portfolioId, ticker } = useParams();
  const navigate = useNavigate();
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);

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
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 flex-1 min-h-0 overflow-y-auto xl:overflow-hidden p-4 pb-6 no-scrollbar">
        <div className="xl:col-span-7 flex flex-col gap-6 xl:h-full xl:overflow-y-auto pr-2 pb-6 scrollbar-thin">
          {/* INFO PERUSAHAAN */}
          <div className="flex justify-between items-start">
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
          <StockAreaChart
            data={filteredChartData}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            isPositive={priceChange.isPositive}
          />
          <TransactionHistoryList transactions={transactions} />
        </div>

        <div className="xl:col-span-5 flex flex-col gap-4 xl:h-full xl:overflow-y-auto pb-6 xl:pb-0 relative scrollbar-thin">
          <PortfolioPositionWidget
            symbol={ticker!}
            holding={holding}
            currentPrice={stockData.current_price}
            onBuy={handleBuy}
            onSell={handleSell}
          />
          {/* WIDGET STATISTIK SAHAM */}
          <div className="bg-background-primary">
            <h3 className="text-base font-medium text-text-secondary mb-2">Statistik Saham</h3>
            <div className="grid grid-cols-2 gap-2">
              <StatCard
                title="Rata-rata tumbuh per tahun"
                value={stockData.cagr ? `${(stockData.cagr * 100).toFixed(1)}%` : "+15.4%"}
                tooltipText="CAGR dalam 3 tahun terakhir."
              />
              <StatCard
                title="Tingkat hutang perusahaan"
                value={stockData.der ? `${(stockData.der / 100).toFixed(1)}x` : "0.5x"}
                tooltipText="Debt to Equity Ratio (DER)."
              />
              <StatCard
                title="Harga vs keuntungan"
                value={stockData.per ? `${stockData.per.toFixed(1)}x` : "12.5x"}
                tooltipText="Price to Earnings Ratio (PER)."
              />
              <StatCard
                title="Penghasilan tanpa jual saham"
                value={stockData.dividend ? `${(stockData.dividend * 100).toFixed(1)}%` : "4.2%"}
                tooltipText="Dividend Yield."
              />
              <StatCard
                title="Harga terendah tahun ini"
                value={formatCurrencyIDR(stockData.day_low || 4489)}
                tooltipText="Harga terendah dalam 52 minggu terakhir."
              />
              <StatCard
                title="Harga tertinggi tahun ini"
                value={formatCurrencyIDR(stockData.day_high || 9000)}
                tooltipText="Harga tertinggi dalam 52 minggu terakhir."
              />
            </div>
          </div>

          {/*PERGERAKAN ANOMALI */}
          <div className="bg-background-primary">
            <h3 className="text-base font-medium text-text-secondary mb-2">
              Pergerakan Anomali
            </h3>
            <AnomalyTable data={stockData.anomaly_history || []} />
          </div>

          {/* RANGKUMAN PERUSAHAAN */}
          <div className="px-2">
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
    </motion.div>
  );
};

export default PortfolioStockDetailPage;
