import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import AIExplanationModal from "@/components/shared/modal/AIExplanationModal";
import { useAuth } from "@/features/auth";

interface StatCardProps {
  title: string;
  value: string;
  tooltipText: string;
  stockSymbol?: string;
  metricValue?: string;
  showOnboardingEnabled?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, tooltipText, stockSymbol, metricValue, showOnboardingEnabled = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { user } = useAuth();
  
  const onboardingKey = user?.id ? `hasClickedAIExplanation_${user.id}` : "hasClickedAIExplanation_guest";

  useEffect(() => {
    if (!showOnboardingEnabled) return;
    
    // Check if user has already clicked the AI explanation
    const hasSeen = localStorage.getItem(onboardingKey);
    if (!hasSeen) {
      setShowOnboarding(true);
    }
  }, [showOnboardingEnabled, onboardingKey]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    if (showOnboarding) {
      setShowOnboarding(false);
      localStorage.setItem(onboardingKey, "true");
    }
  };

  // Construct context
  const contextData = stockSymbol && metricValue 
    ? `Nilai ${title} untuk saham ${stockSymbol} saat ini adalah ${metricValue}.`
    : undefined;

  const isMissingData = value === "-" || metricValue === "-";
  const staticFallback = isMissingData 
    ? "Data statistik untuk saham ini belum tersedia atau belum bisa dihitung saat ini. Hal ini dapat terjadi pada saham yang baru IPO atau data laporannya belum diperbarui oleh bursa." 
    : undefined;

  return (
    <>
      <div className="bg-background-primary rounded-xl border border-border-primary p-3 flex flex-col justify-between h-full transition-colors hover:border-border-secondary relative">
        <div className="flex justify-between items-start gap-1 mb-1">
          <span className="text-[10px] sm:text-xs font-medium text-text-muted leading-tight">{title}</span>
          
          <div className="relative">
            <button 
              onClick={handleOpenModal}
              className={`text-text-subtle hover:text-brand transition-colors cursor-pointer flex-shrink-0 mt-0.5 relative z-10 ${showOnboarding ? 'text-brand' : ''}`}
              aria-label="Penjelasan AI"
            >
              <Sparkles className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${showOnboarding ? 'animate-pulse' : ''}`} />
            </button>
            
            {/* Onboarding Tooltip */}
            {showOnboarding && (
              <div className="absolute right-0 top-full mt-2 w-max max-w-[120px] bg-brand text-text-inverse text-[10px] font-medium p-2 rounded shadow-lg animate-bounce z-20 pointer-events-none before:content-[''] before:absolute before:bottom-full before:right-1 before:border-4 before:border-transparent before:border-b-brand">
                Klik untuk penjelasan AI!
              </div>
            )}
          </div>
        </div>
        <span className="text-sm sm:text-base font-semibold text-text-primary leading-none mt-1">{value}</span>
      </div>

      <AIExplanationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        term={tooltipText}
        context={contextData}
        customStaticExplanation={staticFallback}
      />
    </>
  );
};

export default StatCard;
