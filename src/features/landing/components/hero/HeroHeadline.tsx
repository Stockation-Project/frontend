import { motion } from "framer-motion";

interface HeroHeadlineProps {
  currentText: string;
}

const HeroHeadline = ({ currentText }: HeroHeadlineProps) => (
  <motion.h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-brand-950 leading-tight mb-4 tracking-tight select-none min-h-[5.2rem] sm:min-h-[7rem] md:min-h-[8.5rem] flex flex-col justify-center items-center">
    <div>Belajar Investasi</div>
    <div className="text-brand-950 inline-flex items-center justify-center mt-1">
      <span className="line-clamp-2 px-2">{currentText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[1em] bg-brand-950 ml-1 shrink-0"
      />
    </div>
  </motion.h1>
);

export default HeroHeadline;