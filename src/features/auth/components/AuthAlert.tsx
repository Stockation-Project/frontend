// src/components/shared/auth/AuthAlert.tsx
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface AuthAlertProps {
  type: "error" | "success";
  title: string;
  message: string;
}

/**
 * Komponen Alert reusable untuk halaman Auth (Login & Register).
 * Menghindari duplikasi struktur Alert antara LoginPages dan RegisterPage.
 */
const AuthAlert: React.FC<AuthAlertProps> = ({ type, title, message }) => {
  if (type === "error") {
    return (
      <Alert variant="destructive" className="bg-error-50 border-error-200">
        <AlertCircle className="h-2 w-2" />
        <AlertTitle className="text-error-500 text-xs font-regular">{title}</AlertTitle>
        <AlertDescription className="text-error-500 text-xs">{message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="bg-brand-50 border-brand-300 text-brand">
      <CheckCircle2 className="h-4 w-4 text-brand" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default AuthAlert;
