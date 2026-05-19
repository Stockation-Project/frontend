import { motion } from "framer-motion";
import LandingNavbar from "../../features/landing/components/LandingNavbar";
import HeroSection from "../../features/landing/components/HeroSection";
import StatsSection from "../../features/landing/components/StatsSection";
import HowItWorksSection from "../../features/landing/components/HowItWorksSection";
import FeaturesSection from "../../features/landing/components/FeaturesSection";
import FAQSection from "../../features/landing/components/FAQSection";
import CTASection from "../../features/landing/components/CTASection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background-primary">
      <LandingNavbar />
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FAQSection />
      <CTASection />

      {/* Footer */}
      <footer className="overflow-hidden flex items-end w-full relative bg-brand-1000 h-32">
        {/* Kontainer animasi bergerak */}
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 25, 
            repeat: Infinity 
          }}
          className="flex whitespace-nowrap window-clip select-none pointer-events-none pt-0 pb-0"
        >
          <p className="text-[clamp(3rem,12vw,15rem)] font-black text-white/5 tracking-widest leading-none pr-8">
            STOCKATION • STOCKATION • STOCKATION • STOCKATION •
          </p>
          <p className="text-[clamp(3rem,12vw,15rem)] font-black text-white/5 tracking-widest leading-none pr-8">
            STOCKATION • STOCKATION • STOCKATION • STOCKATION •
          </p>
        </motion.div>
      </footer>
    </div>
  );
};

export default LandingPage;