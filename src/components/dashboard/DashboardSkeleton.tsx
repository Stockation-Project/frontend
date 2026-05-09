// src/components/dashboard/DashboardSkeleton.tsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Full-page skeleton loader for the Dashboard.
 * Mirrors the actual dashboard layout (70/30 grid) so users
 * see a familiar structure while data is being fetched.
 */
const DashboardSkeleton: React.FC = () => {
  return (
    <div className="w-full animate-in fade-in duration-300">
      {/* Header Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-9 w-48 rounded-lg" />
        <Skeleton className="h-4 w-64 mt-2 rounded-md" />
      </div>

      {/* Grid Utama (70% Kiri, 30% Kanan) */}
      <div className="grid grid-cols-1 xl:grid-cols-10 gap-8">
        {/* KOLOM KIRI */}
        <div className="xl:col-span-7 space-y-8">
          {/* GlobalWalletCard Skeleton */}
          <Skeleton className="w-full h-[200px] rounded-[2rem]" />

          {/* PortfolioSection Skeleton */}
          <div>
            <Skeleton className="h-6 w-40 mb-4 rounded-md" />
            <div className="flex gap-4">
              <Skeleton className="min-w-[320px] h-[220px] rounded-[1.5rem]" />
              <Skeleton className="min-w-[320px] h-[220px] rounded-[1.5rem]" />
            </div>
          </div>

          {/* StockTable Skeleton */}
          <div>
            <Skeleton className="h-6 w-56 mb-4 rounded-md" />
            <div className="space-y-0 border-t border-slate-100">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-4 border-b border-slate-100 px-2"
                >
                  <div className="flex-1 min-w-[150px] space-y-2">
                    <Skeleton className="h-5 w-16 rounded-md" />
                    <Skeleton className="h-4 w-32 rounded-md" />
                  </div>
                  <div className="hidden md:flex flex-1 justify-center">
                    <Skeleton className="w-[60px] h-6 rounded-md" />
                  </div>
                  <div className="flex-1 flex justify-end">
                    <Skeleton className="h-5 w-20 rounded-md" />
                  </div>
                  <div className="flex-1 flex justify-end">
                    <Skeleton className="h-5 w-14 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KOLOM KANAN */}
        <div className="xl:col-span-3 space-y-8">
          {/* WalletSummary Skeleton */}
          <Skeleton className="w-full h-[280px] rounded-[2rem]" />

          {/* RiskProfileWidget Skeleton */}
          <Skeleton className="w-full h-[350px] rounded-[2rem]" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
