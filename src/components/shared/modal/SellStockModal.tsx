import React, { useState, useEffect } from "react";
import BaseSideModal from "../layout/BaseSideModal";
import QuickSelectButton from "@/components/shared/QuickSelectButton";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import { sellStockService } from "@/features/portfolio/services/transaction.service";
import { toast } from "sonner";
import { TrendingDown } from "lucide-react";

interface SellStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticker: string;
  portfolioId: string;
  maxLots: number;
  currentPrice: number;
  onSuccess: () => void;
}

const SellStockModal: React.FC<SellStockModalProps> = ({
  isOpen,
  onClose,
  ticker,
  portfolioId,
  maxLots,
  currentPrice,
  onSuccess,
}) => {
  const [lots, setLots] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset state tiap kali modal dibuka
  useEffect(() => {
    if (isOpen) {
      setLots(maxLots > 0 ? 1 : 0);
    }
  }, [isOpen, maxLots]);

  const totalRevenue = lots * 100 * currentPrice;

  // Membuat tombol pilihan cepat dinamis berdasarkan kepemilikan lot
  const rawOptions = [
    { label: "25%", value: Math.max(1, Math.floor(maxLots * 0.25)) },
    { label: "50%", value: Math.max(1, Math.floor(maxLots * 0.50)) },
    { label: "75%", value: Math.max(1, Math.floor(maxLots * 0.75)) },
    { label: "100% (Maksimal)", value: maxLots },
  ];

  // Menyaring nilai duplikat dan memastikan lot valid (> 0 dan <= maxLots)
  const lotOptions = rawOptions.reduce<{ label: string; value: number }[]>((acc, current) => {
    if (
      current.value > 0 &&
      current.value <= maxLots &&
      !acc.some((item) => item.value === current.value)
    ) {
      acc.push(current);
    }
    return acc;
  }, []);

  const handleSell = async () => {
    if (lots <= 0 || lots > maxLots) {
      toast.error(`Jumlah lot tidak valid (Maksimal ${maxLots} lot)`);
      return;
    }

    try {
      setIsSubmitting(true);
      await sellStockService({
        portfolio_id: portfolioId,
        ticker,
        lots,
        current_price: currentPrice,
      });

      toast.success("Penjualan Berhasil", {
        description: `${lots} Lot ${ticker} berhasil dijual dengan total penerimaan ${formatCurrencyIDR(totalRevenue)}. Dana sudah masuk ke saldo dompet kamu.`,
        duration: 5000, // 5 detik
      });
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Gagal menjual saham");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseSideModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Jual Saham ${ticker}`}
      actionText="Konfirmasi Jual"
      onAction={handleSell}
      actionVariant="error"
      isActionDisabled={lots <= 0 || lots > maxLots || isSubmitting}
      isLoading={isSubmitting}
      modalDataTour="sell-stock-modal"
      submitDataTour="sell-confirm-button"
      closeDataTour="sell-modal-close"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
            Kepemilikan Saat Ini
          </label>
          <div className="w-full px-4 py-3 rounded-xl border border-border-primary bg-background-secondary flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-error-50 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-error-500" />
              </div>
              <div>
                <span className="font-bold text-text-primary text-sm">
                  {ticker}
                </span>
                <span className="text-xs text-text-muted ml-2">
                  (Maksimal {maxLots} Lot / {maxLots * 100} Lembar)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-brand-25 p-5 rounded-lg border border-brand/10 space-y-4">
          <label className="block text-xs font-medium text-text-muted uppercase tracking-wider">
            Jumlah Lot Jual
          </label>

          {lotOptions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {lotOptions.map((opt) => (
                <QuickSelectButton
                  key={opt.label}
                  label={opt.label}
                  isSelected={lots === opt.value}
                  onClick={() => setLots(opt.value)}
                />
              ))}
            </div>
          )}

          <div className="relative">
            <input
              type="number"
              placeholder="0"
              data-tour="sell-lot-input"
              value={lots || ""}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10) || 0;
                setLots(Math.min(maxLots, Math.max(0, val)));
              }}
              className="w-full px-4 py-3 rounded-xl border border-border-primary focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand font-bold text-xl text-text-primary bg-background-primary"
              min={1}
              max={maxLots}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-text-muted text-sm">
              LOT
            </div>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-text-muted">
              Total Lembar: <span className="font-medium text-text-primary">{lots * 100} lembar</span>
            </span>
            {lots > maxLots && (
              <span className="font-bold text-error-500">Melebihi batas kepemilikan</span>
            )}
          </div>
        </div>

        <div className="bg-background-secondary rounded-2xl p-4 space-y-3 border border-border-primary">
          <div className="flex justify-between text-xs">
            <span className="text-text-muted">Harga Jual / Lembar</span>
            <span className="font-bold text-text-primary">
              {formatCurrencyIDR(currentPrice)}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-text-muted">Total Lembar Jual</span>
            <span className="font-bold text-text-primary">
              {lots * 100} lembar
            </span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-border-primary">
            <span className="text-sm font-bold text-text-primary">
              Total Diterima
            </span>
            <span className="text-lg font-bold text-brand">
              {formatCurrencyIDR(totalRevenue)}
            </span>
          </div>
        </div>
      </div>
    </BaseSideModal>
  );
};

export default SellStockModal;
