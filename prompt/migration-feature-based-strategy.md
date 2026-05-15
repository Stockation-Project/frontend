# Strategi Migrasi: Feature-Based Architecture

Dokumen ini merinci rencana strategis untuk memigrasi basis kode frontend Stockation dari struktur folder tradisional/global ke arsitektur berbasis fitur (**Feature-Based Architecture**).

## 1. Analisis Kondisi Saat Ini (Hybrid State)
Saat ini proyek berada dalam masa transisi:
- Folder `src/features/` sudah dibuat untuk hampir semua domain.
- Namun, **isi utama** (hooks, services, types, components) masih tertinggal di folder global (`src/hooks`, `src/services`, `src/types`, `src/components`).
- Hal ini menyebabkan kebingungan import dan sulitnya mengisolasi logika fitur.

## 2. Target Struktur Fitur
Setiap fitur di `src/features/[feature-name]` harus mengikuti struktur standar berikut:

```text
src/features/[feature-name]/
├── components/    # Komponen UI spesifik fitur ini
├── hooks/         # Logika bisnis (React Hooks) fitur ini
├── services/      # API Call (Axios) fitur ini
├── types/         # Interface/Type TypeScript fitur ini
└── index.ts       # Public API (Barrel Export)
```

## 3. Roadmap Migrasi Bertahap

### Fase 1: Standardisasi Kontainer (Persiapan)
Memastikan setiap folder di `src/features/` memiliki struktur sub-folder yang lengkap dan file `index.ts`.

### Fase 2: Migrasi Data Layer (Types & Services)
Pindahkan file dari folder global ke fitur terkait. Ini memiliki risiko *breaking changes* paling rendah.
- `src/types/*` -> `src/features/[feature]/types/*`
- `src/services/*` -> `src/features/[feature]/services/*`

### Fase 3: Migrasi Logika Bisnis (Hooks)
Pindahkan custom hooks dari `src/hooks/` ke folder fitur.
- **Aturan**: Jika hook digunakan oleh lebih dari 1 fitur (misal: `useAuth`), simpan di `src/hooks/shared` atau `src/features/auth`.

### Fase 4: Kolokasi Komponen (UI)
Pindahkan komponen dari `src/components/[feature-name]` ke `src/features/[feature-name]/components/`.
- **Aturan**: Hanya pindahkan komponen yang **tidak digunakan** oleh fitur lain.
- **Shared Components**: Tetap biarkan komponen seperti `Button`, `Input`, `StockTable`, dan `Layout` di `src/components/shared/` atau `src/components/ui/`.

### Fase 5: Public API Layer (Index)
Gunakan `index.ts` untuk mengekspor hanya apa yang dibutuhkan fitur lain.
Contoh `index.ts`:
```typescript
export * from './types/wallet';
export * from './hooks/useWallet';
export { WalletDetailView } from './components/WalletDetailView';
```

## 4. Urutan Prioritas Migrasi
Migrasi akan dilakukan fitur demi fitur (*End-to-End*) dengan urutan:
1.  **Auth**: Fondasi aplikasi (Login/Register).
2.  **Questionnaire**: Terisolasi dan simpel.
3.  **Stock & Explore**: Fokus pada penyajian data.
4.  **Wallet**: Fokus pada transaksi (Sedang Berjalan).
5.  **Dashboard**: Integrasi dari berbagai data.
6.  **Portfolio**: Fitur paling kompleks dengan banyak keterkaitan.

## 5. Prinsip Utama
1.  **Zero Deletion During Migration**: Jangan menghapus file lama sampai semua import di seluruh aplikasi sudah dialihkan ke folder fitur yang baru.
2.  **Encapsulation**: Hindari mengimpor file dari dalam folder fitur secara langsung (misal: `../features/wallet/hooks/useWallet`). Selalu gunakan barrel export (`@/features/wallet`).
3.  **Shared vs Feature**: Tanya diri sendiri: "Apakah komponen ini berguna jika fitur ini dihapus?". Jika iya, simpan di `src/components/shared`.
