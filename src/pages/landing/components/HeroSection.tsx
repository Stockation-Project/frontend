import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dashboardImg from "../../../assets/images/landing-page/dashboard.png";

const HeroSection = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLElement>(null);

  // --- LOGIKA TYPING LOOP UNTUK BARIS KEDUA ---
  const words = [
    "bersama Stockation",
    "tanpa rasa khawatir",
    "belajar lewat simulasi nyata"
  ];
  
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 60;
  const deletingSpeed = 40;
  const pauseDuration = 2000;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = words[currentWordIdx];

    if (!isDeleting) {
      if (currentText !== fullWord) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.substring(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    } else {
      if (currentText !== "") {
        timer = setTimeout(() => {
          setCurrentText(fullWord.substring(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        isDeleting && setIsDeleting(false);
        setCurrentWordIdx((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIdx]);

  // --- CONFIG PARALLAX ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // --- CONFIG ANIMASI MACRO ---
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <section 
      ref={containerRef} 
      className="pt-20 md:pt-28 pb-12 md:pb-16 px-4 sm:px-6 text-center bg-gradient-to-b from-brand-25 to-background-primary overflow-hidden relative"
    >
      {/* Bungkus Teks */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="max-w-3xl mx-auto relative z-20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 1. Badge */}
          <motion.div variants={itemVariants} className="inline-block">
            <span className="inline-flex items-center gap-2 bg-background-primary border border-brand-200 text-[10px] md:text-xs font-medium text-brand px-3 py-1 rounded-full mb-5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              100% Gratis · Simulasi Real-time
            </span>
          </motion.div>

          {/* 2. Judul Utama */}
          <motion.h1 
            variants={itemVariants}
            className="text-2xl sm:text-4xl md:text-5xl font-semibold text-brand-950 leading-tight mb-4 tracking-tight select-none min-h-[5.2rem] sm:min-h-[7rem] md:min-h-[8.5rem] flex flex-col justify-center items-center"
          >
            <div>Mulai Investasi</div>
            
            {/* Baris Kedua (Dinamis) */}
            <div className="text-brand-950 inline-flex items-center justify-center mt-1">
              <span className="line-clamp-2 px-2">{currentText}</span>
              {/* Kursor Ketik */}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[3px] h-[1em] bg-brand-950 ml-1 shrink-0"
              />
            </div>
          </motion.h1>

          {/* 3. Deskripsi */}
          <motion.p 
            variants={itemVariants}
            className="text-xs sm:text-sm text-text-muted max-w-md mx-auto mb-8 leading-relaxed px-4"
          >
            Pelajari saham dengan modal virtual, susun strategi investasimu, dan temukan profil risikomu — sebelum terjun ke pasar nyata.
          </motion.p>

          {/* 4. Tombol Aksi */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-3 mb-10 md:mb-14"
          >
            <button
              onClick={() => navigate("/register")}
              className="bg-brand hover:bg-brand-950 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              Daftar Sekarang
            </button>
            <button
              onClick={() => document.getElementById("fitur")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-background-primary border border-border-primary hover:border-brand-200 text-text-secondary text-xs sm:text-sm font-medium px-4 py-2 rounded-lg transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              Lihat Fitur
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Gambar Parallax (Bagian Utama Perbaikan Responsif) */}
      <motion.div 
        style={{ y: yImage, scale: scaleImage }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="relative mt-4 md:mt-10 z-10 max-w-5xl mx-auto w-full px-2 sm:px-6 lg:px-8"
      >
        {/* Kontainer Gambar */}
        <div className="p-1 sm:p-2 max-h-[250px] sm:max-h-[450px] md:max-h-[550px] overflow-hidden bg-background-primary/10 backdrop-blur-sm border border-border-primary rounded-lg">
          <img
            src={dashboardImg}
            alt="Ilustrasi Hero"
            className="w-full h-auto object-top object-cover rounded-md"
          />
        </div>
        
        {/* Overlay Fade Out Bottom yang Proporsional */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 sm:h-1/2 bg-gradient-to-t from-background-primary via-background-primary/40 to-transparent pointer-events-none" />
      </motion.div>
      
    </section>
  );
};

export default HeroSection;