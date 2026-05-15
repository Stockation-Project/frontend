# AI Agent Instruction: Selesaikan Masalah Riwayat Transaksi Kosong di Stockation

## Konteks Proyek
Proyek ini adalah **Stockation**, sebuah platform simulasi investasi saham. Sistem terdiri dari Frontend (React/Vite/Tailwind) dan Backend (Node.js/Express/Supabase/Redis).

## Deskripsi Masalah
Halaman **Portfolio Stock Detail** (`/portfolio/:portfolioId/stocks/:ticker`) sudah berhasil menampilkan grafik dan data harga saham. Namun, **Tabel Riwayat Transaksi** selalu menampilkan "Belum ada transaksi", meskipun user seharusnya memiliki riwayat di portofolio tersebut.

## Tugas Anda
Anda harus mengeksplorasi kode yang sudah ada dan melakukan perbaikan pada sisi Backend dan Frontend agar data transaksi muncul dengan benar.

---

## Tahap 1: Eksplorasi Kode
Silakan periksa file-file berikut untuk memahami alur data:

### Backend (Penyedia Data)
1.  `backend/src/services/transaction.service.ts`: Cek apakah fungsi `buyStockService` dan `sellStockService` sudah mencatat data ke tabel `transactions` menggunakan Supabase.
2.  `backend/src/controllers/transaction.controller.ts`: Pastikan ada controller untuk mengambil riwayat transaksi per saham per portofolio.
3.  `backend/src/routes/transaction.routes.ts`: Pastikan rute `GET` untuk mengambil transaksi sudah terdaftar.

### Frontend (Konsumen Data)
1.  `frontend/src/hooks/usePortfolioStockDetail.ts`: Pastikan URL API yang dipanggil sudah sesuai dengan rute di Backend.
2.  `frontend/src/components/portfolio/TransactionHistoryTable.tsx`: Pastikan pemetaan data (*mapping*) sesuai dengan kolom di database (Gunakan `type` bukan `action`, dan `shares` bukan `lots`).

---

## Tahap 2: Implementasi Perbaikan

### 1. Backend: Catat Transaksi (Struk Digital)
Pastikan setiap aksi Beli/Jual melakukan `insert` ke tabel `transactions`.
**Skema Tabel:**
- `user_id` (UUID)
- `portfolio_id` (UUID)
- `ticker` (String)
- `type` ('BUY' | 'SELL')
- `shares` (Integer)
- `price` (Decimal)
- `total_amount` (Decimal)

### 2. Backend: API Endpoint Baru
Buat service dan controller untuk rute:
`GET /api/transactions/portfolio/:portfolioId/stock/:ticker`
Query Supabase harus memfilter berdasarkan `portfolio_id` DAN `ticker`.

### 3. Frontend: Sinkronisasi Data
Perbaiki komponen `TransactionHistoryTable` agar membaca:
- `tx.type` untuk label Beli/Jual.
- `tx.shares` untuk jumlah lembar (hitung Lot dengan `shares / 100`).
- `tx.price` untuk harga per lembar.

---

## Panduan Teknis
- Gunakan variabel `ticker` (bukan `symbol`) agar konsisten dengan database.
- Pastikan urutan data transaksi adalah yang terbaru di atas (`order by created_at descending`).
- Periksa tab **Network** di browser untuk memastikan tidak ada error 404 saat memanggil API transaksi.

Lakukan audit menyeluruh pada file-file tersebut dan terapkan perbaikan yang diperlukan.