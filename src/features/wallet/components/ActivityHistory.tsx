import React from "react";
import type { Activity } from "../types/wallet";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import { formatDate } from "@/lib/utils/formatDate";
import {
  ArrowUpRight,
  ArrowDownLeft,
  ArrowDownFromLine,
  ArrowLeftRight,
  Plus,
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
        return <Plus className="stroke-[1.5px] w-full h-full text-brand bg-gradient-to-b from-brand-100 to-brand-50 p-2 rounded-lg" />;
      case "ALLOCATE":
        return <ArrowLeftRight className="stroke-[1.5px] w-full h-full text-warning-700 bg-gradient-to-b from-warning-100 to-warning-50 p-2 rounded-lg" />;
      case "WITHDRAW":
        return <ArrowDownFromLine className="stroke-[1.5px] w-full h-full text-brand bg-gradient-to-b from-blue-100 to-blue-50 p-2 rounded-lg" />;
      case "BUY":
        return <ArrowUpRight className="stroke-[1.5px] w-full h-full text-brand bg-gradient-to-b from-brand-100 to-brand-50 p-2 rounded-lg" />;
      case "SELL":
        return <ArrowDownLeft className="stroke-[1.5px] w-full h-full text-error-700 bg-gradient-to-b from-error-100 to-error-50 p-2 rounded-lg" />;
      default:
        return <Plus className="stroke-[1.5px] w-full h-full text-slate-400 w-5 h-5" />;
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
    <div className="space-y-3 h-[300px] overflow-y-auto">
      <div className="flex items-center justify-between pb-2 border-b border-border-primary">
        <h3 className="text-sm font-medium text-slate-500">Riwayat Mutasi</h3>
        <div className="flex gap-1 bg-border-secondary p-1 rounded-xl">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentFilter === f.value
                  ? "bg-background-primary text-slate-900 shadow-sm"
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
            <div key={date} className="space-y-0">
              <h4 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                {date}
              </h4>
              <div className="space-y-0 divide-y divide-slate-50 border-t border-b border-slate-50">
                {items.map((activity) => (
                  <div
                    key={activity.id}
                    className="py-2 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center">
                        {getIcon(activity.type)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {activity.description}
                        </p>
                        {activity.metadata && (
                          <p className="text-xs text-slate-400 font-regular">
                            {activity.metadata.shares / 100} Lot . {formatCurrencyIDR(activity.metadata.price || 0)}/lembar
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-medium ${getAmountColor(
                          activity.type
                        )}`}
                      >
                        {activity.type === "BUY" || activity.type === "WITHDRAW"
                          ? "-"
                          : "+"}
                        {formatCurrencyIDR(activity.amount)}
                      </p>
                      <p className="text-[10px] font-regular text-slate-400">
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
