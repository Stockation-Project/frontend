## Refactor
Halaman detail portfolio card yang kamu buat memang sudah bagus, hanya untuk masalah routing masih perlu diperbaiki, halaman ini bisa diakses lewat `Sidebar.tsx` pada kode:
```js
const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/search", icon: Search, label: "Cari Saham" },
    { path: "/wallet", icon: Wallet, label: "Dompet" },
    { path: "/portfolio", icon: Briefcase, label: "Portofolio" }, //ini dia routes nya
    { path: "/profile", icon: User, label: "Profil" },
  ];
```

nah jadi ketika user klik navigasi `portfolio` pada sidebar maka dia akan megarah ke `/portfolio` namun disana user tidak langsung memilih portfolio/dompet mana yang akan dilihat detailnya, jadi tampilan pada Tabel Detail itu kosong, buat sebuah empty state menggunakan component `EmptyStates.tsx` untuk membuatnya, nah ketika user memilih dompet maka urlnya akan menjadi `/portfolio/{id}`, nah bagaimana jika user mengakses halaman ini dengan mengklik Portfolio Card pada halaman dashboard maka urlnya juga akan menjadi `/portfolio/{id}` bukan `/dashboard/portfolio/{id}`, nah untuk perubahan warna ketika user memilih salah satu dompet itu sama seperti component `WalletSelectCard.tsx`