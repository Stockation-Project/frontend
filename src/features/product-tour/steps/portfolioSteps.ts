import type { TourStep } from "../types";

export const PORTFOLIO_TOUR_STEPS: TourStep[] = [
  {
    id: "welcome-portfolio",
    title: "Portofolio Investasi",
    description:
      "Halaman ini berisi semua portofolio yang kamu miliki. Pantau nilai aset dan performa di sini!",
    target: null,
    buttonText: "Mulai Tur",
    position: "center",
    showLogo: true,
  },
  {
    id: "portfolio-card-list",
    title: "Kartu Portofolio",
    description:
      "Setiap portofolio punya kartu sendiri yang menampilkan nama, nilai investasi, dan profit. Klik buat lihat detail.",
    target: "portfolio-card-list",
    position: "bottom",
  },
  {
    id: "portfolio-create-btn",
    title: "Buat Portofolio Baru",
    description:
      "Klik di sini kalau mau bikin portofolio baru dengan strategi investasi yang berbeda.",
    target: "portfolio-create-btn",
    position: "bottom",
  },
  {
    id: "portfolio-summary",
    title: "Ringkasan Total",
    description:
      "Ini ringkasan total semua aset yang kamu kelola. Lihat alokasi dana di masing-masing portofolio.",
    target: "portfolio-summary",
    buttonText: "Selesai",
    position: "top",
    isLast: true,
  },
];
