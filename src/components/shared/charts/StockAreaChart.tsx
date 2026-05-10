import React, { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import type { ChartData } from "@/types/stock";

interface StockAreaChartProps {
  data: ChartData[];
}

const TIME_FILTERS = ["1bulan", "3bulan", "6bulan", "1tahun", "Semua"];

// Komponen Tooltip Kustom (Agar saat di-hover tampilannya elegan)
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const date = new Date(label).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return (
      <div className="bg-white p-3 border border-slate-200 rounded-xl shadow-lg">
        <p className="text-xs text-slate-500 font-medium mb-1">{date}</p>
        <p className="text-base font-extrabold text-[#329B0D]">
          {formatCurrencyIDR(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const StockAreaChart: React.FC<StockAreaChartProps> = ({ data }) => {
  const [activeFilter, setActiveFilter] = useState("1bulan");

  // Format tanggal untuk sumbu X (misal: "20 Okt")
  const formatXAxis = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-[2rem] p-6 mt-4 shadow-sm">
      {/* Header Grafik (Filter Waktu) */}
      <div className="flex justify-end mb-6">
        <div className="bg-slate-50 p-1 rounded-xl border border-slate-100 flex gap-1">
          {TIME_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeFilter === filter
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Area Recharts */}
      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
          >
            {/* Definisi Gradient Warna Hijau */}
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#329B0D" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#329B0D" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Garis Bantu Horizontal (Samar-samar) */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />

            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              tick={{ fontSize: 11, fill: "#94a3b8" }} // text-slate-400
              axisLine={false}
              tickLine={false}
              dy={10}
              // Hanya tampilkan 5 titik tanggal agar tidak kepenuhan
              minTickGap={30}
            />

            <YAxis
              domain={["auto", "auto"]} // Skala otomatis menyesuaikan harga terendah & tertinggi
              tickFormatter={(value) =>
                formatCurrencyIDR(value).replace("Rp", "")
              }
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              dx={-10}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="price"
              stroke="#329B0D"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorPrice)"
              connectNulls={true} // <--- INI PENTING! Untuk menyambung garis saat hari libur (price: null)
              activeDot={{ r: 6, strokeWidth: 0, fill: "#329B0D" }} // Titik tebal saat dihover
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockAreaChart;
