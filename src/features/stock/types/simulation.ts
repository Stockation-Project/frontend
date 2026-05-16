// src/features/stock/types/simulation.ts

// --- Satu item saham di dalam keranjang beli ---
export interface CartItem {
  ticker: string;
  name: string;
  currentPrice: number; // harga per lembar saham saat ini
  lots: number;         // jumlah lot yang akan dibeli (1 lot = 100 lembar)
  isExpanded: boolean;  // state accordion (tampil detail/tidak)
  // data chart 1 minggu — opsional, diisi saat expand pertama kali
  chartData?: { date: string; price: number }[];
}

// --- Saham di daftar pencarian/rekomendasi ---
export interface SearchStockItem {
  ticker: string;
  name: string;
  currentPrice: number;
  changePercent: number; // persentase perubahan harga (positif/negatif)
  isPositive: boolean;
}

// --- Payload yang dikirim ke API untuk membeli 1 saham ---
export interface BuyStockPayload {
  portfolio_id: string;
  ticker: string;
  lots: number;
  current_price: number;
}

// --- Response API pembelian dari backend ---
export interface BuyStockResponse {
  success: boolean;
  message: string;
  data: {
    transaction_detail: {
      action: string;
      ticker: string;
      lots: number;
      price_per_share: number;
      total_cost: number;
    };
    updated_potfolio: {
      id: string;
      name: string;
      cash_balance: number;
      invested_balance: number;
    };
    holding: {
      id: string;
      portfolio_id: string;
      ticker: string;
      total_shares: number;
      avg_buy_price: number;
    };
  };
}

// --- Data item untuk Donut Chart alokasi ---
export interface AllocationChartItem {
  ticker: string;
  percentage: number;
  totalCost: number;
  color: string; // Tailwind bg-color class, e.g. "bg-brand"
}
