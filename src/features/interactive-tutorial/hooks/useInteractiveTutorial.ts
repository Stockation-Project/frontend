// src/features/interactive-tutorial/hooks/useInteractiveTutorial.ts
import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { TutorialFlowId, TutorialFlow, TutorialFlowStep } from "../types";
import { mainTutorialFlow } from "../flows/mainTutorialFlow";

const FLOWS: Record<TutorialFlowId, TutorialFlow> = {
  "main-tutorial": mainTutorialFlow,
};

export function useInteractiveTutorial() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [currentFlowId, setCurrentFlowId] = useState<TutorialFlowId | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentFlow = currentFlowId ? FLOWS[currentFlowId] : null;
  const currentStep: TutorialFlowStep | null =
    currentFlow?.steps[currentStepIndex] ?? null;
  const isLastStep = currentFlow
    ? currentStepIndex === currentFlow.steps.length - 1
    : false;

  const startFlow = useCallback(
    (flowId: TutorialFlowId) => {
      const flow = FLOWS[flowId];
      if (!flow) return;
      setCurrentFlowId(flowId);
      setCurrentStepIndex(0);
      setIsActive(true);

      // Navigate to first step's page if needed
      const firstStep = flow.steps[0];
      if (firstStep?.navigateTo && location.pathname !== firstStep.navigateTo) {
        navigate(firstStep.navigateTo);
      }
    },
    [navigate, location.pathname]
  );

  const nextStep = useCallback(() => {
    if (!currentFlow) return;
    const next = currentStepIndex + 1;
    if (next >= currentFlow.steps.length) {
      // Tutorial selesai
      setIsActive(false);
      setCurrentFlowId(null);
      setCurrentStepIndex(0);
      return;
    }
    const nextStepData = currentFlow.steps[next];
    setCurrentStepIndex(next);

    // Jika step berikutnya perlu navigasi
    if (nextStepData?.awaitNavigation && nextStepData?.navigateTo) {
      // Resolve dynamic paths like /portfolio/:id
      const resolved = nextStepData.navigateTo;
      navigate(resolved);
    }
  }, [currentFlow, currentStepIndex, navigate]);

  const endTutorial = useCallback(() => {
    setIsActive(false);
    setCurrentFlowId(null);
    setCurrentStepIndex(0);
  }, []);

  return {
    isActive,
    currentFlow,
    currentStep,
    currentStepIndex,
    isLastStep,
    availableFlows: Object.values(FLOWS),
    startFlow,
    nextStep,
    endTutorial,
  };
}
