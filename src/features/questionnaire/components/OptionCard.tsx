// src/components/questionnaire/OptionCard.tsx
import React from "react";

interface OptionCardProps {
  index: number; // 0, 1, 2, 3...
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({
  index,
  text,
  isSelected,
  onClick,
}) => {
  // Mengubah index 0, 1, 2 menjadi huruf A, B, C menggunakan ASCII (65 = 'A')
  const letter = String.fromCharCode(65 + index);

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center p-2 rounded-lg border-1 text-left transition-all duration-200 cursor-pointer outline-none 
        ${
          isSelected
            ? "border-brand bg-brand-50" // State Terpilih
            : "border-border-primary bg-background-primary hover:border-brand-300 hover:bg-background-secondary" // State Normal
        }
      `}
    >
      {/* Kotak Huruf (A, B, C) */}
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-md border text-2xl font-bold mr-5 flex-shrink-0 transition-colors
          ${
            isSelected
              ? "border-brand text-brand bg-background-primary"
              : "border-border-primary text-text-secondary bg-background-primary"
          }
        `}
      >
        {letter}
      </div>

      {/* Teks Jawaban */}
      <span
        className={`text-base md:text-[15px] font-medium leading-snug ${isSelected ? "text-brand" : "text-text-primary"}`}
      >
        {text}
      </span>
    </button>
  );
};

export default OptionCard;
