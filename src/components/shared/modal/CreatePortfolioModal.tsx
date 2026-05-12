import React, { useState, useEffect } from "react";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import BaseSideModal from "../layout/BaseSideModal";
import QuickSelectButton from "@/components/shared/QuickSelectButton";

interface CreatePortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  onSuccess: (name: string, amount: number) => Promise<void>;
}

const NOMINAL_OPTIONS = [
  { label: "1jt", value: 1000000 },
  { label: "5jt", value: 5000000 },
  { label: "10jt", value: 10000000 },
  { label: "20jt", value: 20000000 },
  { label: "50jt", value: 50000000 },
];



const CreatePortfolioModal: React.FC<CreatePortfolioModalProps> = ({
  isOpen,
  onClose,
  currentBalance,
  onSuccess,
}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [amountText, setAmountText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Reset state tiap kali modal dibuka
  useEffect(() => {
    if (isOpen) {
      setName("");
      setAmount(0);
      setAmountText("");
    }
  }, [isOpen]);

  // Handler untuk input manual (hanya menerima angka)
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, ""); // Hapus semua karakter non-angka
    const numericValue = parseInt(rawValue, 10) || 0;

    setAmount(numericValue);
    setAmountText(numericValue > 0 ? formatCurrencyIDR(numericValue) : "");
  };

  // Handler untuk klik tombol nominal cepat
  const handleQuickSelect = (value: number) => {
    setAmount(value);
    setAmountText(formatCurrencyIDR(value));
  };

  const handleSubmit = async () => {
    if (!name.trim() || amount <= 0) return;

    setIsLoading(true);
    try {
      await onSuccess(name, amount);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Validasi: tombol disabled jika nama kosong, saldo 0, atau saldo kurang
  const isInvalid = !name.trim() || amount <= 0 || amount > currentBalance;

  return (
    <BaseSideModal
      isOpen={isOpen}
      onClose={onClose}
      title="Buat Dompet Baru"
      actionText="Buat Dompet"
      onAction={handleSubmit}
      isActionDisabled={isInvalid}
      isLoading={isLoading}
    >
      <div className="space-y-4">
        {/* Input Nama Portofolio */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-2">
            Nama Dompet:
          </label>
          <input
            type="text"
            placeholder="contoh: Dompet High Risk"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#329B0D] focus:border-transparent transition-all"
          />
        </div>

        {/* Area Nominal */}
        <div className="bg-[#F6FDF4] p-4 rounded-lg border border-green-100">
          <label className="block text-xs font-medium text-slate-700 mb-3">
            Nominal
          </label>

          {/* Tombol Pilihan Cepat */}
          <div className="flex flex-wrap gap-2 mb-4">
            {NOMINAL_OPTIONS.map((opt) => (
              <QuickSelectButton
                key={opt.value}
                label={opt.label}
                isSelected={amount === opt.value}
                onClick={() => handleQuickSelect(opt.value)}
              />
            ))}
          </div>

          {/* Input Nominal Manual */}
          <input
            type="text"
            placeholder="Rp 0"
            value={amountText}
            onChange={handleAmountChange}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#329B0D] font-medium text-md text-slate-800 "
          />

          {/* Info Saldo Tersedia */}
          <div className="flex justify-between items-center text-xs mt-1">
            <span className="text-slate-500">Saldo tersedia:</span>
            <span
              className={`font-medium ${amount > currentBalance ? "text-red-500" : "text-slate-700"}`}
            >
              {formatCurrencyIDR(currentBalance)}
            </span>
          </div>

          {/* Pesan Error Jika Saldo Kurang */}
          {amount > currentBalance && (
            <p className="text-red-500 text-[10px] font-medium">
              Saldo Dompet Utama tidak mencukupi.
            </p>
          )}
        </div>
      </div>
    </BaseSideModal>
  );
};

export default CreatePortfolioModal;
