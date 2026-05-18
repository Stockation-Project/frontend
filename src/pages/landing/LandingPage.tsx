import LandingNavbar from "./components/LandingNavbar";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import HowItWorksSection from "./components/HowItWorksSection";
import FeaturesSection from "./components/FeaturesSection";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";

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
      <footer className="py-6 px-4 sm:px-6 border-t border-border-primary text-center bg-background-primary">
        <p className="text-xs text-text-muted">
          © {new Date().getFullYear()} Stockation. Semua simulasi menggunakan data virtual.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
