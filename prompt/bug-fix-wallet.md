# CRITICAL BUG FIX: Backend Questionnaire & Wallet Logic

Halo! Kita memiliki dua bug kritikal di backend saat user menyelesaikan kuesioner dan membuka dashboard.

## Analisis Bug
1. **Skor 0.0 di Dashboard:** Frontend mengirim skor, tapi backend tidak menyimpannya ke kolom `risk_score` di Supabase, sehingga saat Dashboard melakukan fetch, datanya kosong.
2. **Error 500 Saat Tes Ulang (Retake):** Saat user melakukan "Tes Ulang", backend mencoba melakukan INSERT dompet baru (saldo 100jt). Karena dompet user sudah ada di database, Supabase menolak (Unique/Primary Key Violation) dan menyebabkan crash.

## Instruksi Eksekusi untuk Backend (Node.js/Express):

### STEP 1: Perbaiki Logika Simpan Skor Kuesioner
- Buka file backend yang menangani submit kuesioner (contoh: `questionnaire.service.ts` atau controllernya).
- Pastikan payload yang dikirim ke Supabase untuk meng-update tabel user/profil HANYA update `risk_profile` dan `risk_score`.
- Pastikan nilai `risk_score` (yang desimal seperti 8.3 atau mentah) benar-benar dimasukkan ke query Supabase.

### STEP 2: Perbaiki Logika Injeksi Dompet (Cegah Duplikasi)
- Masih di service yang sama, cari kode yang bertugas membuat dompet (wallet) setelah kuesioner selesai.
- UBAH logikanya menjadi pengecekan (Upsert / Find or Create):
  - CEK DULU: Apakah user ini sudah memiliki dompet utama di tabel dompet?
  - JIKA BELUM ADA: Lakukan INSERT dompet baru dengan saldo Rp 100.000.000.
  - JIKA SUDAH ADA (Kasus Tes Ulang): **SKIP (LEWATI)** proses pembuatan dompet. Jangan tambahkan saldo lagi agar user tidak melakukan eksploitasi dana, dan jangan lakukan INSERT agar tidak error 500.

### STEP 3: Verifikasi API Dashboard
- Buka `dashboard.service.ts` (backend).
- Pastikan query GET Dashboard mengambil kolom `risk_score` dan mengirimkannya persis di dalam object `user_info.risk_score`.

Tolong analisis file backend terkait, perbaiki logikanya, tunjukkan kodenya kepadaku, dan berikan command `git commit`!