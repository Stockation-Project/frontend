// src/components/dashboard/RiskProfileWidget.tsx
import React from "react";
import type { RiskProfileKey } from "@/data/riskProfile";
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
  return (
    <RiskProfileCard
      score={score}
      profileKey={profileKey}
      showHeader={true}
      showRetestButton={true}
      updatedAt={updatedAt}
    />
  );
};

export default RiskProfileWidget;