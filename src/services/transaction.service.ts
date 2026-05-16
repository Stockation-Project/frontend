// src/services/transaction.service.ts
// Service layer untuk semua endpoint transaksi (beli/jual saham)
import apiClient from "./api";
import type { BuyStockPayload, BuyStockResponse } from "@/features/stock";

/**
 * Mengirim request pembelian SATU saham ke backend.
 * Endpoint: POST /transactions/buy
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
 * Membeli beberapa saham sekaligus (bulk buy) secara berurutan.
 * Digunakan saat user mengklik "Konfirmasi Beli" dengan >1 saham di cart.
 * Jika salah satu gagal, proses berhenti dan error dilempar.
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
