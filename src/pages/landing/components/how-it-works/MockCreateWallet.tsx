import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

const MockCreateWallet = () => {
  const walletNameText = "Dompet Blue Chip";
  const GLOBAL_DURATION = 8;

  return (
    <div className="w-full max-w-[240px] relative h-[140px] flex items-center justify-center scale-[0.95] origin-center">
      <motion.div
        animate={{
          y: [0, 0, -40, -40, 0, 0],
          opacity: [1, 1, 0.9, 0.9, 1, 1]
        }}
        transition={{
          duration: GLOBAL_DURATION,
          times: [0, 0.60, 0.70, 0.85, 0.95, 1],
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-full bg-white rounded-xl border border-brand ring-1 ring-brand flex flex-col overflow-hidden shadow-md text-left absolute top-2"
      >
        <div className="px-3 py-2 flex items-center gap-2 bg-brand text-white">
          <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 bg-white/20">
            <Wallet className="w-4 h-4 stroke-[1.5px]" />
          </div>
          <div className="overflow-hidden flex-1">
            <div className="h-4 flex items-center font-mono text-[11px] font-semibold leading-none tracking-tight">
              <motion.span
                animate={{ width: ["0%", "100%", "100%", "0%", "0%"] }}
                transition={{
                  duration: GLOBAL_DURATION,
                  times: [0, 0.40, 0.85, 0.92, 1],
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block whitespace-nowrap overflow-hidden pr-0.5 border-r border-white/80"
                style={{ borderRightWidth: '2px' }}
              >
                {walletNameText}
              </motion.span>
            </div>
            <p className="text-[8px] text-white/70 uppercase tracking-wider truncate mt-0.5">WLT-BLUECHIP</p>
          </div>
        </div>

        <div className="p-3 space-y-2 bg-background-primary">
          <div>
            <div className="w-full h-1.5 flex rounded-full overflow-hidden bg-border-secondary mb-1">
              <motion.div 
                animate={{ width: ["0%", "100%", "100%", "0%", "0%"] }}
                transition={{ duration: GLOBAL_DURATION, times: [0, 0.55, 0.85, 0.92, 1], repeat: Infinity }}
                className="h-full bg-emerald-600 w-0"
              />
            </div>
            <div className="flex gap-2 text-[8px] text-text-muted font-medium">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"/> BBCA</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-border-secondary"/> Lainnya</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-border-secondary text-[10px]">
            <div>
              <span className="text-[8px] text-text-muted block">Saldo Tersedia</span>
              <span className="font-semibold text-text-primary">Rp10.000.000</span>
            </div>
            <div className="text-right">
              <span className="text-[8px] text-text-muted block">Terpakai</span>
              <span className="font-semibold text-text-primary">Rp0</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MockCreateWallet;