import type { TourStep } from "../types";

export const EXPLORE_TOUR_STEPS: TourStep[] = [
  {
    id: "welcome-explore",
    title: "Eksplorasi Saham",
    description:
      "Temukan saham-saham terbaik di pasar modal Indonesia. Cari, filter, dan pantau semuanya di sini!",
    target: null,
    buttonText: "Mulai Tur",
    position: "center",
    showLogo: true,
  },
  {
    id: "explore-watchlist",
    title: "Watchlist",
    description:
      "Saham yang kamu pantau muncul di sini. Bisa langsung lihat harga dan perubahannya.",
    target: "explore-watchlist",
    position: "top",
  },
  {
    id: "explore-market-movers",
    title: "Pergerakan Pasar",
    description:
      "Lihat saham-saham yang lagi tren, naik (gainers), atau turun (losers). Filter pakai tab di atas!",
    target: "explore-market-movers",
    position: "bottom",
  },
  {
    id: "explore-search",
    title: "Cari Saham",
    description:
      "Ketik nama atau kode saham buat cari cepat. Hasil pencarian langsung terfilter di tabel.",
    target: "explore-search",
    buttonText: "Selesai",
    position: "bottom",
    isLast: true,
  },
];
