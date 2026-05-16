// src/components/dashboard/PortfolioSection.tsx
import React from "react";
import EmptyPortfolioState from "./EmptyPortfolioState";
import PortfolioCard from "./PortfolioCard";
import type { DashboardPortfolio } from "../types/dashboard";
import { Plus } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

interface PortfolioSectionProps {
  portfolios: DashboardPortfolio[];
  userRiskProfile: string;
  onAddClick: () => void;
  /** Callback saat user klik portfolio card. Jika tidak disediakan, card tidak clickable. */
  onCardClick?: (portfolioId: string) => void;
  /** ID portfolio yang sedang aktif/dilihat — untuk highlight visual. */
  activePortfolioId?: string;
  /** Varian tampilan kartu di dalam section ini */
  cardVariant?: "default" | "dashboard";
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  portfolios,
  userRiskProfile,
  onAddClick,
  onCardClick,
  activePortfolioId,
  cardVariant = "default",
}) => {
  return (
    <div className="w-full flex flex-col">
      <SectionHeader title="Dompet Investasi" />

      {portfolios.length === 0 ? (
        <EmptyPortfolioState
          riskProfile={userRiskProfile}
          onAddClick={onAddClick}
        />
      ) : (
        // Container Daftar Portfolio
        <div className="flex gap-4 overflow-x-auto p-4 no-scrollbar scroll-smooth snap-x">
          {portfolios.map((porto, index) => (
            <div key={porto.id || index} className="snap-start">
              <div
                onClick={() => onCardClick?.(porto.id)}
                className={`transition-all ${onCardClick ? "cursor-pointer" : ""}`}
              >
                <PortfolioCard
                  id={porto.id}
                  name={porto.name}
                  cashBalance={porto.cash_balance || 0}
                  investedBalance={porto.invested_balance || 0}
                  allocations={porto.allocations || []}
                  profitAmount={porto.profitAmount || 0}
                  profitPercentage={porto.profitPercentage || 0}
                  isActive={activePortfolioId === porto.id}
                  variant={cardVariant}
                />
              </div>
            </div>
          ))}

          {/* Kartu Khusus untuk Menambah Portofolio Baru */}
          <div className="snap-start">
            <button
              onClick={onAddClick}
              className="min-w-[320px] w-[320px] h-full bg-transparent border-2 border-dashed border-border-primary rounded-xl flex flex-col items-center justify-center text-text-muted hover:text-brand hover:border-brand hover:bg-brand-50/50 transition-all cursor-pointer group"
            >
              <div className="w-14 h-14 bg-background-secondary rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
                <Plus className="w-7 h-7 text-text-subtle group-hover:text-brand transition-colors" />
              </div>
              <span className="font-medium text-sm">Buat Dompet Baru</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioSection;
