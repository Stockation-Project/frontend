import apiClient from "./api";
import type { DashboardApiResponse } from "@/types/dashboard";

export async function fetchDashboardData(): Promise<DashboardApiResponse> {
  const response = await apiClient.get<DashboardApiResponse>(
    "/users/dashboard"
  );
  return response.data;
}
