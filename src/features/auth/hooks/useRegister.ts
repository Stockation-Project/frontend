import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UseRegisterReturn {
  formData: RegisterFormData;
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

/**
 * Custom hook yang mengelola seluruh business logic halaman Register:
 * state form, validasi konfirmasi password, loading, error, API call, dan navigasi.
 */
export function useRegister(): UseRegisterReturn {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Validasi konfirmasi password
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Konfirmasi Kata Sandi Tidak Cocok");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      const response = await authService.register(payload);

      if (response.success) {
        setSuccessMessage("Registrasi berhasil! Mengalihkan ke halaman login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      if (!successMessage) {
        setIsLoading(false);
      }
    }
  };

  return {
    formData,
    isLoading,
    errorMessage,
    successMessage,
    handleInputChange,
    handleSubmit,
  };
}
