import { motion } from "framer-motion";
import { STEPS } from "./how-it-works/stepsData";
import MockRegisterForm from "./how-it-works/MockRegisterForm";
import MockCreateWallet from "./how-it-works/MockCreateWallet";
import MockSimulation from "./how-it-works/MockSimulation";
import MockRiskProfile from "./how-it-works/MockRiskProfile"; 

const HowItWorksSection = () => {
  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.18,
        ease: [0.215, 0.61, 0.355, 1], 
      },
    }),
  };

  return (
    <section id="cara-kerja" className="py-20 px-4 sm:px-6 bg-background-primary">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[11px] font-medium text-brand uppercase tracking-widest">
            Bagaimana Cara Kerjanya
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary mt-2">
            4 Langkah Mulai Investasi dengan Aman
          </h2>
          <p className="text-sm text-text-muted mt-2 max-w-sm mx-auto">
            Dari daftar sampai simulasi trading, semua dirancang agar pemula langsung paham.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }} 
              custom={i} 
            >
              <div className="hover:border-brand-200 transition-colors h-full border border-border-primary rounded-lg overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex flex-col gap-2 px-4 py-2 bg-background-primary">
                    <span className="text-[10px] font-medium text-brand rounded-md">
                      {step.number} / {step.label}
                    </span>
                  </div>
                  
                  <div className={`flex items-center justify-center bg-brand-25 h-36 overflow-hidden relative ${step.number === "04" ? "px-0" : "px-6"}`}>
                    {step.number === "01" ? (
                      <MockRegisterForm />
                    ) : step.number === "02" ? (
                      <MockRiskProfile />
                    ) : step.number === "03" ? (
                      <MockCreateWallet />
                    ) : (
                      <MockSimulation />
                    )}
                  </div>
                </div>
                
                <div className="px-4 py-4 bg-background-primary mt-auto">
                  <h3 className="font-medium text-brand-950 text-sm">{step.title}</h3>
                  <p className="text-xs text-text-muted leading-relaxed mt-1">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;