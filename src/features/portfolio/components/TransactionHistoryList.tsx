import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";

interface TransactionHistoryListProps {
  transactions: any[];
}

const TransactionHistoryList: React.FC<TransactionHistoryListProps> = ({
  transactions,
}) => {
  const [filter, setFilter] = useState<"ALL" | "BUY" | "SELL">("ALL");

  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  const filteredData = safeTransactions.filter(
    (tx) => filter === "ALL" || tx.type === filter,
  );

  return (
    <div className="space-y-4">
      {/* Header & Filter */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-text-primary">Riwayat Transaksi</h2>
        <div className="flex bg-border-secondary p-1 rounded-xl">
          {["ALL", "BUY", "SELL"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === f
                  ? "bg-background-primary text-text-primary shadow-sm"
                  : "text-text-muted hover:text-text-secondary"
                }`}
            >
              {f === "ALL" ? "Semua" : f === "BUY" ? "Beli" : "Jual"}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction Cards */}
      <div className="space-y-4">
        {filteredData.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-border-primary rounded-3xl">
            <p className="text-text-muted text-sm">Belum ada riwayat transaksi.</p>
          </div>
        ) : (
          filteredData.map((tx) => (
            <div
              key={tx.id}
              className="bg-background-primary border border-border-primary rounded-3xl p-6 hover:border-border-secondary transition-all group"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      tx.type === "BUY"
                        ? "bg-brand-50 text-brand"
                        : "bg-error-50 text-error-500"
                      }`}
                  >
                    {tx.type === "BUY" ? "Beli" : "Jual"}
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary text-sm uppercase">
                      #{tx.id.slice(0, 8)}
                    </h4>
                    <p className="text-[10px] text-text-muted mt-0.5">
                      {new Date(tx.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}, {new Date(tx.created_at).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })} WIB
                    </p>
                  </div>
                </div>
                <div className="bg-brand-50 text-brand px-3 py-1 rounded-lg text-[10px] font-bold">
                  Selesai
                </div>
              </div>

              {/* Card Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6 border-b border-border-secondary pb-6">
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                    Jumlah Lot
                  </p>
                  <p className="text-sm font-bold text-text-primary">
                    {tx.shares / 100} Lot
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                    Jumlah Lembar
                  </p>
                  <p className="text-sm font-bold text-text-primary">
                    {tx.shares}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                    Harga / Lembar
                  </p>
                  <p className="text-sm font-bold text-text-primary">
                    {formatCurrencyIDR(tx.price)}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex flex-col gap-1">
                <p className="text-[10px] text-text-muted uppercase tracking-wider">
                  {tx.type === "BUY" ? "Total Bayar" : "Total Diterima"}
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-lg font-bold text-text-primary">
                    {formatCurrencyIDR(tx.total_amount)}
                  </p>
                </div>
                <p className="text-[10px] text-text-muted">
                  Subtotal {formatCurrencyIDR(tx.total_amount)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionHistoryList;
