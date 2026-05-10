// src/components/dashboard/WalletSummary.tsx
import React from "react";

// Struktur data dummy untuk komponen ini
interface AllocationDetail {
  id: string;
  name: string;
  amount: number; // Dalam Rupiah asli
  color: string; // Warna progress bar
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

  // Format angka ke format "JT" (Juta) agar ringkas seperti di desain
  const formatJT = (angka: number) => {
    return `${(angka / 1000000).toLocaleString("id-ID")}JT`;
  };

  // Pengaturan SVG Donut Chart
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-full bg-white border border-slate-100 rounded-[2rem] p-6 lg:p-8 shadow-sm">
      <h3 className="text-base font-medium text-slate-600 mb-2">
        Ringkasan Dompet
      </h3>

      {/* Bagian Atas: Donut Chart & Info Total */}
      <div className="flex items-center gap-6 mb-8">
        {/* Donut Chart SVG */}
        <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            {/* Background Circle (Abu-abu) */}
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              className="text-slate-100"
            />
            {/* Progress Circle (Hijau) */}
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="text-[#329B0D] transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>

          {/* Teks di tengah Donut Chart */}
          <div className="text-center z-10 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-slate-900 leading-none">
              {Math.round(percentage)}%
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              Teralokasi
            </span>
          </div>
        </div>

        {/* Info Total Alokasi (Kanan) */}
        <div className="flex flex-col justify-center">
          <span className="text-xs font-bold text-slate-800 mb-1">
            Total Alokasi
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-slate-900 leading-none">
              {formatJT(totalAllocated).replace("JT", "")}
            </span>
            <span className="text-sm font-bold text-slate-900">JT</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium mt-1">
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
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-xs font-medium text-slate-600">
                  {item.name}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {formatJT(item.amount)}
                </span>
              </div>
              {/* Progress Bar Mini */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full`}
                  style={{ width: `${itemPercentage}%` }}
                />
              </div>
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
