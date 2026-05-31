// src/features/product-tour/hooks/usePageTour.ts
import { useState, useEffect, useCallback } from "react";
import type { TourStep } from "../types";

interface UsePageTourOptions {
  steps: TourStep[];
  storageKey: string;
  autoStart?: boolean;
  isLoading?: boolean;
  /** User ID untuk per-user localStorage key */
  userId?: string;
}

export function usePageTour({
  steps,
  storageKey,
  autoStart = false,
  isLoading = false,
  userId,
}: UsePageTourOptions) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Gabungkan storageKey dengan userId untuk per-user tracking
  const resolvedKey = userId ? `${storageKey}_${userId}` : storageKey;

  useEffect(() => {
    if (isLoading || !autoStart) return;

    // Cek apakah tour sudah pernah dilihat user ini
    const seen = localStorage.getItem(resolvedKey) === "true";
    if (seen) return;

    const timer = setTimeout(() => {
      setIsActive(true);
      setCurrentStep(0);
    }, 600);
    return () => clearTimeout(timer);
  }, [isLoading, autoStart, resolvedKey]);

  const startTour = useCallback(() => {
    setIsActive(true);
    setCurrentStep(0);
  }, []);

  const endTour = useCallback(() => {
    setIsActive(false);
    // Simpan status tour sudah selesai ke localStorage
    localStorage.setItem(resolvedKey, "true");
  }, [resolvedKey]);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next = prev + 1;
      if (next >= steps.length) {
        endTour();
        return prev;
      }
      return next;
    });
  }, [steps.length, endTour]);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  }, [steps.length]);

  return {
    isActive,
    currentStep,
    currentTourStep: steps[currentStep] ?? null,
    isLastStep: currentStep === steps.length - 1,
    totalSteps: steps.length,
    startTour,
    nextStep,
    goToStep,
    endTour,
  };
}
