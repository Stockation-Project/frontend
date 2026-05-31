// src/features/interactive-tutorial/flows/mainTutorialFlow.ts
import type { TutorialFlow } from "../types";

export const mainTutorialFlow: TutorialFlow = {
  id: "main-tutorial",
  title: "Tutorial Lengkap",
  description: "Panduan interaktif dari membuat dompet sampai jual saham",
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
      clickTarget: "^stock-row",
      position: "right",
    },

    // ================================================================
    // FASE 4: DETAIL SAHAM — Beli Saham
    // ================================================================
    {
      id: "tut-buy-stock",
      title: "Beli Saham Ini",
      description:
        "Klik tombol \"Beli\" untuk mulai proses pembelian saham.",
      page: "/stock",
      target: "stock-detail-buy",
      position: "top",
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
      id: "tut-sim-bbca-expand",
      title: "Perluas Kartu Saham",
      description:
        "Klik kartu saham ini untuk memperluas dan mengatur jumlah lot.",
      page: "/simulation",
      target: "simulation-cart-item",
      position: "left",
    },
    {
      id: "tut-sim-bbca-lot",
      title: "Atur Jumlah Lot",
      description:
        "Gunakan tombol + dan \u2212 untuk mengatur jumlah lot. Kalau sudah, klik \"Lanjut\" di bawah.",
      page: "/simulation",
      target: "simulation-cart-lot-controls",
      buttonText: "Lanjut",
      position: "left",
    },
    {
      id: "tut-sim-add-stock",
      title: "Tambah Saham Lain",
      description:
        "Klik tombol + pada saham manapun untuk menambahkannya ke keranjang.",
      page: "/simulation",
      target: "simulation-stock-search",
      clickTarget: "stock-search-add-btn",
      position: "right",
    },
    {
      id: "tut-sim-cart-review",
      title: "Cek Keranjang",
      description:
        "Saham yang tadi ditambahkan sudah masuk ke keranjang. Klik \"Lanjut\" untuk lanjut ke ringkasan transaksi.",
      page: "/simulation",
      target: "simulation-cart",
      buttonText: "Lanjut",
      position: "left",
    },
    {
      id: "tut-sim-summary",
      title: "Ringkasan Transaksi",
      description:
        "Cek detail transaksi: jumlah lot, harga, biaya, dan total yang harus dibayar. Kalau sudah, klik \"Lanjut\".",
      page: "/simulation",
      target: "simulation-summary",
      buttonText: "Lanjut",
      position: "left",
    },
    {
      id: "tut-sim-confirm",
      title: "Konfirmasi Pembelian",
      description:
        "Kalau sudah yakin, klik tombol \"Konfirmasi Beli\" untuk eksekusi transaksi! Setelah berhasil, klik \"Lanjut\" di bawah.",
      page: "/simulation",
      target: "simulation-confirm",
      buttonText: "Lanjut",
      position: "left",
    },

    // ================================================================
    // FASE 6: PORTFOLIO — Lihat Hasil
    // ================================================================
    {
      id: "tut-go-portfolio",
      title: "Ke Halaman Portofolio",
      description:
        "Klik tombol di bawah untuk melanjutkan ke halaman Portofolio.",
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
    // FASE 7: JUAL SAHAM — Detail saham & transaksi penjualan
    // ================================================================
    {
      id: "tut-sell-button-highlight",
      title: "Waktunya Menjual Saham",
      description:
        "Kamu sudah berada di halaman detail saham. Di sini kamu bisa memantau pergerakan harga dan performa kepemilikanmu. Jika ingin menjual, klik tombol <strong>Jual</strong> yang tersorot untuk membuka formulir penjualan.",
      page: "/portfolio",
      target: "sell-stock-button",
      position: "left",
    },
    {
      id: "tut-sell-modal-lot",
      title: "Masukkan Jumlah Lot",
      description:
        "Form penjualan sudah terbuka. Ketikkan jumlah lot yang ingin kamu jual pada kolom yang tersorot. Pastikan jumlahnya tidak melebihi kepemilikanmu saat ini.",
      page: "/portfolio",
      target: "sell-lot-input",
      buttonText: "Lanjut",
      position: "left",
    },
    {
      id: "tut-sell-choice",
      title: "Mau Lanjut Jual?",
      description:
        "Keputusan ada di tanganmu sekarang. Pilih <strong>Jual Sekarang</strong> untuk menyelesaikan transaksi, atau pilih <strong>Lewati</strong> jika ingin menjual di waktu lain. Tutorial tetap berlanjut untuk kedua pilihan.",
      page: "/portfolio",
      target: null,
      position: "center",
      isChoiceStep: true,
    },
    {
      id: "tut-end",
      title: "Tutorial Selesai! 🎉",
      description:
        "Hebat! Kamu telah berhasil menyelesaikan seluruh panduan Stockation. Kamu kini paham cara memantau portofolio, melihat detail saham, dan melakukan transaksi penjualan. Selamat berinvestasi dengan bijak!",
      page: "/portfolio",
      target: null,
      buttonText: "Mulai Berinvestasi",
      position: "center",
      isLast: true,
    },
  ],
};
