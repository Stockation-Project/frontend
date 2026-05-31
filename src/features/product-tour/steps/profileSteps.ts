import type { TourStep } from "../types";

export const PROFILE_TOUR_STEPS: TourStep[] = [
  {
    id: "welcome-profile",
    title: "Profil Akun",
    description:
      "Kelola data diri, avatar, dan preferensi akun kamu di sini. Pastikan informasinya selalu update!",
    target: null,
    buttonText: "Mulai Tur",
    position: "center",
    showLogo: true,
  },
  {
    id: "profile-avatar",
    title: "Foto Profil",
    description:
      "Klik avatar buat ganti foto profil. Bisa upload foto baru atau hapus yang sekarang.",
    target: "profile-avatar",
    position: "bottom",
  },
  {
    id: "profile-personal-info",
    title: "Data Diri",
    description:
      "Lengkapi nama, email, nomor telepon, dan data lainnya di sini. Jangan lupa simpan perubahannya!",
    target: "profile-personal-info",
    buttonText: "Selesai",
    position: "top",
    isLast: true,
  },
];
