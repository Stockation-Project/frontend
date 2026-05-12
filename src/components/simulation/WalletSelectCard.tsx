// src/components/simulation/WalletSelectCard.tsx
import React from "react";
import { Wallet, Plus } from "lucide-react";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";

interface WalletSelectCardProps {
  id?: string;
  name: string;
  cashBalance: number;
  isSelected: boolean;
  onClick?: () => void;
  isAddCard?: boolean;
}

const WalletSelectCard: React.FC<WalletSelectCardProps> = ({
  name,
  cashBalance,
  isSelected,
  onClick,
  isAddCard = false,
}) => {
  if (isAddCard) {
    return (
      <div
        onClick={onClick}
        className="min-w-[240px] w-[240px] h-[100px] border-2 border-dashed border-slate-200 rounded-lg py-4 flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors text-slate-400 hover:text-slate-600"
      >
        <Plus className="w-5 h-5" />
        <span className="text-sm font-medium">Tambah dompet baru</span>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`min-w-[240px] w-[240px] h-[100px] my-4 bg-white border rounded-lg flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer ${
        isSelected
          ? "border-[#329B0D] ring-1 ring-[#329B0D]"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div
        className={`px-4 py-2 font-medium text-sm ${
          isSelected ? "bg-[#329B0D] text-white" : "bg-slate-100 text-slate-700"
        }`}
      >
        {name}
      </div>
      <div className="px-4 py-3 flex-1 flex flex-col justify-end">
        <p className="text-[10px] text-slate-500 font-medium mb-0.5">
          Saldo Tersedia
        </p>
        <p className="text-sm font-medium text-slate-900">
          {formatCurrencyIDR(cashBalance)}
        </p>
      </div>
    </div>
  );
};

export default WalletSelectCard;
