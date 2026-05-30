import type { TourStep } from "../types";

export const SIMULATION_TOUR_STEPS: TourStep[] = [
  {
    id: "welcome-simulation",
    title: "Simulasi Beli Saham",
    description:
      "Di sini kamu bisa simulasi beli saam sebelum benar-benar transaksi. Yuk, kita pelajari!",
    target: null,
    buttonText: "Mulai Tur",
    position: "center",
    showLogo: true,
  },
  {
    id: "simulation-wallet-select",
    title: "Pilih Dompet",
    description:
      "Pilih portofolio yang mau dipakai buat transaksi. Dana akan diambil dari portofolio ini.",
    target: "simulation-wallet-select",
    position: "bottom",
  },
  {
    id: "simulation-stock-search",
    title: "Cari & Pilih Saham",
    description:
      "Cari saham yang mau dibeli, tentuin jumlah lot, dan lihat estimasi biaya.",
    target: "simulation-stock-search",
    position: "right",
  },
  {
    id: "simulation-cart",
    title: "Keranjang Belanja",
    description:
      "Semua saham yang udah dipilih masuk ke keranjang ini. Atur lot atau hapus sebelum checkout.",
    target: "simulation-cart",
    position: "right",
  },
  {
    id: "simulation-cart-item",
    title: "Atur Jumlah Lot",
    description:
      "Klik kartu saham untuk memperluas, lalu kamu bisa mengedit atau menambahkan jumlah lot.",
    target: "simulation-cart-item",
    position: "left",
  },
  {
    id: "simulation-summary",
    title: "Ringkasan Transaksi",
    description:
      "Cek detail transaksi: jumlah lot, harga, biaya, dan total yang harus dibayar.",
    target: "simulation-summary",
    position: "left",
  },
  {
    id: "simulation-confirm",
    title: "Konfirmasi",
    description:
      "Kalau udah yakin, klik tombol ini buat eksekusi transaksi!",
    target: "simulation-confirm",
    buttonText: "Selesai",
    position: "top",
    isLast: true,
  },
];
