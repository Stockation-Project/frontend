# PEMBUATAN HALAMAN DETAIL PORTFOLIO

## Overview
Halaman ini adalah sebuah halaman untuk detail dari `portfolio user`, jadi jika user mngunjungi halaman ini maka user akan bisa melihat slider `daftar portofolio` seperti di halaman dashboard serta isi dari portfolio itu, contoh:
**Dompet Aggresive** berisi:
- `Saham`: BBCA
- `Alokasi`: 1.000.000 (5% dari Investasi)
- `Jumlah Lot`: 8 Lot (800 Lembar)
- `Laba/Rugi`: +6% (+Rp.60.000)

## Pembagian GRID
Pembagian grid pada componen ini dibagi menjadi 3 yaitu
1. **Header**: menggunakan komponent `PageHeader.tsx` yang bisa ditemukan pada `components/shared/layout`
2. **Card Portfolio**: ini berisi card portfolio dengan slider
3. **Detail Portfolio**: pada section inilah detail dari isi portfolio user itu berada, pada component inilah informasi yang lebih spesifik mengenai saham saham yang dibeli user tersedia

## Daftar Component
Component component yang ada pada halaman ini sebetulnya sudah ada pada `components/shared` jadi tinggal dipakai dan dimodifikasi saja. berikut adalah daftar componentnya:
1. `PortfolioCard.tsx` yang bisa di temui di `components/shared/cards`, pada intinya section ini sama persis seperti di halaman dashboard lengkap dengan modal pembuatan portfolio, untuk contoh kodenya bisa dilihat di `DashboardPage.tsx` dan berikut contoh kodenya:
```js
{/* Portfolio Section — Dompet investasi */}
          <PortfolioSection
            portfolios={portfoliosWithColors}
            userRiskProfile={user_info.risk_profile}
            onAddClick={() => setIsCreatePortoOpen(true)}
          />

          <CreatePortfolioModal
            isOpen={isCreatePortoOpen}
            onClose={() => setIsCreatePortoOpen(false)}
            currentBalance={data?.wallet_summary?.main_wallet_balance || 0}
            onSuccess={handleCreatePortfolio}
          />
```
2. `Card Besar`: ini sebagai pembungkus section detail portfolio user, mungkin component inilah yang nantinya akan kita buat sendiri
3. `Legenda`: component ini sebenarnya sudah di `components/shared/cards/PortfolioCard.tsx` akan tetapi jika kita ingin menggunakan component ini pada halaman yang akan kita buat maka saya pikir bahwa component ini harus dijadikan component terpisah agar bisa digunakan oleh component lain, berikut adalah codenya:
```js
{/* Legenda */}
        <div className="flex flex-wrap gap-2">
          {allocations.length > 0 ? (
            allocations.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-[10px] font-medium text-slate-600">
                  {item.ticker} {item.percentage}%
                </span>
              </div>
            ))
          ) : (
            <span className="text-[10px] text-slate-400">
              Belum ada saham dialokasikan
            </span>
          )}
        </div>
      </div>
```
4. `Tabel Detail`: nah component ini bentuknya sama seperti `StockTable.tsx` di `components/shared/cards` tapi bedanya adalah pada kolom kolomnya, dan berikut adalah daftar kolomnya
- **Emiten**: ini adalah `ticker` dan `nama saham`, contoh: BBCA | Bank Central Asia Tbk.
- **Alokasi**: ini adalah jumlah invested balance yang sudah dibelanjakan pada saham X, contoh: pada saham `BBCA` user sudah menghabiskan uang sebesar `Rp.1.000.000` yang dimana ini sebesar `5%` dari total investasi atau `invested balance` 
- **Jumlah Lot**: ini adalah jumlah lot saham X yang dibeli oleh user, contoh: Saham `BBCA` sudah dibeli user sebanyak `8Lot` atau `800 Lembar`
- **Laba/Rugi**: ini adalah indikasi kenaikan atau penurunan dari saham X yang dibeli user, contoh: saham `BBCA` yang dibeli user `naik`, maka indikasinya adalah `panah atas` berwarna `hijau` disertai berapa `%` kenaikanya (`5%`), lalu dibawahnya `panah atas` berwarna hijau dengan `Rp. 60.000` berwarna hijau, artinya saham `BBCA` yang dibeli user naik sebesar `5%` dengan angka rill `Rp. 60.000`,
- **Aksi**: pada kolom ini terdapat sebuah button `detail` yang nantinya akan mengarah ke halaman berbeda.

## JSON Struktur
1. **URL**: `api/portfolios/{id}`
2. **Request**: api/portfolios/f4fd5676-51de-415e-bc95-f0bb37299611
3. **Response**: 
```json
{
    "success": true,
    "message": "Berhasil mengambil detail portofolio",
    "data": {
        "id": "f4fd5676-51de-415e-bc95-f0bb37299611",
        "user_id": "72b62017-ad9e-44c8-9f16-f14fe7561995",
        "updated_at": "2026-05-10T10:32:03.572031+00:00",
        "name": "Dompet Konservatif",
        "cash_balance": 8939300,
        "invested_balance": 1060700,
        "portfolio_holdings": [
            {
                "id": "bbbe76ea-a902-452d-b265-4c7e03d0aacc",
                "ticker": "ADRO",
                "updated_at": "2026-05-12T11:50:38.638686+00:00",
                "total_shares": 100,
                "avg_buy_price": 2600
            },
            {
                "id": "e4bb1171-99a5-42a3-8db6-175f03ab766d",
                "ticker": "ANTM",
                "updated_at": "2026-05-12T11:50:39.246031+00:00",
                "total_shares": 100,
                "avg_buy_price": 3570
            },
            {
                "id": "f3c5e3db-35a2-49d2-81e5-97a05874e617",
                "ticker": "BMRI",
                "updated_at": "2026-05-12T11:50:39.842229+00:00",
                "total_shares": 100,
                "avg_buy_price": 4240
            },
            {
                "id": "d1c2cba4-f351-4175-8318-8d00c469a037",
                "ticker": "ADHI",
                "updated_at": "2026-05-12T11:50:40.462727+00:00",
                "total_shares": 100,
                "avg_buy_price": 197
            }
        ]
    }
}
```

## Kode Backend
Kode kode backend yang mungkin berhubungan dengan ini adalah `portfolio.service.ts`, `portfolio.controller.ts`, `portfolio.model.ts`, dan `portfolio.routes.ts`

## Output yang diharapkan
Silakan kamu analisis folder/file yang sudah saya mention, lakukan analisis mendalam setelah itu buatkan saya sebuah prompt planning di `frontend/promps` agar AI Agent saya yang mengeksekusinya
