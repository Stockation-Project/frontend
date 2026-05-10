// Data Chart dari Yahoo Finance
export interface ChartData {
  date: string;
  price: number | null;
}

// Data Anomali Historis (Mock untuk sementara)
export interface AnomalyHistory {
  id: string;
  period: string; // misal: "12 jan - 18 jan 2024"
  price_movement: string; // misal: "Rp1.800 -> Rp2.300"
  status: "Naik drastis" | "Turun drastis";
}

// Kontrak Utama Detail Saham
export interface StockDetailData {
  // --- Data Real dari Backend Saat Ini ---
  ticker: string;
  name: string;
  risk_level: string;
  is_anomaly: boolean;
  current_price: number;
  per: number | null;
  der: number | null;
  dividend: number | null;
  cagr: number | null;
  day_high: number;
  day_low: number;
  chart_1M: ChartData[];

  // --- Data Mock (Menunggu Tim AI / Update DB) ---
  sector: string;
  about_company: string;
  ai_summary: string;
  anomaly_history: AnomalyHistory[];
}
