import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { useStockDetail, useChartFilter, StockAreaChart, AnomalyTable } from "@/features/stock";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import StatCard from "@/components/shared/cards/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/shared/layout/PageHeader";
import { toggleWatchlist } from "@/features/explore/services/explore.service";
import { toast } from "sonner";

const StockDetailPage: React.FC = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const navigate = useNavigate();

  // 1. Ambil data dari Backend
  const { data, isLoading, error } = useStockDetail(ticker);
  const [isWatchlist, setIsWatchlist] = React.useState(false);

  // Sinkronkan state lokal dengan data dari backend saat berhasil dimuat
  React.useEffect(() => {
    if (data) {
      setIsWatchlist(!!data.is_watchlist);
    }
  }, [data]);

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

  // 2. Serahkan data mentah ke Custom Hook untuk diproses
  const chartRawData = data?.chart_data || data?.chart_1M || [];
  const { activeFilter, setActiveFilter, filteredChartData, priceChange } =
    useChartFilter(chartRawData, data?.current_price);

  // --- Render Loading & Error ---
  if (isLoading)
    return (
      <div className="p-8 text-center text-text-muted font-medium animate-pulse">
        Memuat data {ticker}...
      </div>
    );
  if (error || !data)
    return (
      <div className="p-8 text-center text-error-500 font-bold">{error}</div>
    );

  // --- Render UI Utama ---
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full p-10"
    >
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
                {data.ticker}
              </h1>
              <p className="text-lg text-text-muted mb-1">{data.name}</p>
              <Badge
                variant="outline"
                className="bg-brand-50 text-brand border-brand hover:bg-brand-100 font-medium px-3 py-2 rounded-sm text-xs"
              >
                Sektor: {data.sector}
              </Badge>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleToggleWatchlist}
              className={`rounded-xl h-12 w-12 border-border-primary transition-all active:scale-95 ${isWatchlist
                  ? "bg-brand text-text-inverse border-brand hover:bg-brand-600"
                  : "text-text-subtle hover:text-text-primary bg-background-secondary hover:bg-border-secondary"
                }`}
            >
              <Bookmark className={`w-5 h-5 ${isWatchlist ? "fill-current" : ""}`} />
            </Button>
          </div>

          {/* 1b. HARGA SAHAM REALTIME */}
          <div className="flex items-end gap-2">
            <h2 className="text-4xl font-semibold text-text-primary tracking-tight">
              {formatCurrencyIDR(data.current_price)}
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
        </div>

        {/* KONTEN PELENGKAP - SEBELAH KANAN (5/12) */}
        <div className="xl:col-span-5 flex flex-col gap-4 relative">
          {/* 3a. WIDGET STATISTIK SAHAM */}
          <div className="bg-background-primary px-2">
            <h3 className="text-base font-medium text-text-secondary mb-2">
              Statistik Saham
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <StatCard
                title="Rata-rata tumbuh per tahun"
                value={data.cagr ? `${(data.cagr * 100).toFixed(1)}%` : "-"}
                tooltipText="Compound Annual Growth Rate (CAGR) dalam 3 tahun terakhir."
              />
              <StatCard
                title="Tingkat hutang perusahaan"
                value={data.der ? `${(data.der / 100).toFixed(1)}x` : "-"}
                tooltipText="Debt to Equity Ratio (DER). Di atas 1x berarti hutang lebih besar dari modal."
              />
              <StatCard
                title="Harga vs keuntungan"
                value={data.per ? `${data.per.toFixed(1)}x` : "-"}
                tooltipText="Price to Earnings Ratio (PER). Berapa kali lipat kamu membayar untuk laba perusahaan."
              />
              <StatCard
                title="Penghasilan tanpa jual saham"
                value={
                  data.dividend ? `${(data.dividend * 100).toFixed(1)}%` : "-"
                }
                tooltipText="Dividend Yield. Persentase keuntungan tunai tahunan yang dibagikan ke investor."
              />
              <StatCard
                title="Harga terendah tahun ini"
                value={formatCurrencyIDR(data.day_low || 4489)}
                tooltipText="Harga terendah dalam 52 minggu terakhir."
              />
              <StatCard
                title="Harga tertinggi tahun ini"
                value={formatCurrencyIDR(data.day_high || 9000)}
                tooltipText="Harga tertinggi dalam 52 minggu terakhir."
              />
            </div>
          </div>

          {/* 3b. WIDGET PERGERAKAN ANOMALI */}
          <div className="bg-background-primary px-2">
            <h3 className="text-base font-medium text-text-secondary mb-2">
              Pergerakan Anomali
            </h3>
            <AnomalyTable data={data.anomaly_history} />
          </div>

          {/* 3c. WIDGET RANGKUMAN PERUSAHAAN */}
          <div className="px-2">
            <h3 className="text-base font-medium text-text-secondary mb-2">Rangkuman</h3>
            <div className="max-h-37 overflow-y-auto"> {/* TAMBAH: max-h-40 overflow-y-auto */}
              <p className="text-sm text-text-muted leading-relaxed text-justify">
                {data.about_company}
              </p>
            </div>
          </div>

          {/* [KHUSUS DETAIL PASAR] 3d. TOMBOL AKSI BELI SAHAM */}
          <Button
            className="w-full h-10 bg-brand hover:bg-brand-800 active:bg-brand-900 text-text-inverse rounded-xl text-sm font-regular shadow-lg shadow-brand/20 transition-all duration-200 cursor-pointer"
            onClick={() => navigate('/dashboard/simulation')}
          >
            Beli Saham Ini
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default StockDetailPage;
