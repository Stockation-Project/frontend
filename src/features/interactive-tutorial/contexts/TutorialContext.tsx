// src/features/interactive-tutorial/contexts/TutorialContext.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { TutorialFlowId, TutorialFlow, TutorialFlowStep } from "../types";
import { mainTutorialFlow } from "../flows/mainTutorialFlow";

const FLOWS: Record<TutorialFlowId, TutorialFlow> = {
  "main-tutorial": mainTutorialFlow,
};

// ============================================================
// Context type — holds ALL tutorial state
// ============================================================

interface TutorialContextValue {
  // State
  isActive: boolean;
  currentFlow: TutorialFlow | null;
  currentStep: TutorialFlowStep | null;
  currentStepIndex: number;
  isLastStep: boolean;

  // Actions
  startTutorial: () => void;
  nextStep: () => void;
  endTutorial: () => void;
}

const TutorialContext = createContext<TutorialContextValue | null>(null);

function noop() {}

const NOOP_CONTEXT: TutorialContextValue = {
  isActive: false,
  currentFlow: null,
  currentStep: null,
  currentStepIndex: 0,
  isLastStep: false,
  startTutorial: noop,
  nextStep: noop,
  endTutorial: noop,
};

export function useTutorialContext() {
  const ctx = useContext(TutorialContext);
  return ctx ?? NOOP_CONTEXT;
}

// ============================================================
// Provider — owns all useInteractiveTutorial state
// ============================================================

export const TutorialProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [currentFlowId, setCurrentFlowId] = useState<TutorialFlowId | null>(
    null
  );
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentFlow = currentFlowId ? FLOWS[currentFlowId] : null;
  const currentStep: TutorialFlowStep | null =
    currentFlow?.steps[currentStepIndex] ?? null;
  const isLastStep = currentFlow
    ? currentStepIndex === currentFlow.steps.length - 1
    : false;

  const startTutorial = useCallback(() => {
    const flowId: TutorialFlowId = "main-tutorial";
    const flow = FLOWS[flowId];
    if (!flow) return;
    setCurrentFlowId(flowId);
    setCurrentStepIndex(0);
    setIsActive(true);

    const firstStep = flow.steps[0];
    if (firstStep?.navigateTo && location.pathname !== firstStep.navigateTo) {
      navigate(firstStep.navigateTo);
    }
  }, [navigate, location.pathname]);

  const nextStep = useCallback(() => {
    if (!currentFlow) return;
    const next = currentStepIndex + 1;
    if (next >= currentFlow.steps.length) {
      setIsActive(false);
      setCurrentFlowId(null);
      setCurrentStepIndex(0);
      return;
    }
    const nextStepData = currentFlow.steps[next];
    setCurrentStepIndex(next);

    if (nextStepData?.awaitNavigation && nextStepData?.navigateTo) {
      navigate(nextStepData.navigateTo);
    }
  }, [currentFlow, currentStepIndex, navigate]);

  const endTutorial = useCallback(() => {
    setIsActive(false);
    setCurrentFlowId(null);
    setCurrentStepIndex(0);
  }, []);

  return (
    <TutorialContext.Provider
      value={{
        isActive,
        currentFlow,
        currentStep,
        currentStepIndex,
        isLastStep,
        startTutorial,
        nextStep,
        endTutorial,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};
