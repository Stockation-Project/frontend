import { useState } from "react";
import { Eye, EyeOff, BookOpen, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import registerBg from "@/assets/register-bg.jpg";

function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // No backend logic — placeholder for future integration
        console.log("Form submitted:", formData);
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-white p-4">
            {/* ── Left Panel ── */}
            <div className="relative hidden w-1/2 overflow-hidden rounded-3xl lg:flex">
                {/* Background image */}
                <img
                    src={registerBg}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />

                {/* Content */}
                <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-12 text-center">
                    {/* Logo */}
                    <div className="mb-8 flex flex-col items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
                            <BookOpen className="h-8 w-8 text-white" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-white">
                            Stockation
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="mb-4 max-w-md text-3xl leading-snug font-bold text-white xl:text-4xl">
                        Wujudkan Strategi Investasi Terbaik Anda
                    </h1>

                    {/* Subtext */}
                    <p className="max-w-sm text-sm leading-relaxed text-white/70 xl:text-base">
                        Gunakan data pasar akurat untuk mencoba berbagai strategi trading dan
                        jadilah investor yang lebih siap sebelum terjun ke pasar asli
                    </p>

                    {/* Decorative pill */}
                    <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/60 backdrop-blur-sm">
                        <TrendingUp className="h-3.5 w-3.5" />
                        Simulasi trading tanpa risiko
                    </div>
                </div>
            </div>

            {/* ── Right Panel ── */}
            <div className="flex w-full flex-1 flex-col items-center justify-center bg-gray-50 px-6 py-6 lg:w-1/2">
                {/* Mobile-only logo */}
                <div className="mb-5 flex items-center gap-2 lg:hidden">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600">
                        <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">Stockation</span>
                </div>

                {/* Form Container */}
                <div className="w-full max-w-md">
                    {/* Desktop logo */}
                    <div className="mb-5 hidden items-center gap-2 lg:flex">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600">
                            <BookOpen className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">Stockation</span>
                    </div>

                    {/* Form header */}
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            Masuk Stockation
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Selamat datang kembali! Silakan masuk untuk pantau portofolio dan
                            lanjut asah strategi simulasi Anda.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Nama depan */}
                        <div className="space-y-1">
                            <Label htmlFor="firstName">Nama depan</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="Masukkan nama depan"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="h-9 rounded-xl border-gray-200 bg-white px-4 shadow-sm transition-all duration-200 focus-visible:border-green-500 focus-visible:ring-green-500/20"
                            />
                        </div>

                        {/* Nama belakang */}
                        <div className="space-y-1">
                            <Label htmlFor="lastName">Nama belakang</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Masukkan nama belakang"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="h-9 rounded-xl border-gray-200 bg-white px-4 shadow-sm transition-all duration-200 focus-visible:border-green-500 focus-visible:ring-green-500/20"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="nama@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="h-9 rounded-xl border-gray-200 bg-white px-4 shadow-sm transition-all duration-200 focus-visible:border-green-500 focus-visible:ring-green-500/20"
                            />
                        </div>

                        {/* Kata sandi */}
                        <div className="space-y-1">
                            <Label htmlFor="password">Kata sandi</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="h-9 rounded-xl border-gray-200 bg-white px-4 pr-11 shadow-sm transition-all duration-200 focus-visible:border-green-500 focus-visible:ring-green-500/20"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Konfirmasi kata sandi */}
                        <div className="space-y-1">
                            <Label htmlFor="confirmPassword">Konfirmasi kata sandi</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="h-9 rounded-xl border-gray-200 bg-white px-4 pr-11 shadow-sm transition-all duration-200 focus-visible:border-green-500 focus-visible:ring-green-500/20"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((v) => !v)}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                                    aria-label={showConfirmPassword ? "Sembunyikan konfirmasi kata sandi" : "Tampilkan konfirmasi kata sandi"}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="h-10 w-full rounded-xl bg-green-600 text-sm font-semibold text-white shadow-lg shadow-green-600/25 transition-all duration-200 hover:bg-green-700 hover:shadow-green-700/30 active:scale-[0.98]"
                        >
                            Masuk
                        </Button>
                    </form>

                    {/* Bottom link */}
                    <p className="mt-4 text-center text-sm text-gray-500">
                        Sudah Punya Akun?{" "}
                        <a
                            href="#"
                            className="font-semibold text-green-600 transition-colors hover:text-green-700 hover:underline"
                        >
                            Daftar Sekarang
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
