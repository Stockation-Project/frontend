import { motion } from "framer-motion";

const MockRiskProfile = () => {
  const GLOBAL_DURATION = 6;

  return (
    <div className="w-full max-w-[240px] relative h-[140px] flex items-end justify-center scale-[0.95] origin-center pb-2 overflow-hidden">
      {/* 1. BUSUR LUAR (Garis Lengkung Abu-abu Tipis) */}
      <div className="absolute w-[180px] h-[180px] rounded-full border-4 border-gray-100/80 bottom-[-50px] flex items-center justify-center">
        
        {/* 2. BUSUR UTAMA (Container Berwarna) */}
        <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden flex rotate-[-90deg]">
          {/* Segmen 1: Sangat Konservatif (Hijau Tua) */}
          <div className="absolute top-0 left-0 w-full h-full bg-[#2E7D32] origin-center clip-segment-1" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 36%)' }} />
          {/* Segmen 2: Konservatif (Hijau Medium) */}
          <div className="absolute top-0 left-0 w-full h-full bg-[#4CAF50] origin-center" style={{ clipPath: 'polygon(50% 50%, 100% 36%, 100% 100%, 64% 100%)' }} />
          {/* Segmen 3: Moderat (Hijau Semburat Terang) */}
          <div className="absolute top-0 left-0 w-full h-full bg-[#81C784] origin-center" style={{ clipPath: 'polygon(50% 50%, 64% 100%, 0 100%, 0 64%)' }} />
          {/* Segmen 4: Agresif (Hijau Sangat Muda) */}
          <div className="absolute top-0 left-0 w-full h-full bg-[#C8E6C9] origin-center" style={{ clipPath: 'polygon(50% 50%, 0 64%, 0 0, 50% 0)' }} />
        </div>

        {/* 3. MASKING TENGAH (Membuat efek donat/busur tipis & background putih) */}
        <div className="absolute w-[110px] h-[110px] bg-white rounded-full shadow-inner" />
      </div>

      {/* 4. JARUM PETUNJUK (ANIMASI) */}
      <div className="absolute bottom-[20px] flex items-center justify-center">
        <motion.div
          animate={{
            // Jarum bergerak menyapu dari Kiri (Konservatif) ke Kanan (Agresif) lalu kembali
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
          {/* Ujung Jarum Hijau */}
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[12px] border-b-emerald-600 mb-[-2px]" />
          {/* Batang Jarum Putih */}
          <div className="w-[6px] h-[35px] bg-white rounded-t-sm shadow-sm border-x border-t border-gray-200" />
          {/* Engsel Lingkaran Bawah */}
          <div className="w-[16px] h-[16px] bg-white rounded-full border border-gray-200 shadow-md flex items-center justify-center absolute bottom-[-8px]">
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MockRiskProfile;