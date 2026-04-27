import { useState } from "react";
import PasswordInputField from "@/components/shared/PasswordInputField";
import FormInputGroup from "@/components/shared/FormInputGroup";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import AuthVisualPanel from "@/components/shared/AuthVisualPanel";
import registerBg from "@/assets/images/auth/register-bg.jpg";
import { motion } from "framer-motion";
import AuthHeader from "@/components/shared/AuthHeader";
import authService from "@/services/auth.service";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      // hit api login
      const response = await authService.login(formData);

      // cek user udah punya risk profile belum
      if (response.success) {
        const user = response.data.user;

        if (!user.risk_profile) {
          navigate("/questionnaire");
        } else {
          navigate("/dashboard");
        }
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
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 80 }}
      transition={{ duration: 0.4 }}
    >
      {/* Kolom Kiri Form Login */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="w-full max-w-md space-y-5">
          {/* Logo */}
          <AuthHeader
            title="Masuk Stockation"
            description="Selamat datang kembali! Silakan masuk untuk pantau portofolio dan lanjut asah strategi simulasi Anda."
          />

          {/* Form Login */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
        className="hidden lg:block lg:w-[40%] xl:w-[45%] flex-shrink-0"
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
