// src/components/shared/QuickSelectButton.tsx
import React from "react";

interface QuickSelectButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

const QuickSelectButton: React.FC<QuickSelectButtonProps> = ({
  label,
  isSelected,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${
        isSelected
          ? "border-brand bg-brand-50 text-brand"
          : "border-border-primary bg-background-primary text-slate-600 hover:border-brand-300"
      } ${className}`}
    >
      {label}
    </button>
  );
};

export default QuickSelectButton;
