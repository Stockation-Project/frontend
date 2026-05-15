import React from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Asumsi path shadcn-mu di sini

interface StatCardProps {
  title: string;
  value: string;
  tooltipText: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, tooltipText }) => {
  return (
    <div className="bg-background-primary rounded-lg border border-border-primary p-4 flex flex-col justify-between h-full hover:border-border-primary transition-colors">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-slate-500">{title}</span>

        {/* SHADCN TOOLTIP */}
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-slate-400 hover:text-brand transition-colors cursor-help">
                <Info className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-[200px] text-xs text-center bg-background-primary text-slate-900 border-1 border-border-primary rounded-md p-2 shadow-lg [&>span]:hidden">
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <span className="text-base font-semibold text-slate-900">{value}</span>
    </div>
  );
};

export default StatCard;
