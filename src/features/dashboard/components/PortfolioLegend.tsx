// src/components/shared/cards/PortfolioLegend.tsx
import React from "react";
import type { Allocation } from "./PortfolioCard";

interface PortfolioLegendProps {
  allocations: Allocation[];
  isDarkBg?: boolean;
}

const PortfolioLegend: React.FC<PortfolioLegendProps> = ({ allocations, isDarkBg = false }) => {
  if (allocations.length === 0) {
    return (
      <span className={`text-[10px] ${isDarkBg ? 'text-white/70' : 'text-slate-400'}`}>
        Belum ada saham dialokasikan
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {allocations.map((item, idx) => (
        <div key={idx} className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${item.color}`} />
          <span className={`text-[10px] font-medium ${isDarkBg ? 'text-white' : 'text-slate-600'}`}>
            {item.ticker} {item.percentage}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default PortfolioLegend;
