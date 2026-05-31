// src/features/product-tour/hooks/useProductTour.ts
import { useState, useEffect, useCallback } from "react";
import type { UseProductTourOptions } from "../types";
import { DASHBOARD_TOUR_STEPS } from "../steps/dashboardSteps";
import { useAuth } from "@/features/auth";

const STORAGE_KEY = "stockation_product_tour_completed";

// Re-export untuk backward compat
export const TOUR_STEPS = DASHBOARD_TOUR_STEPS;

export function useProductTour(options: UseProductTourOptions) {
  const { isLoading } = options;
  const { user } = useAuth();
  const accountKey = `${STORAGE_KEY}_${user?.id ?? "anonymous"}`;

  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Auto-start only for users who haven't completed the tour yet
  useEffect(() => {
    if (isLoading) return;

    // Sudah selesai sebelumnya? Skip (per-akun).
    const completed = localStorage.getItem(accountKey) === "true";
    if (completed) return;

    const timer = setTimeout(() => {
      setIsActive(true);
      setCurrentStep(0);
    }, 600);
    return () => clearTimeout(timer);
  }, [isLoading, accountKey]);

  const startTour = useCallback(() => {
    setIsActive(true);
    setCurrentStep(0);
  }, []);

  const endTour = useCallback(() => {
    setIsActive(false);
    localStorage.setItem(accountKey, "true");
  }, [accountKey]);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next = prev + 1;
      if (next >= TOUR_STEPS.length) {
        endTour();
        return prev;
      }
      return next;
    });
  }, [endTour]);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < TOUR_STEPS.length) {
      setCurrentStep(step);
    }
  }, []);

  const currentTourStep = TOUR_STEPS[currentStep] ?? null;
  const isLastStep = currentStep === TOUR_STEPS.length - 1;

  return {
    isActive,
    currentStep,
    currentTourStep,
    isLastStep,
    totalSteps: TOUR_STEPS.length,
    startTour,
    nextStep,
    goToStep,
    endTour,
  };
}

/** Reset product tour flag — allows re-triggering during dev/testing */
export function resetProductTour(): void {
  // Hapus semua key per-akun
  Object.keys(localStorage)
    .filter((k) => k.startsWith(STORAGE_KEY))
    .forEach((k) => localStorage.removeItem(k));
}
