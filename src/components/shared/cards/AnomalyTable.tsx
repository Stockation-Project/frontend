import React from "react";
import type { AnomalyHistory } from "@/types/stock";

interface AnomalyTableProps {
  data: AnomalyHistory[];
}

const AnomalyTable: React.FC<AnomalyTableProps> = ({ data }) => {
  // Fungsi helper untuk mewarnai label status berdasarkan tingkat keparahan
  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("kritis")) {
      return "bg-red-50 text-red-600 border-red-200";
    }
    if (lowerStatus.includes("tinggi")) {
      return "bg-orange-50 text-orange-600 border-orange-200";
    }
    if (lowerStatus.includes("sedang")) {
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
    return "bg-slate-50 text-slate-600 border-slate-200";
  };

  return (
    // Wrapper dengan batasan tinggi (sekitar 3-4 baris) dan scroll otomatis
    <div className="w-full max-h-[240px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
      <table className="w-full text-sm text-left border-collapse">
        {/* Sticky Header agar tidak hilang saat discroll */}
        <thead className="text-xs text-slate-500 border-b border-slate-200 sticky top-0 bg-white z-10">
          <tr>
            <th className="py-3 px-2 font-medium text-center">Periode</th>
            <th className="py-3 px-2 font-medium text-center">Pergerakan Harga</th>
            <th className="py-3 px-2 font-medium text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.id || index}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
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
