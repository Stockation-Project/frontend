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
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between h-full hover:border-slate-300 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-slate-500">{title}</span>

        {/* SHADCN TOOLTIP */}
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-slate-400 hover:text-[#329B0D] transition-colors cursor-help">
                <Info className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-[200px] text-xs text-center bg-slate-800 text-white border-none">
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <span className="text-lg font-extrabold text-slate-900">{value}</span>
    </div>
  );
};

export default StatCard;
