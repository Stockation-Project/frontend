import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Bookmark } from "lucide-react";

import { useStockDetail } from "@/hooks/useStockDetail";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import type { ChartData } from "@/types/stock";

import StatCard from "@/components/shared/cards/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StockAreaChart from "@/components/shared/charts/StockAreaChart";
import AnomalyTable from "@/components/shared/cards/AnomalyTable"; // Asumsi path table-mu

const StockDetailPage: React.FC = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useStockDetail(ticker);

  // State untuk filter waktu
  const [activeFilter, setActiveFilter] = useState("1bulan");

  // 1. Logika Pemotong Data Chart berdasarkan Filter
  const filteredChartData = useMemo(() => {
    // Note: Pastikan di tipe atau backend-mu namanya `chart_data` (atau ganti jadi chart_1M jika belum diubah)
    const rawData: ChartData[] = data?.chart_1M || [];
    if (!rawData.length) return [];

    const now = new Date();
    let startDate = new Date();

    switch (activeFilter) {
      case "1minggu":
        startDate.setDate(now.getDate() - 7);
        break;
      case "1bulan":
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "3bulan":
        startDate.setMonth(now.getMonth() - 3);
        break;
      case "6bulan":
        startDate.setMonth(now.getMonth() - 6);
        break;
      case "1tahun":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case "Semua":
        return rawData;
      default:
        startDate.setMonth(now.getMonth() - 1);
    }

    return rawData.filter((item) => new Date(item.date) >= startDate);
  }, [data, activeFilter]);

  // 2. Logika Penghitungan Persentase Dinamis
  const priceChange = useMemo(() => {
    if (!filteredChartData.length || !data?.current_price)
      return { percent: "0.00", isPositive: true };

    // Cari harga valid paling awal di rentang waktu yang dipilih
    const firstValidPoint = filteredChartData.find((d) => d.price !== null);
    const oldPrice = firstValidPoint?.price;

    if (!oldPrice) return { percent: "0.00", isPositive: true };

    const diff = data.current_price - oldPrice;
    const percent = (diff / oldPrice) * 100;

    return {
      percent: Math.abs(percent).toFixed(2),
      isPositive: percent >= 0,
    };
  }, [filteredChartData, data?.current_price]);

  if (isLoading)
    return (
      <div className="p-8 text-center text-slate-500 font-medium animate-pulse">
        Memuat data {ticker}...
      </div>
    );
  if (error || !data)
    return (
      <div className="p-8 text-center text-red-500 font-bold">{error}</div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full p-10"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate(-1)}
        className="mb-6 rounded-xl text-slate-600 hover:text-slate-900 border-slate-200 h-10 w-10"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-7 flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-1">
                {data.ticker}
              </h1>
              <p className="text-xl text-slate-600 mb-3">{data.name}</p>
              <Badge
                variant="outline"
                className="bg-green-50 text-[#329B0D] border-[#329B0D] hover:bg-green-100 font-semibold px-3 py-1 rounded-full text-xs"
              >
                Sektor: {data.sector}
              </Badge>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-2xl h-12 w-12 border-slate-200 text-slate-400 hover:text-slate-900 bg-slate-50 hover:bg-slate-100"
            >
              <Bookmark className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-end gap-4 mt-2">
            <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight">
              {formatCurrencyIDR(data.current_price)}
            </h2>
            {/* AREA PERSENTASE DINAMIS */}
            <span
              className={`text-lg font-bold mb-1 ${priceChange.isPositive ? "text-[#329B0D]" : "text-red-500"}`}
            >
              {priceChange.isPositive ? "▲" : "▼"} {priceChange.percent}%
            </span>
          </div>

          {/* AREA CHART DENGAN FILTER PROP */}
          <StockAreaChart
            data={filteredChartData}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            isPositive={priceChange.isPositive} 
          />
        </div>

        {/* ... sisa kolom kanan biarkan persis sama seperti sebelumnya ... */}
        <div className="xl:col-span-5 flex flex-col gap-8">
          <div className="bg-white p-6 md:p-8 border border-slate-200 rounded-[2rem] shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">
              Statistik Saham
            </h3>
            <div className="grid grid-cols-2 gap-4">
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

          <div className="bg-white p-6 md:p-8 border border-slate-200 rounded-[2rem] shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Pergerakan Anomali
            </h3>
            <AnomalyTable data={data.anomaly_history} />
          </div>

          <div className="px-2">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Rangkuman</h3>
            <p className="text-sm text-slate-500 leading-relaxed text-justify">
              {data.ai_summary}
            </p>
          </div>

          <Button className="w-full h-14 bg-[#329B0D] hover:bg-green-800 text-white font-bold text-lg rounded-2xl transition-all shadow-lg shadow-green-700/20 active:scale-[0.98]">
            Beli Saham Ini
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default StockDetailPage;
