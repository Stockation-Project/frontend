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

      {/* Bagian Atas: Donut Chart & Info Total */}
      <div className="flex gap-8 md:gap-30 lg:gap-8 mb-6 justify-center">
        {/* Donut Chart SVG */}
        <div className="relative w-40 h-40 flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 112 112" preserveAspectRatio="xMidYMid meet">
            {/* Background Circle (Abu-abu) */}
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke="currentColor"
              strokeWidth="7"
              fill="transparent"
              className="text-slate-100"
            />
            {/* Progress Circle (Hijau) */}
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

          {/* Teks di tengah Donut Chart */}
          <div className="absolute text-center flex flex-col items-center justify-center">
            <span className="text-xl font-semibold text-slate-900 leading-none">
              {Math.round(percentage)}%
            </span>
            <span className="text-[10px] text-slate-500 font-regular">
              Teralokasi
            </span>
          </div>
        </div>

        {/* Info Total Alokasi (Kanan) */}
        <div className="flex flex-col justify-start items-start">
          <span className="text-xs font-medium text-slate-800 mb-1">
            Total Alokasi
          </span>
          <div className="flex items-baseline">
            <span className="text-2xl font-semibold text-slate-900 leading-none">
              {formatJT(totalAllocated).replace("JT", "")}
            </span>
            <span className="text-sm font-bold text-slate-900">JT</span>
          </div>
          <span className="text-[10px] text-slate-400 font-regular">
            dari {formatJT(totalWallet)}
          </span>
        </div>
      </div>

      {/* Bagian Bawah: Daftar Detail Alokasi per Dompet */}
      <div className="space-y-4 max-h-[140px] overflow-y-auto no-scrollbar pr-1 pb-1">
        {allocations.map((item) => {
          const itemPercentage = (item.amount / totalWallet) * 100;
          return (
            <div key={item.id} className="w-full">
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs font-regular text-slate-600">
                  {item.name}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  {formatJT(item.amount)}
                </span>
              </div>
              <MiniProgressBar percentage={itemPercentage} colorClass={item.color} />
            </div>
          );
        })}

        {/* Jika belum ada alokasi sama sekali */}
        {allocations.length === 0 && (
          <div className="text-center py-4 text-xs text-slate-400">
            Belum ada dana yang dialokasikan.
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletSummary;
