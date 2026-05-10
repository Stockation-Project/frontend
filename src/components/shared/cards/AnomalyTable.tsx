import React from "react";
import type { AnomalyHistory } from "@/types/stock";

interface AnomalyTableProps {
  data: AnomalyHistory[];
}

const AnomalyTable: React.FC<AnomalyTableProps> = ({ data }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-500 border-b border-slate-200">
          <tr>
            <th className="py-3 font-medium">Periode</th>
            <th className="py-3 font-medium">Pergerakan Harga</th>
            <th className="py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.id || index}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
              >
                <td className="py-4 text-slate-600">{item.period}</td>
                <td className="py-4 text-slate-600">{item.price_movement}</td>
                <td className="py-4 text-slate-600">{item.status}</td>
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
