// src/components/shared/risk-profile/RiskProfileContent.tsx
import React from "react";

interface RiskProfileContentProps {
  /** Score out of 47 */
  score: number;
  /** Display label e.g. "Serigala" */
  label: string;
  /** Risk profile description */
  description: string;
  /** Content variant: widget uses compact styling, modal uses larger styling */
  variant?: "widget" | "modal";
}

const RiskProfileContent: React.FC<RiskProfileContentProps> = ({
  score,
  label,
  description,
  variant = "widget",
}) => {
  const scale10Score = ((score / 47) * 10).toFixed(1);
  const isModal = variant === "modal";

  return (
    <>
      {/* Skor & Label */}
      <div
        className={
          isModal
            ? "flex items-center justify-center w-full gap-8 px-4"
            : "flex items-center gap-6 mb-6 w-full justify-center"
        }
      >
        <div className="text-center">
          <span
            className={
              isModal
                ? "text-lg md:text-2xl font-semibold text-slate-900 leading-none block"
                : "text-lg md:text-2xl font-semibold text-slate-900 block leading-none"
            }
          >
            {scale10Score}
          </span>
          <span
            className={
              isModal
                ? "text-xs text-slate-500 font-regular mt-1 block"
                : "text-xs text-slate-400 font-regular"
            }
          >
            dari 10
          </span>
        </div>

        <div
          className={isModal ? "w-px h-12 bg-slate-200" : "w-px h-8 bg-slate-100"}
        />

        <div className="text-center">
          <span
            className={
              isModal
                ? "text-[10px] text-slate-500 font-regular uppercase tracking-wider mb-1 block"
                : "text-[10px] text-slate-400 font-regular uppercase tracking-wider block mb-1"
            }
          >
            {isModal ? "Level Risiko" : "Level Resiko"}
          </span>
          {isModal ? (
            <div className="px-6 py-1.5 bg-green-50 border border-green-600 text-green-700 rounded-md text-base font-medium">
              {label}
            </div>
          ) : (
            <span className="text-sm font-medium text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-md">
              {label}
            </span>
          )}
        </div>
      </div>

      <hr
        className={
          isModal ? "w-full border-slate-200" : "w-full border-slate-200 mb-4"
        }
      />

      {/* Deskripsi */}
      <div
        className={
          isModal
            ? " space-y-2 mb-6 text-center"
            : " space-y-2 mb-6 text-center"
        }
      >
        <h4
          className={
            isModal
              ? "text-sm  font-semibold text-slate-900"
              : "text-sm  font-semibold text-slate-800"
          }
        >
          {label}
        </h4>

        <p
          className={
            isModal
              ? "text-[10px] md:text-xs text-slate-500 leading-relaxed"
              : "text-[10px] md:text-xs text-slate-500 leading-relaxed"
          }
        >
          {description}
        </p>
      </div>
    </>
  );
};

export default RiskProfileContent;
