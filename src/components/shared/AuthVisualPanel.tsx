// src/components/shared/AuthVisualPanel.tsx
import React from "react";
import logoWhite from "@/assets/logo/logo-white.svg";
import Logo from "./Logo";

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
    <div className="hidden lg:flex relative w-full h-full overflow-hidden">
      {/* Background */}
      <img
        src={backgroundImage}
        alt="Visual background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-8 xl:px-12 text-white">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <Logo variant="white" showText={true} className="mb-16 flex flex-col" />
        </div>

        {/* Text */}
        <div className="space-y-4 max-w-md">
          <h1 className="text-3xl xl:text-4xl font-semibold leading-tight tracking-tight drop-shadow-md">
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

export default AuthVisualPanel