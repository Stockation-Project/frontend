// src/components/shared/AuthVisualPanel.tsx
import React from "react";
import logoWhite from "@/assets/logo/logo-white.svg";
import Logo from "./Logo";

interface AuthVisualPanelProps {
  title: string;
  description: string;
  backgroundImage: string;
  flipped?: boolean;
}

const AuthVisualPanel: React.FC<AuthVisualPanelProps> = ({
  title,
  description,
  backgroundImage,
  flipped = false,
}) => {
  return (
    <div className={`h-full w-full flex flex-col justify-end items-start p-12 bg-cover bg-center bg-no-repeat rounded-xl ${flipped ? "scale-x-[-1]" : ""}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={`relative flex flex-col justify-center items-center text-center px-8 xl:px-12 text-white gap-6 ${flipped ? "scale-x-[-1]" : ""}`}>
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Logo variant="white" showText={true} className=" flex flex-col" />
        </div>

        {/* Text */}
        <div className="space-y-4 max-w-md">
          <h1 className="text-base xl:text-lg font-medium leading-tight tracking-tight drop-shadow-md">
            {title}
          </h1>
          <p className="text-xs text-green-100/90 font-light leading-relaxed drop-shadow-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthVisualPanel