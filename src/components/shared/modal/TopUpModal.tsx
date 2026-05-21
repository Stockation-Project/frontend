import React, { useState } from "react";
import BaseSideModal from "../layout/BaseSideModal";
import { Info } from "lucide-react";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  onSuccess: (amount: number) => Promise<void>;
}

const TOP_UP_OPTIONS = [
  { id: "20jt", label: "20jt", value: 20000000 },
  { id: "10jt", label: "10jt", value: 10000000 },
  { id: "50jt", label: "50jt", value: 50000000 },
  { id: "100jt", label: "100jt", value: 100000000 },
];

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
      // classname="!max-w-[800px]"
    >
      <div className="space-y-6 ">
        {/* Card Saldo Saat Ini & Setelah Top Up */}
        <div className="bg-background-primary rounded-xl p-4 border border-border-primary flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-[10px] text-text-muted font-medium ">
              Saldo saat ini
            </p>
            <p className="text-sm font-medium text-text-primary">
              {formatCurrencyIDR(currentBalance)}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-[10px] text-text-muted font-medium ">
              Setelah top up
            </p>
            <p className="text-sm font-medium text-brand">
              {selectedAmount
                ? formatCurrencyIDR(currentBalance + selectedAmount)
                : "--"}
            </p>
          </div>
        </div>

        {/* Pilihan Nominal */}
        <div>
          <p className="text-xs font-medium text-text-secondary mb-2">
            Pilih nominal top up
          </p>
          <div className="grid grid-cols-2 gap-4">
            {TOP_UP_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedAmount(option.value)}
                className={`py-3 rounded-lg border-1 transition-all flex flex-col items-center justify-center ${
                  selectedAmount === option.value
                    ? "border-brand bg-brand-50"
                    : "border-border-primary bg-background-primary hover:border-brand-200"
                }`}
              >
                <span className="text-sm font-medium text-text-primary ">
                  {option.label}
                </span>
                <span className="text-xs text-text-muted">
                  {formatCurrencyIDR(option.value)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Disclaimer Card */}
        <div className="bg-warning-50 rounded-lg px-4 py-2 flex items-start space-x-3 border border-warning-100">
          <Info className="w-4 h-4 text-warning-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-warning-800 leading-relaxed">
            Ini adalah saldo virtual untuk simulasi investasi. Tidak ada uang
            nyata yang digunakan.
          </p>
        </div>
      </div>
    </BaseSideModal>
  );
};

export default TopUpModal;
