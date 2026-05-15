# TASK: Backend Update - Save and Fetch Risk Score

Halo! Sebagai Backend Engineer, kita perlu memperbarui logika Kuesioner dan Dashboard untuk mendukung presisi UI di frontend.

## Konteks Masalah
Saat ini, komponen `RiskProfileWidget` di frontend menampilkan skor "0.0" karena backend hanya mengirimkan `risk_profile` (label hewan) tanpa mengirimkan skor mentahnya. User baru saja menambahkan kolom `risk_score` (Integer) di tabel Supabase yang menyimpan data user/profil.

## Instruksi Eksekusi

### STEP 1: Update Questionnaire Service (Penyimpanan)
- Cari service yang bertugas memproses submit kuesioner (misal: `src/services/questionnaire.service.ts`).
- Saat mengkalkulasi total skor dari jawaban user dan menentukan profil hewannya, pastikan kode insert/update ke Supabase SEKARANG JUGA menyimpan nilai total skor tersebut ke dalam kolom `risk_score`.

### STEP 2: Update Dashboard API (Pengambilan)
- Cari service yang melayani data dashboard (misal: `src/services/dashboard.service.ts` atau `user.service.ts` yang diakses oleh `GET /api/users/dashboard`).
- Modifikasi query Supabase-nya agar ikut mengambil kolom `risk_score`.
- Masukkan `risk_score` tersebut ke dalam object `user_info` pada JSON response. 
- Target struktur JSON yang diharapkan:
  `"user_info": { "risk_profile": "wolf", "risk_score": 38, ... }`

### Output yang Diharapkan
1. Tunjukkan modifikasi kode pada service kuesioner.
2. Tunjukkan modifikasi kode pada service dashboard.
3. Berikan instruksi `git commit` (misal: `git add . && git commit -m "feat: save and fetch risk_score for precise UI rendering"`).