// src/features/interactive-tutorial/components/TutorialButton.tsx
import React from "react";
import { GraduationCap } from "lucide-react";

interface TutorialButtonProps {
  onClick: () => void;
}

export const TutorialButton: React.FC<TutorialButtonProps> = ({ onClick }) => {
  return (
    <button
      data-tour="tutorial-btn"
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-brand text-white hover:bg-brand-800 transition-all cursor-pointer"
      title="Mulai Tutorial Interaktif"
    >
      <GraduationCap className="w-4 h-4" />
      <span className="hidden sm:inline">Tutorial</span>
    </button>
  );
};
