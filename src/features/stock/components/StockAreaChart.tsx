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
        <p className="text-[10px] text-text-muted font-medium mb-0.5">{date}</p>
        <p className={`text-xs font-semibold ${colorClass}`}>
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
    <div className="w-full bg-background-primary border border-border-primary rounded-xl pl-3 pr-2 py-3">
      {/* Time Filter Tabs */}
      <div className="flex justify-end mb-4">
        <div className="bg-background-secondary p-0.5 rounded-lg border border-border-secondary flex overflow-x-auto no-scrollbar">
          {TIME_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-2 py-1 text-[10px] font-medium rounded-md transition-all whitespace-nowrap ${
                activeFilter === filter
                  ? "bg-background-primary text-text-primary shadow-sm"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Height: Lebih ramping dan proporsional untuk layout dua kolom */}
      <div className="w-full h-[240px] xl:h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={themeColor} stopOpacity={0.25} />
                <stop offset="95%" stopColor={themeColor} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              stroke="var(--color-border-secondary)"
            />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              tick={{ fontSize: 9, fill: "var(--color-text-muted)" }}
              axisLine={false}
              tickLine={false}
              dy={8}
              minTickGap={25}
            />
            <YAxis
              domain={["auto", "auto"]}
              tickFormatter={(value) =>
                formatCurrencyIDR(value).replace("Rp", "")
              }
              tick={{ fontSize: 9, fill: "var(--color-text-muted)" }}
              axisLine={false}
              tickLine={false}
              dx={-8}
            />

            <Tooltip content={<CustomTooltip isPositive={isPositive} />} />

            <Area
              type="linear"
              dataKey="price"
              stroke={themeColor}
              strokeWidth={1.5}
              fillOpacity={1}
              fill="url(#colorPrice)"
              connectNulls={true}
              activeDot={{ r: 5, strokeWidth: 0, fill: themeColor }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockAreaChart;
