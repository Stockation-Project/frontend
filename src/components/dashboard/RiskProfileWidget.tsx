// src/components/dashboard/RiskProfileWidget.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { RISK_PROFILES, type RiskProfileKey } from "@/data/riskProfile";

interface RiskProfileWidgetProps {
  score: number;
  profileKey: RiskProfileKey;
  updatedAt: string; // Format: "20 Okt 2023"
}

const RiskProfileWidget: React.FC<RiskProfileWidgetProps> = ({
  score,
  profileKey,
  updatedAt,
}) => {
  const navigate = useNavigate();
  const profile = RISK_PROFILES[profileKey];

  // Kalkulasi skor (skala 10)
  const scale10Score = ((score / 47) * 10).toFixed(1);
  
  // Kalkulasi persentase untuk lingkaran (Donut Chart)
  const percentage = (score / 47) * 100;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  if (!profile) return null;

  return (
    <div className="w-full bg-white border border-slate-100 rounded-[2rem] p-6 lg:p-8 shadow-sm">
      {/* Header Widget */}
      <div className="flex flex-col justify-between items-start mb-6">
        <h3 className="text-base font-bold text-slate-800">Profil Resiko</h3>
        <span className="text-[10px] font-medium items-center text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
          Diperbarui {updatedAt}
        </span>
      </div>

      <div className="flex flex-col items-center">
        {/* Progress Circle & Image (REUSABLE LOGIC) */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-6">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle
              cx="72" cy="72" r={radius}
              stroke="currentColor" strokeWidth="10" fill="transparent"
              className="text-slate-100"
            />
            <circle
              cx="72" cy="72" r={radius}
              stroke="currentColor" strokeWidth="10" fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="text-[#329B0D] transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <img src={profile.image} alt={profile.label} className="w-20 h-20 object-contain z-10" />
        </div>

        {/* Skor & Label */}
        <div className="flex items-center gap-6 mb-6 w-full justify-center">
          <div className="text-center">
            <span className="text-2xl font-extrabold text-slate-900 block leading-none">{scale10Score}</span>
            <span className="text-[10px] text-slate-400 font-medium">dari 10</span>
          </div>
          <div className="w-px h-8 bg-slate-100"></div>
          <div className="text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Level Resiko</span>
            <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-lg">
              {profile.label}
            </span>
          </div>
        </div>

        <hr className="w-full border-slate-50 mb-4" />

        {/* Deskripsi Singkat */}
        <div className="text-center space-y-2 mb-6">
          <h4 className="text-sm font-bold text-slate-800">{profile.label}</h4>
          <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-3">
            {profile.description}
          </p>
        </div>

        {/* Tombol Tes Ulang */}
        <Button 
          variant="outline"
          onClick={() => navigate("/questionnaire")}
          className="w-full border-green-600 text-green-700 hover:bg-green-50 rounded-xl h-11 font-bold text-sm"
        >
          Tes Ulang
        </Button>
      </div>
    </div>
  );
};

export default RiskProfileWidget;