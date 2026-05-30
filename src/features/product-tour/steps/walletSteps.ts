import type { TourStep } from "../types";

export const WALLET_TOUR_STEPS: TourStep[] = [
  {
    id: "welcome-wallet",
    title: "Dompet Digital Kamu",
    description:
      "Di halaman ini kamu bisa lihat saldo, top-up, alokasi dan tarik dana. Semua soal uang ada di sini!",
    target: null,
    buttonText: "Mulai Tur",
    position: "center",
    showLogo: true,
  },
  {
    id: "wallet-balance",
    title: "Saldo Utama",
    description:
      "Ini total saldo dompet utamamu. Dari sini dana bisa dialokasikan ke portofolio atau ditarik.",
    target: "wallet-balance",
    position: "bottom",
  },
  {
    id: "wallet-topup",
    title: "Tombol Top-Up",
    description:
      "Klik di sini kalau mau nambah saldo ke dompet utama. Minimal top-up Rp50.000.",
    target: "wallet-topup",
    position: "bottom",
  },
  {
    id: "wallet-portfolio-list",
    title: "Daftar Portofolio",
    description:
      "Ini daftar portofolio investasi kamu. Klik salah satu buat lihat detail atau alokasi dana.",
    target: "wallet-portfolio-list",
    position: "right",
  },
  {
    id: "wallet-activities",
    title: "Riwayat Transaksi",
    description:
      "Semua transaksi top-up, alokasi, dan penarikan tercatat di sini. Bisa difilter juga, lho!",
    target: "wallet-activities",
    buttonText: "Selesai",
    position: "left",
    isLast: true,
  },
];
