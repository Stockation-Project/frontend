// src/features/stock/components/RiskToleranceSlider.tsx
import React from "react";
import { ShieldCheck, Flame, RotateCcw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskToleranceSliderProps {
  /** Nilai slider saat ini (0.0 = paling aman, 1.0 = paling agresif) */
  value: number;
  /** Nilai default berdasarkan profil risiko user */
  defaultValue: number;
  /** Apakah user sudah menggeser slider dari default */
  isCustomized: boolean;
  /** Dipanggil setiap nilai slider berubah */
  onChange: (value: number) => void;
  /** Reset ke default profil risiko */
  onReset: () => void;
  /** Nonaktifkan saat proses optimasi berjalan */
  disabled?: boolean;
}

/**
 * Memetakan nilai toleransi (0–1) ke label tingkat risiko yang ramah awam.
 */
const getToleranceLabel = (value: number): { label: string; tone: string } => {
  if (value <= 0.2) return { label: "Sangat Hati-hati", tone: "text-brand" };
  if (value <= 0.4) return { label: "Hati-hati", tone: "text-brand" };
  if (value <= 0.6) return { label: "Seimbang", tone: "text-brand-700" };
  if (value <= 0.8) return { label: "Berani", tone: "text-warning-700" };
  return { label: "Sangat Berani", tone: "text-error-600" };
};

const RiskToleranceSlider: React.FC<RiskToleranceSliderProps> = ({
  value,
  defaultValue,
  isCustomized,
  onChange,
  onReset,
  disabled = false,
}) => {
  const percent = Math.round(value * 100);
  const { label, tone } = getToleranceLabel(value);

  return (
    <div className="p-4 bg-background-primary border border-border-primary rounded-xl shadow-sm flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand" />
          <h4 className="text-xs font-medium text-text-primary">
            Atur Tingkat Risiko (Mean-CVaR)
          </h4>
        </div>
        {isCustomized && (
          <button
            type="button"
            onClick={onReset}
            disabled={disabled}
            className="flex items-center gap-1 text-[10px] font-medium text-text-muted hover:text-brand transition-colors disabled:opacity-50"
          >
            <RotateCcw className="w-3 h-3" />
            Reset ke profil
          </button>
        )}
      </div>

      {/* Status label */}
      <div className="flex items-center justify-between">
        <span className={cn("text-sm font-bold", tone)}>{label}</span>
        <span className="text-xs font-medium text-text-muted">{percent}%</span>
      </div>

      {/* Slider */}
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-brand flex-shrink-0" />
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={percent}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value) / 100)}
          className={cn(
            "flex-1 h-3 rounded-full appearance-none cursor-pointer",
            "bg-gradient-to-r from-brand-300 via-warning-300 to-error-300",
            "accent-brand disabled:cursor-not-allowed disabled:opacity-50",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4",
            "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background-primary",
            "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand [&::-webkit-slider-thumb]:shadow-md",
            "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:bg-background-primary [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-brand"
          )}
        />
        <Flame className="w-4 h-4 text-error-500 flex-shrink-0" />
      </div>

      {/* Keterangan */}
      <p className="text-[10px] text-text-secondary leading-relaxed text-justify">
        {isCustomized ? (
          <>
            Kamu mengatur sendiri tingkat risikonya. Geser ke{" "}
            <span className="font-medium text-brand">kiri</span> untuk meminimalkan
            potensi kerugian terburuk (CVaR), atau ke{" "}
            <span className="font-medium text-error-600">kanan</span> untuk mengejar
            potensi keuntungan lebih tinggi.
          </>
        ) : (
          <>
            Posisi default mengikuti profil risikomu. Geser untuk menyesuaikan
            sendiri seberapa besar risiko yang ingin kamu ambil.
          </>
        )}
      </p>
    </div>
  );
};

export default RiskToleranceSlider;
