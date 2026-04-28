import React from "react";
import Logo from "./Logo";

interface AuthHeaderProps {
  title: string;
  description: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, description }) => {
  return (
    <div className="space-y-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Logo variant="color" showText={true} className="-ml-1" />
      </div>

      {/* Text */}
      <div className="space-y-1">
        <h2 className="text-2xl font-medium text-slate-950 tracking-tight">
          {title}
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default AuthHeader;
