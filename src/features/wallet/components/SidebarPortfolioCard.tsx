import React from "react";
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

  return (
    <div
      onClick={onClick}
      className={`bg-background-primary rounded-xl cursor-pointer transition-all border overflow-hidden hover:shadow-md active:shadow-sm ${
        isActive
          ? "text-white border-2 border-brand"
          : "text-slate-900 border border-border-primary"
      }`} 
    >
      <div className={`border-b border-border-secondary p-4 flex items-center gap-3 ${isActive ? "bg-brand" : "bg-background-secondary"}`}>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isActive ? "bg-white/20" : "bg-white border border-border-primary"
        }`}>
          <Wallet className={`w-5 h-5 stroke-[1.5px] ${isActive ? "text-white" : "text-slate-400"}`} />
        </div>
        <div>
          <h4 className="font-bold text-sm leading-tight">{name}</h4>
          <p className={`text-[10px] font-medium uppercase tracking-wider max-w-[200px] truncate ${
            isActive ? "text-white/70" : "text-slate-400"
          }`}>
            {id}
          </p>
        </div>
      </div>

      <div className="p-4 ">
        <p className={`text-[10px] font-medium ${
          isActive ? "text-slate-500" : "text-slate-500"
        }`}>
          Total Saldo
        </p>
        <p className="text-lg font-semibold text-slate-900">
          {formatCurrencyIDR(totalBalance)}
        </p>
      </div>

      <div className="p-4 flex justify-between items-center pt-3 border-t border-border-secondary">
        <div>
          <p className={`text-[10px] font-medium mb-0.5 ${
            isActive ? "text-slate-500" : "text-slate-500"
          }`}>
            Saldo Tersedia
          </p>
          <p className={`text-xs font-semibold ${
            isActive ? "text-brand" : "text-brand"
          }`}>
            {formatCurrencyIDR(cashBalance)}
          </p>
        </div>
        <div className="text-right">
          <p className={`text-[10px] font-medium mb-0.5 ${
            isActive ? "text-slate-500" : "text-slate-500"
          }`}>
            Terpakai
          </p>
          <p className="text-xs font-semibold text-slate-900">
            {formatCurrencyIDR(investedBalance)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidebarPortfolioCard;
