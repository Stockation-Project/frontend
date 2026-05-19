import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PageHeader from "@/components/shared/layout/PageHeader";
import TransactionHistorySkeleton from "./TransactionHistorySkeleton";

const PortfolioStockDetailSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden animate-in fade-in duration-300">
      <PageHeader title="" showBackButton={true} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 flex-1 min-h-0 overflow-y-auto xl:overflow-hidden p-4 pb-6 no-scrollbar">
        {/* KOLOM KIRI */}
        <div className="xl:col-span-7 flex flex-col gap-6 xl:h-full pr-2 pb-6">
          {/* Info Emiten */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-8 w-32 rounded-lg" />
              <Skeleton className="h-5 w-64 rounded-md" />
              <Skeleton className="h-4 w-24 rounded-full mt-2" />
            </div>
            <Skeleton className="h-10 w-10 rounded-lg" />
          </div>

          {/* Harga Saham */}
          <div className="flex items-end gap-2 mt-2">
            <Skeleton className="h-10 w-48 rounded-lg" />
            <Skeleton className="h-5 w-16 mb-1 rounded-md" />
          </div>

          {/* Chart Area */}
          <div className="w-full h-[300px] sm:h-[400px]">
            <Skeleton className="w-full h-full rounded-xl" />
          </div>

          {/* Transaction History (reuse skeleton yang sudah ada) */}
          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="h-8 w-40 rounded-xl" />
            </div>
            <TransactionHistorySkeleton />
            <TransactionHistorySkeleton />
          </div>
        </div>

        {/* KOLOM KANAN */}
        <div className="xl:col-span-5 flex flex-col gap-4 xl:h-full pb-6 xl:pb-0">
          {/* Portfolio Position Widget */}
          <Skeleton className="w-full h-[140px] rounded-xl" />

          {/* Statistik Saham */}
          <div className="bg-background-primary mt-2">
            <Skeleton className="h-6 w-32 mb-4 rounded-md" />
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="w-full h24 h-24 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Pergerakan Anomali */}
          <div className="bg-background-primary mt-4">
            <Skeleton className="h-6 w-40 mb-4 rounded-md" />
            <Skeleton className="w-full h-[200px] rounded-xl" />
          </div>

          {/* Rangkuman */}
          <div className="mt-4 px-2">
            <Skeleton className="h-6 w-32 mb-4 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-11/12 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-4/5 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioStockDetailSkeleton;
