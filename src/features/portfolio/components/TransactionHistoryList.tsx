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
        <h2 className="text-xl font-bold text-slate-900">Riwayat Transaksi</h2>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {["ALL", "BUY", "SELL"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === f
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
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
          <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-3xl">
            <p className="text-slate-400 text-sm">Belum ada riwayat transaksi.</p>
          </div>
        ) : (
          filteredData.map((tx) => (
            <div
              key={tx.id}
              className="bg-white border border-slate-100 rounded-3xl p-6 hover:border-slate-200 transition-all group"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      tx.type === "BUY"
                        ? "bg-green-50 text-[#329B0D]"
                        : "bg-red-50 text-red-500"
                    }`}
                  >
                    {tx.type === "BUY" ? "Beli" : "Jual"}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm uppercase">
                      #{tx.id.slice(0, 8)}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
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
                <div className="bg-green-50 text-[#329B0D] px-3 py-1 rounded-lg text-[10px] font-bold">
                  Selesai
                </div>
              </div>

              {/* Card Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6 border-b border-slate-50 pb-6">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                    Jumlah Lot
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    {tx.shares / 100} Lot
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                    Jumlah Lembar
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    {tx.shares}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                    Harga / Lembar
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    {formatCurrencyIDR(tx.price)}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex flex-col gap-1">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                  {tx.type === "BUY" ? "Total Bayar" : "Total Diterima"}
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-lg font-bold text-slate-900">
                    {formatCurrencyIDR(tx.total_amount)}
                  </p>
                </div>
                <p className="text-[10px] text-slate-400">
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
