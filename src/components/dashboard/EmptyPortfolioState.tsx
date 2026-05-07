// src/components/dashboard/EmptyPortfolioState.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Wallet, Plus } from "lucide-react";

interface EmptyPortfolioStateProps {
  riskProfile: string; // Kita oper profile user (misal: Serigala) ke sini
}

const EmptyPortfolioState: React.FC<EmptyPortfolioStateProps> = ({
  riskProfile,
}) => {
  return (
    <div className="w-full bg-white border border-slate-100 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center shadow-sm">
      {/* Icon Area dengan lingkaran soft green */}
      <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
        <Wallet className="w-8 h-8 text-[#329B0D]" />
      </div>

      <div className="max-w-sm space-y-2 mb-8">
        <h3 className="text-xl font-bold text-slate-900">
          Belum ada dompet investasi
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          Buat dompet pertamamu dan mulai alokasikan dana sesuai profil{" "}
          <span className="font-semibold text-slate-700">{riskProfile}-mu</span>
          . Danamu aman ini adalah simulasi investasi virtual.
        </p>
      </div>

      {/* Button Alokasi Otomatis */}
      <Button className="bg-[#329B0D] hover:bg-green-800 text-white rounded-xl px-8 h-12 text-base font-bold shadow-lg shadow-green-700/20 transition-all active:scale-95">
        <Plus className="w-5 h-5 mr-2 stroke-[3]" />
        Alokasi Otomatis
      </Button>
    </div>
  );
};

export default EmptyPortfolioState;
