// src/features/stock/hooks/useChartFilter.ts
import { useState, useMemo } from "react";
import type { ChartData } from "../types/stock";

export const useChartFilter = (
  rawData: ChartData[] = [],
  currentPrice?: number,
) => {
  const [activeFilter, setActiveFilter] = useState("1bulan");

  // 1. Logika Pemotong Data Chart
  const filteredChartData = useMemo(() => {
    const cleanData = rawData.filter(
      (item: any) => item.price !== null && item.price !== undefined,
    );

    if (!cleanData.length) return [];

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
        return cleanData;
      default:
        startDate.setMonth(now.getMonth() - 1);
    }

    const result = cleanData.filter((item) => new Date(item.date) >= startDate);

    if (result.length < 2) {
      return cleanData.slice(-2);
    }

    return result;
  }, [rawData, activeFilter]);

  // 2. Logika Penghitungan Persentase Dinamis
  const priceChange = useMemo(() => {
    if (!filteredChartData.length || !currentPrice)
      return { percent: "0.00", isPositive: true };

    const firstValidPoint = filteredChartData.find((d) => d.price !== null);
    const oldPrice = firstValidPoint?.price;

    if (!oldPrice) return { percent: "0.00", isPositive: true };

    const diff = currentPrice - oldPrice;
    const percent = (diff / oldPrice) * 100;

    return {
      percent: Math.abs(percent).toFixed(2),
      isPositive: percent >= 0,
    };
  }, [filteredChartData, currentPrice]);

  return {
    activeFilter,
    setActiveFilter,
    filteredChartData,
    priceChange,
  };
};
