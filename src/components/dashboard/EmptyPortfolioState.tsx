// src/components/dashboard/EmptyPortfolioState.tsx
import React from "react";
import { Wallet, Plus } from "lucide-react";
import EmptyState from "@/components/shared/states/EmptyState";

interface EmptyPortfolioStateProps {
  riskProfile: string; // Kita oper profile user (misal: Serigala) ke sini
}

const EmptyPortfolioState: React.FC<EmptyPortfolioStateProps> = ({
  riskProfile,
}) => {
  return (
    <EmptyState
      icon={Wallet}
      title="Belum ada dompet investasi"
      description={
        <>
          Buat dompet pertamamu dan mulai alokasikan dana sesuai profil{" "}
          <span className="font-semibold text-slate-700">{riskProfile}-mu</span>
          . Danamu aman ini adalah simulasi investasi virtual.
        </>
      }
      actionLabel="Alokasi Otomatis"
      onAction={() => {}}
      actionIcon={Plus}
    />
  );
};

export default EmptyPortfolioState;
