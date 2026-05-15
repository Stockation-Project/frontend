import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bookmark, ChevronLeft } from "lucide-react";
import StockAreaChart from "@/components/shared/charts/StockAreaChart";
import TransactionHistoryList from "@/components/portfolio/TransactionHistoryList";
import PortfolioPositionWidget from "@/components/portfolio/PortfolioPositionWidget";
import { usePortfolioStockDetail } from "@/hooks/usePortfolioStockDetail";
import { useStockDetail } from "@/hooks/useStockDetail";
import { useChartFilter } from "@/hooks/useChartFilter";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import StatCard from "@/components/shared/cards/StatCard";
import AnomalyTable from "@/components/shared/cards/AnomalyTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SellStockModal from "@/components/portfolio/SellStockModal";

const PortfolioStockDetailPage = () => {
  const { portfolioId, ticker } = useParams();
  const navigate = useNavigate();
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  // 1. Ambil data holding & transaksi dari portfolio
  const {
    holding,
    transactions,
    loading: loadingPortfolio,
    refetch: refetchPortfolio,
  } = usePortfolioStockDetail(portfolioId, ticker);

  // 2. Ambil data saham (Sama persis seperti di StockDetailPage)
  const { data: stockData, isLoading: loadingStock } = useStockDetail(ticker);

  // 3. Proses data chart menggunakan hook bawaan kamu
  const chartRawData = stockData?.chart_data || stockData?.chart_1M || [];
  const { activeFilter, setActiveFilter, filteredChartData, priceChange } =
    useChartFilter(chartRawData, stockData?.current_price);

  const handleBuy = () => {
    // Navigasi ke simulasi beli
    navigate("/dashboard/simulation");
  };

  const handleSell = () => {
    setIsSellModalOpen(true);
  };

  const handleSellSuccess = () => {
    refetchPortfolio(); // Refresh data holding dan transaksi
  };

  if (loadingPortfolio || loadingStock)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-slate-500 font-medium">Memuat data saham...</p>
        </div>
      </div>
    );

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
      className="w-full max-w-7xl mx-auto p-4 md:p-10 space-y-8"
    >
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="space-y-4 w-full md:w-auto">
          <div className="flex justify-between md:justify-start items-start gap-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                {stockData.ticker}
              </h1>
              <p className="text-lg text-slate-500 font-medium">{stockData.name}</p>
              <Badge
                variant="outline"
                className="mt-2 bg-green-50 text-[#329B0D] border-green-100 font-bold px-3 py-1 rounded-lg text-[10px] uppercase"
              >
                Sektor: {stockData.sector || "Umum"}
              </Badge>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-2xl h-12 w-12 border-slate-200 text-slate-300 hover:text-slate-900 bg-white hover:bg-slate-50 transition-all shrink-0 md:ml-4"
            >
              <Bookmark className="w-5 h-5 fill-current" />
            </Button>
          </div>

          <div className="flex items-end gap-3 pt-2">
            <h2 className="text-5xl font-bold text-slate-900 tracking-tighter">
              {formatCurrencyIDR(stockData.current_price)}
            </h2>
            <div className={`flex items-center gap-1 text-base font-bold mb-2 ${priceChange.isPositive ? "text-[#329B0D]" : "text-red-500"}`}>
              {priceChange.isPositive ? "▲" : "▼"} {priceChange.percent}%
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Kolom Kiri: Chart & Transactions */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white">
            <StockAreaChart
              data={filteredChartData}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              isPositive={priceChange.isPositive}
            />
          </div>

          <div className="bg-white border border-slate-50 rounded-[40px] p-4 md:p-8">
            <TransactionHistoryList transactions={transactions} />
          </div>
        </div>

        {/* Kolom Kanan: Stats, Anomaly, Summary, Position */}
        <div className="lg:col-span-4 space-y-8">
          {/* Statistik Saham */}
          <div className="space-y-4">
            <h3 className="text-base font-medium text-slate-600 ml-1">Statistik Saham</h3>
            <div className="grid grid-cols-2 gap-3">
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

          {/* Pergerakan Anomali */}
          <div className="space-y-4">
            <h3 className="text-base font-medium text-slate-600 ml-1">Pergerakan anomali</h3>
            <AnomalyTable data={stockData.anomaly_history || []} />
          </div>

          {/* Rangkuman */}
          <div className="space-y-4">
            <h3 className="text-base font-medium text-slate-600 ml-1">Rangkuman</h3>
            <div className="bg-white p-2">
              <p className="text-xs text-slate-500 leading-relaxed text-justify">
                {stockData.about_company || `${stockData.name} (${stockData.ticker}) adalah salah satu perusahaan terkemuka di sektornya. Perusahaan ini memiliki fundamental yang kuat dan prospek pertumbuhan yang menjanjikan dalam jangka panjang.`}
              </p>
            </div>
          </div>

          {/* Posisi Kamu Widget */}
          <PortfolioPositionWidget
            symbol={ticker!}
            holding={holding}
            currentPrice={stockData.current_price}
            onBuy={handleBuy}
            onSell={handleSell}
          />
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

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed bottom-6 left-6 md:bottom-10 md:left-10 w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-all shadow-lg shadow-slate-200/50 z-50 group"
      >
        <ChevronLeft className="w-6 h-6 text-slate-400 group-hover:text-slate-600 transition-colors" />
      </button>
    </motion.div>
  );
};

export default PortfolioStockDetailPage;
