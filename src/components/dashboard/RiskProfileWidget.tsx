// src/components/dashboard/RiskProfileWidget.tsx
import React from "react";
import type { RiskProfileKey } from "@/features/questionnaire";
import RiskProfileCard from "@/components/shared/risk-profile/RiskProfileCard";

interface RiskProfileWidgetProps {
  score: number;
  profileKey: RiskProfileKey;
  updatedAt: string; // Format: "20 Okt 2023"
}

const RiskProfileWidget: React.FC<RiskProfileWidgetProps> = ({
  score,
  profileKey,
  updatedAt,
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
    />
  );
};

export default RiskProfileWidget;