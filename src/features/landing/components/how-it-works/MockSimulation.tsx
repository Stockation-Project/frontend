import { Area, Bar, ComposedChart, ResponsiveContainer, CartesianGrid, ReferenceLine, YAxis } from "recharts";
import { motion } from "framer-motion";

const mockData = [
  { price: 100 },{ price: 105 },{ price: 98  },{ price: 104 },{ price: 102 }, 
  { price: 108 },{ price: 115 },{ price: 110 },{ price: 112 },{ price: 107 }, 
  { price: 116 },{ price: 125 },{ price: 120 },{ price: 129 },{ price: 124 }, 
  { price: 135 },{ price: 131 },{ price: 133 },{ price: 128 },{ price: 142 },
  { price: 146 },{ price: 139 },{ price: 149 },{ price: 145 },{ price: 152 }  
];

const MockSimulation = () => {
  const lastPrice = mockData[mockData.length - 1].price;

  return (
    <div className="w-full h-full relative flex flex-col bg-transparent overflow-hidden ring-1 ring-border-primary/50">
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

        <div className="flex gap-1.5 opacity-90 pt-0.5">
          <div className="px-2 py-1 bg-error-50 text-error-600 text-[8px] font-bold rounded-md shadow-sm border border-error-100">JUAL</div>
          <div className="px-2 py-1 bg-brand text-white text-[8px] font-bold rounded-md shadow-sm border border-brand-700">BELI</div>
        </div>
      </div>

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
            <YAxis yAxisId="price" domain={['dataMin - 10', 'dataMax + 10']} hide />
            <YAxis yAxisId="volume" domain={[0, 2000]} hide /> 
            <ReferenceLine y={lastPrice} yAxisId="price" stroke="var(--brand, #2C8500)" strokeDasharray="2 2" opacity={0.5} />
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
      <motion.div 
        className="absolute top-10 bottom-0 w-[1px] bg-border-primary/80 pointer-events-none border-l border-dashed border-text-muted/30"
        animate={{ x: [40, 180, 90, 210, 120] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default MockSimulation;