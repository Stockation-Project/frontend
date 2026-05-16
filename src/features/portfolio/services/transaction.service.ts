// src/features/portfolio/services/transaction.service.ts
import apiClient from "@/lib/axios";
import type { BuyStockPayload, BuyStockResponse } from "@/features/stock";

/**
 * Mengirim request pembelian SATU saham ke backend.
 */
export const buyStockService = async (
  payload: BuyStockPayload,
): Promise<BuyStockResponse> => {
  try {
    const response = await apiClient.post<BuyStockResponse>(
      "/transactions/buy",
      payload,
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Gagal melakukan pembelian saham",
    );
  }
};

/**
 * Membeli beberapa saham sekaligus (bulk buy).
 */
export const bulkBuyStockService = async (
  payloads: BuyStockPayload[],
): Promise<BuyStockResponse[]> => {
  const results: BuyStockResponse[] = [];
  for (const payload of payloads) {
    const result = await buyStockService(payload);
    results.push(result);
  }
  return results;
};

/**
 * Mengirim request penjualan saham ke backend.
 */
export const sellStockService = async (payload: {
  portfolio_id: string;
  ticker: string;
  lots: number;
  current_price: number;
}) => {
  try {
    const response = await apiClient.post("/transactions/sell", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Gagal menjual saham",
    );
  }
};

const transactionService = {
  buyStockService,
  bulkBuyStockService,
  sellStockService,
};

export default transactionService;
