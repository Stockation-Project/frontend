// src/components/shared/wallet/GlobalWalletCard.tsx
import type React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Plus } from "lucide-react";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";

interface GlobalWalletCardProps {
  balance: number;
  onTopUpClick: () => void;
  onAllocateClick: () => void;
}

const GlobalWalletCard: React.FC<GlobalWalletCardProps> = ({ balance, onTopUpClick, onAllocateClick }) => {
  const formattedBalance = formatCurrencyIDR(balance);

  return (
    <div className="w-full bg-brand rounded-xl p-4 shadow-lg shadow-brand/20 text-white relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 right-0 -mr-12 -mt-16 w-64 h-64 rounded-full bg-white opacity-5 pointer-events-none"></div>

      <div className="relative">
        <h2 className="text-xs md:text-sm font-medium text-slate-200 mb-1">
          Dompet Utama
        </h2>
        <p className="text-2xl md:text-4xl font-semibold tracking-tight mb-8">
          {formattedBalance}
        </p>

        <div className="flex items-center gap-3 ">
          <Button
            onClick={onTopUpClick}
            className="px-6 h-10 bg-background-primary active:bg-brand-100 text-brand hover:text-brand-950 rounded-xl text-sm font-regular shadow-sm transition-all duration-200 cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2 stroke-[2.5]" />
            Isi Saldo
          </Button>

          <Button onClick={onAllocateClick} className="px-6 h-10 bg-background-primary active:bg-brand-100 text-brand hover:text-brand-950 rounded-xl text-sm font-regular shadow-sm transition-all duration-200 cursor-pointer">
            <ArrowUpRight className="w-4 h-4 mr-2 stroke-[2.5]" />
            Alokasikan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GlobalWalletCard;
