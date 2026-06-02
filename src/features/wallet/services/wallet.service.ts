import apiClient from "@/lib/axios";
import type{ Portfolio, Wallet, Activity } from "../types/wallet";

export interface BaseResponse<T = void> {
  success: boolean;
  message: string;
  data?: T;
}

export const getWallets = async (): Promise<Wallet[]> => {
  const response = await apiClient.get("/wallets");
  return response.data.data;
};

export const getPortfolios = async (): Promise<Portfolio[]> => {
  const response = await apiClient.get("/portfolios");
  return response.data.data;
};

export const topUpWallet = async (amount: number): Promise<BaseResponse> => {
  const response = await apiClient.post("/wallets/topup", { amount });
  return response.data;
};

export const allocateFunds = async (
  portfolio_id: string,
  amount: number
): Promise<BaseResponse> => {
  const response = await apiClient.post("/wallets/allocate", {
    portfolio_id,
    amount,
  });
  return response.data;
};

export const withdrawFunds = async (
  portfolio_id: string,
  amount: number
): Promise<BaseResponse> => {
  const response = await apiClient.post("/wallets/withdraw", {
    portfolio_id,
    amount,
  });
  return response.data;
};

export const getActivityHistory = async (
  portfolio_id?: string,
  filter?: string
): Promise<Activity[]> => {
  const response = await apiClient.get("/wallets/history", {
    params: { portfolio_id, filter },
  });
  return response.data.data;
};

export const createPortfolio = async (
  name: string,
  allocated_fund: number
): Promise<BaseResponse> => {
  const response = await apiClient.post("/portfolios", {
    name,
    allocated_fund,
  });
  return response.data;
};
