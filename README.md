# 🌐 Stockation — Frontend UI

Aplikasi Frontend berbasis **React** dengan **Vite** dan **TypeScript** untuk platform simulasi investasi Stockation. Frontend ini menangani antarmuka pengguna, visualisasi data, interaksi dengan pengguna, serta berkomunikasi secara terpusat dengan Backend API Gateway.

---

## 🗂️ Struktur Folder

```text
frontend/
├── src/
│   ├── assets/       # Static assets (gambar, icon, logo)
│   ├── components/   # Reusable UI components (komponen ShadCN UI, Button, dll)
│   ├── contexts/     # React Context untuk state management (AuthContext, dll)
│   ├── data/         # Static data atau mock data
│   ├── features/     # Feature-specific components and logic (auth, dashboard)
│   ├── lib/          # Utility libraries dan konfigurasi (contoh: axios.ts)
│   └── pages/        # Page components untuk routing aplikasi
│
├── .env.example      # Template environment variables
├── package.json      # Node dependencies dan npm scripts
├── eslint.config.js  # Konfigurasi ESLint
└── vite.config.ts    # Konfigurasi build Vite
```

---

## ⚙️ Setup & Instalasi

### 1. Install Dependencies

Pastikan Anda telah menginstal `Node.js` (disarankan v18+).

```bash
npm install
```

### 2. Konfigurasi Environment Variables

Salin file `.env.example` menjadi `.env` dan isi dengan konfigurasi Anda:

```bash
cp .env.example .env
```

Contoh isi `.env`:
```env
VITE_API_URL=http://localhost:3000/api
```

---

## 🚀 Menjalankan Aplikasi

### Mode Development (Vite Dev Server)

```bash
npm run dev
```

Aplikasi akan tersedia di `http://localhost:5173` (atau port lain yang disediakan Vite). Server mendukung *Hot Module Replacement (HMR)* sehingga perubahan kode akan langsung terlihat.

### Mode Production

Untuk melakukan proses *build* untuk production:

```bash
npm run build
```

Hasil build akan berada di folder `dist/`. Untuk melihat preview dari hasil build lokal:

```bash
npm run preview
```

### Linter

Untuk mengecek standar kode (linting):

```bash
npm run lint
```

---

## 🏗️ Aturan Pengembangan Frontend

Sesuai dengan kesepakatan tim (`GEMINI.md`):

1. **Komponen UI**:
   - Pecah komponen kompleks menjadi komponen yang lebih kecil (*micro-components*).
   - Pisahkan *Container Component* (pengambil data) dan *Presentational Component* (penerjemah UI murni).

2. **State Management**:
   - Gunakan `useState` untuk *local state* (form, toggle, modal).
   - Gunakan Context (React Context) untuk *global state* yang dipakai lintas fitur (Profil User, Saldo Wallet Global).

3. **Performa**:
   - Terapkan *lazy loading* pada rute yang berat (seperti halaman Dashboard).
   - Batasi render ulang pada grafik dengan memisahkan *state* yang tidak berhubungan secara langsung.
   - Buat *Optimistic UI* atau *refetch* otomatis segera setelah ada transaksi berhasil agar saldo ter-update seketika.

4. **Data Fetching**:
   - Tangani error dengan menampilkan notifikasi *user-friendly* (misal via Sonner) tanpa mengekspos *stack trace*.
   - Semua *request* wajib diarahkan ke API Gateway (bukan langsung ke FastAPI / DB).

---

## 📦 Dependencies Utama

| Package | Kegunaan |
|---------|----------|
| `react` & `react-dom` | Library inti antarmuka pengguna |
| `react-router-dom` | Sistem routing SPA |
| `tailwindcss` | *Utility-first* CSS framework untuk *styling* |
| `shadcn/ui` | Komponen modular *pre-built* berbasis Tailwind (Radix UI) |
| `axios` | HTTP Client untuk request API |
| `recharts` | Library untuk visualisasi data saham dan portofolio |
| `framer-motion` | Efek animasi yang mulus (*micro-interactions*) |
| `sonner` | Toast *notifications* yang modern |

---

## 🔗 Arsitektur Komunikasi

Demi alasan arsitektur terpusat (*Centralized Control*) dan perlindungan rahasia kredensial:

```text
React Frontend ↔ Express API Gateway ↔ (Supabase / FastAPI / Redis)
```

**Penting:** Frontend tidak pernah melakukan komunikasi *direct* ke layanan Machine Learning atau *query* basis data Supabase (kecuali diizinkan khusus oleh Gateway). Selalu gunakan `VITE_API_URL` saat melakukan request data.