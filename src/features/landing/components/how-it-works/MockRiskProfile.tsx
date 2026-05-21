import { motion } from "framer-motion";

const MockRiskProfile = () => {
  const GLOBAL_DURATION = 6;

  return (
    <div className="w-full max-w-[240px] relative h-[140px] flex items-end justify-center scale-[0.95] origin-center pb-2 overflow-hidden">
      <div className="absolute w-[180px] h-[180px] rounded-full border-4 border-gray-100/80 bottom-[-50px] flex items-center justify-center">
        <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden flex rotate-[-90deg]">
          <div className="absolute top-0 left-0 w-full h-full bg-[#2E7D32] origin-center clip-segment-1" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 36%)' }} />
          <div className="absolute top-0 left-0 w-full h-full bg-[#4CAF50] origin-center" style={{ clipPath: 'polygon(50% 50%, 100% 36%, 100% 100%, 64% 100%)' }} />
          <div className="absolute top-0 left-0 w-full h-full bg-[#81C784] origin-center" style={{ clipPath: 'polygon(50% 50%, 64% 100%, 0 100%, 0 64%)' }} />
          <div className="absolute top-0 left-0 w-full h-full bg-[#C8E6C9] origin-center" style={{ clipPath: 'polygon(50% 50%, 0 64%, 0 0, 50% 0)' }} />
        </div>
        <div className="absolute w-[110px] h-[110px] bg-white rounded-full shadow-inner" />
      </div>

      <div className="absolute bottom-[20px] flex items-center justify-center">
        <motion.div
          animate={{
            rotate: [-60, 60, -20, 40, -60]
          }}
          transition={{
            duration: GLOBAL_DURATION,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "bottom center" }}
          className="relative w-[8px] h-[55px] flex flex-col items-center justify-start origin-bottom"
        >
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[12px] border-b-emerald-600 mb-[-2px]" />
          <div className="w-[6px] h-[35px] bg-white rounded-t-sm shadow-sm border-x border-t border-gray-200" />
          <div className="w-[16px] h-[16px] bg-white rounded-full border border-gray-200 shadow-md flex items-center justify-center absolute bottom-[-8px]">
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MockRiskProfile;