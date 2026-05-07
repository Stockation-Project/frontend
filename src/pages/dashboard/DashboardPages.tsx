import React from "react";
import { motion } from "framer-motion";
import GlobalWalletCard from "@/components/dashboard/GlobalWalletCard";
import RecommendedStocks from "@/components/dashboard/RecommendedStocks";
import PortfolioSection from "@/components/dashboard/PortfolioSection";

const DashboardPages: React.FC = () => {
  // Dummy data untuk testing empty state
  // DUMMY DATA PORTFOLIO (Silakan hapus elemen array ini untuk melihat Empty State)
  const myPortfolios: PortfolioCardProps[] = [
    {
      id: "DMPT7439",
      name: "Saham Blue Chip",
      allocations: [
        { ticker: "BBRI", percentage: 50, color: "bg-[#329B0D]" }, // Hijau tua
        { ticker: "BBCA", percentage: 30, color: "bg-[#84CC16]" }, // Hijau muda (lime)
        { ticker: "TLKM", percentage: 20, color: "bg-[#D9F99D]" }, // Hijau paling muda
      ],
      investedBalance: 10500000,
      cashBalance: 5000000,
      profitPercentage: 12.5,
      profitAmount: 132872,
    },
    {
      id: "DMPT8821",
      name: "Saham Agresif",
      allocations: [
        { ticker: "BREN", percentage: 70, color: "bg-[#329B0D]" },
        { ticker: "GOTO", percentage: 30, color: "bg-[#84CC16]" },
      ],
      investedBalance: 8000000,
      cashBalance: 2500000,
      profitPercentage: -3.2,
      profitAmount: -256000, // Contoh jika portfolio merugi
    },
    {
      id: "DMPT8821",
      name: "Saham Agresif",
      allocations: [
        { ticker: "BREN", percentage: 70, color: "bg-[#329B0D]" },
        { ticker: "GOTO", percentage: 30, color: "bg-[#84CC16]" },
      ],
      investedBalance: 8000000,
      cashBalance: 2500000,
      profitPercentage: -3.2,
      profitAmount: -256000, // Contoh jika portfolio merugi
    },
  ];
  const currentRiskProfile = "Serigala";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Header Halaman */}
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Dashboard
        </h1>
      </header>

      {/* Grid Utama (70% Kiri, 30% Kanan) */}
      <div className="grid grid-cols-1 xl:grid-cols-10 gap-8">
        {/* KOLOM KIRI (70% - xl:col-span-7) */}
        <div className="xl:col-span-7 space-y-8">
          {/* Tempat Global Wallet Card */}
          <GlobalWalletCard balance={100000000} />

          {/* Tempat Portfolio Section */}
          <PortfolioSection
            portfolios={myPortfolios}
            userRiskProfile={currentRiskProfile}
          />

          {/* Tempat Recommended Stocks */}
          <RecommendedStocks />
        </div>

        {/* KOLOM KANAN (30% - xl:col-span-3) */}
        <div className="xl:col-span-3 space-y-8">
          {/* Tempat Wallet Summary */}
          <div className="w-full h-72 bg-slate-200 rounded-3xl border border-slate-300 border-dashed flex items-center justify-center text-slate-500 font-medium">
            (Slot Ringkasan Dompet / Donut Chart)
          </div>

          {/* Tempat Risk Profile Widget */}
          <div className="w-full h-96 bg-slate-200 rounded-3xl border border-slate-300 border-dashed flex items-center justify-center text-slate-500 font-medium">
            (Slot Profil Risiko)
          </div>
        </div>
      </div>
    </motion.div>
  );
};;;

export default DashboardPages;
