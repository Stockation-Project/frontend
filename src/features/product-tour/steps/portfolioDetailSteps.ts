import type { TourStep } from "../types";

export const PORTFOLIO_DETAIL_TOUR_STEPS: TourStep[] = [
  {
    id: "welcome-portfolio-detail",
    title: "Detail Portofolio",
    description:
      "Ini halaman detail portofolio. Kamu bisa lihat isi, performa, dan kelola dana di sini!",
    target: null,
    buttonText: "Mulai Tur",
    position: "center",
    showLogo: true,
  },
  {
    id: "portfolio-detail-info",
    title: "Informasi Portofolio",
    description:
      "Nama, total investasi, dan status profit portofolio kamu tampil di sini.",
    target: "portfolio-detail-info",
    position: "bottom",
  },
  {
    id: "portfolio-detail-holdings",
    title: "Daftar Saham",
    description:
      "Ini saham-saham yang ada di portofolio ini. Klik salah satu buat lihat detail atau jual.",
    target: "portfolio-detail-holdings",
    position: "top",
  },
  {
    id: "portfolio-detail-actions",
    title: "Aksi Portofolio",
    description:
      "Klik tombol Detail di baris saham buat lihat info lengkap, beli, atau jual saham tersebut.",
    target: "portfolio-detail-actions",
    buttonText: "Selesai",
    position: "left",
    isLast: true,
  },
];
