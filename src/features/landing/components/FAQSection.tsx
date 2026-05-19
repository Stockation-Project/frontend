import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

const FAQS = [
  {
    question: "Apakah Stockation benar-benar gratis?",
    answer: "Ya! Stockation sepenuhnya gratis. Tidak ada biaya tersembunyi apapun. Kamu menikmati semua fitur simulasi trading, sistem kantong, dan edukasi saham tanpa mengeluarkan uang sepeser pun.",
  },
  {
    question: "Apakah yang digunakan adalah uang asli?",
    answer: "Tidak sama sekali. Semua transaksi menggunakan saldo virtual yang kami sediakan. Kamu belajar tanpa risiko kehilangan uang nyata.",
  },
  {
    question: "Dari mana data harga sahamnya?",
    answer: "Data harga saham kami menggunakan data real-time dari pasar Indonesia (IDX) sehingga pengalaman simulasimu semirip mungkin dengan kondisi pasar nyata.",
  },
  {
    question: "Apa itu sistem kantong dan bagaimana cara kerjanya?",
    answer: "Sistem kantong (sub-dompet) memungkinkan kamu memisahkan strategi investasi. Misalnya kamu bisa punya kantong 'Blue Chip', 'Growth', dan 'Dividen' secara terpisah dalam satu dompet.",
  },
  {
    question: "Bisakah saya mengubah profil risiko saya?",
    answer: "Tentu! Kamu bisa mengikuti kuis profil risiko kapan saja untuk memperbarui preferensi investasimu.",
  },
  {
    question: "Apakah Stockation cocok untuk pemula total?",
    answer: "Sangat cocok! Stockation dirancang khusus untuk pemula yang ingin belajar investasi saham tanpa tekanan finansial.",
  },
];

const FAQItem = ({ item, index }: { item: typeof FAQS[0]; index: number }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border-b border-border-primary last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-background-secondary transition-colors"
      >
        <span className="text-sm font-medium text-text-primary">{item.question}</span>
        <span
          className={`ml-4 flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
            open ? "bg-brand border-brand rotate-45" : "border-border-primary"
          }`}
        >
          <svg className={`w-3 h-3 ${open ? "text-white" : "text-text-muted"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16M4 12h16" />
          </svg>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-4 text-sm text-text-muted leading-relaxed">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => (
  <section id="faq" className="py-20 px-4 sm:px-6 bg-background-primary">
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
      {/* Left */}
      <div className="md:sticky md:top-24">
        <span className="text-[11px] font-medium text-brand uppercase tracking-widest">FAQ</span>
        <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary mt-2 leading-tight">
          Pertanyaan yang Sering Ditanyakan
        </h2>
        <p className="text-sm text-text-muted mt-3 leading-relaxed">
          Masih ada yang membingungkan? Hubungi kami lewat email atau media sosial.
        </p>
      </div>

      {/* Right */}
      <Card className="overflow-hidden divide-y divide-border-primary p-0">
        {FAQS.map((item, i) => (
          <FAQItem key={i} item={item} index={i} />
        ))}
      </Card>
    </div>
  </section>
);

export default FAQSection;
