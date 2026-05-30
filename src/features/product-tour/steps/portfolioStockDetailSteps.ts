import type { TourStep } from "../types";

export const PORTFOLIO_STOCK_DETAIL_TOUR_STEPS: TourStep[] = [
  {
    id: "welcome-portfolio-stock",
    title: "Detail Saham Portofolio",
    description:
      "Lihat informasi lengkap saham yang kamu miliki, grafik harga, dan riwayat transaksi di sini!",
    target: null,
    buttonText: "Mulai Tur",
    position: "center",
    showLogo: true,
  },
  {
    id: "portfolio-stock-info",
    title: "Info Saham",
    description:
      "Ticker, nama, sektor, dan harga saham saat ini tampil di sini.",
    target: "portfolio-stock-info",
    position: "bottom",
  },
  {
    id: "portfolio-stock-position",
    title: "Posisi Kepemilikan",
    description:
      "Lihat berapa lot yang kamu punya, harga rata-rata beli, dan total nilai investasi.",
    target: "portfolio-stock-position",
    position: "top",
  },
  {
    id: "portfolio-stock-chart",
    title: "Grafik Harga",
    description:
      "Grafik pergerakan harga saham. Bisa diubah rentang waktunya, lho!",
    target: "portfolio-stock-chart",
    position: "bottom",
  },
  {
    id: "portfolio-stock-transactions",
    title: "Riwayat Transaksi",
    description:
      "Semua transaksi beli/jual saham ini tercatat di sini. Pantau riwayat aktivitas kamu.",
    target: "portfolio-stock-transactions",
    position: "top",
  },
  {
    id: "portfolio-stock-stats",
    title: "Statistik Saham",
    description:
      "Data fundamental: pertumbuhan (CAGR), tingkat utang (DER), valuasi (PER), dividen, dan harga 52-minggu.",
    target: "portfolio-stock-stats",
    position: "left",
  },
  {
    id: "portfolio-stock-anomaly",
    title: "Pergerakan Anomali",
    description:
      "Deteksi lonjakan atau penurunan harga tidak wajar. Cocok buat pantau sinyal bahaya atau peluang!",
    target: "portfolio-stock-anomaly",
    position: "left",
  },
  {
    id: "portfolio-stock-summary",
    title: "Rangkuman Perusahaan",
    description:
      "Baca profil singkat perusahaan: sejarah, bisnis utama, dan prospek ke depannya.",
    target: "portfolio-stock-summary",
    position: "left",
  },
  {
    id: "portfolio-stock-actions",
    title: "Beli & Jual",
    description:
      "Klik Beli buat nambah posisi, atau Jual kalau mau mengurangi kepemilikan.",
    target: "portfolio-stock-actions",
    buttonText: "Selesai",
    position: "top",
    isLast: true,
  },
];
