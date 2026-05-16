// src/features/dashboard/hooks/useDashboard.ts
import { useState, useEffect, useCallback } from "react";
import { fetchDashboardData } from "../services/dashboard.service";
import type { DashboardData } from "../types/dashboard";

interface UseDashboardReturn {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

/**
 * Custom hook to fetch and manage dashboard data.
 * Separates business logic (API fetching) from UI components.
 */
export function useDashboard(): UseDashboardReturn {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Gunakan useCallback agar fungsinya stabil saat di-passing
  const refreshData = useCallback(async () => {
    try {
      const response = await fetchDashboardData();

      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || "Gagal memuat data dashboard.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan saat memuat data dashboard.");
      }
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetchDashboardData();

        if (isMounted) {
          if (response.success) {
            setData(response.data);
          } else {
            setError(response.message || "Gagal memuat data dashboard.");
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Terjadi kesalahan saat memuat data dashboard.");
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error, refreshData };
}
