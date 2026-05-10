import React, { useState } from "react";
import BaseSideModal from "../layout/BaseSideModal";
import { Info } from "lucide-react";

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  onSuccess: (amount: number) => Promise<void>; // Fungsi untuk memanggil API
}

const TOP_UP_OPTIONS = [
  { id: "20jt", label: "20jt", value: 20000000 },
  { id: "10jt", label: "10jt", value: 10000000 },
  { id: "50jt", label: "50jt", value: 50000000 },
  { id: "100jt", label: "100jt", value: 100000000 },
];

// Helper untuk format rupiah
const formatRupiah = (num: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);
};

const TopUpModal: React.FC<TopUpModalProps> = ({
  isOpen,
  onClose,
  currentBalance,
  onSuccess,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTopUp = async () => {
    if (!selectedAmount) return;
    setIsLoading(true);
    try {
      await onSuccess(selectedAmount);
      setSelectedAmount(null); // Reset setelah sukses
      onClose(); // Tutup modal
    } catch (error) {
      console.error(error);
      alert("Gagal melakukan top up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseSideModal
      isOpen={isOpen}
      onClose={onClose}
      title="Tambah Saldo"
      actionText="Transfer Saldo"
      onAction={handleTopUp}
      isActionDisabled={selectedAmount === null}
      isLoading={isLoading}
    >
      <div className="space-y-6">
        {/* Card Saldo Saat Ini & Setelah Top Up */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between items-center">
          <div>
            <p className="text-sm text-slate-500 font-medium mb-1">
              Saldo saat ini
            </p>
            <p className="text-2xl font-bold text-slate-900">
              {formatRupiah(currentBalance)}
            </p>
          </div>
          <div className="text-left">
            <p className="text-sm text-slate-500 font-medium mb-1">
              Setelah top up
            </p>
            <p className="text-2xl font-bold text-[#329B0D]">
              {selectedAmount
                ? formatRupiah(currentBalance + selectedAmount)
                : "--"}
            </p>
          </div>
        </div>

        {/* Pilihan Nominal */}
        <div>
          <p className="text-sm font-medium text-slate-600 mb-3">
            Pilih nominal top up
          </p>
          <div className="grid grid-cols-2 gap-4">
            {TOP_UP_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedAmount(option.value)}
                className={`py-4 px-2 rounded-xl border-2 transition-all flex flex-col items-center justify-center ${
                  selectedAmount === option.value
                    ? "border-[#329B0D] bg-green-50"
                    : "border-slate-200 bg-white hover:border-green-200"
                }`}
              >
                <span className="text-lg font-bold text-slate-800">
                  {option.label}
                </span>
                <span className="text-sm text-slate-500">
                  {formatRupiah(option.value)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Disclaimer Card */}
        <div className="bg-[#EFFFEC] rounded-xl p-4 flex items-start space-x-3 border border-green-100">
          <Info className="w-5 h-5 text-[#329B0D] mt-0.5 flex-shrink-0" />
          <p className="text-sm text-green-800 leading-relaxed">
            Ini adalah saldo virtual untuk simulasi investasi. Tidak ada uang
            nyata yang digunakan.
          </p>
        </div>
      </div>
    </BaseSideModal>
  );
};

export default TopUpModal;
