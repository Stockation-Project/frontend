# PENJELASAN HALAMAN SIMULASI PEMBELIAN
oke, saya akan jelaskan untuk UI dari halaman simulasi pembelian saham ini:

## Alur
Halaman ini bukan halaman yang bisa diakses dari sidebar melainkan dari `Halaman Detail Saham` ketika user klik tombol `Beli saham ini` atau dari halaman `Detail Portfolio` (belum dibuat).

User saham -> halaman detail saham -> klik beli saham -> halaman simulasi pembelian

## Pembagian GRID
Halaman dibagi menjadi 3 secara vertical
- header berisi tombol back
- daftar dompet/portfolio
- simulasi yang dibagi menjadi 3 bagian
 
### Header
header disini hanya berisi tombol back, ini bisa menggunakan component page header

```js
// src/components/shared/layout/PageHeader.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  /** Tampilkan tombol kembali (ChevronLeft). Default: false */
  showBackButton?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  action,
  showBackButton = false,
}) => {
  const navigate = useNavigate();

  return (
    <header className="mb-8">
      {/* Tombol Kembali — hanya tampil jika showBackButton=true */}
      {showBackButton && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate(-1)}
          className="mb-4 rounded-xl text-slate-600 hover:text-slate-900 border-slate-200 h-10 w-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
      )}

      <div className="flex items-center justify-between">
        {title && (
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="text-sm text-slate-500 mt-1">{description}</p>
            )}
          </div>
        )}
        {action && <div>{action}</div>}
      </div>
    </header>
  );
};

export default PageHeader;
```

### Daftar Dompet/Portfolio
Daftar dompet disini sebenarnya hampir sama dengan `PortfolioCard`, akan tetapi yang ditampilkan hanyalah nama porto dan jumlah cash balance, jadi mungkin pada `PortfolioCard.tsx` kita perlu otak atik props dengan memberi tanda '?' pada props selain Nama Porto dan Cash Balance, mekanismenya adalah user akan memilih terlebih dahulu portfolio mana yang akan menjadi 'wadah' untuk saham yang akan dibeli, berikut kode lengkap dari `PortfolioCard.tsx`:
```js
// src/components/shared/cards/PortfolioCard.tsx
import React from "react";
import { Wallet } from "lucide-react";
import { formatCurrencyIDR } from "@/lib/utils/formatCurrency";

export interface Allocation {
  ticker: string;
  percentage: number;
  color: string; // Tailwind class misal: 'bg-green-700'
}

export interface PortfolioCardProps {
  id: string;
  name: string;
  allocations: Allocation[];
  cashBalance: number;
  investedBalance: number;
  profitAmount: number;
  profitPercentage: number;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  id,
  name,
  allocations = [],
  cashBalance,
  investedBalance,
  profitAmount,
  profitPercentage,
}) => {
  const isProfit = profitAmount >= 0;

  return (
    <div className="min-w-[320px] w-[320px] bg-white border border-slate-200 rounded-xl p-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      {/* 1. Bagian Atas (Header) */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 bg-[#329B0D] rounded-xl flex items-center justify-center flex-shrink-0">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 leading-tight">{name}</h4>
          <p className="text-xs text-slate-400 font-medium">{id}</p>
        </div>
      </div>

      {/* 2. Bagian Tengah (Progress Bar Alokasi) */}
      <div className="mb-6">
        {/* Bar */}
        <div className="w-full h-2 flex rounded-full overflow-hidden bg-slate-100 mb-2 gap-0.5">
          {allocations.length > 0 ? (
            allocations.map((item, idx) => (
              <div
                key={idx}
                className={`h-full ${item.color}`}
                style={{ width: `${item.percentage}%` }}
                title={`${item.ticker} - ${item.percentage}%`}
              />
            ))
          ) : (
            <div className="w-full h-full bg-slate-200" />
          )}
        </div>

        {/* Legenda */}
        <div className="flex flex-wrap gap-2">
          {allocations.length > 0 ? (
            allocations.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-[10px] font-bold text-slate-600">
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

      {/* 3. Bagian Bawah (Footer: Terpakai & Tersedia) */}
      <div className="flex justify-between items-end pt-4 border-t border-slate-100">
        {/* Kiri: Terpakai (Invested) */}
        <div>
          <p className="text-[10px] text-slate-500 font-medium mb-0.5">
            Saldo Terpakai
          </p>
          <p className="text-sm font-bold text-slate-900 mb-0.5">
            {formatCurrencyIDR(investedBalance, { absolute: true })}
          </p>
          {/* Teks Profit/Loss */}
          {investedBalance > 0 && (
            <p
              className={`text-[10px] font-bold ${isProfit ? "text-[#329B0D]" : "text-red-500"}`}
            >
              ({isProfit ? "+" : "-"}
              {Math.abs(profitPercentage)}%) {isProfit ? "+" : "-"}
              {formatCurrencyIDR(profitAmount, { absolute: true })}
            </p>
          )}
        </div>

        {/* Kanan: Tersedia (Cash) */}
        <div className="text-right">
          <p className="text-[10px] text-slate-500 font-medium mb-0.5">
            Saldo Tersedia
          </p>
          <p className="text-sm font-bold text-slate-900">
            {formatCurrencyIDR(cashBalance, { absolute: true })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
```

### Halaman Utama Simulasi
Halaman ini dibagi menjadi 2 bagian yaitu manual dan rekomendasi, mungkin ini bisa menggunakan component `tabs` dari `shadcn`

### Halaman Manual
Halaman ini pun dibagi lagi menjadi 3 secara horizontal, sebagai berikut:

#### Seacrh (Kanan)
bagian ini terdapat component `search` untuk mencari saham, dibawahnya terdapat rekomendasi yang berisi saham sesuai profile resiko ataupun user juga bisa mencari saham lain lewat `search bar`, jika kamu lihat sebenarnya ada component `tabs` yang bertuliskan `rekomendasi` dan `manual` namun abaikan saja component itu, isikan saja 5 saham sesuai dengan profile resiko, pada list saham nya akan terdapat `ticker`, `nama`, `harga saat ini` dan `indikasi naik atau turun`, serta `button +` yang akan berperan sangat penting, jika user klik `button +` itu maka saham tersebut akan masuk ke section `list saham` yang akan saya jelaskan di bawah

#### List Saham (tengah)
bagian ini berisi sebuah kontainer dengan headernya adalah `nama porto` dan `jumlah cash balance` dari portofolio user yang sudah di pilih diatas, lalu terdapat sebuah drawdown yang berisi `saham` yang sudah dipilih oleh user dengan mengklik `button +`, lalu pada drawdown ini terdapat tombol panah atas bawah dan juga tombol x untuk menghapus saham dari list yang akan dibeli, selanjutnya jika user klik `panah bawah` maka list saham itu akan menampilkan sebuah `chart` saham dengan interval chart `1 minggu`, lalu ada informaasi `harga per lembar` yang diambil dari `harga saat ini`, lalu input `jumlah lot` disertai button `-` dan `+` juga, dipaling bawah adalah `total harga` dari `jumlah lot` saham tersebut.

note: untuk `chart` jujur disini saya bingung, apakah bagus dan feasible jika menampilkan chart pada list saham ini? jika implementasinya sangat sulit sebaiknya dihilangkan saja

### Donut Chart Ringkasan (kiri)
pada bagian ini terdapat sebuah `donut chart` sebagai informasi berapa persen `alokasi saham` yang dibeli user, contoh `BBCA 30%`, `BBNI 40%`

Dibawahnya terdapat `Rincian Pembayaran` dengan informasi:
1. **Total Unit Saham**: yaitu jumlah saham yang akan dibeli
2. **Total Lot**: jumlah lot dari keseluruhan saham yang akan dibeli
3. **Total Investasi**: adalah total harga yang harus dibayar, nantinya ini yang akan menjadi `invested balance`
4. **Sisa Saldo**: adalah jumlah `cash balance` yang sudah di kurangi oleh `total investasi` diatas
5. **tombol konfirmasi beli**

## Kode Kode Backend
Untuk backend sebenarnya sudah diisi, namun saya tidak tahu apakah kode backend ini harus di perbaiki atau tidak, kode kode backend berada pada:

1. **stock.service.ts**: khususnya pada fungsi `buyStockService` sebagai berikut:
```js
export const buyStockService = async (
  userId: string,
  payload: BuyStockPayload,
) => {
  const { portfolio_id, ticker, lots, current_price } = payload;

  // kalo user masukin 0 lot saham
  if (lots <= 0) {
    throw new Error("Jullah lots harus lebih dari 0");
  }

  // hitung total biaya (1lot = 100lembar)
  const sharesToBuy = lots * 100;
  const totalCost = sharesToBuy * current_price;

  // cek porto user, ada + apakah punya dia
  const portfolio = await getPortfolioById(portfolio_id, userId);
  if (!portfolio) {
    throw new Error(
      `Saldo tidak cukup. Butuh ${totalCost} untuk membeli ${lots} Lot ${ticker}`,
    );
  }

  // cek user udah punya saham ini atau belum di porto nya
  const existingHolding = await getPortfolioHolding(portfolio_id, ticker);

  let newTotalShares = sharesToBuy;
  let newAvgPrice = current_price;

  if (existingHolding) {
    // jika user udah punya, kkita itung avg price yang baru
    newTotalShares = existingHolding.total_shares + sharesToBuy;

    const oldTotalValue =
      existingHolding.total_shares * existingHolding.avg_buy_price;

    newAvgPrice = (oldTotalValue + totalCost) / newTotalShares;
  }

  // catat kepemilikan saham di database
  const holding = await upsertPortfolioHolding(
    portfolio_id,
    ticker,
    newTotalShares,
    newAvgPrice,
  );

  // potong cash nya dan tambahin invested balance nya
  const newCash = Number(portfolio.cash_balance) - totalCost;
  const newInvested = Number(portfolio.invested_balance) + totalCost;
  const updatePortfolio = await updatePortfolioBalance(
    portfolio_id,
    newCash,
    newInvested,
  );

  return {
    transaction_detail: {
      action: "BUY",
      ticker,
      lots,
      price_per_share: current_price,
      total_cost: totalCost,
    },
    updated_potfolio: updatePortfolio,
    holding: holding,
  };
};
```

## Postman
jika saya coba di postman, maka skenarionya:

1. Request:
```json
{
  "portfolio_id": "1ee0e213-c4b4-40d6-b290-4132d62784ff",
  "ticker": "TLKM",
  "lots": 5,
  "current_price": 100
}
```
2. Response:
```json
{
    "success": true,
    "message": "Berhasil membeli saham TLKM",
    "data": {
        "transaction_detail": {
            "action": "BUY",
            "ticker": "TLKM",
            "lots": 5,
            "price_per_share": 100,
            "total_cost": 50000
        },
        "updated_potfolio": {
            "id": "1ee0e213-c4b4-40d6-b290-4132d62784ff",
            "user_id": "40ecae53-ef78-4546-b04e-8d99dd390ae9",
            "updated_at": "2026-05-10T10:25:26.44229+00:00",
            "name": "Dompet Pensiun Naya",
            "cash_balance": 19950000,
            "invested_balance": 50000
        },
        "holding": {
            "id": "ee99c796-2fed-494d-8f25-93d90d457704",
            "portfolio_id": "1ee0e213-c4b4-40d6-b290-4132d62784ff",
            "ticker": "TLKM",
            "total_shares": 500,
            "avg_buy_price": 100,
            "updated_at": "2026-05-11T09:11:07.41946+00:00"
        }
    }
}
```

### Keresahan
jujur aliran data pada halaman ini benar benar sangat kompleks, saya ingin kamu menganalisis ini, lalu berikan saya sebuah prompt (dalam format .md) untuk AI agent untuk membuat component component dan halaman ini, tolong saya untuk membuat planning pengerjaan halaman simulasi ini sebelum eksekusi