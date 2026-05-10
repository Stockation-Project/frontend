import apiClient from "./api";

export interface CreatePortfolioPayload {
  name: string;
  allocated_fund: number;
}

export const createPortfolioService = async (
  payload: CreatePortfolioPayload,
) => {
  try {
    const response = await apiClient.post("/portfolios", payload);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Gagal membuat portofolio",
    );
  }
};
