import apiClient from "./api";

export const topUpWalletService = async (amount: number) => {
  try {
    const response = await apiClient.post("/wallets/topup", { amount });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Terjadi kesalahan saat melakukan top up",
    );
  }
};
