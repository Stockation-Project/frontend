// src/features/interactive-tutorial/flows/mainTutorialFlow.ts
import type { TutorialFlow } from "../types";

export const mainTutorialFlow: TutorialFlow = {
  id: "main-tutorial",
  title: "Tutorial Lengkap",
  description: "Panduan interaktif dari membuat dompet sampai jual saham",
  icon: "🎓",
  steps: [
    // ================================================================
    // FASE 1: DASHBOARD — Welcome & Trigger
    // ================================================================
    {
      id: "tut-welcome",
      title: "Selamat Datang di Tutorial!",
      description:
        "Kita akan belajar bareng dari awal: buat dompet, beli saham, sampai jual saham. Yuk mulai!",
      page: "/dashboard",
      target: null,
      buttonText: "Mulai Tutorial",
      position: "center",
    },

    // ================================================================
    // FASE 2: BUAT DOMPET (di Dashboard)
    // ================================================================
    {
      id: "tut-create-wallet-btn",
      title: "Buat Dompet Baru",
      description:
        "Klik tombol \"Buat Dompet Baru\" untuk membuka form pembuatan dompet investasi.",
      page: "/dashboard",
      target: "portfolio-create-btn",
      position: "top",
    },
    {
      id: "tut-fill-wallet",
      title: "Isi & Simpan Dompet",
      description:
        "Di modal yang muncul: isi nama dompet (misal \"Dompet Belajar\"), tentukan jumlah alokasi dana, lalu klik tombol \"Buat Dompet\" di bawah.",
      page: "/dashboard",
      target: "tutorial-modal",
      clickTarget: "tutorial-wallet-submit",
      position: "left",
    },

    // ================================================================
    // FASE 3: PILIH BBCA DI DASHBOARD
    // ================================================================
    {
      id: "tut-dashboard-pick-stock",
      title: "Pilih Saham Rekomendasi",
      description:
        "Di tabel saham bawah, klik saham paling atas untuk melihat detailnya.",
      page: "/dashboard",
      target: "stocks",
      clickTarget: "stock-row-first",
      position: "top",
    },

    // ================================================================
    // FASE 4: DETAIL SAHAM — Beli Saham
    // ================================================================
    {
      id: "tut-stock-detail",
      title: "Detail Saham",
      description:
        "Ini halaman detail saham. Kamu bisa lihat harga, grafik, dan statistik. Sekarang kita akan beli saham ini.",
      page: "/stock",
      target: "stock-detail-info",
      position: "bottom",
    },
    {
      id: "tut-buy-stock",
      title: "Beli Saham Ini",
      description:
        "Klik tombol \"Beli\" untuk mulai proses pembelian saham.",
      page: "/stock",
      target: "stock-detail-buy",
      position: "left",
    },

    // ================================================================
    // FASE 5: SIMULASI — Beli BBCA + ADRO
    // ================================================================
    {
      id: "tut-sim-wallet",
      title: "Pilih Dompet",
      description:
        "Pilih dompet yang tadi kamu buat untuk dipakai transaksi.",
      page: "/simulation",
      target: "simulation-wallet-select",
      position: "bottom",
    },
    {
      id: "tut-sim-cart-focus",
      title: "Keranjang Belanja",
      description:
        "Saham BBCA yang kamu pilih sudah masuk ke keranjang. Lihat widget ini untuk mengatur pesanan.",
      page: "/simulation",
      target: "simulation-cart",
      position: "left",
    },
    {
      id: "tut-sim-bbca-lot",
      title: "Atur Jumlah Lot BBCA",
      description:
        "Klik kartu BBCA untuk memperluas, lalu atur jumlah lot yang ingin dibeli.",
      page: "/simulation",
      target: "simulation-cart-item",
      position: "left",
    },
    {
      id: "tut-sim-search-focus",
      title: "Cari Saham Lain",
      description:
        "Sekarang kita tambah satu saham lagi. Arahkan perhatian ke widget pencarian di sebelah kiri.",
      page: "/simulation",
      target: "simulation-stock-search",
      position: "right",
    },
    {
      id: "tut-sim-add-adro",
      title: "Cari & Tambahkan ADRO",
      description:
        "Ketik \"ADRO\" di kolom pencarian, lalu klik untuk menambahkannya ke keranjang.",
      page: "/simulation",
      target: "simulation-stock-search",
      position: "right",
    },
    {
      id: "tut-sim-adro-lot",
      title: "Atur Jumlah Lot ADRO",
      description:
        "Balik ke keranjang dan atur jumlah lot ADRO seperti tadi. Klik kartu ADRO untuk memperluas.",
      page: "/simulation",
      target: "simulation-cart-item",
      position: "left",
    },
    {
      id: "tut-sim-summary",
      title: "Ringkasan Transaksi",
      description:
        "Cek detail transaksi: jumlah lot, harga, biaya, dan total yang harus dibayar.",
      page: "/simulation",
      target: "simulation-summary",
      position: "left",
    },
    {
      id: "tut-sim-confirm",
      title: "Konfirmasi Pembelian",
      description:
        "Kalau sudah yakin, klik tombol \"Konfirmasi Beli\" untuk eksekusi transaksi!",
      page: "/simulation",
      target: "simulation-confirm",
      position: "bottom",
    },

    // ================================================================
    // FASE 6: PORTFOLIO — Lihat Hasil
    // ================================================================
    {
      id: "tut-go-portfolio",
      title: "Ke Halaman Portofolio",
      description:
        "Transaksi berhasil! Sekarang kita lihat hasilnya di halaman Portofolio.",
      page: "/simulation",
      target: null,
      buttonText: "Ke Portofolio",
      position: "center",
      awaitNavigation: true,
      navigateTo: "/portfolio",
    },
    {
      id: "tut-portfolio-filter",
      title: "Pilih Dompet Investasi",
      description:
        "Klik salah satu dompet untuk melihat detail portofolionya.",
      page: "/portfolio",
      target: "portfolio-card-list",
      position: "top",
    },
    {
      id: "tut-portfolio-detail",
      title: "Detail Portofolio",
      description:
        "Ini halaman detail portofolio kamu. Bisa lihat semua saham yang dimiliki, return, dan alokasi.",
      page: "/portfolio",
      target: "portfolio-detail-info",
      position: "bottom",
    },
    {
      id: "tut-portfolio-action",
      title: "Aksi Detail Saham",
      description:
        "Klik tombol \"Detail\" pada salah satu saham untuk melihat halaman detailnya.",
      page: "/portfolio",
      target: "portfolio-detail-actions",
      position: "left",
    },

    // ================================================================
    // FASE 7: JUAL SAHAM (edukasi, tanpa target spesifik)
    // ================================================================
    {
      id: "tut-sell-info",
      title: "Cara Jual Saham",
      description:
        "Kalau kamu ingin menjual saham, buka halaman detail saham dari portofoliomu. Klik tombol \"Detail\" lalu cari tombol \"Jual\" di widget Posisi.",
      page: "/portfolio",
      target: null,
      position: "center",
    },
    {
      id: "tut-sell-lot",
      title: "Tentukan Jumlah Lot",
      description:
        "Kamu bisa jual sebagian atau seluruh saham yang dimiliki. Tinggal atur jumlah lot yang ingin dijual.",
      page: "/portfolio",
      target: null,
      position: "center",
    },
    {
      id: "tut-sell-done",
      title: "🎉 Tutorial Selesai!",
      description:
        "Kamu sekarang sudah bisa: buat dompet, eksplorasi saham, beli saham lewat simulasi, cek portofolio, dan jual saham. Selamat berinvestasi!",
      page: "/portfolio",
      target: null,
      buttonText: "Selesai Tutorial",
      position: "center",
      isLast: true,
    },
  ],
};
