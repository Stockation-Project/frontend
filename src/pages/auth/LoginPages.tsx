import { useState } from "react";

import logoGreen from "@/assets/logo/logo-green.svg";
import PasswordInputField from "@/components/shared/PasswordInputField";
import FormInputGroup from "@/components/shared/FormInputGroup";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AuthVisualPanel from "@/components/shared/AuthVisualPanel";
import registerBg from "@/assets/images/auth/register-bg.jpg";
import { motion } from "framer-motion";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    <motion.div
      className="h-screen w-full flex"
      style={{ backgroundColor: "#ffffff" }}
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 80 }}
      transition={{ duration: 0.4 }}
    >
      {/* Kolom Kiri Form Login */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center px-6 py-4 sm:px-10 lg:px-14 xl:px-20"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="w-full max-w-md space-y-5">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logoGreen} alt="Stockation" className="h-7 " />
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Stockation
            </span>
          </div>
          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">
              Masuk Stockation
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Selamat datang kembali! Silakan masuk untuk pantau portofolio dan
              lanjut asah strategi simulasi Anda.
            </p>
          </div>

          {/* Form Login */}
          <form onSubmit={handleSubmit} className="space-y-3">
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

            <Button
              type="submit"
              className="w-full h-11 bg-green-700 hover:bg-green-800 active:bg-green-900 text-white rounded-full text-base font-semibold shadow-lg shadow-green-700/20 transition-all duration-200 cursor-pointer"
            >
              Masuk
            </Button>
          </form>

          {/* Footer link */}
          <div className="text-center text-sm text-slate-500">
            Belum Punya Akun?{" "}
            <Link
              to="/register"
              className="font-semibold text-green-700 hover:text-green-800 transition-colors"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Kolom Kanan Gambar */}
      <motion.div
        className="hidden lg:block lg:w-[45%] xl:w-[50%] flex-shrink-0"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <AuthVisualPanel
          title="Wujudkan Strategi Investasi Terbaik Anda"
          description="Gunakan data pasar akurat untuk mencoba berbagai strategi trading dan jadilah investor yang lebih siap sebelum terjun ke pasar asli"
          backgroundImage={registerBg}
        />
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
