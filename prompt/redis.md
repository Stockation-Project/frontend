# INSTRUKSI ARSITEKTUR: INTEGRASI REDIS CACHING (SMART TTL)

Tolong integrasikan Redis caching ke dalam backend Express proyek ini. Ini adalah tugas arsitektur yang krusial, jadi tolong ikuti instruksi ini secara bertahap dan berhati-hati agar tidak mengganggu endpoint transaksional.

## 1. Setup & Konfigurasi Redis
- Pastikan package `redis` terinstal (`npm install redis`).
- Buat file `src/config/redis.ts` yang mengekspor instance `redisClient` yang sudah terkoneksi ke `redis://localhost:6379`. 
- Handle *error connection* dengan baik (berikan `console.log` saat terkoneksi atau error).

## 2. Buat Utilitas Smart TTL (Jam Bursa)
- Buat file `src/utils/redis.util.ts`.
- Buat fungsi `getSmartTTL()`. 
- **Logika Waktu:** Cek waktu saat ini (pastikan dikonversi ke zona waktu WIB / Asia/Jakarta). 
  - Jika hari ini adalah Senin-Jumat DAN jam menunjukkan antara 09:00 pagi hingga 16:00 sore, kembalikan nilai `300` (5 menit). 
  - Jika di luar jam/hari tersebut (malam hari atau akhir pekan), kembalikan nilai `43200` (12 jam).

## 3. Implementasi ke Services (SANGAT SELEKTIF)
Terapkan *caching* HANYA pada services di dalam `src/services/stock.service.ts` berikut ini. Jangan sentuh service transaksi, autentikasi, atau pembuatan dompet!

* **A. `fetchAllStocksService`**
  - *Cache Key:* `stocks:all`
  - *TTL:* `getSmartTTL()`
* **B. `fetchExploreStocksService`**
  - *Cache Key:* `stocks:explore`
  - *TTL:* `getSmartTTL()`
* **C. `fetchStockDetailService(ticker)`**
  - *Cache Key:* `stock:detail:${cleanTicker}`
  - *TTL:* `getSmartTTL()`
* **D. `fetchRecommendedStocksService(userId)`**
  - *Cache Key:* `stocks:recommendations:${userId}` (Penting: Sertakan `userId` agar data personal tidak tertukar antar user).
  - *TTL:* `getSmartTTL()`

## Pola Implementasi di Setiap Service
Untuk keempat fungsi di atas, terapkan pola berikut:
1. Buat *Cache Key* yang sesuai.
2. Cek Redis menggunakan `redisClient.get(key)`.
3. Jika data ada di Redis, lakukan `JSON.parse` dan langsung `return` data tersebut (tambahkan `console.log` kecil untuk penanda "🚀 Cache Hit: [key]").
4. Jika tidak ada, jalankan proses komputasi/API aslinya.
5. Sebelum di-`return`, simpan hasilnya ke Redis menggunakan `redisClient.setEx(key, ttl, JSON.stringify(result))`.

Tolong berikan daftar file yang akan diubah beserta kodenya!