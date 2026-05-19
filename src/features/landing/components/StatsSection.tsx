import { motion } from "framer-motion";

const STATS = [
  { value: "100%", label: "Gratis. Tanpa biaya tersembunyi." },
  { value: "0 Risiko", label: "Semua Transaksi Virtual" },
  { value: "Real-time", label: "Data saham pasar nyata" },
];

const StatsSection = () => (
  <section className="py-12 px-4 sm:px-6 border-y border-border-primary bg-background-primary">
    <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4 text-center">
      {STATS.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <p className="text-base md:text-2xl font-semibold text-text-primary">{stat.value}</p>
          <p className="text-[10px] sm:text-xs text-text-muted mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default StatsSection;
