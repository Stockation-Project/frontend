# Prompt Execution Plan: Halaman Detail Portfolio

Halo AI Agent, tugas Anda adalah membangun **Halaman Detail Portfolio** berdasarkan dokumen `detail-portfolio-page.md` serta wajib mematuhi aturan pada `agent-rules.md` dan `requirements.md`. Berikut adalah panduan langkah demi langkah (Step-by-Step) yang harus Anda ikuti secara berurutan. Lakukan komit setiap kali menyelesaikan satu fase.

## Fase 1: Refactoring Legenda (Mematuhi Clean Code)
1. **Analisis Masalah**: Komponen `PortfolioCard.tsx` saat ini memiliki elemen _Legenda_ yang akan kita gunakan kembali (reuse) pada Halaman Detail Portfolio.
2. **Tugas Eksekusi**: Ekstrak bagian `Legenda` dari `src/components/shared/cards/PortfolioCard.tsx` menjadi komponen tersendiri bernama `src/components/shared/cards/PortfolioLegend.tsx`.
3. **Ketentuan**: Pastikan `PortfolioCard.tsx` memanggil `<PortfolioLegend />` dengan props yang sesuai sehingga tidak ada perubahan pada *visual output* sama sekali.
4. **Git Commit**: `git add . && git commit -m "refactor: extract PortfolioLegend component from PortfolioCard"`

## Fase 2: Pembuatan Komponen UI Portfolio
1. **Tugas Eksekusi**: Buat komponen spesifik untuk fitur detail portfolio di dalam folder `src/components/portfolio/` (buat foldernya jika belum ada).
2. **Komponen `PortfolioDetailTable.tsx`**:
   - Buat komponen tabel yang strukturnya mirip dengan `StockTable.tsx`.
   - Ubah kolom-kolomnya menjadi: **Emiten**, **Alokasi**, **Jumlah Lot**, **Laba/Rugi**, dan **Aksi**.
   - Untuk kolom **Aksi**, tambahkan tombol "Detail" yang mengarah ke halaman detail saham.
   - Gunakan TypeScript Strict Typing. Jika data asli belum ada, siapkan Interface yang sesuai dengan referensi JSON.
3. **Komponen `PortfolioDetailCard.tsx` (Card Besar)**:
   - Komponen ini bertindak sebagai pembungkus (wrapper) untuk Detail Portfolio.
   - Di dalamnya, integrasikan komponen `<PortfolioLegend />` dan `<PortfolioDetailTable />` yang baru saja dibuat.
4. **Git Commit**: `git add . && git commit -m "feat: create PortfolioDetailTable and PortfolioDetailCard components"`

## Fase 3: Persiapan Data & Business Logic (Mematuhi Arsitektur)
1. **Types**: Buat/update interface TypeScript untuk menampung *response* API detail portfolio (mengacu pada struktur JSON dari URL `api/portfolios/{id}`) di file types (contoh: `src/types/dashboard.ts` atau `src/types/portfolio.ts`).
2. **Service API**: Tambahkan fungsi asinkronus (axios) untuk menembak endpoint API tersebut di `src/services/api.ts` atau `portfolio.service.ts`.
3. **Custom Hook (`usePortfolioDetail.ts`)**: 
   - Buat custom hook di folder `src/hooks/` untuk memisahkan *business logic* (state management, error handling, loading, dan perhitungan alokasi/lot/profit). 
   - *Ingat Aturan: Jangan panggil logika API secara langsung di dalam komponen UI.*
4. **Git Commit**: `git add . && git commit -m "feat: setup types, service, and usePortfolioDetail custom hook"`

## Fase 4: Perakitan Halaman Utama & Routing
1. **Tugas Eksekusi**: Rakit komponen halaman di `src/pages/portfolio/PortfolioDetailPage.tsx` (sesuaikan penamaan folder `pages/` jika perlu).
2. **Komposisi UI**:
   - Gunakan `PageHeader.tsx` (dari `components/shared/layout`) sebagai header halaman.
   - Sisipkan slider daftar portofolio (menggunakan ulang komponen yang relevan seperti `PortfolioCard.tsx` / `PortfolioSection`).
   - Tampilkan `<PortfolioDetailCard />` pada *section* di bawahnya.
3. **Integrasi Logika**: Panggil hook `usePortfolioDetail` di halaman ini, lalu oper (pass) datanya sebagai props ke komponen *children*.
4. **Routing**: Daftarkan *route* halaman ini (misalnya `/dashboard/portfolio/:id`) di titik kumpul routing React Router (`App.tsx` atau file serupa).
5. **Git Commit**: `git add . && git commit -m "feat: assemble PortfolioDetailPage and setup routing"`

## Fase 5: Finalisasi & Pengecekan
- Periksa responsivitas desain (Mobile & Desktop).
- Hilangkan *hardcoded values* dan ganti dengan *dynamic data* yang di-mapping.
- Berikan penjelasan ringkas terkait eksekusi, impact, dan tawarkan "Next Step" kepada User sesuai aturan di `agent-rules.md`.

**Silakan Anda mulai bekerja dari Fase 1. Jelaskan analisis singkat Anda sebelum mengubah kode!**
