// src/features/product-tour/hooks/usePageTour.ts
import { useState, useEffect, useCallback } from "react";
import type { TourStep } from "../types";

interface UsePageTourOptions {
  steps: TourStep[];
  storageKey: string;
  autoStart?: boolean;
  isLoading?: boolean;
}

export function usePageTour({
  steps,
  storageKey,
  autoStart = false,
  isLoading = false,
}: UsePageTourOptions) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isLoading || !autoStart) return;

    // TODO production: uncomment baris ini
    // const seen = localStorage.getItem(storageKey) === "true";
    // if (seen) return;

    const timer = setTimeout(() => {
      setIsActive(true);
      setCurrentStep(0);
    }, 600);
    return () => clearTimeout(timer);
  }, [isLoading, autoStart, storageKey]);

  const startTour = useCallback(() => {
    setIsActive(true);
    setCurrentStep(0);
  }, []);

  const endTour = useCallback(() => {
    setIsActive(false);
    // TODO production: localStorage.setItem(storageKey, "true");
  }, [storageKey]);

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
