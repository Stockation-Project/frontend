// src/components/shared/MiniProgressBar.tsx
import React from "react";

interface MiniProgressBarProps {
  percentage: number;
  colorClass?: string;
  heightClass?: string;
}

const MiniProgressBar: React.FC<MiniProgressBarProps> = ({
  percentage,
  colorClass = "bg-brand",
  heightClass = "h-1.5",
}) => {
  return (
    <div className={`w-full ${heightClass} bg-border-secondary rounded-full overflow-hidden`}>
      <div
        className={`h-full ${colorClass} rounded-full transition-all duration-500`}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      />
    </div>
  );
};

export default MiniProgressBar;
