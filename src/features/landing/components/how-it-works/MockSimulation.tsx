import { Area, Bar, ComposedChart, ResponsiveContainer, CartesianGrid, ReferenceLine, YAxis } from "recharts";
import { motion } from "framer-motion";

const mockData = [
  { price: 100 }, // Start
  { price: 105 }, // Naik tajam
  { price: 98  }, // Gelombang turun (pullback)
  { price: 104 }, // Mulai naik lagi
  { price: 102 }, // Koreksi kecil
  { price: 108 }, // Menembus titik tertinggi sebelumnya
  { price: 115 }, // Lanjut naik
  { price: 110 }, // Gelombang turun cukup dalam
  { price: 112 }, // Konsolidasi
  { price: 107 }, // Tes psikologis bawah
  { price: 116 }, // Rebound kuat
  { price: 125 }, // Lonjakan harga
  { price: 120 }, // Ambil untung (profit taking)
  { price: 129 }, // Rally naik
  { price: 124 }, // Koreksi sehat
  { price: 135 }, // Melesat naik
  { price: 131 }, // Gelombang turun
  { price: 133 }, // Sideways / flat
  { price: 128 }, // Penurunan jebakan (bear trap)
  { price: 142 }, // Naik drastis (rebound)
  { price: 146 }, // Puncak sementara
  { price: 139 }, // Koreksi terakhir
  { price: 149 }, // Naik lagi
  { price: 145 }, // Turun sedikit
  { price: 152 }  // Target Akhir
];

const MockSimulation = () => {
  const lastPrice = mockData[mockData.length - 1].price;

  return (
    <div className="w-full h-full relative flex flex-col bg-transparent overflow-hidden ring-1 ring-border-primary/50">
      
      {/* Header UI - Persis seperti terminal saham asli */}
      <div className="absolute top-0 left-0 right-0 px-3 py-2.5 z-10 flex justify-between items-start pointer-events-none  pb-6">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center text-[7px] font-bold text-white shadow-sm">BCA</div>
            <span className="text-[10px] font-bold text-text-primary tracking-tight">BBCA</span>
            <span className="text-[7px] text-text-muted font-medium bg-background-secondary px-1 py-0.5 rounded border border-border-secondary">Saham</span>
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-sm font-bold text-text-primary tracking-tight">Rp 10.500</span>
            <span className="text-[9px] font-bold text-brand flex items-center">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5"><path d="m3 17 6-6 4 4 8-8"/><path d="V3h8v8"/></svg>
              2,45%
            </span>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex gap-1.5 opacity-90 pt-0.5">
          <div className="px-2 py-1 bg-error-50 text-error-600 text-[8px] font-bold rounded-md shadow-sm border border-error-100">JUAL</div>
          <div className="px-2 py-1 bg-brand text-white text-[8px] font-bold rounded-md shadow-sm border border-brand-700">BELI</div>
        </div>
      </div>

      {/* Area Chart Saham + Volume */}
      <div className="flex-1 w-full mt-6 -mb-1 -ml-1">
        <ResponsiveContainer width="105%" height="100%">
          <ComposedChart data={mockData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="mockColorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--brand, #2C8500)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="var(--brand, #2C8500)" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-secondary)" opacity={0.6} />
            
            {/* Multiple Y-Axes to control scale of Volume vs Price */}
            <YAxis yAxisId="price" domain={['dataMin - 10', 'dataMax + 10']} hide />
            <YAxis yAxisId="volume" domain={[0, 2000]} hide /> 

            {/* Garis batas harga terakhir (Current Price Line) */}
            <ReferenceLine y={lastPrice} yAxisId="price" stroke="var(--brand, #2C8500)" strokeDasharray="2 2" opacity={0.5} />

           

            {/* Price Area */}
            <Area
              yAxisId="price"
              type="linear"
              dataKey="price"
              stroke="var(--brand, #2C8500)"
              strokeWidth={1.5}
              fill="url(#mockColorPrice)"
              isAnimationActive={true}
              animationDuration={2000}
              activeDot={{ r: 4, strokeWidth: 0, fill: "var(--brand, #2C8500)" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Hover Crosshair Animasi */}
      <motion.div 
        className="absolute top-10 bottom-0 w-[1px] bg-border-primary/80 pointer-events-none border-l border-dashed border-text-muted/30"
        animate={{ x: [40, 180, 90, 210, 120] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default MockSimulation;