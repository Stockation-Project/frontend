// src/features/product-tour/components/ProductTour.tsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TourStep, Rect } from "../types";
import Logo from "@/components/shared/brand/Logo";
import { useTutorialContext } from "@/features/interactive-tutorial";
import {
  OVERLAY_Z,
  TOOLTIP_Z,
  TOOLTIP_WIDTH,
  getTargetRect,
  scrollToTarget,
  computeTooltipPosition,
  CutoutOverlay,
  StepDots,
  TooltipArrow,
} from "../utils/tour-helpers";

// ============================================================
// Props
// ============================================================

interface ProductTourProps {
  isActive: boolean;
  currentStep: number;
  steps: TourStep[];
  onNext: () => void;
  onEnd: () => void;
}

// ============================================================
// Component
// ============================================================

const ProductTour: React.FC<ProductTourProps> = ({
  isActive,
  currentStep,
  steps,
  onNext,
  onEnd,
}) => {
  const { isActive: isTutorialActive } = useTutorialContext();
  
  // If interactive tutorial is running, suppress product tour entirely
  const effectiveIsActive = isActive && !isTutorialActive;
  const [tooltipPos, setTooltipPos] = useState<{
    top: number;
    left: number;
    arrow: "up" | "down" | "left" | "right" | null;
  }>({ top: 0, left: 0, arrow: null });

  const [highlightRect, setHighlightRect] = useState<Rect | null>(null);
  const scrollLockedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const savedScrollYRef = useRef<number>(0);

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;
  const isFirst = currentStep === 0;

  // ----- Compute positions (with retry if target not yet in DOM) -----
const computePositions = useCallback((retryCount = 0) => {
  if (!step) return;

  const targetRect = step.target ? getTargetRect(step.target) : null;

  // If target expected but not found yet, retry up to 5x with 100ms delay
  if (step.target && !targetRect && retryCount < 5) {
    setTimeout(() => computePositionsRef.current(retryCount + 1), 100);
    return;
  }

  const pos = computeTooltipPosition(
    targetRect,
    step.position,
    step.showLogo ? 300 : 180
  );
  setTooltipPos(pos);

  if (step.position !== "center" && targetRect) {
    setHighlightRect(targetRect);
  } else {
    setHighlightRect(null);
  }
}, [step]);
  // Keep a ref to latest computePositions so setTimeout never gets stale
  const computePositionsRef = useRef(computePositions);
  computePositionsRef.current = computePositions;

  // Auto-scroll to target on step change
  // Temporarily unlocks body overflow so smooth scroll can run
useEffect(() => {
  if (!effectiveIsActive || !step?.target) return;

  const prevOverflow = document.body.style.overflow;
  document.body.style.overflow = "";

  scrollToTarget(step.target);

  // Tambah delay lebih panjang agar scroll + DOM settle
  const settleTimer = setTimeout(() => {
    document.body.style.overflow = prevOverflow || "hidden";
    computePositionsRef.current();
  }, 600); // ← naik dari 450 ke 600

  return () => {
    clearTimeout(settleTimer);
    document.body.style.overflow = prevOverflow || "hidden";
  };
}, [effectiveIsActive, step?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Recompute on step change, resize, scroll (debounced via rAF)
  useEffect(() => {
    if (!effectiveIsActive) return;
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
  }, [effectiveIsActive, computePositions]);

  // Lock body scroll + save/restore scroll position
  useEffect(() => {
    if (effectiveIsActive) {
      savedScrollYRef.current = window.scrollY;
      document.body.style.overflow = "hidden";
      scrollLockedRef.current = true;
    }
    return () => {
      if (scrollLockedRef.current) {
        document.body.style.overflow = "";
        scrollLockedRef.current = false;
        // Restore scroll position on tour end
        window.scrollTo({ top: savedScrollYRef.current, behavior: "instant" });
      }
    };
  }, [effectiveIsActive]);

  if (!effectiveIsActive || !step) return null;

  const buttonLabel = step.buttonText ?? (isLast ? "Selesai" : "Lanjut");

  const handleButtonClick = () => {
    if (isLast) {
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

      {/* Overlay click-catcher (blocks clicks outside tooltip) */}
      <div className="fixed inset-0" style={{ zIndex: OVERLAY_Z + 1 }} />

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
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

          {/* ---- Welcome: Logo Header ---- */}
          {step.showLogo && (
            <div className="flex flex-col items-center text-center gap-1 overflow-hidden">
              <div className="w-full py-10 bg-brand flex items-center justify-center flex-col mb-4">
                  <Logo variant="white" showText={true} className="!flex flex-col" />
              </div>
              <h3 className="text-base font-medium text-text-primary">
                {step.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed px-4 ">
                {step.description}
              </p>
            </div>
          )}

          {/* ---- Regular Step: Title + Description (no icon) ---- */}
          {!step.showLogo && (
            <div className="px-5 pt-5 pb-3">
              <h3 className="text-sm font-medium text-text-primary mb-1">
                {step.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          )}

          {/* ---- Footer: dots + button + skip ---- */}
          <div
            className={`mt-4 flex items-center justify-between ${
              step.showLogo ? "px-4 py-4" : "px-5 pb-4"
            }`}
          >
            <StepDots total={steps.length} current={currentStep} />

            <div className="flex items-center gap-1">
              {/* Skip link — hidden on welcome & last */}
              {!isFirst && !isLast && (
                <button
                  onClick={onEnd}
                  className="px-3 py-1.5 text-sm text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                >
                  Skip
                </button>
              )}
              <button
                onClick={handleButtonClick}
                className="flex items-center px-3 py-1.5 rounded-lg text-sm font-reguler transition-all duration-200 cursor-pointer bg-brand text-white hover:bg-brand-800"
              >
                {buttonLabel}
              </button>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ProductTour;
