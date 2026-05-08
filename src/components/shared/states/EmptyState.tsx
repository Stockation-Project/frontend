// src/components/shared/states/EmptyState.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: LucideIcon;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionIcon: ActionIcon,
}) => {
  return (
    <div className="w-full bg-white border border-slate-100 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center shadow-sm">
      {/* Icon Area dengan lingkaran soft green */}
      <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-[#329B0D]" />
      </div>

      <div className="max-w-sm space-y-2 mb-8">
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>

      {/* Button Action */}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="bg-[#329B0D] hover:bg-green-800 text-white rounded-xl px-8 h-12 text-base font-bold shadow-lg shadow-green-700/20 transition-all active:scale-95"
        >
          {ActionIcon && <ActionIcon className="w-5 h-5 mr-2 stroke-[3]" />}
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
