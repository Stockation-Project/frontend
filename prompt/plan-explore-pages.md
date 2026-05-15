# 🚀 INSTRUKSI AI AGENT: PEMBUATAN FITUR EXPLORE & WATCHLIST (STOCKATION)

## 📌 KONTEKS PROYEK
Anda ditugaskan untuk membuat Halaman **Explore** untuk aplikasi Stockation. Halaman ini berfungsi sebagai pusat penemuan saham bagi pengguna (Gen Z), menampilkan daftar saham yang sedang tren, untung terbanyak (*gainers*), rugi terbanyak (*losers*), serta daftar pantau pribadi (*Watchlist*).

⚠️ **ATURAN MUTLAK (ZERO DELETION POLICY):**
Jangan pernah menghapus file apapun di `src/hooks`, `src/types`, atau `src/components`. Gunakan pendekatan **Refactor by Addition**. Jika harus menyesuaikan UI, buat komponen baru di folder fitur.

---

## 🏗️ ARSITEKTUR FRONTEND (FEATURE-BASED)
Semua pekerjaan *Frontend* harus dilakukan di dalam folder `src/features/explore/` dan halaman utamanya di `src/pages/explore/ExplorePage.tsx`.

Buat struktur berikut:
`src/features/explore/`
├── `components/` 
├── `hooks/`
│   ├── `useMarketMovers.ts` (Fetch data Trending/Gainers/Losers)
│   └── `useWatchlist.ts` (Fetch, Add, Remove watchlist)
├── `services/`
│   └── `explore.service.ts` (Axios calls ke backend)
├── `types/`
│   └── `explore.ts` (Interface untuk bentuk data Yahoo Finance dan Watchlist)
└── `index.ts` (Barrel Export)

---

## ⚙️ IMPLEMENTASI BACKEND (NODE.JS + SUPABASE + REDIS)

### 1. Fitur Market Movers (Yahoo Finance)
silakan analisis code yang ada di `backned/stock/stock.service.ts` disana sudah ada kode untuk mengambil data saham nya
```js
export const fetchExploreStocksService = async () => {
  const cacheKey = "stocks:explore";
  const cachedData = await getCache(cacheKey);
  if (cachedData) {
    console.log(`Cache Hit: [${cacheKey}]`);
    return cachedData;
  }

  const dbStocks = await getAllStocks();
  if (!dbStocks || dbStocks.length === 0)
    return { gainers: [], losers: [], all_stocks: [] };

  // Panggil dari Util
  const mergedData = await enrichWithRealtimeQuotes(dbStocks);

  const gainers = [...mergedData]
    .filter((s) => s.change_percent > 0)
    .sort((a, b) => b.change_percent - a.change_percent)
    .slice(0, 5);
  const losers = [...mergedData]
    .filter((s) => s.change_percent < 0)
    .sort((a, b) => a.change_percent - b.change_percent)
    .slice(0, 5);

  const result = { gainers, losers, all_stocks: mergedData };
  await setCache(cacheKey, getSmartTTL(), result);
  return result;
};
```
Buat controller, model dan routes jika memang diperlukan!

### 2. Fitur Watchlist (Supabase)
Tabel `watchlists` sudah ada di database (`id`, `user_id`, `ticker`, `created_at`). Tabel `stocks` juga sudah ada.
- Buat rute: `GET /api/explore/watchlist`
- Lakukan *query* ke Supabase: Ambil data dari tabel `watchlists` berdasarkan `user_id` yang sedang *login*, dan lakukan `JOIN` (atau *select* relasi) dengan tabel `stocks` untuk mendapatkan `name` dan `is_anomaly`.

---

## 🎨 PANDUAN UI/UX DI HALAMAN EXPLORE (`ExplorePage.tsx`)
1. **Header:** Gunakan komponen `PageHeader` (Global).
2. **Section 1: Watchlist (Daftar Pantau):**
   - Jika `watchlist` kosong, tampilkan *Empty State* (Contoh: "Belum ada saham yang dipantau. Eksplorasi saham di bawah!"). component empty state sudah tersedia di `src/components/states/EmptyState.tsx`, silakan modifikasi
3. **Section 2: Market Movers:**
   - Berikan *Tabs* atau *Segmented Control* (Trending | Top Gainers | Top Losers).
   - Tampilkan daftar saham berdasarkan tab yang aktif.
   - Pastikan persentase harga (+ / -) memiliki warna yang sesuai (Hijau untuk positif, Merah untuk negatif).

### PENTING
Kolom kolom yang ada yaitu:
- Emiten
- Chart (naik atau turun)
- Harga
- Perubahan harga (%)

Untuk lebih jelas silakan liat di `components/shared/cards/StockTable.tsx` gunakan itu agar reusable, tetapi tolong modifikasi komonentnya agar menampilkan nama kolomnya, saat ini komponen itu tidak menampilkan nama kolom

Harap berikan ringkasan file apa saja yang akan Anda buat sebelum mulai menulis kode.