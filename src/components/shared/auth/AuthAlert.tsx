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
      <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="bg-green-50 border-green-200 text-green-800">
      <CheckCircle2 className="h-4 w-4 text-green-600" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default AuthAlert;
