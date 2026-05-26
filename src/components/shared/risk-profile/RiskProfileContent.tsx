// src/components/shared/risk-profile/RiskProfileContent.tsx
import React, { useEffect } from "react";
import { useAIExplanation } from "@/features/ai/hooks/useAIExplanation";
import { Sparkles } from "lucide-react";

interface RiskProfileContentProps {
  score: number;
  label: string;
  description: string;
  variant?: "widget" | "modal";
  userName?: string;
  profileKey?: string;
}

const RiskProfileContent: React.FC<RiskProfileContentProps> = ({
  score,
  label,
  description,
  variant = "widget",
  userName,
  profileKey,
}) => {
  const scale10Score = ((score / 47) * 10).toFixed(1);
  const isModal = variant === "modal";

  const { explanation, isLoading, fetchExplanation } = useAIExplanation();

  useEffect(() => {
    // Panggil AI untuk personalisasi, baik di widget maupun di modal
    if (userName) {
      let riskLevel = "Moderat (Mid)";
      if (profileKey === "turtle" || profileKey === "hippo") riskLevel = "Konservatif (Low)";
      if (profileKey === "lion" || profileKey === "wolf") riskLevel = "Agresif (High)";

      const term = "Profil Risiko";
      const context = `Sapa pengguna dengan nama ${userName}. Beritahu bahwa dia adalah tipe investor ${label} dengan tingkat risiko ${riskLevel}. Berikan 2 kalimat motivasi atau saran alokasi aset yang sangat friendly dan personal, dengan mempertimbangkan karakteristik hewan ${label}.`;
      fetchExplanation(term, context);
    }
  }, [userName, label, profileKey, fetchExplanation]);

  // Untuk menghindari kedipan teks (flash), kita render skeleton dari awal jika kita berekspektasi memanggil AI
  const isFetchingExpected = !!userName;
  const showSkeleton = isLoading || (isFetchingExpected && !explanation);

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
        <div className="flex items-center justify-center gap-1">
          <h4
            className={
              isModal
                ? "text-sm font-semibold text-text-primary"
                : "text-sm font-semibold text-text-primary"
            }
          >
            {label}
          </h4>
        </div>

        {showSkeleton ? (
          isModal ? (
            <div className="flex flex-col items-center justify-center pt-4 pb-2 space-y-3 h-24">
              <Sparkles className="w-6 h-6 text-brand animate-pulse" />
              <p className="text-xs text-text-muted animate-pulse">
                AI sedang mengidentifikasi profil risikomu...
              </p>
            </div>
          ) : (
            <div className="space-y-2 flex flex-col items-center pt-2 h-20 w-full">
              <div className="h-3 w-full bg-border-secondary animate-pulse rounded"></div>
              <div className="h-3 w-5/6 bg-border-secondary animate-pulse rounded"></div>
              <div className="h-3 w-4/6 bg-border-secondary animate-pulse rounded"></div>
            </div>
          )
        ) : (
          <div className="max-h-24 md:max-h-32 overflow-y-auto no-scrollbar w-full flex justify-center">
            <p
              className={
                isModal
                  ? "text-[10px] md:text-xs text-text-muted leading-relaxed"
                  : "text-[10px] md:text-xs text-text-muted leading-relaxed"
              }
            >
              {explanation || description}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default RiskProfileContent;
