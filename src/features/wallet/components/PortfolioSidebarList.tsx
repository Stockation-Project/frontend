import React from "react";
import SidebarPortfolioCard from "./SidebarPortfolioCard";
import type { Portfolio } from "../types/wallet";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";

interface PortfolioSidebarListProps {
  portfolios: Portfolio[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  isLoading: boolean;
  onCreateNew: () => void;
}

const PortfolioSidebarList: React.FC<PortfolioSidebarListProps> = ({
  portfolios,
  selectedId,
  onSelect,
  isLoading,
  onCreateNew,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4 pt-4">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-[180px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 h-[320px]">
      <h3 className="text-sm font-medium text-text-muted">
        Dompet Investasi
      </h3>

      <div className="space-y-4 overflow-y-auto flex-1 pr-1 pb-4 no-scrollbar scroll-smooth">
        {portfolios.map((portfolio) => (
          <SidebarPortfolioCard
            key={portfolio.id}
            id={portfolio.id}
            name={portfolio.name}
            cashBalance={Number(portfolio.cash_balance)}
            investedBalance={Number(portfolio.invested_balance)}
            isActive={selectedId === portfolio.id}
            onClick={() => onSelect(portfolio.id)}
          />
        ))}

        {/* Buat Dompet Baru Placeholder */}
        <div
          onClick={onCreateNew}
          className="w-full h-[180px] bg-background-secondary rounded-xl border-2 border-dashed border-border-primary flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-background-secondary/80 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-background-primary flex items-center justify-center text-text-subtle">
            <Plus className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-text-subtle">Buat Dompet Baru</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSidebarList;
