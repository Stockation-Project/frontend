import React, { useRef, useEffect } from "react";
import { Wallet } from "lucide-react";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";

interface SidebarPortfolioCardProps {
  id: string;
  name: string;
  cashBalance: number;
  investedBalance: number;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarPortfolioCard: React.FC<SidebarPortfolioCardProps> = ({
  id,
  name,
  cashBalance,
  investedBalance,
  isActive = false,
  onClick,
}) => {
  const totalBalance = Number(cashBalance) + Number(investedBalance);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && cardRef.current) {
      const isMobile = window.innerWidth < 768; // HP (< 768px)
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: isMobile ? "center" : "start", // HP di tengah, laptop/tablet di kiri (start)
      });
    }
  }, [isActive]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`bg-background-primary rounded-xl cursor-pointer transition-all border overflow-hidden hover:shadow-md active:shadow-sm ${
        isActive
          ? "border-2 border-brand"
          : "border border-border-primary"
      }`} 
    >
      <div className={`border-b border-border-secondary px-4 py-3 flex items-center gap-3 ${isActive ? "bg-brand" : "bg-background-secondary"}`}>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isActive ? "bg-white/20" : "bg-background-primary border border-border-primary"
        }`}>
          <Wallet className={`w-5 h-5 stroke-[1.5px] ${isActive ? "text-text-inverse" : "text-text-subtle"}`} />
        </div>
        <div>
          <h4 className={`font-semibold text-sm leading-tight mb-1 ${isActive ? "text-text-inverse" : "text-text-primary"}`}>{name}</h4>
          <p className={`text-[10px] font-medium uppercase tracking-wider max-w-[200px] truncate ${
            isActive ? "text-text-inverse/70" : "text-text-muted"
          }`}>
            {id}
          </p>
        </div>
      </div>

      <div className="px-4 py-3">
        <p className={`text-[10px] font-medium ${
          isActive ? "text-text-muted" : "text-text-muted"
        }`}>
          Total Saldo
        </p>
        <p className={`text-lg font-semibold ${isActive ? "text-text-primary" : "text-text-primary"}`}>
          {formatCurrencyIDR(totalBalance)}
        </p>
      </div>

      <div className="px-4 py-3 flex justify-between items-center pt-3 border-t border-border-secondary">
        <div>
          <p className={`text-[10px] font-medium mb-0.5 ${
            isActive ? "text-text-muted" : "text-text-muted"
          }`}>
            Saldo Tersedia
          </p>
          <p className="text-xs font-semibold text-brand">
            {formatCurrencyIDR(cashBalance)}
          </p>
        </div>
        <div className="text-right">
          <p className={`text-[10px] font-medium mb-0.5 ${
            isActive ? "text-text-muted" : "text-text-muted"
          }`}>
            Terpakai
          </p>
          <p className={`text-xs font-semibold ${isActive ? "text-text-primary" : "text-text-primary"}`}>
            {formatCurrencyIDR(investedBalance)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidebarPortfolioCard;
