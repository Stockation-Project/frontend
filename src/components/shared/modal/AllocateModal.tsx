import React, { useState, useEffect } from "react";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import BaseSideModal from "../layout/BaseSideModal";
import QuickSelectButton from "@/components/shared/QuickSelectButton";
import type { Portfolio } from "@/features/wallet/types/wallet";
import { ArrowDown, Wallet } from "lucide-react";

interface AllocateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  portfolios: Portfolio[];
  onSuccess: (amount: number, portfolioId: string) => Promise<void>;
  initialPortfolioId?: string | null;
}

const NOMINAL_OPTIONS = [
  { label: "1jt", value: 1000000 },
  { label: "5jt", value: 5000000 },
  { label: "10jt", value: 10000000 },
  { label: "20jt", value: 20000000 },
  { label: "50jt", value: 50000000 },
];

const AllocateModal: React.FC<AllocateModalProps> = ({
  isOpen,
  onClose,
  currentBalance,
  portfolios,
  onSuccess,
  initialPortfolioId,
}) => {
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [amountText, setAmountText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedPortfolioId(initialPortfolioId || (portfolios.length > 0 ? portfolios[0].id : ""));
      setAmount(0);
      setAmountText("");
    }
  }, [isOpen, initialPortfolioId, portfolios]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const numericValue = parseInt(rawValue, 10) || 0;
    setAmount(numericValue);
    setAmountText(numericValue > 0 ? formatCurrencyIDR(numericValue) : "");
  };

  const handleQuickSelect = (value: number) => {
    setAmount(value);
    setAmountText(formatCurrencyIDR(value));
  };

  const handleSubmit = async () => {
    if (!selectedPortfolioId || amount <= 0 || amount > currentBalance) return;

    setIsLoading(true);
    try {
      await onSuccess(amount, selectedPortfolioId);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isInvalid = !selectedPortfolioId || amount <= 0 || amount > currentBalance;

  return (
    <BaseSideModal
      isOpen={isOpen}
      onClose={onClose}
      title="Alokasi Saldo"
      actionText="Transfer Saldo"
      onAction={handleSubmit}
      isActionDisabled={isInvalid}
      isLoading={isLoading}
    >
      <div className="space-y-6">
        {/* Global Wallet */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
            Global Wallet
          </label>
          <div className="w-full px-4 py-3 rounded-xl border border-border-primary bg-background-secondary flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-brand" />
              </div>
              <span className="font-bold text-text-primary">
                Dompet Utama - {formatCurrencyIDR(currentBalance)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center -my-2">
          <div className="w-10 h-10 rounded-full bg-background-secondary flex items-center justify-center border border-border-primary shadow-sm z-10">
            <ArrowDown className="w-5 h-5 text-text-subtle" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
            Ke Dompet:
          </label>
          <select
            value={selectedPortfolioId}
            onChange={(e) => setSelectedPortfolioId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border-primary bg-background-primary focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand font-bold text-text-primary appearance-none cursor-pointer"
          >
            {portfolios.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} - {formatCurrencyIDR(Number(p.cash_balance) + Number(p.invested_balance))}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-brand-25 p-5 rounded-lg border border-brand/10 space-y-4">
          <label className="block text-xs font-medium text-text-muted uppercase tracking-wider">
            NOMINAL
          </label>

          <div className="flex flex-wrap gap-2">
            {NOMINAL_OPTIONS.map((opt) => (
              <QuickSelectButton
                key={opt.value}
                label={opt.label}
                isSelected={amount === opt.value}
                onClick={() => handleQuickSelect(opt.value)}
              />
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Rp 0"
              value={amountText}
              onChange={handleAmountChange}
              className="w-full px-4 py-3 rounded-xl border border-border-primary focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand font-bold text-xl text-text-primary bg-background-primary"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-text-muted">Saldo tersedia: {formatCurrencyIDR(currentBalance)}</span>
            {amount > currentBalance && (
              <span className="text-xs font-bold text-error-500">Saldo tidak cukup</span>
            )}
          </div>
        </div>
      </div>
    </BaseSideModal>
  );
};

export default AllocateModal;
