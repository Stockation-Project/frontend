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
    <div className="w-full bg-background-primary border border-border-primary rounded-xl p-4 flex flex-col items-center justify-center text-center">
      <div className="w-12 h-12 p-3 bg-brand-50 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-full h-full text-brand" />
      </div>

      <div className="max-w-sm space-y-2 mb-4">
        <h3 className="text-base font-medium text-text-primary">{title}</h3>
        <p className="text-xs text-text-muted leading-relaxed">{description}</p>
      </div>

      {/* Button Action */}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="bg-brand hover:bg-brand-950 text-white rounded-xl px-6 h-10 text-base font-medium shadow-sm cursor-pointer shadow-brand/20 transition-all active:scale-95"
        >
          {ActionIcon && <ActionIcon className="w-3 h-3 mr-2 stroke-[1.5]" />}
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
