// src/features/product-tour/hooks/useProductTour.ts
import { useState, useEffect, useCallback } from "react";
import type { UseProductTourOptions } from "../types";
import { DASHBOARD_TOUR_STEPS } from "../steps/dashboardSteps";

// Re-export untuk backward compat
export const TOUR_STEPS = DASHBOARD_TOUR_STEPS;

export function useProductTour(options: UseProductTourOptions) {
  const { isLoading } = options;

  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Always auto-start when dashboard is ready (for design iteration)
  // TODO: add localStorage + hasPortfolio check later for production
  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      setIsActive(true);
      setCurrentStep(0);
    }, 600);
    return () => clearTimeout(timer);
  }, [isLoading]);

  const startTour = useCallback(() => {
    setIsActive(true);
    setCurrentStep(0);
  }, []);

  const endTour = useCallback(() => {
    setIsActive(false);
    // TODO: localStorage.setItem("stockation_product_tour_seen", "true");
  }, []);

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
