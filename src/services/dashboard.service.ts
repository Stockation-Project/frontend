// src/services/dashboard.service.ts

import apiClient from "./api";
import type { DashboardApiResponse } from "@/types/dashboard";

/**
 * Fetch dashboard data from the backend.
 * Endpoint: GET /api/users/dashboard
 * Requires Authorization header (handled by apiClient interceptor).
 */
export async function fetchDashboardData(): Promise<DashboardApiResponse> {
  const response = await apiClient.get<DashboardApiResponse>(
    "/users/dashboard"
  );
  return response.data;
}
