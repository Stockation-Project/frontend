// src/components/shared/risk-profile/RiskProfileChart.tsx
import React from "react";

interface RiskProfileChartProps {
  score: number;
  imageSrc: string;
  imageAlt: string;
  variant?: "default" | "modal";
}

const RiskProfileChart: React.FC<RiskProfileChartProps> = ({
  score,
  imageSrc,
  imageAlt,
  variant = "default",
}) => {
  const percentage = (score / 47) * 100;
  const radius = 65
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Variant-specific sizing
  const isModal = variant === "modal";
  const containerClass = isModal
    ? "relative w-40 h-40 flex items-center justify-center"
    : "relative w-36 h-36 flex items-center justify-center mb-6";
  const imgClass = isModal
    ? "w-24 h-24 object-contain -z-10"
    : "w-20 h-20 object-contain z-10";
  const cx = isModal ? "80" : "72";
  const cy = isModal ? "80" : "72";
  const strokeWidth = isModal ? "12" : "10";
  const bgCircleClass = isModal ? "text-border-primary" : "text-border-secondary";

  return (
    <div className={containerClass}>
      <svg className="absolute inset-0 w-full h-full transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className={bgCircleClass}
        />
        {/* Progress Circle */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-brand transition-all duration-1000 ease-out"
          strokeLinecap="round"
        />
      </svg>
      <img src={imageSrc} alt={imageAlt} className={imgClass} />
    </div>
  );
};

export default RiskProfileChart;
