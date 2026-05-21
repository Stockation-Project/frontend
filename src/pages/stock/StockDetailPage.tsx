import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { useStockDetail, useChartFilter, StockAreaChart, AnomalyTable, StockDetailSkeleton } from "@/features/stock";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import StatCard from "@/components/shared/cards/StatCard";
import { Button } from "@/components/ui/button";
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
  
  if (!isWatchlist) {
    toast.success(`${ticker} Masuk ke watchlist`, {
      description: `${ticker} telah ditambahkan ke daftar pantauan Anda.`,
    });
  } else {
    toast.success(`${ticker} Dihapus dari Watchlist`, {
      description: `${ticker} telah dihapus dari daftar pantauan Anda.`,
    });
  }
}
    } catch (err: any) {
      toast.error("Gagal memperbarui watchlist", {
        description: "Terjadi kesalahan. Silakan coba lagi nanti.",
      });
    }
  };

  const handleBuy = () => {
    if (!data) return;
    navigate("/simulation", {
      state: {
        prefillStock: {
          ticker: data.ticker,
          name: data.name,
          currentPrice: data.current_price,
        },
      },
    });
  };

  const chartRawData = data?.chart_data || data?.chart_1M || [];
  const { activeFilter, setActiveFilter, filteredChartData, priceChange } =
    useChartFilter(chartRawData, data?.current_price);

  if (isLoading) return <StockDetailSkeleton />;

  if (error || !data)
    return (
      <div className="p-8 text-center text-error-500 font-bold">{error}</div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full h-full flex flex-col overflow-hidden"
    >
      <PageHeader
        title=""
        showBackButton={true}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 flex-1 min-h-0 overflow-y-auto xl:overflow-hidden p-4 pb-6 no-scrollbar">
        <div className="xl:col-span-7 flex flex-col gap-6 xl:h-full xl:overflow-y-auto pr-2 pb-6 scrollbar-thin">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary mb-0.5 tracking-tight">
                {data.ticker}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-text-muted mb-1">{data.name}</p>
              <span
                className="inline-block px-2.5 py-0.5 text-[10px] font-medium bg-gradient-to-b from-brand-100 to-brand-25 text-brand border border-brand rounded-full whitespace-nowrap"
              >
                Sektor: {data.sector || "Umum"}
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
          <div className="flex items-end gap-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text-primary tracking-tight leading-none">
              {formatCurrencyIDR(data.current_price)}
            </h2>
            <span
              className={`text-xs sm:text-sm font-semibold mb-0.5 ${priceChange.isPositive ? "text-brand" : "text-error-500"}`}
            >
              {priceChange.isPositive ? "▲" : "▼"} {priceChange.percent}%
            </span>
          </div>

          <StockAreaChart
            data={filteredChartData}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            isPositive={priceChange.isPositive}
          />
        </div>

        <div className="xl:col-span-5 flex flex-col gap-4 xl:h-full xl:overflow-y-auto pb-6 xl:pb-0 relative scrollbar-thin">
          <Button
            className="w-full h-10 bg-brand hover:bg-brand-950 active:bg-brand-900 text-text-inverse rounded-xl text-sm font-regular shadow-lg shadow-brand/20 transition-all duration-200 cursor-pointer"
            onClick={handleBuy}
          >
            Beli Saham Ini
          </Button>
          <div className="bg-background-primary">
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

          <div className="bg-background-primary">
            <h3 className="text-base font-medium text-text-secondary mb-2">
              Pergerakan Anomali
            </h3>
            <AnomalyTable data={data.anomaly_history} />
          </div>

          <div className="px-2">
            <h3 className="text-base font-medium text-text-secondary mb-2">Rangkuman</h3>
            <div className="max-h-37 overflow-y-auto"> 
              <p className="text-sm text-text-muted leading-relaxed text-justify">
                {data.about_company}
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
};

export default StockDetailPage;
