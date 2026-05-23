import {
  useLogin,
  PasswordInputField,
  FormInputGroup,
  AuthVisualPanel,
  AuthHeader,
  AuthAlert,
} from "@/features/auth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import registerBg from "@/assets/images/auth/register-bg.jpg";
import { motion } from "framer-motion";

const LoginPage: React.FC = () => {
  const { formData, isLoading, errorMessage, handleInputChange, handleSubmit } =
    useLogin();

  return (
    <motion.div
      className="min-h-screen w-full flex px-2 py-2 bg-background-primary"
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 80 }}
      transition={{ duration: 0.4 }}
    >
      {/*Form Login */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20"
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

            {/* Area Alert untuk Error */}
            {errorMessage && (
              <AuthAlert
                type="error"
                title="Gagal Masuk"
                message={errorMessage}
              />
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-brand hover:bg-brand-950 active:bg-brand text-white rounded-xl text-sm font-regular shadow-lg shadow-brand/20 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  <span>Memproses...</span>
                </div>
              ) : (
                "Masuk"
              )}
            </Button>
          </form>

          {/* Footer link */}
          <div className="text-center text-xs text-text-muted">
            Belum Punya Akun?{" "}
            <Link
              to="/register"
              className="font-semibold text-brand hover:text-brand-950 transition-colors"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Kolom Kanan Gambar */}
      <motion.div
        className="hidden lg:block lg:w-1/2 flex-shrink-0 "
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <AuthVisualPanel
          title="Wujudkan Strategi Investasi Terbaik Anda"
          description="Gunakan data pasar akurat untuk mencoba berbagai strategi trading dan jadilah investor yang lebih siap sebelum terjun ke pasar asli"
          backgroundImage={registerBg}
          flipped
        />
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
