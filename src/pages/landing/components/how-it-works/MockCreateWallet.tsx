import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

const MockCreateWallet = () => {
  const walletNameText = "Dompet Blue Chip";
  const GLOBAL_DURATION = 8;
  const characters = walletNameText.split('');

  return (
    <div className="w-full max-w-[240px] relative h-[140px] flex items-center justify-center scale-[0.95] origin-center">
      <motion.div
        animate={{
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
            <div className="h-4 flex items-center font-sans text-[11px] font-semibold leading-none tracking-tight">
              <motion.div
                animate={{ opacity: [1, 1, 1, 0.5, 0.5] }}
                transition={{
                  duration: GLOBAL_DURATION,
                  times: [0, 0.40, 0.85, 0.92, 1],
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block whitespace-nowrap overflow-hidden pr-0.5"
              >
                <div className="inline-flex relative">
                  {characters.map((char, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: (idx * 0.05),
                        duration: 0.05,
                        repeat: Infinity,
                        repeatDelay: GLOBAL_DURATION - (characters.length * 0.05)
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.4,
                      repeat: Infinity,
                      repeatDelay: GLOBAL_DURATION - 0.4
                    }}
                    className="border-r-2 border-white/80 h-4 ml-0.5"
                  />
                </div>
              </motion.div>
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