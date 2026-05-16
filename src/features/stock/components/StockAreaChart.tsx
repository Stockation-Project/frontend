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
import type { ChartData } from "../types/stock";

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

    const colorClass = isPositive ? "text-brand" : "text-error-500";

    return (
      <div className="bg-background-primary p-2 border border-border-primary rounded-lg shadow-lg">
        <p className="text-xs text-slate-500 font-medium mb-1">{date}</p>
        <p className={`text-sm font-semibold ${colorClass}`}>
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

  const themeColor = isPositive ? "var(--color-brand)" : "var(--color-error-500)";

  return (
    <div className="w-full bg-background-primary border border-border-primary rounded-xl pl-4 py-4">
      <div className="flex justify-end mb-6 mr-4">
        <div className="bg-background-secondary p-1 rounded-xl border border-border-secondary flex overflow-x-auto no-scrollbar">
          {TIME_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-2.5 py-1.5 text-xs font-Regular rounded-lg transition-all whitespace-nowrap ${
                activeFilter === filter
                  ? "bg-background-primary text-slate-800 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={themeColor} stopOpacity={0.4} />
                <stop offset="95%" stopColor={themeColor} stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              stroke="rgba(148, 163, 184, 0.2)"
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
              strokeWidth={1.7}
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
