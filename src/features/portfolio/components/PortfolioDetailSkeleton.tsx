// src/components/portfolio/PortfolioDetailSkeleton.tsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const PortfolioDetailSkeleton: React.FC = () => {
  return (
    <div className="w-full animate-in fade-in duration-300">
      {/* Header Skeleton (PageHeader) */}
      <div className="mb-8">
        <Skeleton className="h-10 w-10 rounded-xl mb-4" />
        <Skeleton className="h-9 w-56 rounded-lg" />
        <Skeleton className="h-4 w-80 mt-2 rounded-md" />
      </div>

      {/* Portfolio Slider Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-6 w-40 mb-4 rounded-md" />
        <div className="flex gap-4">
          <Skeleton className="min-w-[320px] h-[200px] rounded-xl" />
          <Skeleton className="min-w-[320px] h-[200px] rounded-xl" />
        </div>
      </div>

      {/* Detail Card Skeleton */}
      <div>
        <Skeleton className="h-6 w-40 mb-4 rounded-md" />
        <div className="border border-border-primary rounded-xl overflow-hidden">
          {/* Card Header */}
          <div className="p-5 border-b border-border-secondary">
            <div className="flex items-start gap-3 mb-4">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-40 rounded-md" />
                <Skeleton className="h-3 w-60 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-2 w-full rounded-full mb-2" />
            <div className="flex gap-3">
              <Skeleton className="h-3 w-16 rounded-md" />
              <Skeleton className="h-3 w-16 rounded-md" />
              <Skeleton className="h-3 w-16 rounded-md" />
            </div>
          </div>

          {/* Table Rows */}
          <div className="p-4 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-4 items-center py-3 border-b border-border-secondary"
              >
                <div className="col-span-3 space-y-2">
                  <Skeleton className="h-4 w-14 rounded-md" />
                  <Skeleton className="h-3 w-28 rounded-md" />
                </div>
                <div className="col-span-3 flex justify-end">
                  <Skeleton className="h-4 w-24 rounded-md" />
                </div>
                <div className="col-span-2 flex justify-center">
                  <Skeleton className="h-4 w-14 rounded-md" />
                </div>
                <div className="col-span-2 flex justify-end">
                  <Skeleton className="h-4 w-16 rounded-md" />
                </div>
                <div className="col-span-2 flex justify-center">
                  <Skeleton className="h-8 w-16 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetailSkeleton;
