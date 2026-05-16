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
          <DialogTitle className="text-xl font-bold text-slate-900">
            Jual Saham {ticker}
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Anda memiliki {maxLots} lot saham ini. Berapa lot yang ingin Anda jual?
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Jumlah Lot
            </label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={lots}
                onChange={(e) => setLots(Math.min(maxLots, Math.max(0, parseInt(e.target.value) || 0)))}
                className="rounded-xl border-slate-200 h-12 text-lg font-bold text-slate-900"
                min={1}
                max={maxLots}
              />
              <Button
                variant="outline"
                className="rounded-xl h-12 px-4 text-xs font-bold text-slate-600 border-slate-200"
                onClick={() => setLots(maxLots)}
              >
                MAKSIMAL
              </Button>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Harga Jual / Lembar</span>
              <span className="font-bold text-slate-900">{formatCurrencyIDR(currentPrice)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Total Lembar</span>
              <span className="font-bold text-slate-900">{lots * 100} lembar</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-200">
              <span className="text-sm font-bold text-slate-900">Total Diterima</span>
              <span className="text-lg font-bold text-[#329B0D]">
                {formatCurrencyIDR(totalRevenue)}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 rounded-xl h-12 text-slate-500 font-bold hover:bg-slate-50"
          >
            Batal
          </Button>
          <Button
            onClick={handleSell}
            disabled={isSubmitting || lots <= 0 || lots > maxLots}
            className="flex-1 rounded-xl h-12 bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-600/20"
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
