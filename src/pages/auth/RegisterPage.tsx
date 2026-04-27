import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FormInputGroup from "@/components/shared/FormInputGroup";
import PasswordInputField from "@/components/shared/PasswordInputField";
import AuthVisualPanel from "@/components/shared/AuthVisualPanel";
import registerBg from "@/assets/images/auth/register-bg.jpg";
import { motion } from "framer-motion";
import authService from "@/services/auth.service";
import AuthHeader from "@/components/shared/AuthHeader";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // validasi konfirm pw
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Konfirmasi Kata Sandi Tidak Cocok");
      return;
    }

    // state loading
    setIsLoading(true);

    try {
      // mapping data
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      // hit api nya
      const response = await authService.register(payload);

      // validasi
      if (response.success) {
        alert("Registrasi berhasil, silakan Login.");
        navigate("/login");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen w-full flex"
      style={{ backgroundColor: "#ffffff" }}
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.4 }}
    >
      {/* --- KOLOM KIRI (Panel Visual & Branding) --- */}
      <motion.div
        className="hidden lg:block lg:w-[40%] xl:w-[40%] flex-shrink-0"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <AuthVisualPanel
          title="Mulai Investasi Tanpa Rasa Khawatir"
          description="Dapatkan modal virtual gratis untuk belajar jual-beli saham secara real-time dan pantau portofolio Anda kapan saja."
          backgroundImage={registerBg}
        />
      </motion.div>

      {/* --- KOLOM KANAN (Panel Form Register) --- */}
      <motion.div
        className="flex-1 flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="w-full max-w-md space-y-5">

          {/* Logo */}
          <AuthHeader
            title="Gabung Stockation"
            description="Daftar sekarang, buat dompet virtual, dan mulai susun strategi investasi saham tanpa risiko di Stocketion."
          />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormInputGroup
                id="firstName"
                label="Nama depan"
                placeholder="Nama depan"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <FormInputGroup
                id="lastName"
                label="Nama belakang"
                placeholder="Nama belakang"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <FormInputGroup
              id="email"
              label="Email"
              type="email"
              placeholder="email@anda.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <PasswordInputField
              id="password"
              label="Kata sandi"
              placeholder="Min. 8 karakter"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <PasswordInputField
              id="confirmPassword"
              label="Konfirmasi kata sandi"
              placeholder="Ulangi kata sandi"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />

            <Button
              type="submit"
              className="w-full h-11 bg-green-700 hover:bg-green-800 active:bg-green-900 text-white rounded-full text-base font-semibold shadow-lg shadow-green-700/20 transition-all duration-200 cursor-pointer"
            >
              Daftar
            </Button>
          </form>

          {/* Footer link */}
          <div className="text-center text-sm text-slate-500">
            Sudah Punya Akun?{" "}
            <Link
              to="/login"
              className="font-semibold text-green-700 hover:text-green-800 transition-colors"
            >
              Masuk Sekarang
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RegisterPage;
