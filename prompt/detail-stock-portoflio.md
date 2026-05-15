# Pembuatan Halaman Detail Saham di Halaman Detail Portfolio

## Overview
Jadi halaman ini adalah sebuah halaman ketika user klik button `detail` pada `PortfolioDetailPage.tsx` halaman ini sebtulnya sama persis dengan `StockDetailPage.tsx` akan tetapi ada tambahan elemen.

## Elemen Tambahan
1. **Tabel Riwayat Transaksi**: inilah yang membedakan halaman ini dengan halaman `Detail Saham Biasa` pada halaman ini user bisa melihat detail saham + riwayat transaksi dari saham ini, tentunya detail saham disini juga per 1 portfolio saja, jadi semisal di Portfolio A user memiliki saham BBCA, lalu user melihat detail Portfolio A lalu klik tombol detail pada saham BBCA maka riwayat transaksinya juga khusus saham BBCA di portfolio A meskipun user mempunyai Portfolio B yang mungkin juga punya saham BBCA. riwayat transaksi ini memiliki filter `semua`, `jual`, dan `beli`. Komponen ini berada di bawah chart
### Kolom dan Informasi:
- Status Jual/Beli: jika `beli` maka berwarna hijau, jika `jual` maka berwarna merah
- Id transaksi: didamping kanan `status jual/beli` ada `Id transaksi` dan dibawahnya ada tanggal transaksi
- status gagal/berhasil: di paling kanan terdapat status `berhasil` yang berwarna hijau dan jika `gagal` berwarna merah
- jumlah lot: jumlah lot saham, semisal 8 lot
- jumlah lembar: misal 800 lembar
- harga/lembar: ini harga ketika user beli atau jual (BUKAN HARGA TERBARU)

2. **Tombol Jual atau Beli**: nah ini juga yang menjadi pembeda dari halaman `Detail Saham` biasa, jika di halaman detail saham biasa hanya ada tombol `Beli` maka di halaman ini user juga bisa menjual sahamnya, dilengkapi dengan keterangan:
- Kepelilikan: contoh 8 lot (800lembar)
- harga beli: ini harga ketika user membeli saham tersebut, misal 6100
- harga saat ini: ini curent price yang nantinya akan menjadi harga jual untuk user, semisal 7000
- laba/rugi: jika harga beli < harga saat ini maka user mengalami kerugian, contoh -Rp.540.000 (21%) dan sebaliknya, indikasi rugi berwarna merah sedangkan indikasi untung berwarna hijau

## Kode Backend
kode backend yang mungkin berhubungan dengan halaman ini bisa dicek di folder `backend/src` silakan explore

## url
karena untuk mengakses halaman ini user perlu terlebih dahulu memasuki halaman detail portfolio dengan url: `portfolio/{id}` maka saya berharap url untuk halaman ini adalah `portfolio/{id}/{nama saham}`

saat ini ketika user klik tombol detail di halaman `PortfolioDetailPage.tsx` urlnya mengarah ke `dashboard/stock/{nama saham}`

buat kodenya reusable dan rapi

sebelum eksekusi kamu harus buat planning terlebih dahulu ya