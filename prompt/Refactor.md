# Refactor Reusable Code — UI Architecture Cleanup Only (Static Data, No Data Flow Refactor Yet)Cleanup

## Objective
Lakukan analisis menyeluruh pada seluruh folder `components/dashboard`, identifikasi kode yang redundan, berulang, atau memiliki struktur serupa, lalu refactor menjadi arsitektur yang lebih **reusable, modular, scalable, dan clean** tanpa mengubah **UI, styling, layout, maupun behavior visual**.

---

# IMPORTANT CONTEXT (WAJIB DIPAHAMI)
## Saat ini seluruh data masih bersifat **statis / hardcoded**
### Fokus task sekarang HANYA:
## UI Refactor + Component Reusability

### Artinya:
- Belum perlu refactor data flow
- Belum perlu state management restructuring
- Belum perlu integrasi API
- Belum perlu context/store
- Belum perlu backend connection
- Belum perlu dynamic fetching
- Belum perlu custom hooks untuk data

---

# STRICT BOUNDARY
## Jangan sentuh:
- source data
- dummy data
- hardcoded constants
- business logic data flow
- API architecture
- backend structure

## Boleh:
- pecah component
- shared component
- reusable layout
- utility function
- prop-based architecture
- component composition
- shadcn adaptation

---

# Next Phase Notice
### Setelah UI refactor selesai, akan ada prompt lanjutan khusus untuk:
## “Data Flow Architecture”
yang mencakup:
- static → dynamic migration
- props drilling audit
- API integration structure
- custom hooks
- TanStack Query / fetch pattern
- state management

### Jadi untuk prompt ini:
# Abaikan dulu urusan aliran data — fokus murni pada refactor UI reusable code

---

## Core Rules (WAJIB)
- **JANGAN** mengubah tampilan, styling Tailwind, spacing, ukuran, warna, ataupun UX
- **JANGAN** mengubah logic bisnis utama
- Fokus hanya pada:
  - reusable components
  - shared components
  - utility functions
  - cleaner props structure
  - composition pattern
- Gunakan **shadcn/ui components** semaksimal mungkin jika memungkinkan
- Pertahankan existing design 100%
- Refactor harus mengikuti best practice:
  - DRY (Don’t Repeat Yourself)
  - Single Responsibility Principle
  - Scalable folder structure
  - Type-safe props
  - Maintainable naming

---

# Scope Refactor Detail

---

## 1. ResultModal.tsx + RiskProfileWidget.tsx
### Problem
Kedua komponen memiliki struktur inti yang sama, terutama:
- donut chart
- risk profile image
- result content
- CTA area

Perbedaan utama hanya pada:
### RiskProfileWidget tambahan:
#### Header:
```tsx
<div className="w-full bg-white border border-slate-100 rounded-[2rem] p-6 lg:p-8 shadow-sm">
  {/* Header Widget */}
  <div className="flex flex-col justify-between items-start mb-6">
    <h3 className="text-base font-bold text-slate-800">Profil Resiko</h3>
    <span className="text-[10px] font-medium items-center text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
      Diperbarui {updatedAt}
    </span>
  </div>
```
### Button Tes Ulang:
```js
<Button 
  variant="outline"
  onClick={() => navigate("/questionnaire")}
  className="w-full border-green-600 text-green-700 hover:bg-green-50 rounded-xl h-11 font-bold text-sm"
>
  Tes Ulang
</Button>
```
### Refacktor Goal:
Buat reusable base component seperti:
```text
components/shared/risk-profile/
 ┣ RiskProfileCard.tsx
 ┣ RiskProfileHeader.tsx
 ┣ RiskProfileChart.tsx
 ┣ RiskProfileAction.tsx
```
### Expected Pattern
- **RiskProfileCard** wrapper utama
- **showHeader?**: boolean
- **showRetestButton?**: boolean
- **updateAt?**: string

---

## 2. DashboardPages.tsx Header
### Problem
Header dashboard berpotensi digunakan di banyak halaman lain
```js
<header className="mb-8">
  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
    Dashboard
  </h1>
</header>
```
### Refactor Goal:
Buat reusable page header:
```text
components/shared/layout/PageHeader.tsx
```
### Example:
```js
<PageHeader title="Dashboard" />
<PageHeader title="Explore" />
<PageHeader title="Portfolio" />
```
### Props:
- title
- description?
- action?

---

## 3. Reusable Currency Formatter (IDR)
### Problem:
Logic format Rupiah tersebar di:
- `GlobalWalletCard.tsx`
- `PortfolioCard.tsx`
- `RecommendedStocks.tsx`
### Refactor Goal:
Centralize ke:
`lib/utils/formatCurrency.ts`
### Requirements:
Harus support:
- normal currency
- negative value custom handling (`Math.abs`)
- optional minus sign display
### Example:
```js
formatCurrencyIDR(value, { absolute: true })
formatCurrencyIDR(value)
```
### Final Output:
```js
Rp12.000
-Rp12.000
```

---

## 4. RecommendedStocks.tsx
### Problem:
Nama terlalu spesifik padahal akan digunakan juga di halaman `Explore`
### Refactor Goal:
Rename menjadi generic reusable table, contoh `StockTable.tsx`

---

## 5. GlobalWallet.tsx
### Problem:
Akan digunakan lintas halaman
### Refactor Goal:
Pindahkan ke `components/shared/wallet/GlobalWalletCard.tsx`
### Goal:
- reusable
- configurable balance
- configurable actions

---

## 6. EmptyPortfolio.tsx
### Problem:
Pattern empty state ini universal:
- Empty Portfolio
- Empty Watchlist
- Empty Buy / Sell
### Refactor Goal:
Buat generic `components/shared/states/EmptyState.tsx`
### Props:
- icon
- title
- description
- actionlabel?
- onAction?

---

## 7. PortfolioCard.tsx
### Problem:
Akan digunakan ulang di `Portfolio Page`  
### Refactor Goal:
Pindahkan ke `components/shared/cards/PortfolioCard.tsx`
### Goal:
- reusable card
- flexible stock data
- customizable CTA

---

## Folder Analysis Task
### Wajib:
Lakukan audit penuh terhadap `components/dashboard/**`
### Cari:
- Duplicate UI blocks
- Duplicate utility functions
- Repeated card structures
- Repeated empty states
- Repeated section headers
- Hardcoded components yang bisa diparameterisasi

---

## Expected Deliverables
### 1. Refactored Folder Structure
Berikan struktur folder baru yang lebih scalable
### Example:
```text
components/
 ┣ dashboard/
 ┣ shared/
 ┃ ┣ cards/
 ┃ ┣ layout/
 ┃ ┣ states/
 ┃ ┣ wallet/
 ┃ ┗ risk-profile/
lib/
 ┗ utils/
```
### 2. Refactor Execution
- Pindahkan kode
- Buat reusable props
- Gunakan TypeScript interfaces
- Gunakan shadcn jika cocok
- Hindari over-engineering

---

## Final Reminder
### PRIORITAS UTAMA

**"Reusable tanpa mengubah visual sedikit pun**

Artinya:
- Same UI
- Same Tailwind
- Same spacing
- Same design
- Better architecture only

Jangan:
- redesign
- restyle
- rename sembarangan tanpa alasan scalability
- menghapus behavior lama

---

## END GOAL
Saya ingin codebase terasa seperti production-grade dashboard architecture:

clean, modular, reusable, scalable, maintenaible

