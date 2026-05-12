// src/components/shared/PasswordInputField.tsx
import React, { useState } from "react";
import FormInputGroup from "./FormInputGroup";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  id: string;
  label: string;
  error?: string;
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <FormInputGroup
        {...props}
        type={showPassword ? "text" : "password"}
        className="[&_input]:pr-11"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-700 transition-colors"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
};

export default PasswordInputField;
