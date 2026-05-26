// src/components/questionnaire/ResultModal.tsx
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { RISK_PROFILES } from "../data/riskProfile";
import type { RiskProfileKey } from "../data/riskProfile";
import RiskProfileChart from "@/components/shared/risk-profile/RiskProfileChart";
import RiskProfileContent from "@/components/shared/risk-profile/RiskProfileContent";

import { useAuth } from "@/features/auth";

interface ResultModalProps {
  isOpen: boolean;
  score: number;
  profileKey: RiskProfileKey;
  onContinue: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  score,
  profileKey,
  onContinue,
}) => {
  const profile = RISK_PROFILES[profileKey];
  const { user } = useAuth();
  const userName = user?.first_name || "Pengguna";

  if (!profile) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      {/* onOpenChange kosong agar user tidak bisa menutup modal dengan klik di luar atau tombol ESC */}
      <DialogContent className="!max-w-xs sm:!max-w-md md:!max-w-xl w-full p-4 rounded-2xl bg-background-primary border-0 shadow-2xl outline-none [&>button]:hidden">
        {/* [&>button]:hidden digunakan untuk menyembunyikan tombol "X" (Close) bawaan Shadcn */}
        <DialogTitle className="sr-only">
          Hasil Kuesioner Profil Risiko
        </DialogTitle>

        <div className="flex flex-col items-center text-center space-y-6">
          {/* Avatar & Circular Progress Chart */}
          <RiskProfileChart
            score={score}
            imageSrc={profile.image}
            imageAlt={profile.label}
            variant="modal"
          />

          {/* Score, Label & Description */}
          <RiskProfileContent
            score={score}
            label={profile.label}
            description={profile.description}
            variant="modal"
            userName={userName}
            profileKey={profileKey}
          />

          <Button
            onClick={onContinue}
            className="h-11 px-8 rounded-xl bg-brand hover:bg-brand-950 text-primary-foreground font-medium shadow-md transition-all w-full"
          >
            Yuk Mulai Investasi!
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultModal;
