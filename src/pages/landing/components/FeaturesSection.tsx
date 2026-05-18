import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: "/icons/kantong.png",
    title: "Sistem Kantong (Sub-Dompet)",
    description: "Pisahkan strategi investasimu dengan membuat beberapa dompet. Setiap transaksi beli & jual hanya bisa dilakukan di dalam sub-dompet — persis seperti investor profesional mengelola portofolio.",
    image: "/profil-risiko.png",
  },
  {
    icon: "/icons/realtime.png",
    title: "Data Saham Real-Time",
    description: "Harga dan pergerakan saham dari pasar nyata. Belajar membaca chart dan memahami volatilitas tanpa uang asli yang terancam.",
    image: "/profil-risiko.png",
  },
  {
    icon: "/icons/alokasi.png",
    title: "Alokasi Pintar",
    description: "Rekomendasi alokasi saham berdasarkan profil risikomu. Sistem menyarankan komposisi portofolio yang optimal — kamu tinggal setujui dan eksekusi.",
    image: "/profil-risiko.png",
  },
  {
    icon: "/icons/keranjang.png",
    title: "Keranjang Simulasi",
    description: "Beli kombinasi saham sekaligus seperti keranjang belanja e-commerce. Preview portofolio sebelum eksekusi transaksi.",
    image: "/profil-risiko.png",
  },
];

const IconBox = ({ src, alt }: { src: string; alt: string }) => (
  <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center overflow-hidden">
    <img src={src} alt={alt} className="w-6 h-6 object-contain" />
  </div>
);

const FeaturesSection = () => (
  <section id="fitur" className="py-20 px-4 sm:px-6 bg-background-secondary">
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-[11px] font-medium text-brand uppercase tracking-widest">
          Fitur Unggulan
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary mt-2">
          Semua yang Kamu Butuhkan untuk
          <br className="hidden sm:block" /> Belajar Saham
        </h2>
        <p className="text-sm text-text-muted mt-2 max-w-sm mx-auto">
          Dari manajemen portofolio hingga alokasi cerdas — Stockation punya semuanya.
        </p>
      </div>

      <div className="flex flex-col gap-2">

        {/* Card 1 — Full, konten kiri | foto kanan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-background-primary border border-border-primary rounded-lg overflow-hidden grid grid-cols-1 sm:grid-cols-2 min-h-56"
        >
          {/* Konten */}
          <div className="flex flex-col justify-center gap-3 p-6">
            <IconBox src={FEATURES[0].icon} alt={FEATURES[0].title} />
            <h3 className="font-medium text-brand-950 text-sm">{FEATURES[0].title}</h3>
            <p className="text-xs text-text-muted leading-relaxed">{FEATURES[0].description}</p>
          </div>
          {/* Foto */}
          <div className="bg-brand-25 overflow-hidden">
            <img src={FEATURES[0].image} alt={FEATURES[0].title} className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Card 2 & 3 — Bagi dua */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

          {/* Card 2 — foto atas, konten bawah */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-background-primary border border-border-primary rounded-lg overflow-hidden flex flex-col"
          >
            {/* Foto */}
            <div className="bg-brand-25 flex-1 min-h-40 overflow-hidden">
              <img src={FEATURES[1].image} alt={FEATURES[1].title} className="w-full h-full object-cover" />
            </div>
            {/* Konten */}
            <div className="flex flex-col gap-2 p-5">
              <IconBox src={FEATURES[1].icon} alt={FEATURES[1].title} />
              <h3 className="font-medium text-brand-950 text-sm">{FEATURES[1].title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{FEATURES[1].description}</p>
            </div>
          </motion.div>

          {/* Card 3 — konten atas, foto bawah */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-background-primary border border-border-primary rounded-lg overflow-hidden flex flex-col"
          >
            {/* Konten */}
            <div className="flex flex-col gap-2 p-5">
              <IconBox src={FEATURES[2].icon} alt={FEATURES[2].title} />
              <h3 className="font-medium text-brand-950 text-sm">{FEATURES[2].title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{FEATURES[2].description}</p>
            </div>
            {/* Foto */}
            <div className="bg-brand-25 flex-1 min-h-40 overflow-hidden">
              <img src={FEATURES[2].image} alt={FEATURES[2].title} className="w-full h-full object-cover" />
            </div>
          </motion.div>

        </div>

        {/* Card 4 — Full, foto kiri | konten kanan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-background-primary border border-border-primary rounded-lg overflow-hidden grid grid-cols-1 sm:grid-cols-2 min-h-56"
        >
          {/* Foto */}
          <div className="bg-brand-25 overflow-hidden">
            <img src={FEATURES[3].image} alt={FEATURES[3].title} className="w-full h-full object-cover" />
          </div>
          {/* Konten */}
          <div className="flex flex-col justify-center gap-3 p-6">
            <IconBox src={FEATURES[3].icon} alt={FEATURES[3].title} />
            <h3 className="font-medium text-brand-950 text-sm">{FEATURES[3].title}</h3>
            <p className="text-xs text-text-muted leading-relaxed">{FEATURES[3].description}</p>
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);

export default FeaturesSection;