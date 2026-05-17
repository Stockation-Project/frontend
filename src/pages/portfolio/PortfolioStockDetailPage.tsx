import React, { useState } from "react";
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
  SellStockModal
} from "@/features/portfolio";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import StatCard from "@/components/shared/cards/StatCard";
import PageHeader from "@/components/shared/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
          <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-text-muted font-medium">Memuat data saham...</p>
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
      className="w-full p-10"
    >
      {/* 1. HEADER HALAMAN / BACK BUTTON */}
      <PageHeader
        title=""
        showBackButton={true}
      />

      {/* ============================================================== */}
      {/* [BAGIAN 1] HEADER INFO EMITEN & DETAIL HARGA (Grid Kolom 7) */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Pembungkus Kolom Info Kiri (7/12) */}
        <div className="xl:col-span-7 flex flex-col gap-6">
          {/* 1a. INFORMASI EMITEN (Nama, Ticker, Sektor, Bookmark) */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-semibold text-text-primary mb-0.5 tracking-tight">
                {stockData.ticker}
              </h1>
              <p className="text-lg text-text-muted mb-1">{stockData.name}</p>
              <Badge
                variant="outline"
                className="bg-brand-50 text-brand border-brand hover:bg-brand-100 font-medium px-3 py-2 rounded-sm text-xs"
              >
                Sektor: {stockData.sector || "Umum"}
              </Badge>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl h-12 w-12 border-border-primary transition-all active:scale-95"
            >
              <Bookmark className="w-5 h-5 fill-current" />
            </Button>
          </div>

          {/* 1b. HARGA SAHAM REALTIME */}
          <div className="flex items-end gap-2">
            <h2 className="text-4xl font-semibold text-text-primary tracking-tight">
              {formatCurrencyIDR(stockData.current_price)}
            </h2>
            <span
              className={`text-sm sm:text-md font-semibold mb-1 ${priceChange.isPositive ? "text-brand" : "text-error-500"}`}
            >
              {priceChange.isPositive ? "▲" : "▼"} {priceChange.percent}%
            </span>
          </div>
          {/* 2a. CHART AREA */}
          <StockAreaChart
            data={filteredChartData}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            isPositive={priceChange.isPositive}
          />
          <TransactionHistoryList transactions={transactions} />
        </div>
        {/* KONTEN PELENGKAP - SEBELAH KANAN (5/12) */}
        <div className="xl:col-span-5 flex flex-col gap-4 relative">
          {/* 3a. WIDGET STATISTIK SAHAM */}
          <div className="bg-background-primary px-2">
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

            {/* 3b. WIDGET PERGERAKAN ANOMALI */}
            <div className="bg-background-primary px-2">
              <h3 className="text-base font-medium text-text-secondary mb-2">
                Pergerakan Anomali
              </h3>
              <AnomalyTable data={stockData.anomaly_history || []} />
            </div>

            {/* 3c. WIDGET RANGKUMAN PERUSAHAAN */}
            <div className="px-2">
              <h3 className="text-base font-medium text-text-secondary mb-2">Rangkuman</h3>
              <div className="max-h-37 overflow-y-auto">
                <p className="text-sm text-text-muted leading-relaxed text-justify">
                  {stockData.about_company || `${stockData.name} (${stockData.ticker}) adalah salah satu perusahaan terkemuka di sektornya. Perusahaan ini memiliki fundamental yang kuat dan prospek pertumbuhan yang menjanjikan dalam jangka panjang.`}
                </p>
              </div>
            </div>

            {/* [KHUSUS PORTFOLIO] 3d. WIDGET POSISI KAMU / TOMBOL JUAL & BELI */}
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
    </motion.div>
  );
};

export default PortfolioStockDetailPage;
