import type { TourStep } from "../types";

export const STOCK_DETAIL_TOUR_STEPS: TourStep[] = [
  {
    id: "welcome-stock-detail",
    title: "Detail Saham",
    description:
      "Lihat informasi lengkap saham, grafik harga, dan aksi beli di sini!",
    target: null,
    buttonText: "Mulai Tur",
    position: "center",
    showLogo: true,
  },
  {
    id: "stock-detail-info",
    title: "Info & Harga",
    description:
      "Nama perusahaan, harga terkini, dan sektor saham tampil di bagian atas.",
    target: "stock-detail-info",
    position: "bottom",
  },
  {
    id: "stock-detail-chart",
    title: "Grafik Harga",
    description:
      "Grafik pergerakan harga historis. Geser atau ubah filter waktu buat lihat tren.",
    target: "stock-detail-chart",
    position: "bottom",
  },
  {
    id: "stock-detail-stats",
    title: "Statistik Saham",
    description:
      "Data fundamental: pertumbuhan (CAGR), tingkat utang (DER), valuasi (PER), dividen, dan harga 52-minggu.",
    target: "stock-detail-stats",
    position: "left",
  },
  {
    id: "stock-detail-anomaly",
    title: "Pergerakan Anomali",
    description:
      "Deteksi lonjakan atau penurunan harga tidak wajar. Cocok buat pantau sinyal bahaya atau peluang!",
    target: "stock-detail-anomaly",
    position: "left",
  },
  {
    id: "stock-detail-summary",
    title: "Rangkuman Perusahaan",
    description:
      "Baca profil singkat perusahaan: sejarah, bisnis utama, dan prospek ke depannya.",
    target: "stock-detail-summary",
    position: "left",
  },
  {
    id: "stock-detail-watchlist",
    title: "Watchlist Toggle",
    description:
      "Klik ikon ini buat menambahkan atau menghapus saham dari daftar pantauan.",
    target: "stock-detail-watchlist",
    position: "left",
  },
  {
    id: "stock-detail-buy",
    title: "Tombol Beli",
    description:
      "Udah yakin? Klik Beli buat mulai simulasi transaksi saham ini.",
    target: "stock-detail-buy",
    buttonText: "Selesai",
    position: "bottom",
    isLast: true,
  },
];
