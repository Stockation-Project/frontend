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
      className={`p-4 rounded-xl cursor-pointer transition-all border ${
        isActive
          ? "bg-brand text-white border-brand shadow-lg shadow-brand/20"
          : "bg-[#F3F4F6] text-slate-900 border-transparent hover:border-slate-300"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          isActive ? "bg-white/20" : "bg-white shadow-sm"
        }`}>
          <Wallet className={`w-5 h-5 ${isActive ? "text-white" : "text-brand"}`} />
        </div>
        <div>
          <h4 className="font-bold text-sm leading-tight">{name}</h4>
          <p className={`text-[10px] font-medium uppercase tracking-wider ${
            isActive ? "text-white/70" : "text-slate-400"
          }`}>
            {id}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className={`text-[10px] font-medium mb-1 ${
          isActive ? "text-white/70" : "text-slate-500"
        }`}>
          Total Saldo
        </p>
        <p className="text-xl font-bold">
          {formatCurrencyIDR(totalBalance)}
        </p>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-current border-opacity-10">
        <div>
          <p className={`text-[10px] font-medium mb-0.5 ${
            isActive ? "text-white/70" : "text-slate-500"
          }`}>
            Saldo Tersedia
          </p>
          <p className={`text-[11px] font-bold ${
            isActive ? "text-white" : "text-brand"
          }`}>
            {formatCurrencyIDR(cashBalance)}
          </p>
        </div>
        <div className="text-right">
          <p className={`text-[10px] font-medium mb-0.5 ${
            isActive ? "text-white/70" : "text-slate-500"
          }`}>
            Terpakai
          </p>
          <p className="text-[11px] font-bold">
            {formatCurrencyIDR(investedBalance)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidebarPortfolioCard;
