import React from "react";
import type { Activity } from "../types/wallet";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import { formatDate } from "@/lib/utils/formatDate";
import { Skeleton } from "@/components/ui/skeleton";
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
  isLoading?: boolean;
}

const ActivitySkeleton: React.FC = () => (
  <div className="space-y-1 pt-2">
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
);

const ActivityHistory: React.FC<ActivityHistoryProps> = ({
  activities,
  currentFilter,
  onFilterChange,
  isLoading = false,
}) => {
  const filters = [
    { label: "Semua", value: "all" },
    { label: "Beli", value: "BUY" },
    { label: "Jual", value: "SELL" },
    { label: "Alokasi", value: "ALLOCATE" },
    { label: "Tarik Dana", value: "WITHDRAW" },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "TOP_UP":
        return <Plus className="stroke-[1.5px] w-full h-full text-warning-700 bg-gradient-to-b from-warning-100 to-warning-50 p-2 rounded-lg" />;
      case "ALLOCATE":
        return <ArrowLeftRight className="stroke-[1.5px] w-full h-full text-warning-700 bg-gradient-to-b from-warning-100 to-warning-50 p-2 rounded-lg" />;
      case "WITHDRAW":
        return <ArrowDownFromLine className="stroke-[1.5px] w-full h-full text-blue-500 bg-gradient-to-b from-blue-100 to-blue-50 p-2 rounded-lg" />;
      case "BUY":
        return <ArrowUpRight className="stroke-[1.5px] w-full h-full text-brand bg-gradient-to-b from-brand-100 to-brand-50 p-2 rounded-lg" />;
      case "SELL":
        return <ArrowDownLeft className="stroke-[1.5px] w-full h-full text-error-700 bg-gradient-to-b from-error-100 to-error-50 p-2 rounded-lg" />;
      default:
        return <Plus className="stroke-[1.5px] w-full h-full text-text-subtle p-2" />;
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
    <div className="space-y-3 h-[310px] overflow-hidden flex flex-col">
      {/* Header Responsif: Bertumpuk di mobile, sejajar di desktop */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-border-primary flex-shrink-0">
        <h3 className="text-xs sm:text-sm font-semibold text-text-muted">Riwayat Mutasi</h3>
        <div className="flex gap-0.5 bg-border-secondary p-0.5 rounded-lg overflow-x-auto no-scrollbar max-w-full">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`px-2 py-1 sm:px-3 sm:py-1 rounded-md text-[10px] sm:text-xs font-semibold transition-all whitespace-nowrap ${
                currentFilter === f.value
                  ? "bg-background-primary text-text-primary shadow-sm"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 overflow-y-auto flex-1 pb-4 pr-1 scrollbar-thin">
        {isLoading ? (
          <ActivitySkeleton />
        ) : Object.keys(grouped).length === 0 ? (
          <div className="py-8 text-center text-text-subtle text-xs sm:text-sm italic">
            Tidak ada riwayat aktivitas
          </div>
        ) : (
          Object.entries(grouped).map(([date, items]) => (
            <div key={date} className="space-y-1 mt-2 first:mt-0">
              <h4 className="text-[9px] font-semibold text-text-subtle uppercase tracking-wider">
                {date}
              </h4>
              <div className="space-y-0 divide-y divide-border-primary border-t border-b border-border-primary">
                {items.map((activity) => (
                  <div
                    key={activity.id}
                    className="py-2 flex items-center justify-between hover:bg-background-secondary/40 transition-colors px-1"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                        {getIcon(activity.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium text-text-primary truncate max-w-[150px] sm:max-w-none">
                          {activity.description}
                        </p>
                        {activity.metadata && (
                          <p className="text-[10px] sm:text-xs text-text-muted font-regular truncate">
                            {activity.metadata.shares / 100} Lot . {formatCurrencyIDR(activity.metadata.price || 0)}/lembar
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 pl-2">
                      <p
                        className={`text-xs sm:text-sm font-semibold ${getAmountColor(
                          activity.type
                        )}`}
                      >
                        {activity.type === "BUY" || activity.type === "WITHDRAW"
                          ? "-"
                          : "+"}
                        {formatCurrencyIDR(activity.amount)}
                      </p>
                      <p className="text-[9px] sm:text-[10px] font-regular text-text-subtle">
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
