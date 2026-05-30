import React, { useState } from "react";
import { Activity, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VolatilityData {
  forecast_10d: number;
  forecast_1m: number;
  forecast_3m: number;
}

interface VolatilityRiskCardProps {
  volatility: VolatilityData | null;
  stockSymbol: string;
}

type Horizon = "10d" | "1m" | "3m";

const VolatilityRiskCard: React.FC<VolatilityRiskCardProps> = ({
  volatility,
  stockSymbol,
}) => {
  const [activeHorizon, setActiveHorizon] = useState<Horizon>("10d");

  if (!volatility) {
    return (
      <div className="bg-background-primary rounded-xl border border-border-primary p-4 flex flex-col gap-4 mt-4 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-text-subtle" />
          <h3 className="text-base font-semibold text-text-secondary">
            Potensi Gejolak Harga (AI)
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center p-6 text-center bg-background-secondary rounded-lg border border-dashed border-border-secondary">
          <AlertTriangle className="w-8 h-8 text-text-subtle mb-3 opacity-50" />
          <h4 className="text-sm font-semibold text-text-secondary mb-1">Data Belum Cukup</h4>
          <p className="text-xs text-text-muted max-w-[250px]">
            AI belum memiliki cukup data historis untuk memprediksi potensi fluktuasi saham <span className="font-semibold">{stockSymbol}</span> secara akurat.
          </p>
        </div>
      </div>
    );
  }

  const swingPercent = volatility[`forecast_${activeHorizon}`];

  return (
    <div className="bg-background-primary rounded-xl border border-border-primary p-4 flex flex-col gap-4 mt-4 shadow-sm relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Activity className="w-5 h-5 text-brand" />
        <h3 className="text-base font-semibold text-text-primary">
          Potensi Gejolak Harga (AI)
        </h3>
      </div>

      {/* Tabs */}
      <div className="flex bg-background-secondary p-1 rounded-lg">
        {[
          { id: "10d", label: "10 Hari" },
          { id: "1m", label: "1 Bulan" },
          { id: "3m", label: "3 Bulan" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveHorizon(tab.id as Horizon)}
            className={`flex-1 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all duration-300 relative z-10 ${
              activeHorizon === tab.id
                ? "text-text-primary shadow-sm"
                : "text-text-subtle hover:text-text-secondary"
            }`}
          >
            {activeHorizon === tab.id && (
              <motion.div
                layoutId="activeTabRisk"
                className="absolute inset-0 bg-background-primary rounded-md -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Risk Metric */}
      <div className="flex flex-col gap-1 pt-2">
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-medium text-text-secondary">
            Maksimal Ayunan Harga:
          </span>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={activeHorizon}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-2xl font-bold text-text-primary leading-none"
            >
              ±{swingPercent.toFixed(1)}%
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="mt-2 bg-warning-50/50 border border-warning-100 p-3 rounded-lg flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-warning-600 mt-0.5 flex-shrink-0" />
          <p className="text-[11px] sm:text-xs text-text-muted leading-relaxed">
            Dalam rentang waktu yang Anda pilih, AI memprediksi harga saham{" "}
            <span className="font-semibold text-text-primary">
              {stockSymbol}
            </span>{" "}
            dapat berayun naik-turun hingga selisih{" "}
            <span className="font-semibold text-warning-700">
              {swingPercent.toFixed(1)}%
            </span>
            . Pastikan Anda siap secara psikologis untuk melihat uang Anda
            berfluktuasi sejauh itu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VolatilityRiskCard;
