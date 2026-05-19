import { motion } from "framer-motion";
import React from "react";
import FeatureIconBox from "./FeatureIconBox";

interface FeatureCardTallProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  image: string;
  delay: number;
  imagePosition?: "top" | "bottom";
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.215, 0.61, 0.355, 1] },
  }),
};

const FeatureCardTall = ({
  icon,
  title,
  description,
  image,
  delay,
  imagePosition = "top",
}: FeatureCardTallProps) => {
  const imageBox = (
    <div className={`bg-brand-25 flex items-${imagePosition === "top" ? "end justify-end" : "center justify-center"} min-h-48 overflow-hidden`}>
      <img src={image} alt={title} className="w-auto h-40 object-contain object-right-bottom" />
    </div>
  );

  const contentBox = (
    <div className="flex flex-col gap-2 p-5">
      <FeatureIconBox icon={icon} />
      <h3 className="font-medium text-brand-950 text-sm">{title}</h3>
      <p className="text-xs text-text-muted leading-relaxed">{description}</p>
    </div>
  );

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      custom={delay}
      className="bg-background-primary border border-border-primary rounded-lg overflow-hidden flex flex-col"
    >
      {imagePosition === "top" ? <>{imageBox}{contentBox}</> : <>{contentBox}{imageBox}</>}
    </motion.div>
  );
};

export default FeatureCardTall;