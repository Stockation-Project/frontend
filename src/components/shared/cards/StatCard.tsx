import React from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StatCardProps {
  title: string;
  value: string;
  tooltipText: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, tooltipText }) => {
  return (
    <div className="bg-background-primary rounded-xl border border-border-primary p-3 flex flex-col justify-between h-full transition-colors hover:border-border-secondary">
      <div className="flex justify-between items-start gap-1 mb-1">
        <span className="text-[10px] sm:text-xs font-medium text-text-muted leading-tight">{title}</span>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-text-subtle hover:text-brand transition-colors cursor-help flex-shrink-0 mt-0.5">
                <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-[200px] text-xs text-center bg-background-primary text-text-primary border border-border-primary rounded-md p-2 shadow-lg [&>span]:hidden">
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <span className="text-sm sm:text-base font-semibold text-text-primary leading-none mt-1">{value}</span>
    </div>
  );
};

export default StatCard;
