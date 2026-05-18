import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Mini dashboard mockup
const DashboardMockup = () => (
  <div className="w-full max-w-3xl mx-auto bg-background-primary rounded-2xl shadow-2xl border border-border-primary overflow-hidden text-left">
    {/* Browser bar */}
    <div className="bg-background-secondary border-b border-border-primary px-4 py-2.5 flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-error-400" />
        <div className="w-3 h-3 rounded-full bg-warning-400" />
        <div className="w-3 h-3 rounded-full bg-brand-400" />
      </div>
      <div className="flex-1 mx-4">
        <div className="bg-background-primary border border-border-primary rounded-md px-3 py-1 text-[10px] text-text-muted w-48 mx-auto text-center">
          stockation.co.id/dashboard
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-4">
      <div className="grid grid-cols-3 gap-3">
        {/* Wallet card */}
        <div className="col-span-2 bg-brand-50 rounded-xl p-3 border border-brand-100">
          <p className="text-[10px] text-text-muted mb-1">Dompet Utama</p>
          <p className="text-xl font-bold text-text-primary">Rp30.000.000</p>
          <div className="flex gap-2 mt-2">
            <button className="bg-brand text-white text-[9px] px-2 py-1 rounded-lg">Ke Saldo</button>
            <button className="bg-background-primary border border-border-primary text-text-secondary text-[9px] px-2 py-1 rounded-lg">Alokasikan</button>
          </div>
          <div className="grid grid-cols-3 gap-1.5 mt-3">
            {["Blue Chip", "Growth", "Dividen"].map((s, i) => (
              <div key={i} className="bg-background-primary rounded-lg p-2 border border-border-primary">
                <p className="text-[8px] text-text-muted">{s}</p>
                <p className="text-[9px] font-semibold text-text-primary mt-0.5">Rp{10 - i * 2}.000.000</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col gap-3">
          <div className="bg-brand-50 rounded-xl p-3 border border-brand-100 flex flex-col items-center">
            <p className="text-[9px] text-text-muted mb-1">Ringkasan</p>
            <div className="relative w-14 h-14">
              <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                <circle cx="18" cy="18" r="14" fill="none" stroke="var(--border-secondary)" strokeWidth="4" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="var(--brand-900)" strokeWidth="4" strokeDasharray="62 26" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-text-primary">70%</span>
            </div>
          </div>
          <div className="bg-background-primary rounded-xl p-3 border border-border-primary flex-1 flex flex-col items-center justify-center gap-1">
            <p className="text-[9px] font-semibold text-text-secondary">Profil Risiko</p>
            <div className="w-8 h-8 rounded-full bg-brand-100 border-2 border-brand-300 flex items-center justify-center">
              <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-3 rounded-xl border border-border-primary overflow-hidden">
        <div className="grid grid-cols-4 bg-background-secondary px-3 py-1.5 text-[8px] text-text-muted uppercase font-semibold">
          <span>Emiten</span>
          <span className="text-center">Harga</span>
          <span className="text-center">Perubahan</span>
          <span className="text-right">Return</span>
        </div>
        {[
          { ticker: "BBCA", price: "Rp9.000", change: "+1,2%", ret: "+12%", up: true },
          { ticker: "TLKM", price: "Rp4.150", change: "-0,5%", ret: "-2%", up: false },
          { ticker: "GOTO", price: "Rp89",    change: "+3,1%", ret: "+8%", up: true },
        ].map((s, i) => (
          <div key={i} className="grid grid-cols-4 px-3 py-1.5 text-[9px] border-t border-border-secondary">
            <span className="font-semibold text-text-primary">{s.ticker}</span>
            <span className="text-center text-text-secondary">{s.price}</span>
            <span className={`text-center font-medium ${s.up ? "text-brand" : "text-error-500"}`}>{s.change}</span>
            <span className={`text-right font-medium ${s.up ? "text-brand" : "text-error-500"}`}>{s.ret}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

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

      {/* Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-3xl mx-auto px-2"
      >
        <DashboardMockup />
      </motion.div>
    </section>
  );
};

export default HeroSection;
