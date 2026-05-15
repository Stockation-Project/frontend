# BUG FIX: Missing 'risk_score' in Dashboard API Response

Halo! Saya baru saja mengecek response JSON dari endpoint `GET /api/users/dashboard`. Ternyata, backend belum mengirimkan data `risk_score` di dalam object `user_info`, yang menyebabkan error "NaN" di frontend.

## Instruksi Eksekusi:

### STEP 1: Update Backend Query (Service/Controller)
- Buka file backend yang menangani endpoint dashboard (contoh: `src/services/dashboard.service.ts` atau controllernya).
- Cari query Supabase yang mengambil data profil user.
- Tambahkan `risk_score` ke dalam daftar kolom yang di-SELECT dari database.
- Pastikan data tersebut dimasukkan ke dalam response JSON `user_info`.
- Target output JSON yang benar:
  ```json
  "user_info": {
      "greeting": "Haloo, Testing",
      "risk_profile": "capybara",
      "risk_score": 26, // <--- INI WAJIB ADA
      "profile_description": "..."
  }
```
--

### STEP 2: Pasang Fallback di Frontend (Defensive Programming)
- Buka komponen `src/pages/dashboard/DashboardPages.tsx`rc/components/dashboard/RiskProfileWidget.tsx.
-Saat mem-passing atau menghitung score, gunakan fallback angka 0 agar UI tidak pernah menampilkan "NaN" jika data terlambat dimuat atau kosong.
- Contoh: const safeScore = score || 0;

Tolong perbaiki backend-nya sekarang, lalu berikan instruksi git commit setelah selesai!