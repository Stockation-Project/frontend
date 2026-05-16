// src/features/dashboard/services/dashboard.service.ts
import apiClient from "@/lib/axios";
import type { DashboardApiResponse } from "../types/dashboard";

export async function fetchDashboardData(): Promise<DashboardApiResponse> {
  const response = await apiClient.get<DashboardApiResponse>(
    "/users/dashboard"
  );
  return response.data;
}
