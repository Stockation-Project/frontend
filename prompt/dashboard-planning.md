# TASK: Dashboard Data Integration (Static to Dynamic)

Halo! Kamu adalah Senior Frontend Architect untuk proyek Stockation. Sebelum memulai tugas ini, WAJIB hukumnya kamu membaca dan memahami 2 file berikut sebagai konteks utama:
1. `requirements.md`
2. `agent-rules.md`

## Misi Saat Ini
Saat ini halaman `src/pages/dashboard/DashboardPages.tsx` beserta semua komponen di dalamnya (GlobalWalletCard, PortfolioSection, WalletSummary, RiskProfileWidget, StockTable) sudah bersih (clean) dan reusable secara UI. TETAPI, data yang digunakan saat ini masih berupa dummy/hardcoded. 

Tugasmu adalah mengubah Dashboard statis ini menjadi dinamis dengan menyambungkannya ke "Super API" Backend.

## Instruksi Eksekusi (Lakukan secara Step-by-Step)

### STEP 1: Buat Data Layer & Interfaces
- Di file terpisah (misal `src/types/dashboard.ts`), buatkan TypeScript Interfaces yang ketat berdasarkan struktur JSON dibawah
- Buat file `src/hooks/useDashboard.ts`.
- Di dalam `useDashboard`, buat logika untuk fetch ke endpoint `GET /api/users/dashboard` (gunakan Axios atau fetch biasa sesuai standar project).
- Sediakan state `isLoading`, `error`, dan `data`.

### STEP 2: UI Integration (Prop Drilling)
- Buka `src/pages/dashboard/DashboardPages.tsx`.
- Panggil `useDashboard()` di sana. Tampilkan Skeleton/Loading state yang rapi jika `isLoading` true.
- Hapus semua variabel data DUMMY yang ada di dalam file tersebut.
- Salurkan `data` dari backend ke komponen-komponen anak (GlobalWalletCard, PortfolioSection, dll) secara tepat sesuai aturan "Component Distribution Map" di `requirements.md`.
- **CATATAN KHUSUS FORMATTING:** 1. Jika ada persentase harga saham (`change_percent`) dari backend seperti `-6.443299`, bulatkan menjadi 1 atau maksimal 2 angka di belakang koma (misal: `-6.4%`).
  2. Gunakan fungsi format Rupiah untuk semua nominal uang.

## Output yang Diharapkan
Ingat aturan di `agent-rules.md`! 
1. Berikan Analisis dan Rencanamu terlebih dahulu sebelum menulis kode.
2. Berikan kode per file secara jelas.
3. Setelah selesai coding, **WAJIB berikan command `git commit`** dengan pesan yang sesuai (contoh: `git add . && git commit -m "feat: integrate dashboard components with real API data"`) agar perubahan ini terlacak.
4. Jelaskan dampaknya dan apa next step-nya.

## Struktur JSON:
Endpoint: `/api/users/dashboard` atau jika memungkinkan, kamu bisa explore folder backend

```json
{
    "success": true,
    "message": "Berhasil memuat data dashboard utama",
    "data": {
        "user_info": {
            "greeting": "Haloo, Testing",
            "risk_profile": "wolf",
            "profile_description": "Seperti Serigala yang taktis, kamu berani bermanuver di pasar dengan perhitungan yang matang untuk mengejar pertumbuhan aset."
        },
        "wallet_summary": {
            "main_wallet_balance": 100000000,
            "total_assets": 100000000,
            "total_allocated_to_portfolio": 0,
            "allocation_percentage": "0.0%"
        },
        "portfolios": [],
        "recommended_stocks": [
            {
                "ticker": "ANTM",
                "name": "Aneka Tambang Tbk.",
                "risk_level": "Medium",
                "is_anomaly": false,
                "current_price": 3630,
                "change_percent": -6.443299
            },
            {
                "ticker": "ASII",
                "name": "Astra International Tbk.",
                "risk_level": "Medium",
                "is_anomaly": false,
                "current_price": 5825,
                "change_percent": -0.42735046
            }
        ]
    }
}
```

Silakan mulai dari Analisis dan Rencana eksekusimu!