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

    // Validasi input dasar
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setErrorMessage("Nama depan dan nama belakang wajib diisi.");
      return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Format email tidak valid.");
      return;
    }

    // Validasi kekuatan password
    if (formData.password.length < 8) {
      setErrorMessage("Kata sandi harus terdiri dari minimal 8 karakter.");
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      setErrorMessage("Kata sandi harus mengandung kombinasi huruf besar, huruf kecil, dan angka.");
      return;
    }

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
