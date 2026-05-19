import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import dashboardImg from "../../../assets/images/landing-page/dashboard.png";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 text-center bg-gradient-to-b from-brand-25 to-background-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        {/* Badge */}
        <span className="inline-flex items-center gap-2 bg-background-primary border border-brand-200 text-[10px] font-medium text-brand px-3 py-1 rounded-full mb-5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          100% Gratis · Simulasi Real-time
        </span>

        <h1 className="text-xl sm:text-3xl md:text-5xl font-semibold text-brand-950 leading-tight mb-4">
          Mulai Investasi<br />Tanpa Rasa Khawatir
        </h1>

        <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto mb-8 leading-relaxed">
          Pelajari saham dengan modal virtual, susun strategi investasimu, dan temukan profil risikomu — sebelum terjun ke pasar nyata.
        </p>

        <div className="flex items-center justify-center gap-3 mb-14">
          <button
            onClick={() => navigate("/register")}
            className="bg-brand hover:bg-brand-950 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
          >
            Daftar Sekarang
          </button>
          <button
            onClick={() => document.getElementById("fitur")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-background-primary border border-border-primary hover:border-brand-200 text-text-secondary text-sm font-medium px-4 py-2 rounded-lg transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            Lihat Fitur
          </button>
        </div>

      </motion.div>

      <div className="relative mt-10">
        <div className="p-2 max-h-120 overflow-hidden bg-background-primary/10 backdrop-blur-sm mx-26 border border-border-primary rounded-lg">
          <img
            src={dashboardImg}
            alt="Ilustrasi Hero"
            className="w-full mx-auto border border-border-primary rounded-lg"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-120 bg-gradient-to-t from-background-primary via-background-primary/10 to-transparent rounded-b-lg pointer-events-none" />
      </div>
      
    </section>
  );
};

export default HeroSection;
