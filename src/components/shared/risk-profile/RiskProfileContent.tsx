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
                ? "text-lg md:text-2xl font-semibold text-text-primary leading-none block"
                : "text-lg md:text-2xl font-semibold text-text-primary block leading-none"
            }
          >
            {scale10Score}
          </span>
          <span
            className={
              isModal
                ? "text-xs text-text-muted font-regular mt-1 block"
                : "text-xs text-text-subtle font-regular"
            }
          >
            dari 10
          </span>
        </div>

        <div
          className={isModal ? "w-px h-12 bg-border-primary" : "w-px h-8 bg-border-secondary"}
        />

        <div className="text-center">
          <span
            className={
              isModal
                ? "text-[10px] text-text-muted font-regular uppercase tracking-wider mb-1 block"
                : "text-[10px] text-text-subtle font-regular uppercase tracking-wider block mb-1"
            }
          >
            {isModal ? "Level Risiko" : "Level Resiko"}
          </span>
          {isModal ? (
            <div className="px-6 py-1.5 bg-brand-50 border border-brand text-brand rounded-md text-base font-medium">
              {label}
            </div>
          ) : (
            <span className="text-sm font-medium text-brand bg-brand-50 border border-brand px-3 py-1 rounded-md">
              {label}
            </span>
          )}
        </div>
      </div>

      <hr
        className={
          isModal ? "w-full border-border-primary" : "w-full border-border-primary mb-4"
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
              ? "text-sm  font-semibold text-text-primary"
              : "text-sm  font-semibold text-text-primary"
          }
        >
          {label}
        </h4>

        <p
          className={
            isModal
              ? "text-[10px] md:text-xs text-text-muted leading-relaxed"
              : "text-[10px] md:text-xs text-text-muted leading-relaxed"
          }
        >
          {description}
        </p>
      </div>
    </>
  );
};

export default RiskProfileContent;
