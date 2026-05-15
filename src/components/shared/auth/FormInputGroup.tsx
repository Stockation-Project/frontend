// src/components/shared/FormInputGroup.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

const FormInputGroup: React.FC<FormInputGroupProps> = ({
  id,
  label,
  type = "text",
  error,
  className = "",
  ...props
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <Label htmlFor={id} className="text-xs font-Regular text-slate-700">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        className={`focus-visible:ring-0.6 h-10 bg-background-primary border-slate-300 placeholder:text-slate-400 focus-visible:ring-brand focus-visible:border-brand rounded-base transition-colors ${error ? "border-error-500 focus-visible:ring-error-500" : ""}`}
        {...props}
      />
      {error && <span className="text-xs text-error-600">{error}</span>}
    </div>
  );
};

export default FormInputGroup;
