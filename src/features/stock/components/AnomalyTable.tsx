import React, { useState } from "react";
import type { AnomalyHistory } from "../types/stock";
import { Sparkles } from "lucide-react";
import AIExplanationModal from "@/components/shared/modal/AIExplanationModal";

interface AnomalyTableProps {
  data: AnomalyHistory[];
  stockSymbol?: string;
}

const AnomalyTable: React.FC<AnomalyTableProps> = ({ data, stockSymbol }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState<string | undefined>();

  // Fungsi helper untuk mewarnai label status dengan gaya pastel premium
  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("kritis")) {
      return "bg-gradient-to-b from-error-100 to-error-25 text-error-600 border-error-100 border border-error-400";
    }
    if (lowerStatus.includes("tinggi")) {
      return "bg-gradient-to-b from-orange-100 to-orange-25 text-orange-600 border-orange-100 border border-orange-400";
    }
    if (lowerStatus.includes("sedang")) {
      return "bg-gradient-to-b from-blue-100 to-blue-25 text-blue-600 border-blue-100 border border-blue-400";
    }
    return "bg-gradient-to-b from-green-100 to-green-25 text-green-700 border-green-100 border border-green-400";
  };

  const handleOpenAI = (item: AnomalyHistory) => {
    const context = `Saham ${stockSymbol || 'ini'} mengalami anomali dengan pergerakan harga ${item.price_movement} pada periode ${item.period}. Status anomali: ${item.status}. Berikan masukan singkat agar investor pemula tidak FOMO atau panic selling.`;
    setModalContext(context);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="w-full max-h-[168px] overflow-y-auto border border-border-primary rounded-xl bg-background-primary scrollbar-thin scrollbar-thumb-border-primary scrollbar-track-transparent">
        <table className="w-full text-xs text-left border-collapse">
          {/* Sticky Header */}
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
                      className={`inline-block px-2 py-1 text-[10px] font-medium border rounded-full whitespace-nowrap ${getStatusColor(
                        item.status,
                      )}`}
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
