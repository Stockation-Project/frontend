export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  updated_at: string;
}

export interface Portfolio {
  id: string;
  user_id: string;
  name: string;
  cash_balance: number;
  invested_balance: number;
  updated_at: string;
  portfolio_holdings?: PortfolioHolding[];
}

export interface PortfolioHolding {
  id: string;
  portfolio_id: string;
  ticker: string;
  total_shares: number;
  avg_buy_price: number;
  updated_at: string;
}

export type MutationType = "TOP_UP" | "WITHDRAW" | "ALLOCATE";
export type TransactionType = "BUY" | "SELL";
export type ActivityType = MutationType | TransactionType;

export interface ActivityMetadata {
  ticker?: string;
  shares?: number;
  price?: number;
}

export interface Activity {
  id: string;
  type: ActivityType;
  amount: number;
  description: string;
  created_at: string;
  portfolio_id: string | null;
  source: "mutation" | "transaction";
  metadata?: ActivityMetadata;
}

export interface WalletStats {
  totalBalance: number;
  availableBalance: number;
  investedBalance: number;
  totalStocks: number;
}
