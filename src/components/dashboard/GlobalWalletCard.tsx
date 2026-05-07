import type React from "react";
import { Button } from "../ui/button";
import { ArrowUpRight, Plus } from "lucide-react";

interface GlobalWalletCardProps {
  balance: number;
}

const GlobalWalletCard: React.FC<GlobalWalletCardProps> = ({ balance }) => {
  // Fungsi untuk format angka ke Rupiah secara otomatis, nanti jadiin utils
  const formattedBalance = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(balance);

  return (
    // Menggunakan warna hijau khas Stockation (#329B0D atau bisa pakai tailwind green-700)
    // rounded-[2rem] memberikan efek lengkungan besar sesuai desain
    <div className="w-full bg-[#329B0D] rounded-[2rem] p-8 shadow-lg shadow-green-700/20 text-white relative overflow-hidden flex flex-col justify-between min-h-[200px]">
      {/* Elemen dekoratif bayangan/lingkaran samar (Opsional agar UI terasa lebih premium) */}
      <div className="absolute top-0 right-0 -mr-12 -mt-16 w-64 h-64 rounded-full bg-white opacity-5 pointer-events-none"></div>

      <div className="relative z-10">
        <h2 className="text-sm md:text-base font-medium text-green-50 mb-1">
          Dompet Utama
        </h2>
        <p className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">
          {formattedBalance}
        </p>

        <div className="flex items-center gap-3">
          <Button className="bg-white text-[#329B0D] hover:bg-slate-50 hover:text-green-800 rounded-xl px-6 h-11 text-sm font-bold transition-all shadow-sm">
            <Plus className="w-4 h-4 mr-2 stroke-[2.5]" />
            Isi Saldo
          </Button>

          <Button className="bg-white text-[#329B0D] hover:bg-slate-50 hover:text-green-800 rounded-xl px-6 h-11 text-sm font-bold transition-all shadow-sm">
            <ArrowUpRight className="w-4 h-4 mr-2 stroke-[2.5]" />
            Alokasikan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GlobalWalletCard;
