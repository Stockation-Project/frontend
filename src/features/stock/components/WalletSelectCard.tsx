// src/components/simulation/WalletSelectCard.tsx
import React, { useRef, useEffect } from "react";
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
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSelected && cardRef.current) {
      const isMobile = window.innerWidth < 768; // HP (< 768px)
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: isMobile ? "center" : "start", // HP di tengah, laptop/tablet di kiri (start)
      });
    }
  }, [isSelected]);

  if (isAddCard) {
    return (
      <div
        onClick={onClick}
        className="flex flex-col min-w-[240px] w-[240px] h-[100px] border-2 border-dashed border-border-primary rounded-lg my-4 py-4 flex items-center justify-center gap-2 cursor-pointer hover:bg-background-secondary transition-colors text-slate-400 hover:text-slate-600 flex-shrink-0"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm font-Regular">Tambah dompet baru</span>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`min-w-[240px] w-[240px] h-[100px] my-4 bg-background-primary border rounded-lg flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex-shrink-0 ${
        isSelected
          ? "border-brand ring-1 ring-brand"
          : "border-border-primary hover:border-border-secondary"
      }`}
    >
      <div
        className={`px-4 py-2 font-medium text-sm ${
          isSelected ? "bg-brand text-white" : "bg-slate-100 text-slate-700"
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
