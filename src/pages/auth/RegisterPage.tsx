import { useRegister, FormInputGroup, PasswordInputField, AuthVisualPanel, AuthHeader, AuthAlert } from "@/features/auth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import registerBg from "@/assets/images/auth/register-bg.jpg";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const RegisterPage: React.FC = () => {
  const {
    formData,
    isLoading,
    errorMessage,
    successMessage,
    handleInputChange,
    handleSubmit,
  } = useRegister();

  return (
    <motion.div
      className="h-screen overflow-hidden w-full flex px-2 py-2 bg-background-primary"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.4 }}
    >
      {/* --- KOLOM KIRI (Panel Visual & Branding) --- */}
      <motion.div
        className="hidden lg:block lg:w-1/2 flex-shrink-0"
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
        className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20 overflow-y-auto h-full"
        style={{ scrollbarWidth: "none" }}
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="w-full max-w-md space-y-5">
          {/* Header */}
          <AuthHeader
            title="Gabung Stockation"
            description="Daftar sekarang, buat dompet virtual, dan mulai susun strategi investasi saham tanpa risiko di Stockation."
          />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
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

            {/* Area Alert untuk Error & Success */}
            {errorMessage && (
              <AuthAlert type="error" title="Gagal Mendaftar" message={errorMessage} />
            )}

            {successMessage && (
              <AuthAlert type="success" title="Berhasil!" message={successMessage} />
            )}

            {/* 3. IMPLEMENTASI SKELETON SAAT LOADING */}
            {isLoading ? (
              <Skeleton className="w-full h-10 rounded-xl bg-slate-200" />
            ) : (
              <Button
                type="submit"
                className="w-full h-10 bg-brand hover:bg-brand-950 active:bg-brand text-white rounded-xl text-sm font-regular shadow-lg shadow-brand/20 transition-all duration-200 cursor-pointer"
              >
                Daftar
              </Button>
            )}
          </form>

          {/* Footer link */}
          <div className="text-center text-xs text-text-muted">
            Sudah Punya Akun?{" "}
            <Link
              to="/login"
              className="font-semibold text-brand hover:text-brand-950 transition-colors"
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
