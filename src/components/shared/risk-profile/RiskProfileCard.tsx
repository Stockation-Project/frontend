// src/components/shared/risk-profile/RiskProfileCard.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { RISK_PROFILES, type RiskProfileKey } from "@/features/questionnaire";
import { Sparkles } from "lucide-react";
import RiskProfileChart from "./RiskProfileChart";
import RiskProfileContent from "./RiskProfileContent";

interface RiskProfileCardProps {
  score: number;
  profileKey: RiskProfileKey;
  /** Show the header with title and update date */
  showHeader?: boolean;
  /** Show the "Tes Ulang" retest button */
  showRetestButton?: boolean;
  /** Update date string, e.g. "20 Okt 2023" */
  updatedAt?: string;
  userName?: string;
}

const RiskProfileCard: React.FC<RiskProfileCardProps> = ({
  score,
  profileKey,
  showHeader = false,
  showRetestButton = false,
  updatedAt,
  userName,
}) => {
  const navigate = useNavigate();
  const profile = RISK_PROFILES[profileKey];

  if (!profile) return null;

  return (
    <div className="w-full bg-background-primary border border-border-primary rounded-2xl p-4">
      {/* Header Widget */}
      {showHeader && (
        <div className="flex flex-col justify-between items-start mb-6">
          <div className="flex items-center gap-1.5 mb-2">
            <h3 className="text-base font-medium text-text-secondary">Profil Resiko</h3>
            <Sparkles className="w-4 h-4 text-brand" />
          </div>
          {updatedAt && (
            <span className="text-[10px] font-medium items-center text-text-subtle bg-background-secondary px-2 py-1 rounded-md">
              Diperbarui {updatedAt}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col items-center">
        {/* Donut Chart & Image */}
        <RiskProfileChart
          score={score}
          imageSrc={profile.image}
          imageAlt={profile.label}
          variant="default"
        />

        {/* Score, Label & Description */}
        <RiskProfileContent
          score={score}
          label={profile.label}
          description={profile.description}
          variant="widget"
          userName={userName}
          profileKey={profileKey}
        />

        {/* Tombol Tes Ulang (Conditional) */}
        {showRetestButton && (
          <Button
            variant="outline"
            onClick={() => navigate("/questionnaire")}
            className="w-full h-10 bg-transparent border border-brand hover:bg-brand-50 active:bg-brand-100 text-brand rounded-xl text-sm font-regular transition-all duration-200 cursor-pointer"
          >
            Tes Ulang
          </Button>
        )}
      </div>
    </div>
  );
};

export default RiskProfileCard;
