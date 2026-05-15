# AI Agent Execution Plan: Halaman Simulasi Pembelian Saham

**Context:**
Kamu ditugaskan untuk membangun halaman "Simulasi Pembelian Saham" (Simulation Buy Page) berdasarkan spesifikasi di `simulation-buy-pages.md`. Halaman ini memiliki tingkat kompleksitas state dan aliran data yang tinggi. Kamu diwajibkan untuk mengikuti arsitektur **Separation of Concerns** yang memisahkan UI Components, Custom Hooks (Business Logic), dan Services (API calls).

**Aturan Wajib:**
1. Patuhi `agent-rules.md` dan `requirements.md`.
2. Gunakan komponen UI yang sudah ada jika memungkinkan (seperti `PageHeader`, `PortfolioCard`).
3. Semua business logic (state management, kalkulasi, API calls) HARUS berada di dalam Custom Hook (`useSimulationBuy.ts`).
4. Eksekusi secara bertahap (step-by-step) dan lakukan komit per tahapan yang logis.

---

## 🛠️ Step-by-Step Execution Plan

### Tahap 1: Setup Services & Types
**Goal:** Menyiapkan struktur tipe data dan fungsi pemanggilan API ke backend.
- [ ] Buat interface/types di `src/types/simulation.ts` (atau gabungkan ke `dashboard.ts`) untuk `StockCartItem`, `SimulationState`, dll.
- [ ] Buat/perbarui `src/services/transaction.service.ts` di frontend untuk memanggil endpoint API pembelian saham sesuai payload di Postman.
- [ ] Buat service untuk fetching data saham rekomendasi dan pencarian saham.

### Tahap 2: Custom Hook (`useSimulationBuy.ts`)
**Goal:** Mengekstrak seluruh kompleksitas state management ke dalam hook.
- [ ] Buat `src/hooks/useSimulationBuy.ts`.
- [ ] Kelola state untuk: `portfolios`, `selectedPortfolioId`, `searchQuery`, `recommendedStocks`, dan `cart` (daftar saham yang akan dibeli beserta lot-nya).
- [ ] Buat logic kalkulasi: `totalInvestment`, `remainingBalance`, dan `donutChartData` (persentase alokasi).
- [ ] Buat handler: `addStockToCart`, `removeStockFromCart`, `updateStockLot`, `handleSelectPortfolio`.
- [ ] Buat fungsi eksekusi `handleConfirmBuy` yang memanggil `transaction.service.ts`. Jika cart berisi >1 saham, pastikan API dapat menangani bulk buy atau lakukan loop `Promise.all`.

### Tahap 3: Reusable UI Components
**Goal:** Memecah UI menjadi komponen-komponen kecil yang modular di folder `src/components/simulation/`.
- [ ] **`WalletSelectCard`**: Komponen UI dompet yang lebih sederhana dari `PortfolioCard`. Hanya menampilkan Nama Dompet, teks "Saldo Tersedia", dan nominal. Memiliki state aktif (border/header hijau) dan inaktif (abu-abu), serta satu card *dashed* untuk "Tambah dompet baru".
- [ ] **`StockSearchPanel` (Kolom KIRI)**: Komponen pencarian saham. Terdiri dari Search Bar, toggle kecil (Rekomendasi/Manual), dan daftar saham. Setiap item saham memiliki tombol `+` yang akan menambahkan saham ke Cart.
- [ ] **`CartListPanel` (Kolom TENGAH)**: Header menampilkan "DOMPET TERPILIH" beserta saldo tersedia. Berisi daftar saham yang di-klik dari panel kiri. Tiap item bisa di-*expand* (accordion). Saat di-expand, tampilkan input "Jumlah Lot" (+/-) dan "Nilai Posisi". *Opsional: Tambahkan mini area chart di dalam expand area jika memungkinkan menggunakan komponen existing.*
- [ ] **`SimulationSummaryPanel` (Kolom KANAN)**: Menampilkan Donut Chart alokasi pembelian. Di bawahnya terdapat "Rincian Pembayaran" (Total Unit, Total Lot, Total Investasi, Sisa Saldo), dan tombol "Konfirmasi Beli".

### Tahap 4: Assemble Page (`SimulationBuyPage.tsx`)
**Goal:** Menggabungkan semua komponen ke dalam satu halaman utama.
- [ ] Buat file `src/pages/simulation/SimulationBuyPage.tsx`.
- [ ] Render `PageHeader` dengan tombol *back*.
- [ ] Render daftar dompet (`WalletSelectCard`) secara horizontal.
- [ ] Render *Tabs* utama Shadcn (Rekomendasi & Manual). Halaman 3 kolom ini berada di dalam tab **Manual**.
- [ ] Panggil custom hook `useSimulationBuy` dan distribusikan state ke 3 kolom (Kiri: Search, Tengah: Cart, Kanan: Summary).

### Tahap 5: Finishing & Review
- [ ] Berikan state validasi visual (misal: Sisa Saldo menjadi merah jika kurang dari Total Investasi, tombol Beli di-disable).
- [ ] Tambahkan loading state dan toast error/success handling menggunakan `sonner`.
- [ ] Lakukan *git commit* dengan pesan bahasa Indonesia menggunakan standard Conventional Commits.

---
**Instruksi Memulai:**
Silakan jalankan eksekusi dari Tahap 1. Analisis terlebih dahulu ketersediaan API backend sebelum membuat service frontend.
