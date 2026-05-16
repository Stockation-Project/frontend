import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  // Hitung persentase
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-48 sm:max-w-xs mx-auto flex flex-col items-center gap-1">
      <Progress
        value={progressPercentage}
        className="h-1.5 md:h-2 w-full bg-border-secondary [&>div]:bg-brand"
      />
      <span className="text-sm font-medium text-text-muted">
        {currentStep} dari {totalSteps}
      </span>
    </div>
  );
};

export default ProgressBar;
