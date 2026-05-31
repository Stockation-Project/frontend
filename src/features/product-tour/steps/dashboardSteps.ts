import type { TourStep } from "../types";

export const DASHBOARD_TOUR_STEPS: TourStep[] = [
  {
    id: "welcome-dashboard",
    title: "Selamat Datang di Stockation!",
    description:
      "Kamu baru pertama kali di dashboard. Yuk, kita lihat-lihat apa aja yang bisa kamu lakukan di sini. Singkat aja, kok!",
    target: null,
    buttonText: "Mulai Tur",
    position: "center",
    showLogo: true,
  },
  {
    id: "dashboard-wallet",
    title: "Dompet Utama",
    description:
      "Ini dompet utamamu. Semua dana yang kamu setor masuk ke sini dulu sebelum dialokasikan ke portofolio. Kamu bisa isi ulang (top-up) kapan aja.",
    target: "wallet",
    position: "bottom",
  },
  {
    id: "dashboard-portfolio-cta",
    title: "Daftar Portofolio",
    description:
      "Portofolio itu kayak 'keranjang investasi'. Kamu bisa bikin beberapa portofolio sesuai strategi. Yuk, langsung coba buat yang pertama!",
    target: "portfolio-cta",
    position: "right",
  },
  {
    id: "dashboard-tutorial-btn",
    title: "Tutorial Interaktif",
    description:
      "Kapan pun butuh panduan, klik tombol Tutorial ini. Nanti kamu akan dipandu langkah demi langkah: buat dompet, beli saham, sampai jual saham.",
    target: "tutorial-btn",
    position: "bottom",
  },
  {
    id: "dashboard-summary",
    title: "Ringkasan Aset",
    description:
      "Di sini kamu bisa lihat total nilai aset dan alokasi dana di masing-masing portofolio. Pantau terus biar makin cuan!",
    target: "dashboard-summary",
    position: "left",
  },
  {
    id: "dashboard-stocks",
    title: "Telusuri Saham",
    description:
      "Di tabel ini ada rekomendasi saham yang cocok sama profil risikomu. Klik salah satu buat lihat detail dan mulai beli saham pertama kamu!",
    target: "stocks",
    position: "right",
  },
  {
    id: "dashboard-risk-profile",
    title: "Profil Risiko",
    description:
      "Skor dan tipe risiko kamu tampil di sini. Makin tinggi skornya, makin berani strategi investasimu. Bisa diubah dengan ikut kuis ulang!",
    target: "dashboard-risk-profile",
    buttonText: "Selesai",
    position: "left",
    isLast: true,
  },
];
