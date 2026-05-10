// src/components/dashboard/PortfolioSection.tsx
import React from "react";
import EmptyPortfolioState from "./EmptyPortfolioState";
import PortfolioCard, { type PortfolioCardProps } from "@/components/shared/cards/PortfolioCard";
import type { DashboardPortfolio } from "@/types/dashboard";

interface PortfolioSectionProps {
  portfolios: DashboardPortfolio[];
  userRiskProfile: string;
  onAddClick: () => void;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  portfolios,
  userRiskProfile,
  onAddClick
}) => {
  return (
    <div className="w-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        Dompet Investasi
      </h3>

      {portfolios.length === 0 ? (
        <EmptyPortfolioState
          riskProfile={userRiskProfile}
          onAddClick={onAddClick}
        />
      ) : (
        // Slider Container
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth snap-x">
          {portfolios.map((porto, index) => (
            <div key={porto.id || index} className="snap-start">
              {/* Di sinilah kita melakukan "Penerjemahan" datanya! */}
              <PortfolioCard
                id={porto.id}
                name={porto.name}
                cashBalance={porto.cash_balance || 0}
                investedBalance={porto.invested_balance || 0}
                // Set default aman untuk data yang belum ada dari backend
                allocations={[]}
                profitAmount={0}
                profitPercentage={0}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioSection;
