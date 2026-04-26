// src/components/shared/AuthVisualPanel.tsx
import React from "react";
import logoWhite from "@/assets/logo/logo-white.svg";

interface AuthVisualPanelProps {
  title: string;
  description: string;
  backgroundImage: string;
}

const AuthVisualPanel: React.FC<AuthVisualPanelProps> = ({
  title,
  description,
  backgroundImage,
}) => {
  return (
    <div className="hidden lg:flex relative overflow-hidden rounded-2xl m-3 h-[calc(100vh-24px)]">
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Visual background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Content layer */}
      <div className="relative z-10 flex flex-col items-center justify-between w-full h-full p-10 text-white">
        {/* Top spacer */}
        <div />

        {/* Center logo */}
        <div className="flex flex-col items-center gap-3">
          <img src={logoWhite} alt="Stockation" className="w-12 drop-shadow-lg" />
          <span className="text-2xl font-semibold tracking-wide drop-shadow-lg">
            Stockation
          </span>
        </div>

        {/* Bottom branding text */}
        <div className="text-center space-y-4 max-w-sm">
          <h1 className="text-3xl xl:text-4xl font-medium leading-tight tracking-tight drop-shadow-md">
            {title}
          </h1>
          <p className="text-sm xl:text-base text-green-100/90 font-light leading-relaxed drop-shadow-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthVisualPanel;
