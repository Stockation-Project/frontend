import React, { useState, useEffect } from "react";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import BaseSideModal from "../layout/BaseSideModal";
import type { Portfolio } from "@/features/wallet/types/wallet";
import { ArrowDown, Wallet, Briefcase } from "lucide-react";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: Portfolio | null;
  onSuccess: (amount: number) => Promise<void>;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onClose,
  portfolio,
  onSuccess,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [amountText, setAmountText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const availableBalance = Number(portfolio?.cash_balance || 0);

  useEffect(() => {
    if (isOpen) {
      setAmount(0);
      setAmountText("");
    }
  }, [isOpen]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const numericValue = parseInt(rawValue, 10) || 0;
    setAmount(numericValue);
    setAmountText(numericValue > 0 ? formatCurrencyIDR(numericValue) : "");
  };

  const handleMaxClick = () => {
    setAmount(availableBalance);
    setAmountText(formatCurrencyIDR(availableBalance));
  };

  const handleSubmit = async () => {
    if (!portfolio || amount <= 0 || amount > availableBalance) return;

    setIsLoading(true);
    try {
      await onSuccess(amount);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isInvalid = !portfolio || amount <= 0 || amount > availableBalance;

  return (
    <BaseSideModal
      isOpen={isOpen}
      onClose={onClose}
      title="Tarik ke Utama"
      actionText="Tarik Saldo"
      onAction={handleSubmit}
      isActionDisabled={isInvalid}
      isLoading={isLoading}
    >
      <div className="space-y-6">
        {/* Sumber: Portofolio */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Dari Dompet:
          </label>
          <div className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900">{portfolio?.name || "Portofolio"}</p>
                <p className="text-[10px] text-slate-500 uppercase">{portfolio?.id}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase font-medium">Saldo Kas</p>
              <p className="text-sm font-bold text-slate-900">{formatCurrencyIDR(availableBalance)}</p>
            </div>
          </div>
        </div>

        {/* Ikon Panah Down */}
        <div className="flex justify-center -my-2">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shadow-sm z-10">
            <ArrowDown className="w-5 h-5 text-slate-400" />
          </div>
        </div>

        {/* Tujuan: Dompet Utama */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Ke Global Wallet:
          </label>
          <div className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-brand" />
              </div>
              <span className="font-bold text-slate-900">Dompet Utama</span>
            </div>
          </div>
        </div>

        {/* Input Nominal */}
        <div className="bg-orange-50/50 p-5 rounded-2xl border border-orange-100 space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              NOMINAL TARIK
            </label>
            <button 
              onClick={handleMaxClick}
              className="text-[10px] font-bold text-brand uppercase hover:underline"
            >
              Tarik Semua
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Rp 0"
              value={amountText}
              onChange={handleAmountChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand font-bold text-xl text-slate-900 bg-white"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500">Maksimal penarikan:</span>
            <span className={`text-xs font-bold ${amount > availableBalance ? "text-error-500" : "text-slate-700"}`}>
              {formatCurrencyIDR(availableBalance)}
            </span>
          </div>
          
          {amount > availableBalance && (
            <p className="text-error-500 text-[10px] font-medium">
              Saldo kas di portofolio ini tidak mencukupi.
            </p>
          )}
        </div>

        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
          <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">i</div>
          <p className="text-[11px] text-blue-700 leading-relaxed">
            Dana yang ditarik akan segera tersedia di Dompet Utama Anda dan dapat dialokasikan kembali ke portofolio lain.
          </p>
        </div>
      </div>
    </BaseSideModal>
  );
};

export default WithdrawModal;
