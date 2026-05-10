import React from "react";
import logoColor from "@/assets/logo/logo-green.svg";
import logoWhite from "@/assets/logo/logo-white.svg";

interface LogoProps {
  variant?: "color" | "white";
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  variant = "green",
  className = "",
  showText = true,
}) => {
  const imgSrc = variant === "white" ? logoWhite : logoColor;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <img
        src={imgSrc}
        alt="Stockation Logo"
        className="h-6 w-fit" 
      />
      {showText && (
        <span
          className={`text-xs font-medium ${variant === "white" ? "text-white" : "text-slate-950"}`}
        >
          Stockation
        </span>
      )}
    </div>
  );
};

export default Logo;
