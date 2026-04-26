// src/pages/auth/Register.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
// Import logo
import logoGreen from "@/assets/logo/logo-green.svg";

// Import Komponen Reusable
import FormInputGroup from "@/components/shared/FormInputGroup";
import PasswordInputField from "@/components/shared/PasswordInputField";
import AuthVisualPanel from "@/components/shared/AuthVisualPanel";

// Import background image
import registerBg from "@/assets/images/auth/register-bg.jpg";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering with:", formData);
  };

  return (
    <div className="h-screen w-full flex" style={{ backgroundColor: '#ffffff' }}>
      {/* --- KOLOM KIRI (Panel Visual & Branding) --- */}
      <div className="hidden lg:block lg:w-[45%] xl:w-[50%] flex-shrink-0">
        <AuthVisualPanel
          title="Wujudkan Strategi Investasi Terbaik Anda"
          description="Gunakan data pasar akurat untuk mencoba berbagai strategi trading dan jadilah investor yang lebih siap sebelum terjun ke pasar asli"
          backgroundImage={registerBg}
        />
      </div>

      {/* --- KOLOM KANAN (Panel Form Register) --- */}
      <div className="flex-1 flex items-center justify-center px-6 py-4 sm:px-10 lg:px-14 xl:px-20">
        <div className="w-full max-w-md space-y-5">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logoGreen} alt="Stockation" className="h-7" />
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Stockation
            </span>
          </div>

          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">
              Buat Akun Stockation
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Selamat datang! Silakan isi data diri Anda untuk memulai
              simulasi investasi.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
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
      </div>
    </div>
  );
};

export default RegisterPage;
