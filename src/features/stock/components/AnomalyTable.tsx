import React from "react";
import type { AnomalyHistory } from "../types/stock";

interface AnomalyTableProps {
  data: AnomalyHistory[];
}

const AnomalyTable: React.FC<AnomalyTableProps> = ({ data }) => {
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

  return (
    <div className="w-full max-h-[168px] overflow-y-auto border border-border-primary rounded-xl bg-background-primary scrollbar-thin scrollbar-thumb-border-primary scrollbar-track-transparent">
      <table className="w-full text-xs text-left border-collapse">
        {/* Sticky Header */}
        <thead className="text-[10px] font-semibold text-text-muted uppercase tracking-wider border-b border-border-primary sticky top-0 bg-background-secondary z-10">
          <tr>
            <th className="py-2.5 px-3 font-medium text-center">Periode</th>
            <th className="py-2.5 px-3 font-medium text-center">Pergerakan Harga</th>
            <th className="py-2.5 px-3 font-medium text-center">Status</th>
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-8 text-center text-text-muted italic">
                Tidak ada catatan pergerakan anomali.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AnomalyTable;
