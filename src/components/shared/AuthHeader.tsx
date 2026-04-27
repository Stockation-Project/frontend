import React from "react";
import logoGreen from "@/assets/logo/logo-green.svg";

interface AuthHeaderProps {
  title: string;
  description: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, description }) => {
  return (
    <div className="space-y-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logoGreen} alt="Stockation" className="h-7" />
        <span className="text-xl font-bold text-slate-900 tracking-tight">
          Stockation
        </span>
      </div>

      {/* Text */}
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">
          {title}
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default AuthHeader;
