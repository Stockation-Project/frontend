// src/components/shared/MiniProgressBar.tsx
import React from "react";

interface MiniProgressBarProps {
  /** Persentase pengisian bar (0–100) */
  percentage: number;
  /** Tailwind bg color class, contoh: "bg-green-700" */
  colorClass?: string;
  /** Tinggi bar dalam Tailwind class, contoh: "h-1.5" atau "h-2" */
  heightClass?: string;
}

/**
 * Progress bar mini yang digunakan untuk menampilkan alokasi dana/saham secara visual.
 * Digunakan di WalletSummary dan PortfolioCard.
 */
const MiniProgressBar: React.FC<MiniProgressBarProps> = ({
  percentage,
  colorClass = "bg-brand",
  heightClass = "h-1.5",
}) => {
  return (
    <div className={`w-full ${heightClass} bg-border-secondary rounded-full overflow-hidden`}>
      <div
        className={`h-full ${colorClass} rounded-full transition-all duration-500`}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      />
    </div>
  );
};

export default MiniProgressBar;
