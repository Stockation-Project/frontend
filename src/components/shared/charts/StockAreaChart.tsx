import React from "react";
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
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  isPositive: boolean; 
}

export const TIME_FILTERS = [
  "1minggu",
  "1bulan",
  "3bulan",
  "6bulan",
  "1tahun",
  "Semua",
];

const CustomTooltip = ({ active, payload, label, isPositive }: any) => {
  if (active && payload && payload.length) {
    const date = new Date(label).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const colorClass = isPositive ? "text-[#329B0D]" : "text-red-500";

    return (
      <div className="bg-white p-3 border border-slate-200 rounded-xl shadow-lg">
        <p className="text-xs text-slate-500 font-medium mb-1">{date}</p>
        <p className={`text-base font-extrabold ${colorClass}`}>
          {formatCurrencyIDR(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const StockAreaChart: React.FC<StockAreaChartProps> = ({
  data,
  activeFilter,
  onFilterChange,
  isPositive, 
}) => {
  const formatXAxis = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  const themeColor = isPositive ? "#329B0D" : "#EF4444";

  return (
    <div className="w-full bg-white border border-slate-200 rounded-[2rem] p-6 mt-4 shadow-sm">
      <div className="flex justify-end mb-6">
        <div className="bg-slate-50 p-1 rounded-xl border border-slate-100 flex gap-1 overflow-x-auto no-scrollbar">
          {TIME_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
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

      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={themeColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={themeColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              dy={10}
              minTickGap={30}
            />
            <YAxis
              domain={["auto", "auto"]}
              tickFormatter={(value) =>
                formatCurrencyIDR(value).replace("Rp", "")
              }
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              dx={-10}
            />

            <Tooltip content={<CustomTooltip isPositive={isPositive} />} />

            <Area
              type="linear"
              dataKey="price"
              stroke={themeColor} 
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorPrice)"
              connectNulls={true}
              activeDot={{ r: 6, strokeWidth: 0, fill: themeColor }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockAreaChart;
