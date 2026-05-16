import React from "react";
import type { Portfolio, Activity, WalletStats } from "../types/wallet";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUpRight, Landmark, Edit3 } from "lucide-react";
import ActivityHistory from "./ActivityHistory";

interface WalletDetailViewProps {
  portfolio: Portfolio | null;
  activities: Activity[];
  stats: WalletStats;
  filter: string;
  onFilterChange: (filter: string) => void;
  onTopUp: () => void;
  onWithdraw: () => void;
}

const WalletDetailView: React.FC<WalletDetailViewProps> = ({
  portfolio,
  activities,
  stats,
  filter,
  onFilterChange,
  onTopUp,
  onWithdraw,
}) => {
  if (!portfolio) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-100 shadow-sm">
        <Landmark className="w-16 h-16 text-slate-200 mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">Pilih Portofolio</h3>
        <p className="text-slate-500 max-w-xs">
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
          <p className="text-xs text-slate-400 font-regular tracking-wide">
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
            className="bg-gradient-to-b from-brand-50 to-brand-25 p-4 rounded-lg border border-[#C8E6C9]/30"
          >
            <p className="text-xs font-medium text-slate-500 mb-1 tracking-tight">
              {item.label}
            </p>
            <p className="text-base font-semibold text-slate-900">{item.value}</p>
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
        />
      </div>
    </div>
  );
};

export default WalletDetailView;
