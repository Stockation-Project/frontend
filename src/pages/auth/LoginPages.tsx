import authService from "@/features/auth/services/auth.service";
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

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-background-border"></div>
              <span className="flex-shrink-0 mx-4 text-text-muted text-xs">Atau masuk dengan</span>
              <div className="flex-grow border-t border-background-border"></div>
            </div>

            <Button
              type="button"
              onClick={() => authService.loginWithGoogle()}
              className="w-full h-10 bg-white border border-background-border text-text-primary hover:bg-background-tertiary active:bg-background-secondary rounded-xl text-sm font-regular transition-all duration-200 cursor-pointer"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
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
