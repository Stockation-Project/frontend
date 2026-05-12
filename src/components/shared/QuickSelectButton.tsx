// src/components/shared/QuickSelectButton.tsx
import React from "react";

interface QuickSelectButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

/**
 * Tombol pilihan cepat (quick select) dengan state aktif/tidak aktif.
 * Digunakan di TopUpModal dan CreatePortfolioModal untuk memilih nominal.
 */
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
          ? "border-[#329B0D] bg-green-100 text-green-800"
          : "border-slate-200 bg-white text-slate-600 hover:border-green-300"
      } ${className}`}
    >
      {label}
    </button>
  );
};

export default QuickSelectButton;
