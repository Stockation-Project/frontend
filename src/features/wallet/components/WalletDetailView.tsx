import React from "react";
import type { Portfolio, Activity, WalletStats } from "../types/wallet";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight, Landmark } from "lucide-react";
import ActivityHistory from "./ActivityHistory";

interface WalletDetailViewProps {
  portfolio: Portfolio | null;
  activities: Activity[];
  stats: WalletStats;
  filter: string;
  onFilterChange: (filter: string) => void;
  onTopUp: () => void;
  onWithdraw: () => void;
  isLoading?: boolean;
  isLoadingHistory?: boolean;
}

const WalletDetailView: React.FC<WalletDetailViewProps> = ({
  portfolio,
  activities,
  stats,
  filter,
  onFilterChange,
  onWithdraw,
  isLoading = false,
  isLoadingHistory = false,
}) => {
  // Skeleton loading state (initial fetch)
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-border-primary p-4 space-y-4">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-40 rounded-md" />
          <Skeleton className="h-3 w-64 rounded-md" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[72px] rounded-lg" />
          ))}
        </div>

        {/* Action Button Skeleton */}
        <Skeleton className="h-10 w-full rounded-xl" />

        {/* Activity History Skeleton */}
        <div className="pt-2 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-border-primary">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-7 w-52 rounded-lg" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 py-2 px-1">
              <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-3/4 rounded" />
                <Skeleton className="h-2.5 w-1/2 rounded" />
              </div>
              <div className="space-y-1.5 text-right">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-2.5 w-12 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-background-primary rounded-2xl border border-border-secondary shadow-sm">
        <Landmark className="w-16 h-16 text-text-subtle mb-4" />
        <h3 className="text-xl font-bold text-text-primary mb-2">Pilih Portofolio</h3>
        <p className="text-text-muted max-w-xs">
          Silakan pilih salah satu portofolio di sisi kiri untuk melihat detail transaksi dan saldo.
        </p>
      </div>
    );
  }

  const statItems = [
    {
      label: "Total Saldo",
      value: formatCurrencyIDR(stats.totalBalance),
    },
    {
      label: "Saldo tersedia",
      value: formatCurrencyIDR(stats.availableBalance),
    },
    {
      label: "Saldo Terpakai",
      value: formatCurrencyIDR(stats.investedBalance),
    },
    {
      label: "Jumlah Lembar Saham",
      value: `${stats.totalStocks.toLocaleString("id-ID")}`,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-border-primary p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-medium text-brand">{portfolio.name}</h2>
          <p className="text-xs text-text-muted font-regular tracking-wide">
            <span className="uppercase">{portfolio.id}</span>
            {" • Dibuat "}
            {new Date(portfolio.updated_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {statItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-b from-brand-50 to-brand-25 p-4 rounded-lg border border-brand/30"
            style={{ borderColor: 'var(--color-brand-300)' }}
          >
            <p className="text-xs font-medium text-text-muted mb-1 tracking-tight">
              {item.label}
            </p>
            <p className="text-base font-semibold text-text-primary">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex md:grid-cols-2 gap-4">
        <Button
          onClick={onWithdraw}
          variant="outline"
          className="w-full border-brand text-brand hover:text-white hover:bg-brand rounded-xl h-10 px-6 font-medium active:scale-95 transition-all"
        >
          <ArrowUpRight className="w-5 h-5 mr-2 stroke-[2.5]" />
          Tarik ke Utama
        </Button>
      </div>

      {/* History */}
      <div className="pt-2 border-border-primary">
        <ActivityHistory
          activities={activities}
          currentFilter={filter}
          onFilterChange={onFilterChange}
          isLoading={isLoadingHistory}
        />
      </div>
    </div>
  );
};

export default WalletDetailView;
