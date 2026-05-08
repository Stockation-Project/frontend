// src/components/dashboard/PortfolioSection.tsx
import React from "react";
import EmptyPortfolioState from "./EmptyPortfolioState";
import PortfolioCard, { type PortfolioCardProps } from "@/components/shared/cards/PortfolioCard";

interface PortfolioSectionProps {
  portfolios: PortfolioCardProps[];
  userRiskProfile: string;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  portfolios,
  userRiskProfile,
}) => {
  return (
    <div className="w-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        Dompet Investasi
      </h3>

      {portfolios.length === 0 ? (
        <EmptyPortfolioState riskProfile={userRiskProfile} />
      ) : (
        // Slider Container
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth snap-x">
          {portfolios.map((portfolio, index) => (
            <div key={index} className="snap-start">
              <PortfolioCard {...portfolio} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioSection;
