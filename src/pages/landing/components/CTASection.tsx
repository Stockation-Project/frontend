import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 sm:px-6 bg-brand-1000">
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
            Siap Jadi Investor yang<br />Lebih Cerdas?
          </h2>
          <p className="text-sm text-brand-300 mb-8">
            Bergabung sekarang dan mulai simulasimu hari ini. Gratis, tanpa risiko.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-brand hover:bg-brand-700 text-white font-semibold text-sm px-8 py-3 rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            Daftar Sekarang
          </button>
        </motion.div>
      </div>

      {/* Big watermark text */}
      <div className="mt-16 overflow-hidden">
        <p className="text-center text-[clamp(3rem,12vw,8rem)] font-black text-white/5 tracking-widest select-none">
          STOCKATION
        </p>
      </div>
    </section>
  );
};

export default CTASection;
