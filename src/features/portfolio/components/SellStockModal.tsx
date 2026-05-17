import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";
import { sellStockService } from "../services/transaction.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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

  const totalRevenue = lots * 100 * currentPrice;

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

      toast.success(`Berhasil menjual ${lots} lot saham ${ticker}`);
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Gagal menjual saham");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-[32px] p-8 border-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-text-primary">
            Jual Saham {ticker}
          </DialogTitle>
          <DialogDescription className="text-text-muted">
            Anda memiliki {maxLots} lot saham ini. Berapa lot yang ingin Anda jual?
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-subtle uppercase tracking-wider">
              Jumlah Lot
            </label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={lots}
                onChange={(e) => setLots(Math.min(maxLots, Math.max(0, parseInt(e.target.value) || 0)))}
                className="rounded-xl border-border-primary h-12 text-lg font-bold text-text-primary"
                min={1}
                max={maxLots}
              />
              <Button
                variant="outline"
                className="rounded-xl h-12 px-4 text-xs font-bold text-text-secondary border-border-primary"
                onClick={() => setLots(maxLots)}
              >
                MAKSIMAL
              </Button>
            </div>
          </div>

          <div className="bg-background-secondary rounded-2xl p-4 space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">Harga Jual / Lembar</span>
              <span className="font-bold text-text-primary">{formatCurrencyIDR(currentPrice)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">Total Lembar</span>
              <span className="font-bold text-text-primary">{lots * 100} lembar</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-border-primary">
              <span className="text-sm font-bold text-text-primary">Total Diterima</span>
              <span className="text-lg font-bold text-brand">
                {formatCurrencyIDR(totalRevenue)}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-row gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 rounded-xl h-12 text-text-secondary font-bold hover:bg-background-secondary"
          >
            Batal
          </Button>
          <Button
            onClick={handleSell}
            disabled={isSubmitting || lots <= 0 || lots > maxLots}
            className="flex-1 rounded-xl h-12 bg-error-500 hover:bg-error-700 text-white font-bold shadow-lg shadow-error-500/20"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              "Konfirmasi Jual"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SellStockModal;
