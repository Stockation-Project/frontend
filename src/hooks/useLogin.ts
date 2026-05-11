// src/hooks/useLogin.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "@/services/auth.service";
import { useAuth } from "@/contexts/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

interface UseLoginReturn {
  formData: LoginFormData;
  isLoading: boolean;
  errorMessage: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

/**
 * Custom hook yang mengelola seluruh business logic halaman Login:
 * state form, loading, error, API call, dan navigasi.
 */
export function useLogin(): UseLoginReturn {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await authService.login(formData);

      if (response.success) {
        const user = response.data.user;
        const token = response.data.token;

        login(user, token);

        // Arahkan berdasarkan status risk profile
        if (!user.risk_profile) {
          navigate("/questionnaire");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  return { formData, isLoading, errorMessage, handleInputChange, handleSubmit };
}
