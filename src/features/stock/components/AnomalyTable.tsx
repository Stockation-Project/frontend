import React, { useState } from "react";
import type { AnomalyHistory } from "../types/stock";
import { Sparkles, TrendingUp, Clock } from "lucide-react";
import AIExplanationModal from "@/components/shared/modal/AIExplanationModal";

interface AnomalyTableProps {
  data: AnomalyHistory[];
  stockSymbol?: string;
}

const AnomalyTable: React.FC<AnomalyTableProps> = ({ data, stockSymbol }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState<string | undefined>();

  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("kritis")) {
      return "bg-gradient-to-b from-error-100 to-error-25 text-error-600 border-error-400";
    }
    if (lowerStatus.includes("tinggi")) {
      return "bg-gradient-to-b from-orange-100 to-orange-25 text-orange-600 border-orange-400";
    }
    if (lowerStatus.includes("sedang")) {
      return "bg-gradient-to-b from-blue-100 to-blue-25 text-blue-600 border-blue-400";
    }
    return "bg-gradient-to-b from-green-100 to-green-25 text-green-700 border-green-400";
  };

  const getStatusDot = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("kritis")) return "bg-error-500";
    if (lowerStatus.includes("tinggi")) return "bg-orange-500";
    if (lowerStatus.includes("sedang")) return "bg-blue-500";
    return "bg-green-500";
  };

  const handleOpenAI = (item: AnomalyHistory) => {
    const context = `Saham ${stockSymbol || "ini"} mengalami anomali dengan pergerakan harga ${item.price_movement} pada periode ${item.period}. Status anomali: ${item.status}. Berikan masukan singkat agar investor pemula tidak FOMO atau panic selling.`;
    setModalContext(context);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* ── DESKTOP: tabel biasa ── */}
      <div className="hidden sm:block w-full max-h-[168px] overflow-y-auto border border-border-primary rounded-xl bg-background-primary scrollbar-thin scrollbar-thumb-border-primary scrollbar-track-transparent">
        <table className="w-full text-xs text-left border-collapse">
          <thead className="text-[10px] font-semibold text-text-muted uppercase tracking-wider border-b border-border-primary sticky top-0 bg-background-secondary z-10">
            <tr>
              <th className="py-2.5 px-3 font-medium text-center">Periode</th>
              <th className="py-2.5 px-3 font-medium text-center">Pergerakan Harga</th>
              <th className="py-2.5 px-3 font-medium text-center">Status</th>
              <th className="py-2.5 px-3 font-medium text-center">Insight AI</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="border-b border-border-secondary last:border-0 hover:bg-background-secondary/40 transition-colors"
                >
                  <td className="py-2.5 px-3 text-xs text-text-secondary whitespace-nowrap text-center font-medium">
                    {item.period}
                  </td>
                  <td className="py-2.5 px-3 text-xs text-text-primary font-medium text-center">
                    {item.price_movement}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-1 text-[10px] font-medium border rounded-full whitespace-nowrap ${getStatusColor(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => handleOpenAI(item)}
                      className="text-text-subtle hover:text-brand transition-colors cursor-pointer mx-auto flex justify-center p-1 rounded-md hover:bg-brand-50"
                      aria-label="Penjelasan AI untuk anomali ini"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-text-muted italic">
                  Tidak ada catatan pergerakan anomali.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── MOBILE: card list, tanpa scroll horizontal ── */}
      <div className="sm:hidden w-full max-h-[260px] overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-border-primary scrollbar-track-transparent">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={item.id || index}
              className="w-full rounded-xl border border-border-primary bg-background-primary px-3 py-2.5 flex items-center gap-3"
            >
              {/* Dot indikator status */}
              <span
                className={`shrink-0 w-2 h-2 rounded-full ${getStatusDot(item.status)}`}
                aria-hidden="true"
              />

              {/* Konten tengah: 3 baris */}
              <div className="flex-1 min-w-0 space-y-0.5">
                {/* Baris 1: Periode */}
                <div className="flex items-center gap-1 text-[10px] text-text-muted">
                  <Clock className="w-3 h-3 shrink-0" />
                  <span className="truncate">{item.period}</span>
                </div>

                {/* Baris 2: Pergerakan harga */}
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-text-secondary shrink-0" />
                  <span className="text-xs font-semibold text-text-primary">
                    {item.price_movement}
                  </span>
                </div>

                {/* Baris 3: Badge status */}
                <div>
                  <span
                    className={`inline-block px-2 py-0.5 text-[10px] font-medium border rounded-full whitespace-nowrap ${getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Tombol AI */}
              <button
                onClick={() => handleOpenAI(item)}
                className="shrink-0 text-text-subtle hover:text-brand transition-colors cursor-pointer flex items-center justify-center p-1.5 rounded-lg hover:bg-brand-50"
                aria-label="Penjelasan AI untuk anomali ini"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-text-muted italic text-xs">
            Tidak ada catatan pergerakan anomali.
          </div>
        )}
      </div>

      <AIExplanationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        term="Anomali Harga Saham"
        context={modalContext}
      />
    </>
  );
};

export default AnomalyTable;