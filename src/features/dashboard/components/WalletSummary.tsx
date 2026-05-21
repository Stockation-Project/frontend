import React from "react";
import { formatJT } from "@/lib/utils/formatCurrency";
import SectionHeader from "@/components/shared/SectionHeader";
import MiniProgressBar from "@/components/shared/MiniProgressBar";

interface AllocationDetail {
  id: string;
  name: string;
  amount: number;
  color: string;
}

interface WalletSummaryProps {
  totalWallet: number;
  allocations: AllocationDetail[];
}

const WalletSummary: React.FC<WalletSummaryProps> = ({
  totalWallet,
  allocations,
}) => {
  // Hitung total dana yang sudah dialokasikan
  const totalAllocated = allocations.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  // Hitung persentase untuk Donut Chart
  const percentage = totalWallet > 0 ? (totalAllocated / totalWallet) * 100 : 0;


  // Pengaturan SVG Donut Chart
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-full bg-background-primary border border-border-primary rounded-xl p-2 lg:p-4">
      <SectionHeader title="Ringkasan Dompet" className="mb-4" />

      {/* Container Donut Chart & Info Total */}
      <div className="flex gap-4 md:gap-30 lg:gap-4 mb-6 justify-center">
        {/* Donut Chart */}
        <div className="relative w-40 h-40 flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 112 112" preserveAspectRatio="xMidYMid meet">
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke="currentColor"
              strokeWidth="7"
              fill="transparent"
              className="text-border-secondary"
            />
            {/* Progress Circle */}
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke="currentColor"
              strokeWidth="7"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="text-brand transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>

          {/* Text mid */}
          <div className="absolute text-center flex flex-col items-center justify-center">
            <span className="text-xl font-semibold text-text-primary leading-none">
              {Math.round(percentage)}%
            </span>
            <span className="text-[10px] text-text-muted font-regular">
              Teralokasi
            </span>
          </div>
        </div>

        {/* Info Total Alokasi */}
        <div className="flex flex-col justify-start items-start min-w-0 overflow-hidden">
          <span className="text-xs font-medium text-text-primary mb-1 whitespace-nowrap">
            Total Alokasi
          </span>
          <div className="flex items-baseline flex-wrap">
            {(() => {
              const formattedValue = formatJT(totalAllocated).replace("JT", "").trim();
              const isLong = formattedValue.length >= 6;
              return (
                <>
                  <span className={`${isLong ? "text-xl" : "text-2xl"} font-semibold text-text-primary leading-none transition-all duration-300`}>
                    {formattedValue}
                  </span>
                  <span className={`${isLong ? "text-xs" : "text-sm"} font-bold text-text-primary ml-0.5`}>JT</span>
                </>
              );
            })()}
          </div>
          <span className="text-[10px] text-text-subtle font-regular truncate w-full">
            dari {formatJT(totalWallet)}
          </span>
        </div>
      </div>

      {/* Bar Detail Alokasi */}
      <div className="space-y-4 max-h-[140px] overflow-y-auto no-scrollbar pr-1 pb-1">
        {allocations.map((item) => {
          const itemPercentage = (item.amount / totalWallet) * 100;
          return (
            <div key={item.id} className="w-full">
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs font-regular text-text-secondary">
                  {item.name}
                </span>
                <span className="text-xs font-medium text-text-subtle">
                  {formatJT(item.amount)}
                </span>
              </div>
              <MiniProgressBar percentage={itemPercentage} colorClass={item.color} />
            </div>
          );
        })}

        {/* State */}
        {allocations.length === 0 && (
          <div className="text-center py-4 text-xs text-text-subtle">
            Belum ada dana yang dialokasikan.
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletSummary;
