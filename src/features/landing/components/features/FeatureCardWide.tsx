import { motion } from "framer-motion";
import React from "react";
import FeatureIconBox from "./FeatureIconBox";

interface FeatureCardWideProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delay: number;
  visual: React.ReactNode;
  visualPosition?: "left" | "right";
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.215, 0.61, 0.355, 1] },
  }),
};

const FeatureCardWide = ({
  icon,
  title,
  description,
  delay,
  visual,
  visualPosition = "right",
}: FeatureCardWideProps) => {
  const content = (
    <div className="flex flex-col justify-center gap-3 p-6">
      <FeatureIconBox icon={icon} />
      <h3 className="font-medium text-brand-950 text-sm">{title}</h3>
      <p className="text-xs text-text-muted leading-relaxed">{description}</p>
    </div>
  );

  const visualBox = (
    <div className="bg-brand-25 overflow-hidden p-4 flex items-center justify-center">
      {visual}
    </div>
  );

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      custom={delay}
      className="bg-background-primary border border-border-primary rounded-lg overflow-hidden grid grid-cols-1 sm:grid-cols-2 min-h-56"
    >
      {visualPosition === "right" ? <>{content}{visualBox}</> : <>{visualBox}{content}</>}
    </motion.div>
  );
};

export default FeatureCardWide;