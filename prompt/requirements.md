# Project Requirements

## Project Overview
**Project Name:** Stockation  
**Project Type:** Web App (Fintech & Education)
**Main Goal:**  
Membangun platform edukasi simulasi investasi saham tanpa risiko finansial bagi generasi muda. Aplikasi ini membekali pengguna dengan modal virtual Rp100.000.000 dan menggunakan AI untuk mengedukasi profil risiko serta menekan bias psikologis (FOMO) dalam mengambil keputusan investasi.

---

## Problem Statement
- Tingginya fenomena FOMO (Fear of Missing Out) di kalangan generasi muda (Gen Z) saat terjun ke pasar modal.
- kurangnya literasi keuangan yang menyebabkan keputusan trading impulsif tanpa landasan fundamental, berujung pada kerugian finansial nyata.
- Aplikasi trading asli terlalu mengintimidasi dan tidak menyediakan safe space (ruang aman) untuk belajar manajemen portofolio.

---

## Target Users
- Pemula yang baru ingin belajar investasi saham (Beginner Investors).
- Mahasiswa dan Generasi Z yang rentan terhadap FOMO dan bias investasi.
- Pengguna yang ingin menguji strategi trading (paper trading) tanpa risiko uang asli.

---

## Core Features (Must Have)
- [x] Authentication (Login/Register via API Backend)
- [x] Risk Profile Questionnaire (Sistem scoring untuk menentukan profil: Kura-kura, Kuda Nil, Capybara, Serigala, Singa)
- [ ] Virtual Wallet & Allocation (Sistem injeksi modal awal Rp100 Juta dan pembagian ke berbagai dompet portofolio)
- [ ] Dashboard Overview (UI sudah selesai, menunggu integrasi data real-time)
- [ ] Stock Market Data Integration (Menampilkan harga saham dan sparkline pergerakan)
- [ ] Explore & Search (Halaman untuk mencari saham berdasarkan nama atau kode ticker)
- [ ] Portfolio Detail (Halaman detail saham yang dimiliki)
- [ ] Buy/Sell Simulation (Fitur transaksi jual beli saham simulasi)
- [ ] Educational AI Forecasting (Menampilkan rentang prediksi/ confidence intervals harga menggunakan model LSTM TensorFlow)
- [ ] Responsive Design

---

## Optional Features (Nice to Have)
- [ ] Gamification (Papan peringkat / Leaderboard simulasi profit tertinggi)
- [ ] Dark Mode
- [ ] Chatbot
- [ ] Real-time Updates

---

## Tech Stack
### Frontend:
- React (menggunakan Vite)
- [Tailwind CSS]
- [TypeScript]
- Framer Motion (untuk animasi transisi kuesioner & routing)
- Axios
- Shadcn UI (Radix UI)

### Backend:
- Node.js / Express

### Database:
- Supabase (PostgreSQL)

### ML / AI:
- Python (FastAPI / Flask) sebagai Microservice
- TensorFlow / Keras (untuk model Time-Series Forecasting - LSTM)

---

## Design Principles
- Atomic Design: Pemisahan komponen UI menjadi bagian kecil yang reusable (contoh: Button, Input, Alert di folder shared/ui).
- Separation of Concerns: Memisahkan Business Logic (Custom Hooks, Services) dari UI (Components).
- Modern Minimalist & Clean UI
- Server-Authoritative (Perhitungan krusial seperti penentuan profil risiko dan penambahan saldo dilakukan di backend, bukan frontend).
- Scalable Folder Structure

---

## Current Progress
### Completed:
- [Landing Page / Auth UI] (Register & Login dengan Shadcn Alert & Skeleton)
- [Questionnaire Flow] (UI Animasi Kuesioner, Custom Hook `useQuestionnaire`, Integrasi API Backend, Pop-up Result Modal)
- [Dashboard Layout]
- [Dashboard Components]

### In Progress:
- [Backend Data Integration] (Menyambungkan state UI Dashboard dengan data asli dari Supabase/Node.js)

### Pending:
- [Time-Series Forecasting UI]
- [Deployment]
- [Testing]
- [User Acceptance Testing]

---

## Constraints / Rules
- Jangan ubah design existing tanpa instruksi
- Strict Architecture: Jika membuat komponen UI baru yang menggunakan logika kompleks, JANGAN tulis state/API call di dalam komponen tersebut. Buatkan Custom Hook terpisah di folder `hooks/`.
- Hindari hardcoded data pada tahap finalisasi, siapkan struktur interface TypeScript yang sesuai dengan JSON response Backend.
- Gunakan clean code
- Fokus maintainability
- Gunakan bahasa Indonesia untuk teks UI dan Alert, namun gunakan bahasa Inggris untuk penamaan variabel, file, dan fungsi kode.

---

## Success Criteria
Project dianggap selesai jika:
- [ ] Semua core features berjalan
- [ ] Responsive desktop/mobile
- [ ] Clean architecture
- [ ] Deploy berhasil

---

## Struktur Folder Frontend (React + TypeScript)
Untuk menjaga codebase Stockation tetap bersih dan scalable saat AI Agent bekerja, pastikan ia mematuhi hierarki folder ini:

```text
stockation-frontend/
├── public/               # File publik statis (favicon, logo mentah)
├── src/
│   ├── assets/           # Media statis
│   │   ├── images/       # Gambar 
│   │   └── icons/        # SVG Icons kustom (jika tidak ada di Lucide)
|   |   └── logo/         # Logo stockation
|   |   └── profile/      # Gambar profil risiko
│   │
│   ├── components/       # Folder komponen UI (Atomic Design)
│   │   ├── ui/           # Komponen dasar dari Shadcn 
│   │   ├── shared/       # Komponen bentukan kita yang dipakai di banyak halaman
│   │   ├── layout/       # Komponen pembungkus halaman
│   │   ├── dashboard/    # Komponen spesifik halaman Dashboard
│   │   └── questionnaire/# Komponen spesifik kuesioner
|   |   └── explore/      # Komponen spesifik halaman Explore
|   |   └── portfolio/    # Komponen spesifik halaman Portfolio
|   |   └── profile/      # Komponen spesifik halaman Profile
|   |   └── transaction/  # Komponen spesifik halaman Transaksi
|   |   └── wallet/      # Komponen spesifik halaman global wallet user
│   │
│   ├── contexts/         # React Context untuk State Global
│   │   └── AuthContext.tsx # Menyimpan status login, token, dan data user global
│   │
│   ├── data/             # Data statis/konfigurasi (Hardcoded)
│   │   ├── questionnaire.ts # Daftar 13 pertanyaan dan bobot poin
│   │   └── riskProfiles.ts  # Mapping data hewan, deskripsi, dan gambar profil risiko
│   │
│   ├── hooks/            # Custom React Hooks (Business Logic)
│   │   ├── useAuth.ts          # Opsional: Jika ingin memisahkan logika auth dari context
│   │   ├── useQuestionnaire.ts # Otak dari alur kuesioner (state pergerakan, submit API)
│   │   └── useDashboard.ts     # (To be created) Logika fetching data dan perhitungan dashboard
│   │
│   ├── pages/            # Komponen Halaman (Hanya menyatukan komponen dan memanggil hooks)
│   │   ├── auth/         # LoginPage.tsx, RegisterPage.tsx
│   │   ├── questionnaire/# Questionnaire.tsx
│   │   └── dashboard/    # Dashboard.tsx
│   │
│   ├── services/         # Layer komunikasi dengan Backend (Axios/Fetch calls)
│   │   ├── api.ts              # Konfigurasi instance Axios dasar (Base URL, Interceptors)
│   │   ├── auth.service.ts     # API call untuk login, register
│   │   └── questionnaire.service.ts # API call untuk submit kuesioner
│   │
│   ├── types/            # TypeScript Interfaces / Types (Sangat krusial untuk AI Agent)
│   │   ├── auth.ts       # Interface untuk User, Token
│   │   └── dashboard.ts  # Interface untuk Portfolio, Allocation, StockData
│   │
│   ├── utils/            # Fungsi bantuan matematis / formatting murni (Tanpa React State)
│   │   ├── formatCurrency.ts # Fungsi formatRupiah(), formatJT()
│   │
│   ├── App.tsx           # Entry point utama untuk Routing (React Router) dan AnimatePresence
│   └── main.tsx          # Render file ke DOM
│
├── .env                  # Environment variables (API Keys, Backend URLs)
├── tailwind.config.js    # Konfigurasi warna Stockation, font, dll.
├── tsconfig.json         # Aturan TypeScript (Pastikan path alias @/ di-set ke src/)
└── package.json          # Dependencies list
```

---

## 📂 Struktur Folder Backend (Node.js / Express)

Arsitektur backend menggunakan pola **Controller-Service-Route** agar *business logic* terpisah dari lapisan HTTP.

```text
backend/
├── src/
│   ├── config/           # Konfigurasi database & environment (contoh: supabase.ts, env.ts)
│   ├── controllers/      # Menangani HTTP Request & Response (HANYA mengelola input/output)
│   ├── middleware/       # Interceptors request (contoh: auth.middleware.ts, error handler)
│   ├── models/           # Definisi skema data (Interfaces TypeScript atau ORM Models)
│   ├── routes/           # Mendefinisikan endpoint API (Express Router)
│   ├── services/         # Business Logic Utama & Query ke Database (Kalkulasi dilakukan di sini)
│   ├── utils/            # Helper functions murni (contoh: logger.ts, formater)
│   └── index.ts          # Entry point aplikasi Express (Setup server & global middleware)
│
├── .env                  # Environment variables (API Keys, DB Credentials)
├── .gitignore            # Daftar file/folder yang diabaikan Git
├── package-lock.json     # Dependency tree lock
├── package.json          # List dependencies & NPM scripts
├── README.md             # Dokumentasi backend
└── tsconfig.json         # Konfigurasi TypeScript