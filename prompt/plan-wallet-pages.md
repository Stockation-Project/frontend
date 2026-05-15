# PEMBUATAN WALLET PAGES DENGAN ARSITEKTUR BARU
jadi aku ingin migrasi bertahap, karena aku sedang akan membuat halaman dompet, jadi aku mau mulai dari halaman dompet. aku sudah membuat struktur folder untuk menampung segala hal untuk fitur ini:

```teks
src/
components/
|_layout/
|_WalletLayout.tsx -> sudah kubuat tinggal isi
features/
wallet/
|_hooks/
|_components/
|_types/
|_services
|_index.ts -> sudah ada tinggal isi
pages/
wallet/
|_WalletPages.tsx -> sudah ada tinggal isi
```

## PANTAU PERUBAHAN 
Selalu pantau perubahan dengan mengikuti step kerja ini:
1. Cek perubahan pada `
features/wallet/services/wallet.service.ts`
 (Implementasi API untuk saldo dan dompet)
2. Cek perubahan pada `
features/wallet/types/wallet.ts`
 (Definisi tipe data)
3. Cek perubahan pada `
features/wallet/hooks/useWallet.ts`
 (Logika state dan fetch)
4. Cek perubahan pada `
features/wallet/components/`
 (Komponen UI untuk Wallet)
5. Cek perubahan pada `
pages/wallet/WalletPage.tsx`
 (Halaman utama)
6. Cek perubahan pada `
components/layout/WalletLayout.tsx`
 (Wrapper layout khusus Wallet)

## STRUKTUR LAMA
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

## STRUKTUR BARU (Wajib Mengikuti Ini)
frontend/
├── public/               # (Tetap) File publik statis
├── src/
│   ├── assets/           # (Tetap) Media statis (images, icons, logo)
│   │
│   ├── components/       # (BERUBAH: HANYA KOMPONEN GLOBAL)
│   │   ├── ui/           # Komponen Shadcn (Button, Input, Card, dll)
│   │   ├── shared/       # Komponen global (Navbar, Sidebar, Footer, PageHeader)
│   │   └── layout/       # Pembungkus halaman global (DashboardLayout, AuthLayout)
│   │
│   ├── contexts/         # (Tetap) Context global murni seperti ThemeContext (Auth bisa pindah ke feature)
│   │
│   ├── lib/              # (BARU) Konfigurasi library pihak ketiga
│   │   └── axios.ts      # Pindahan dari services/api.ts (Instance Axios dasar)
│   │
│   ├── utils/            # (Tetap) Utility murni (formatCurrency.ts)
│   │
│   ├── features/         # 🌟 (BARU: INI JANTUNG ARSITEKTURNYA)
│   │   │
│   │   ├── auth/         # Semua tentang Login & Register
│   │   │   ├── components/
│   │   │   ├── hooks/    # useAuth.ts
│   │   │   ├── services/ # auth.service.ts
│   │   │   ├── types/    # auth.ts (User, Token)
│   │   │   └── index.ts  # Export public untuk fitur ini
│   │   │
│   │   ├── questionnaire/# Semua tentang Onboarding & Profil Risiko
│   │   │   ├── components/ 
│   │   │   ├── data/     # questionnaire.ts, riskProfiles.ts
│   │   │   ├── hooks/    # useQuestionnaire.ts
│   │   │   ├── services/ # questionnaire.service.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── portfolio/    # Semua tentang Dompet, Alokasi, & Detail Portofolio
│   │   │   ├── components/ # PortfolioCard, TransactionHistoryTable
│   │   │   ├── hooks/    # usePortfolioDetail.ts, useWalletActions.ts
│   │   │   ├── services/ # portfolio.service.ts
│   │   │   ├── types/    # portfolio.ts
│   │   │   └── index.ts  #Barrel Export (WAJIB)
|   |   |
│   │   ├── wallet/       # Semua tentang Wallet
│   │   │   ├── components/ # WalletCard, TopUpForm
│   │   │   ├── hooks/    # useWallet.ts, useTopUp.ts
│   │   │   ├── services/ # wallet.service.ts
│   │   │   ├── types/    # wallet.ts
│   │   │   └── index.ts  #Barrel Export (WAJIB)
│   │   │
│   │   ├── stock/        # Semua tentang Explore & Simulasi Saham
│   │   │   ├── components/ # StockChart, StockActionWidget
│   │   │   ├── hooks/    # useStockDetail.ts, useChartFilter.ts
│   │   │   └── index.ts  #Barrel Export (WAJIB)
│   │   │
│   │   ├── dashboard/    # Ringkasan utama (Overview)
│   │   │   ├── components/ 
│   │   │   ├── hooks/    # useDashboard.ts
│   │   │   └── index.ts  #Barrel Export (WAJIB)
│   │   │
│   │   └── profile/      # Halaman profil user
│   │   │   ├── components/ # ProfileHeader, SecuritySettings
│   │   │   ├── hooks/    # useProfile.ts
│   │   │   ├── services/ # profile.service.ts
│   │   │   └── index.ts  #Barrel Export (WAJIB)
│   │
│   ├── pages/            # (BERUBAH: HANYA MENYATUKAN FITUR)
│   │   ├── auth/         # LoginPage.tsx, RegisterPage.tsx
│   │   ├── dashboard/    # DashboardPage.tsx
│   │   ├── portfolio/    # PortfolioDetailPage.tsx
│   │   └── stock/        # StockExplorePage.tsx, StockDetailPage.tsx
|   |   └── wallet/       # WalletPage.tsx
│   │
│   ├── App.tsx           # Entry point utama (Routing)
│   └── main.tsx          # Render DOM
│
├── tailwind.config.js
└── package.json

## Overview Page
Halaman dompet ini adalah sebuah halaman yang berfungsi untuk menampung fitur:
1. **Tarik Saldo**: menarik saldo dari sebuah portfolio/dompet ke global wallet
2. **Alokasi Saldo**: memindahkan saldo dari global wallet ke portfolio/dompet
3. **Lihat Riwayat Transaksi**: riwayat transaksi yang sudah dilakukan

## Pembagian GRID
1. Kanan (30%):
- **Global Wallet Card**: component ini bentuknya sama persis dengan yang ada di halaman `DashboardPage.tsx`, jadi component ini bisa langsung diambil di `components/shared/wallet/GlobalWalletCard.tsx`
- **List Dompet/Portfolio**: component ini akan menampilkan semua dompet/portfolio yang dimiliki oleh user. bentuknya sama persis seperti `components/shared/portfolio/PortfolioCard.tsx` tetapi dengan hanya menampilkan informasi:
- Nama Portfolio
- Id
- Total Saldo (ini adalah cash balance + invested balance yang sudah dikurangi atau ditambah dengan kerugian/keuntungan)
- Saldo Tersedia/Cash Balance
- Saldo Terpakai/Invested Balance 

2. Kiri (70%):
**Card Penampung Besar**: nah card penampung ini memiliki isi:
- Nama Dompet yang sedang dipilih 
- Id Dompet yang sedang dipilih
- Card Kecil berjumlah empat yang menampilkan:
    - Total Saldo (ini adalah cash balance + invested balance yang sudah dikurangi atau ditambah dengan kerugian/keuntungan)
    - Saldo Tersedia/Cash Balance
    - Saldo Terpakai/Invested Balance 
    - Total Saham yang dimiliki (ini adalah jumlah lembar saham)
- Button "Tambah Saldo" -> trigger `TopUpModal.tsx`
- Button "Tarik Saldo" -> trigger `WithdrawModal.tsx` (belum dibuat)
- Riwayat transaksi yang dilakukan dengan filter: "Semua", "Alokasi Saldo", "Tarik Saldo", "Jual", "Beli". Contoh:
  - Beli BBCA, Jumlah: 10 lembar, Harga: Rp 10.000, Total: -Rp 100.000
  - Tarik Saldo, Jumlah: +Rp 100.000
  - Alokasi Saldo, Jumlah: -Rp 100.000, ke Dompet: "Dompet 1"
  - Jual BBCA, Jumlah: 10 lembar, Harga: Rp 10.000, Total: +Rp 100.000

**Penting**: halaman ini tetap menggunakan sidebar dan header

## Problem
sepertinya saat ini saya belum punya kolom didatabase untuk menampung riwayat mutasi ini, apakah riwayat ini memang harus disimpan di database? jika iya, bagaimana kolom yang pas untuk ini?

Saat ini isi database hanya:
```sql
-- 1. Tabel Users (Update Risk Profile dengan CHECK)
CREATE TABLE users (
    id UUID PRIMARY KEY, 
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    dob DATE, 
    gender VARCHAR(20),
    place_of_birth VARCHAR(100),
    occupation VARCHAR(100),
    address TEXT,
    risk_profile VARCHAR(50) CHECK (risk_profile IN ('turtle', 'hippo', 'capybara', 'wolf', 'lion')), 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Tabel Wallets (Uang Virtual)
CREATE TABLE wallets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    balance DECIMAL(15, 2) DEFAULT 10000000.00, 
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Tabel Stocks (Data dari Tim ML)
CREATE TABLE stocks (
    ticker VARCHAR(20) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    risk_level VARCHAR(50),
    is_anomaly BOOLEAN DEFAULT FALSE,
    anomaly_notes TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Tabel Watchlists (Daftar Pantau Saham)
CREATE TABLE watchlists (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    ticker VARCHAR(20) REFERENCES stocks(ticker) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, ticker) 
);

-- 5. Tabel Portfolios (Kepemilikan Saham)
CREATE TABLE portfolios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    ticker VARCHAR(20) REFERENCES stocks(ticker) ON DELETE CASCADE,
    total_shares INTEGER DEFAULT 0,
    avg_buy_price DECIMAL(15, 2) DEFAULT 0.00,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. Tabel Transactions (Riwayat Jual/Beli)
CREATE TABLE transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    ticker VARCHAR(20) REFERENCES stocks(ticker),
    type VARCHAR(10) NOT NULL CHECK (type IN ('BUY', 'SELL')),
    shares INTEGER NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    total_amount DECIMAL(15, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 1. Kosongkan dulu isi tabel portfolios jika ada data uji coba (agar tidak error saat dirombak)
TRUNCATE TABLE portfolios CASCADE;

-- 2. Buang kolom yang tidak relevan dari tabel wadah utama
ALTER TABLE portfolios 
  DROP COLUMN ticker,
  DROP COLUMN total_shares,
  DROP COLUMN avg_buy_price;

-- 3. Tambahkan kolom baru yang sesuai dengan kebutuhan Dashboard UI Anda
ALTER TABLE portfolios 
  ADD COLUMN name VARCHAR(255) NOT NULL,
  ADD COLUMN cash_balance DECIMAL(15, 2) DEFAULT 0.00,
  ADD COLUMN invested_balance DECIMAL(15, 2) DEFAULT 0.00;

-- 4. Buat tabel anak (Untuk menyimpan rincian saham di dalam wadah tersebut)
CREATE TABLE portfolio_holdings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  ticker VARCHAR(20) REFERENCES stocks(ticker) ON DELETE CASCADE,
  total_shares INTEGER DEFAULT 0,
  avg_buy_price DECIMAL(15, 2) DEFAULT 0.00,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(portfolio_id, ticker) -- Mencegah saham yang sama dicatat dua kali di porto yang sama
);

ALTER TABLE stocks 
ADD COLUMN IF NOT EXISTS sector TEXT,
ADD COLUMN IF NOT EXISTS description TEXT;

ALTER TABLE transactions 
ADD COLUMN portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE;
```

## Solutions
Saya sudah membuat tambahan tabel yaitu:
```sql
CREATE TABLE mutations (
id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
user_id UUID REFERENCES users(id) ON DELETE CASCADE,
portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE, -- NULL jika mutasi hanya di global wallet
type VARCHAR(20) NOT NULL CHECK (type IN ('TOP_UP', 'WITHDRAW', 'ALLOCATE')),
amount DECIMAL(15, 2) NOT NULL,
description TEXT, -- Contoh: "Alokasi ke Dompet Pensiun", "Tarik ke Global Wallet"
created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
```

tetapi mungkin ini bisa kamu koreksi ulang agar lebih optimal, karena untuk filter "jual" dan "beli" sebenarnya sudah ada di tabel transactions, mungkin kita juga harus mengedit folder backend/ untuk membuat service, controller, dan juga model nya

Tugas kamu adalah membuat plan dalam bentuk .md untuk implementasi halaman wallet ini sebelum eksekusi, pastikan kamu membaca `agent-rules.md` dan `requirements.md`
