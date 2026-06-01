import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-20 pb-20 px-4 sm:px-6 bg-brand-1000">
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3 leading-tight">
            Siap Jadi Investor yang<br />Rasional dan Tangguh?
          </h2>
          <p className="text-xs text-brand-300 mb-8">
            Bergabunglah sekarang. Bangun kebiasaan investasimu dengan jaring pengaman psikologis, hari ini juga.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-brand hover:bg-brand-950 text-white font-semibold text-sm px-8 py-2 rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            Daftar Sekarang
          </button>
        </motion.div>
      </div>

    </section>
  );
};

export default CTASection;
