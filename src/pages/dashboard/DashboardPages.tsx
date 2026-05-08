import React from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/shared/layout/PageHeader";
import GlobalWalletCard from "@/components/shared/wallet/GlobalWalletCard";
import StockTable, { type StockItem } from "@/components/shared/cards/StockTable";
import PortfolioSection from "@/components/dashboard/PortfolioSection";
import WalletSummary from "@/components/dashboard/WalletSummary";
import RiskProfileWidget from "@/components/dashboard/RiskProfileWidget";

// --- DUMMY DATA ---
// Nanti data ini akan datang dari backend / AI
const RECOMMENDED_STOCKS: StockItem[] = [
  {
    id: 1,
    ticker: "BREN",
    name: "Barito Renewables Energy",
    price: 6850,
    change: 4.5,
    isPositive: true,
  },
  {
    id: 2,
    ticker: "BREN",
    name: "Barito Renewables Energy",
    price: 6850,
    change: 4.5,
    isPositive: true,
  },
  {
    id: 3,
    ticker: "BREN",
    name: "Barito Renewables Energy",
    price: 6850,
    change: 4.5,
    isPositive: true,
  },
  {
    id: 4,
    ticker: "ADRO",
    name: "Adaro Energy Indonesia",
    price: 6850,
    change: 4.5,
    isPositive: false,
  }, // Contoh turun
  {
    id: 5,
    ticker: "BREN",
    name: "Barito Renewables Energy",
    price: 6850,
    change: 4.5,
    isPositive: true,
  },
];

const DashboardPages: React.FC = () => {
  // Dummy data untuk testing empty state
  // DUMMY DATA PORTFOLIO (Silakan hapus elemen array ini untuk melihat Empty State)
  const myPortfolios = [
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
    }
  ];
  const currentRiskProfile = "Serigala";

  const walletAllocations = [
    {
      id: "1",
      name: "Dompet Blue Chip",
      amount: 32000000,
      color: "bg-green-700",
    },
    {
      id: "2",
      name: "Dompet Agresif",
      amount: 38000000,
      color: "bg-green-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Header Halaman */}
      <PageHeader title="Dashboard" />

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
          <StockTable
            title="Sesuai dengan Profil Resikomu"
            stocks={RECOMMENDED_STOCKS}
          />
        </div>

        {/* KOLOM KANAN (30% - xl:col-span-3) */}
        <div className="xl:col-span-3 space-y-8">
          {/* Tempat Wallet Summary */}
          <WalletSummary
            totalWallet={100000000}
            allocations={walletAllocations}
          />

          {/* Tempat Risk Profile Widget */}
          <RiskProfileWidget
            score={38.5}
            profileKey="wolf"
            updatedAt="20 Okt 2023"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPages;
