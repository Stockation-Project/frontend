import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { useStockDetail } from "@/hooks/useStockDetail";
import { useChartFilter } from "@/hooks/useChartFilter";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import StatCard from "@/components/shared/cards/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StockAreaChart from "@/components/shared/charts/StockAreaChart";
import AnomalyTable from "@/components/shared/cards/AnomalyTable";
import PageHeader from "@/components/shared/layout/PageHeader";

const StockDetailPage: React.FC = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const navigate = useNavigate();

  // 1. Ambil data dari Backend
  const { data, isLoading, error } = useStockDetail(ticker);

  // 2. Serahkan data mentah ke Custom Hook untuk diproses
  const chartRawData = data?.chart_data || data?.chart_1M || [];
  const { activeFilter, setActiveFilter, filteredChartData, priceChange } =
    useChartFilter(chartRawData, data?.current_price);

  // --- Render Loading & Error ---
  if (isLoading)
    return (
      <div className="p-8 text-center text-slate-500 font-medium animate-pulse">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 mb-0.5 tracking-tight">
                {data.ticker}
              </h1>
              <p className="text-lg text-slate-600 mb-1">{data.name}</p>
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
              className="rounded-xl h-12 w-12 border-border-primary text-slate-400 hover:text-slate-900 bg-background-secondary hover:bg-border-secondary"
            >
              <Bookmark className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-end gap-2">
            <h2 className="text-4xl font-semibold text-slate-900 tracking-tight">
              {formatCurrencyIDR(data.current_price)}
            </h2>
            <span
              className={`text-sm sm:text-md font-semibold mb-1 ${priceChange.isPositive ? "text-brand" : "text-error-500"}`}
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

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-background-primary px-2">
            <h3 className="text-base font-medium text-slate-600 mb-2">
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
            </div>
          </div>

          <div className="bg-background-primary px-2">
            <h3 className="text-base font-medium text-slate-600 mb-2">
              Pergerakan Anomali
            </h3>
            <AnomalyTable data={data.anomaly_history} />
          </div>

          <div className="px-2">
            <h3 className="text-base font-medium text-slate-600 mb-2">Rangkuman</h3>
            <div className="max-h-37 overflow-y-auto"> {/* TAMBAH: max-h-40 overflow-y-auto */}
              <p className="text-sm text-slate-500 leading-relaxed text-justify">
                {data.about_company}
              </p>
            </div>
          </div>

          <Button 
            className="w-full h-10 bg-brand hover:bg-brand-800 active:bg-brand-900 text-white rounded-xl text-sm font-regular shadow-lg shadow-brand/20 transition-all duration-200 cursor-pointer"
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
