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
            ? "border-green-600 bg-green-50" // State Terpilih
            : "border-slate-200 bg-white hover:border-green-300 hover:bg-slate-50" // State Normal
        }
      `}
    >
      {/* Kotak Huruf (A, B, C) */}
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-md border text-2xl font-bold mr-5 flex-shrink-0 transition-colors
          ${
            isSelected
              ? "border-green-600 text-green-700 bg-white"
              : "border-slate-200 text-slate-600 bg-white"
          }
        `}
      >
        {letter}
      </div>

      {/* Teks Jawaban */}
      <span
        className={`text-base md:text-[15px] font-medium leading-snug ${isSelected ? "text-green-800" : "text-slate-800"}`}
      >
        {text}
      </span>
    </button>
  );
};

export default OptionCard;
