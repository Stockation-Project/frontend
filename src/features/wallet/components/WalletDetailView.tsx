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
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{portfolio.name}</h2>
          <p className="text-sm text-slate-400 font-medium">
            {portfolio.id} . Dibuat {new Date(portfolio.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
        <Button variant="outline" size="sm" className="h-8 px-3 rounded-lg border-slate-200 text-slate-600 text-xs gap-1">
          <Edit3 className="w-3.5 h-3.5" />
          edit
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#E8F5E9] p-4 rounded-xl border border-[#C8E6C9]/30"
          >
            <p className="text-[10px] font-medium text-brand/70 mb-1 uppercase tracking-tight">
              {item.label}
            </p>
            <p className="text-base font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex md:grid-cols-2 gap-4">
        <Button
          onClick={onWithdraw}
          variant="outline"
          className="w-full border-brand text-brand hover:bg-brand/5 rounded-xl h-12 px-6 font-bold active:scale-95 transition-all"
        >
          <ArrowUpRight className="w-5 h-5 mr-2 stroke-[2.5]" />
          Tarik ke Utama
        </Button>
      </div>

      {/* History */}
      <div className="pt-4 border-t border-slate-100">
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
