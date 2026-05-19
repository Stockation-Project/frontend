import { motion } from "framer-motion";
import { Check } from "lucide-react";

const MockRegisterForm = () => {
  const emailText = "investor.sukses@email.com";
  const GLOBAL_DURATION = 12;

  return (
    <div className="w-full max-w-[240px] relative h-[180px] flex items-center justify-center">
      <motion.div
        animate={{ y: [0, 0, -82, -82, 0, 0] }}
        transition={{
          duration: GLOBAL_DURATION,
          times: [0, 0.65, 0.72, 0.85, 0.92, 1],
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-full bg-white rounded-xl border border-border-primary p-3.5 shadow-sm space-y-2.5 text-left absolute top-4"
      >
        {/* FIELD INPUT EMAIL */}
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-text-muted">Email</label>
          <div className="relative h-8 w-full border border-border-primary rounded-lg px-2.5 flex items-center bg-background-primary overflow-hidden">
            <div className="text-[11px] text-text-primary font-mono tracking-tight flex items-center overflow-hidden">
              <motion.span
                animate={{ width: ["0%", "100%", "100%", "0%", "0%"] }}
                transition={{
                  duration: GLOBAL_DURATION,
                  times: [0, 0.20, 0.90, 0.92, 1],
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block whitespace-nowrap overflow-hidden"
              >
                {emailText}
              </motion.span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                className="w-0.5 h-3.5 bg-brand inline-block ml-0.5 flex-shrink-0"
              />
            </div>
            <motion.div
              animate={{
                scale: [0, 0, 1, 1, 0, 0],
                opacity: [0, 0, 1, 1, 0, 0]
              }}
              transition={{
                duration: GLOBAL_DURATION,
                times: [0, 0.20, 0.25, 0.90, 0.92, 1],
                repeat: Infinity
              }}
              className="absolute right-2.5 flex items-center justify-center w-4 h-4 rounded-full bg-emerald-50 text-emerald-600"
            >
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </motion.div>
          </div>
        </div>

        {/* FIELD INPUT KATA SANDI */}
        <div className="space-y-1 relative">
          <label className="text-[10px] font-medium text-text-muted">Kata sandi</label>
          <div className="h-8 w-full border border-border-primary rounded-lg px-2.5 flex items-center bg-background-primary justify-between relative overflow-hidden">
            <div className="text-[11px] font-mono flex items-center relative w-20 h-full">
              <motion.span
                animate={{ opacity: [1, 1, 0, 0, 0, 1, 1] }}
                transition={{
                  duration: GLOBAL_DURATION,
                  times: [0, 0.34, 0.35, 0.50, 0.51, 1],
                  repeat: Infinity
                }}
                className="text-text-muted tracking-widest absolute left-0"
              >
                ••••••••••••
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                transition={{
                  duration: GLOBAL_DURATION,
                  times: [0, 0.34, 0.35, 0.50, 0.51, 1],
                  repeat: Infinity
                }}
                className="text-text-primary tracking-normal font-sans text-[10px] absolute left-0"
              >
                rahasia123
              </motion.span>
            </div>
            <div className="text-[10px] font-medium text-brand w-[65px] h-full relative cursor-default select-none flex items-center justify-end pr-1">
              <motion.span
                animate={{ opacity: [1, 1, 0, 0, 1, 1] }}
                transition={{
                  duration: GLOBAL_DURATION,
                  times: [0, 0.34, 0.35, 0.50, 0.51, 1],
                  repeat: Infinity
                }}
                className="absolute"
              >
                Lihat
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                transition={{
                  duration: GLOBAL_DURATION,
                  times: [0, 0.34, 0.35, 0.50, 0.51, 1],
                  repeat: Infinity
                }}
                className="absolute"
              >
                Sembunyikan
              </motion.span>
            </div>
          </div>
        </div>

        {/* TOMBOL DAFTAR */}
        <div className="pt-2">
          <motion.div
            animate={{
              scale: [1, 1, 0.95, 1, 1],
              opacity: [0.9, 0.9, 1, 0.9, 0.9]
            }}
            transition={{
              duration: GLOBAL_DURATION,
              times: [0, 0.75, 0.76, 0.77, 1],
              repeat: Infinity,
            }}
            className="w-full h-8 bg-brand rounded-lg flex items-center justify-center text-white text-[11px] font-medium shadow-sm"
          >
            Daftar
          </motion.div>
        </div>

        {/* KURSOR */}
        <motion.div
          animate={{
            x: [120, 120, 194, 194, 120, 120],
            y: [158, 158, 108, 108, 158, 158],
            scale: [1, 1, 0.75, 1, 1, 0.75, 1, 1, 0.75, 1, 1],
          }}
          transition={{
            x: {
              duration: GLOBAL_DURATION,
              times: [0, 0.25, 0.33, 0.53, 0.61, 1],
              repeat: Infinity,
              ease: "easeInOut"
            },
            y: {
              duration: GLOBAL_DURATION,
              times: [0, 0.25, 0.33, 0.53, 0.61, 1],
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: {
              duration: GLOBAL_DURATION,
              times: [0, 0.34, 0.35, 0.36, 0.50, 0.51, 0.52, 0.75, 0.76, 0.77, 1],
              repeat: Infinity
            },
          }}
          className="absolute pointer-events-none z-50 text-black left-0 top-0 origin-top-left"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-2xl">
            <path d="M4.5 2.5v17.2l4.8-4.8 3.3 7.6 3.1-1.3-3.3-7.6 6.1-.5L4.5 2.5z" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MockRegisterForm;