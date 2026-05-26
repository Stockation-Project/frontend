// src/components/dashboard/RiskProfileWidget.tsx
import React from "react";
import type { RiskProfileKey } from "@/features/questionnaire";
import RiskProfileCard from "@/components/shared/risk-profile/RiskProfileCard";

interface RiskProfileWidgetProps {
  score: number;
  profileKey: RiskProfileKey;
  updatedAt: string; 
  userName?: string;
}

const RiskProfileWidget: React.FC<RiskProfileWidgetProps> = ({
  score,
  profileKey,
  updatedAt,
  userName,
}) => {
  // Defensive fallback: pastikan score tidak pernah NaN di UI
  const safeScore = score || 0;

  return (
    <RiskProfileCard
      score={safeScore}
      profileKey={profileKey}
      showHeader={true}
      showRetestButton={true}
      updatedAt={updatedAt}
      userName={userName}
    />
  );
};

export default RiskProfileWidget;