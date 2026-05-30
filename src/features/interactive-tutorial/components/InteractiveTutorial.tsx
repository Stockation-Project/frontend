// src/features/interactive-tutorial/components/InteractiveTutorial.tsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TutorialFlow, TutorialFlowStep, Rect } from "../types";
import {
  TOOLTIP_Z,
  TOOLTIP_WIDTH,
  getTargetRect,
  scrollToTarget,
  computeTooltipPosition,
  CutoutOverlay,
  TooltipArrow,
} from "@/features/product-tour/utils/tour-helpers";

// ============================================================
// Props
// ============================================================

interface InteractiveTutorialProps {
  isActive: boolean;
  currentFlow: TutorialFlow | null;
  currentStep: TutorialFlowStep | null;
  currentStepIndex: number;
  isLastStep: boolean;
  onNext: () => void;
  onEnd: () => void;
}

// ============================================================
// Component
// ============================================================

export const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({
  isActive,
  currentFlow,
  currentStep,
  currentStepIndex,
  isLastStep,
  onNext,
  onEnd,
}) => {
  const [tooltipPos, setTooltipPos] = useState<{
    top: number;
    left: number;
    arrow: "up" | "down" | "left" | "right" | null;
  }>({ top: 0, left: 0, arrow: null });

  const [highlightRect, setHighlightRect] = useState<Rect | null>(null);
  const scrollLockedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const savedScrollYRef = useRef<number>(0);
  const onNextRef = useRef(onNext);
  const onEndRef = useRef(onEnd);
  const isLastStepRef = useRef(isLastStep);
  onNextRef.current = onNext;
  onEndRef.current = onEnd;
  isLastStepRef.current = isLastStep;

  // ----- Compute positions -----
  const computePositions = useCallback(
    (retryCount = 0) => {
      if (!currentStep) return;

      const targetRect = currentStep.target
        ? getTargetRect(currentStep.target)
        : null;

      // Retry if target expected but not found (up to 15× @ 250ms = 3.75s)
      if (currentStep.target && !targetRect && retryCount < 15) {
        setTimeout(() => computePositionsRef.current(retryCount + 1), 250);
        return;
      }

      const pos = computeTooltipPosition(
        targetRect,
        currentStep.position,
        160
      );
      setTooltipPos(pos);

      if (currentStep.position !== "center" && targetRect) {
        setHighlightRect(targetRect);
      } else {
        setHighlightRect(null);
      }
    },
    [currentStep]
  );

  const computePositionsRef = useRef(computePositions);
  computePositionsRef.current = computePositions;

  // ----- Click-to-advance via event delegation (handles late-appearing elements like modals) -----
  useEffect(() => {
    if (!isActive || !currentStep?.target) return;

    const clickSelector = currentStep.clickTarget || currentStep.target;

    const handleDelegatedClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const match = target.closest(`[data-tour="${clickSelector}"]`);
      if (!match) return;

      // Jika tombol disabled, jangan advance (user belum isi form, dsb)
      if (match instanceof HTMLButtonElement && match.disabled) return;

      if (isLastStepRef.current) {
        onEndRef.current();
      } else {
        onNextRef.current();
      }
    };

    document.addEventListener("click", handleDelegatedClick);

    return () => {
      document.removeEventListener("click", handleDelegatedClick);
    };
  }, [isActive, currentStep?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // ----- Scroll to target on step change -----
  useEffect(() => {
    if (!isActive || !currentStep?.target) return;

    // Scroll inner container langsung (body tetap overflow:hidden)
    scrollToTarget(currentStep.target);

    // Compute posisi setelah scroll
    const timer = setTimeout(() => computePositionsRef.current(), 100);
    return () => clearTimeout(timer);
  }, [isActive, currentStep?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // ----- Recompute on step change, resize, scroll -----
  useEffect(() => {
    if (!isActive) return;
    computePositions();

    const scheduleRecompute = () => {
      if (rafIdRef.current !== null) return;
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        computePositionsRef.current();
      });
    };

    window.addEventListener("resize", scheduleRecompute);
    window.addEventListener("scroll", scheduleRecompute, true);
    return () => {
      window.removeEventListener("resize", scheduleRecompute);
      window.removeEventListener("scroll", scheduleRecompute, true);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isActive, computePositions]);

  // ----- Lock body scroll -----
  useEffect(() => {
    if (isActive) {
      savedScrollYRef.current = window.scrollY;
      document.body.style.overflow = "hidden";
      scrollLockedRef.current = true;
    }
    return () => {
      if (scrollLockedRef.current) {
        document.body.style.overflow = "";
        scrollLockedRef.current = false;
        window.scrollTo({ top: savedScrollYRef.current, behavior: "instant" });
      }
    };
  }, [isActive]);

  if (!isActive || !currentFlow || !currentStep) return null;

  const totalSteps = currentFlow.steps.length;
  const hasTarget = !!currentStep.target;
  const centerButtonLabel =
    currentStep.buttonText ?? (isLastStep ? "Selesai" : "Lanjut");

  const handleCenterButton = () => {
    if (isLastStep) {
      onEnd();
    } else {
      onNext();
    }
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CutoutOverlay highlightRect={highlightRect} />
        </motion.div>
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed rounded-2xl bg-gradient-to-br from-background-primary via-background-primary to-background-primary/50 border-1 border-background-primary backdrop-blur-sm shadow-xl flex flex-col overflow-hidden"
          style={{
            zIndex: TOOLTIP_Z,
            top: tooltipPos.top,
            left: tooltipPos.left,
            width: TOOLTIP_WIDTH,
          }}
        >
          {/* Arrow */}
          {tooltipPos.arrow && <TooltipArrow direction={tooltipPos.arrow} />}

          {/* Content */}
          <div className="px-5 pt-5 pb-3">
            <span className="inline-block text-xs text-brand font-medium bg-brand/10 px-2 py-0.5 rounded-full mb-2">
              {currentFlow.icon} {currentFlow.title}
            </span>
            <h3 className="text-sm font-medium text-text-primary mb-1">
              {currentStep.title}
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              {currentStep.description}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between px-5 pb-4">
            <span className="text-xs font-medium text-text-muted">
              {currentStepIndex + 1}/{totalSteps}
            </span>

            <div className="flex items-center gap-1">
              {currentStepIndex > 0 && !isLastStep && (
                <button
                  onClick={onEnd}
                  className="px-3 py-1.5 text-sm text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                >
                  Keluar
                </button>
              )}
              {/* Only show button for center-positioned steps (no target to click) */}
              {!hasTarget && (
                <button
                  onClick={handleCenterButton}
                  className="flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-brand text-white hover:bg-brand-800 transition-all cursor-pointer"
                >
                  {centerButtonLabel}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
