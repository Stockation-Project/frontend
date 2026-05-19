import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PageHeader from "@/components/shared/layout/PageHeader";

const SimulationBuySkeleton: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden animate-in fade-in duration-300">
      <PageHeader title="" showBackButton={true} />

      <div className="w-full mx-auto flex-1 overflow-y-auto p-4 pb-6 no-scrollbar">
        {/* SECTION 1: Pilih Dompet */}
        <div className="flex flex-col py-2 gap-2">
          <Skeleton className="h-4 w-24 mb-1 rounded" />
          <div className="flex gap-4 overflow-hidden pb-4">
            <Skeleton className="min-w-[200px] h-24 rounded-xl" />
            <Skeleton className="min-w-[200px] h-24 rounded-xl" />
            <Skeleton className="min-w-[200px] h-24 rounded-xl" />
          </div>
        </div>

        {/* SECTION 2: Tabs */}
        <div className="mt-4">
          <div className="flex border-b border-border-primary mb-4 gap-4 pb-2">
            <Skeleton className="h-6 w-32 rounded" />
            <Skeleton className="h-6 w-32 rounded" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full mt-4">
            {/* Kolom Kiri: Explore & Search */}
            <div className="xl:col-span-4 w-full flex flex-col gap-4">
              <Skeleton className="h-[500px] w-full rounded-2xl" />
            </div>

            {/* Kolom Tengah: Cart */}
            <div className="xl:col-span-4 w-full flex flex-col gap-4">
              <Skeleton className="h-[500px] w-full rounded-2xl" />
            </div>

            {/* Kolom Kanan: Summary */}
            <div className="xl:col-span-4 w-full flex flex-col gap-4">
              <Skeleton className="h-[500px] w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationBuySkeleton;
