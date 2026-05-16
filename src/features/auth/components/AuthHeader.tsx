import React from "react";
import Logo from "@/components/shared/brand/Logo";

interface AuthHeaderProps {
  title: string;
  description: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, description }) => {
  return (
    <div className="space-y-4 mb-10">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Logo variant="color" showText={true} className="-ml-1" />
      </div>

      {/* Text */}
      <div className="space-y-0.5">
        <h2 className="text-lg font-medium text-text-primary tracking-tight">
          {title}
        </h2>
        <p className="text-text-muted text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default AuthHeader;
