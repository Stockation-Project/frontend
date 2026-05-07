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
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-3">
      <Progress
        value={progressPercentage}
        className="h-2 w-full bg-slate-200"
      />
      <span className="text-sm font-medium text-slate-500">
        {currentStep} dari {totalSteps}
      </span>
    </div>
  );
};

export default ProgressBar;
