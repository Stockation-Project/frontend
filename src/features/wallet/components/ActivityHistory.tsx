import React from "react";
import type { Activity } from "../types/wallet";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import { formatDate } from "@/lib/utils/formatDate";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ShoppingCart,
  Tag,
  PlusCircle,
} from "lucide-react";

interface ActivityHistoryProps {
  activities: Activity[];
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const ActivityHistory: React.FC<ActivityHistoryProps> = ({
  activities,
  currentFilter,
  onFilterChange,
}) => {
  const filters = [
    { label: "Semua", value: "all" },
    { label: "Beli", value: "BUY" },
    { label: "Jual", value: "SELL" },
    { label: "Alokasi", value: "ALLOCATE" },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "TOP_UP":
        return <PlusCircle className="text-brand w-5 h-5" />;
      case "ALLOCATE":
        return <ArrowDownCircle className="text-orange-400 w-5 h-5" />;
      case "WITHDRAW":
        return <ArrowUpCircle className="text-brand w-5 h-5" />;
      case "BUY":
        return <PlusCircle className="text-brand w-5 h-5 rotate-45" />; // placeholder icon style
      case "SELL":
        return <ArrowDownCircle className="text-error-500 w-5 h-5 rotate-180" />; // placeholder icon style
      default:
        return <PlusCircle className="text-slate-400 w-5 h-5" />;
    }
  };

  const getAmountColor = (type: string) => {
    if (type === "BUY" || type === "WITHDRAW") return "text-error-500";
    return "text-brand";
  };

  // Grouping logic
  const groupActivities = () => {
    const groups: Record<string, Activity[]> = {};
    const today = new Date().toLocaleDateString("id-ID");
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString("id-ID");

    activities.forEach((activity) => {
      const date = new Date(activity.created_at).toLocaleDateString("id-ID");
      let groupName = date;
      if (date === today) groupName = "Hari ini";
      else if (date === yesterday) groupName = "Kemarin";
      else {
        groupName = formatDate(new Date(activity.created_at));
      }

      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(activity);
    });
    return groups;
  };

  const grouped = groupActivities();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-800">Riwayat Mutasi</h3>
        <div className="flex gap-1 bg-[#F3F4F6] p-1 rounded-xl">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentFilter === f.value
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {Object.keys(grouped).length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm italic">
            Tidak ada riwayat aktivitas
          </div>
        ) : (
          Object.entries(grouped).map(([date, items]) => (
            <div key={date} className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {date}
              </h4>
              <div className="space-y-0 divide-y divide-slate-50 border-t border-b border-slate-50">
                {items.map((activity) => (
                  <div
                    key={activity.id}
                    className="py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                        {getIcon(activity.type)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {activity.description}
                        </p>
                        {activity.metadata && (
                          <p className="text-[11px] text-slate-400 font-medium">
                            {activity.metadata.shares / 100} Lot . {formatCurrencyIDR(activity.metadata.price || 0)}/lembar
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-bold ${getAmountColor(
                          activity.type
                        )}`}
                      >
                        {activity.type === "BUY" || activity.type === "WITHDRAW"
                          ? "-"
                          : "+"}
                        {formatCurrencyIDR(activity.amount)}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400">
                        {new Date(activity.created_at).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityHistory;
