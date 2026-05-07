// src/components/questionnaire/ResultModal.tsx
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { RISK_PROFILES } from "@/data/riskProfile";
import type { RiskProfileKey } from "@/data/riskProfile";

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

  // Kalkulasi skor ke skala 10 (Maksimal skor adalah 47)
  const scale10Score = ((score / 47) * 10).toFixed(1);

  // Kalkulasi persentase untuk lingkaran hijau (Donut Chart SVG)
  const percentage = (score / 47) * 100;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  if (!profile) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      {/* onOpenChange kosong agar user tidak bisa menutup modal dengan klik di luar atau tombol ESC */}
      <DialogContent className="max-w-md w-[90%] p-8 rounded-3xl bg-white border-0 shadow-2xl outline-none [&>button]:hidden">
        {/* [&>button]:hidden digunakan untuk menyembunyikan tombol "X" (Close) bawaan Shadcn */}
        <DialogTitle className="sr-only">
          Hasil Kuesioner Profil Risiko
        </DialogTitle>

        <div className="flex flex-col items-center text-center space-y-6">
          {/* Avatar & Circular Progress Chart */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* SVG untuk lingkaran progress */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              {/* Lingkaran Abu-abu (Background) */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-slate-200"
              />
              {/* Lingkaran Hijau (Progress) */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="text-[#329B0D] transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>

            {/* Gambar Hewan */}
            <img
              src={profile.image}
              alt={profile.label}
              className="w-24 h-24 object-contain -z-10"
            />
          </div>

          {/* Area Skor & Label */}
          <div className="flex items-center justify-center w-full gap-8 px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 leading-none">
                {scale10Score}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">dari 10</p>
            </div>
            <div className="w-px h-12 bg-slate-200"></div> {/* Garis Pemisah */}
            <div className="text-center">
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mb-1">
                Level Risiko
              </p>
              <div className="px-6 py-1.5 bg-green-50 border border-green-600 text-green-700 rounded-lg text-sm font-semibold">
                {profile.label}
              </div>
            </div>
          </div>

          <hr className="w-full border-slate-100" />

          {/* Penjelasan */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">
              {profile.label}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {profile.description}
            </p>
          </div>

          {/* Tombol Lanjut */}
          <Button
            onClick={onContinue}
            className="w-full h-12 mt-4 bg-[#329B0D] hover:bg-green-800 text-white rounded-xl text-base font-semibold transition-all"
          >
            Lanjut
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultModal;
