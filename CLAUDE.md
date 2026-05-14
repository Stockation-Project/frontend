# Color System Guidelines

## Aturan Utama
Selalu gunakan CSS variable yang sudah didefinisikan di `src/styles/globals.css`.
JANGAN gunakan warna hardcode (hex, rgb, oklch langsung) atau kelas Tailwind bawaan
untuk warna yang sudah ada padanannya di design system.

---

## Brand (Hijau)
| Jangan | Gunakan |
|--------|---------|
| `bg-green-*` | `bg-brand-{shade}` |
| `text-green-*` | `text-brand-{shade}` |
| `border-green-*` | `border-brand-{shade}` |
| `bg-[#2C8500]` | `bg-brand` |
| `bg-[#329B0D]` | `bg-brand` |
| `text-[#329B0D]` | `text-brand` |

Shade tersedia: 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900 (default), 950, 1000
Default `bg-brand` = brand-900 (#2C8500)

---

## Error (Merah)
| Jangan | Gunakan |
|--------|---------|
| `bg-red-*` | `bg-error-{shade}` |
| `text-red-*` | `text-error-{shade}` |
| `border-red-*` | `border-error-{shade}` |
| `bg-[#AD0000]` | `bg-error` |

Shade tersedia: 25, 50, 100, 200, 300, 400, 500, 600, 700, 800 (default), 900, 950, 1000

---

## Warning (Kuning)
| Jangan | Gunakan |
|--------|---------|
| `bg-yellow-*` | `bg-warning-{shade}` |
| `text-yellow-*` | `text-warning-{shade}` |
| `border-yellow-*` | `border-warning-{shade}` |
| `bg-[#AD9F00]` | `bg-warning` |

Shade tersedia: 25, 50, 100, 200, 300, 400, 500, 600, 700, 800 (default), 900, 950, 1000

---

## Background
| Jangan | Gunakan |
|--------|---------|
| `bg-white` | `bg-background-primary` |
| `bg-slate-50` | `bg-background-secondary` |
| `bg-[#ffffff]` | `bg-background-primary` |

---

## Border
| Jangan | Gunakan |
|--------|---------|
| `border-slate-200` | `border-border-primary` |
| `border-slate-100` | `border-border-secondary` |
| `border-[#e2e8f0]` | `border-border-primary` |

---

## Pola Umum Komponen

### Alert / Banner
```tsx
// Error
<div className="bg-error-25 border border-error-200 text-error-800">...</div>

// Warning  
<div className="bg-warning-25 border border-warning-200 text-warning-800">...</div>

// Brand/Success
<div className="bg-brand-25 border border-brand-200 text-brand-800">...</div>
```

### Badge / Status
```tsx
<span className="bg-error-100 text-error-800">Gagal</span>
<span className="bg-warning-100 text-warning-800">Pending</span>
<span className="bg-brand-100 text-brand-800">Aktif</span>
```

### Tombol
```tsx
// Primary brand
<button className="bg-brand hover:bg-brand-800 text-brand-foreground">...</button>

// Destructive
<button className="bg-error hover:bg-error-700 text-error-foreground">...</button>
```

### Card
```tsx
<div className="bg-background-primary border border-border-primary rounded-xl">
  <div className="bg-background-secondary border-b border-border-secondary px-4 py-3">
    {/* header */}
  </div>
</div>
```

---

## Pengecualian
- `text-slate-*` untuk teks netral (body, label, placeholder) masih boleh
  sampai design system teks dibuat
- `bg-slate-*` di atas shade 100 masih boleh untuk kasus yang belum ada tokennya
- Warna `white/20`, `white/70` (opacity) pada elemen aktif/overlay masih boleh

---

## Cara Refactor File yang Ada
Ketika mengedit file yang masih menggunakan warna lama:
1. Cari semua `bg-white` → ganti `bg-background-primary`
2. Cari semua `bg-slate-50` → ganti `bg-background-secondary`
3. Cari semua `border-slate-200` → ganti `border-border-primary`
4. Cari semua `border-slate-100` → ganti `border-border-secondary`
5. Cari semua `text-red-*` / `bg-red-*` → ganti dengan `error-*`
6. Cari semua `text-yellow-*` / `bg-yellow-*` → ganti dengan `warning-*`
7. Cari semua `text-green-*` / `bg-green-*` → ganti dengan `brand-*`
8. Cari semua hex hijau (`#329B0D`, `#2C8500`, dll) → ganti `brand` token yang sesuai