import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import HeroBadge from "./hero/HeroBadge";
import HeroHeadline from "./hero/HeroHeadline";
import HeroActions from "./hero/HeroActions";
import HeroDashboardImage from "./hero/HeroDashboardImage";

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const words = ["bersama Stockation", "tanpa rasa khawatir"];
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
        timer = setTimeout(() => setCurrentText(fullWord.substring(0, currentText.length + 1)), typingSpeed);
      } else {
        timer = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    } else {
      if (currentText !== "") {
        timer = setTimeout(() => setCurrentText(fullWord.substring(0, currentText.length - 1)), deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentWordIdx((prev) => (prev + 1) % words.length);
      }
    }
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIdx]);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } },
  };

  return (
    <section ref={containerRef} className="pt-20 md:pt-28 pb-12 md:pb-16 px-4 sm:px-6 text-center bg-gradient-to-b from-brand-25 to-background-primary overflow-hidden relative">
      <motion.div style={{ y: yText, opacity: opacityText }} className="max-w-3xl mx-auto relative z-20">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="inline-block">
            <HeroBadge />
          </motion.div>
          <motion.div variants={itemVariants}>
            <HeroHeadline currentText={currentText} />
          </motion.div>
          <motion.p variants={itemVariants} className="text-xs sm:text-sm text-text-muted max-w-md mx-auto mb-8 leading-relaxed px-4">
            Lebih dari sekadar simulasi. Stockation adalah teman pendamping yang melatih ketahanan mental, mengenali profil risikomu, dan melindungimu dari keputusan emosional (FOMO) sebelum terjun ke pasar nyata.
          </motion.p>
          <motion.div variants={itemVariants}>
            <HeroActions />
          </motion.div>
        </motion.div>
      </motion.div>
      <HeroDashboardImage yImage={yImage} scaleImage={scaleImage} />
    </section>
  );
};

export default HeroSection;