import React from "react";
import type { AnomalyHistory } from "../types/stock";

interface AnomalyTableProps {
  data: AnomalyHistory[];
}

const AnomalyTable: React.FC<AnomalyTableProps> = ({ data }) => {
  // Fungsi helper untuk mewarnai label status berdasarkan tingkat keparahan
  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("kritis")) {
      return "bg-error-50 text-error-600 border-error-200";
    }
    if (lowerStatus.includes("tinggi")) {
      return "bg-warning-50 text-warning-600 border-warning-200";
    }
    if (lowerStatus.includes("sedang")) {
      return "bg-warning-50 text-warning-700 border-warning-200";
    }
    return "bg-background-secondary text-slate-600 border-border-primary";
  };

  return (
    // Wrapper dengan batasan tinggi (sekitar 3-4 baris) dan scroll otomatis
    <div className="w-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent border border-border-primary rounded-lg">
      <table className="w-full text-sm text-left border-collapse">
        {/* Sticky Header agar tidak hilang saat discroll */}
        <thead className="text-xs text-slate-500 border-b border-border-primary sticky top-0 bg-background-secondary z-10">
          <tr>
            <th className="py-3 px-2 font-medium text-center">Periode</th>
            <th className="py-3 px-2 font-medium text-center">Pergerakan Harga</th>
            <th className="py-3 px-2 font-medium text-center">Status</th>
          </tr>
        </thead>
        <tbody className="h-37 overflow-y-auto">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.id || index}
                className="border-b border-border-secondary last:border-0 hover:bg-background-secondary/50 transition-colors"
              >
                <td className="py-4 px-2 text-slate-600 whitespace-nowrap text-center">
                  {item.period}
                </td>
                <td className="py-4 px-2 text-slate-800 font-semibold text-center">
                  {item.price_movement}
                </td>
                <td className="py-4 px-2">
                  <span
                    className={`px-3 py-1 text-xs font-bold border rounded-full whitespace-nowrap text-center ${getStatusColor(
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
              <td colSpan={3} className="py-8 text-center text-slate-400">
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
