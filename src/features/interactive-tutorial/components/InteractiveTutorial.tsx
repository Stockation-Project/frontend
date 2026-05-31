// src/features/interactive-tutorial/components/InteractiveTutorial.tsx
import React, { useEffect, useLayoutEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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

  // --- Solusi Issue 7: Step 17 click listener + MutationObserver ---
  useEffect(() => {
    if (!isActive || currentStep?.id !== "tut-sell-button-highlight") return;

    const handleSellButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const match = target.closest('[data-tour="sell-stock-button"]');
      if (!match) return;

      if (match instanceof HTMLButtonElement && match.disabled) return;

      const observer = new MutationObserver(() => {
        if (document.querySelector('[data-tour="sell-stock-modal"]')) {
          observer.disconnect();
          if (isLastStepRef.current) onEndRef.current();
          else onNextRef.current();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    };

    // Capture phase — fires before stopPropagation() on the button
    document.addEventListener("click", handleSellButtonClick, true);
    return () => {
      document.removeEventListener("click", handleSellButtonClick, true);
    };
  }, [isActive, currentStep?.id]);

  // --- Solusi Issue 8: MutationObserver untuk step 17 ---
  // Setelah navigasi dari step 16 → 17, halaman baru (PortfolioStockDetailPage)
  // perlu waktu untuk memuat data dan merender tombol Jual.
  // Observer ini mendeteksi saat [data-tour="sell-stock-button"] muncul di DOM,
  // lalu memicu recompute + re-scroll agar cutout dan tooltip tepat sasaran.
  useEffect(() => {
    if (!isActive || currentStep?.id !== "tut-sell-button-highlight") return;

    // Jika elemen sudah ada di DOM, langsung recompute
    if (document.querySelector('[data-tour="sell-stock-button"]')) {
      scrollToTarget("sell-stock-button");
      computePositionsRef.current();
    }

    const observer = new MutationObserver(() => {
      const el = document.querySelector('[data-tour="sell-stock-button"]');
      if (el) {
        // Elemen muncul — scroll + compute
        scrollToTarget("sell-stock-button");
        computePositionsRef.current();
        // Layout shift safety: recompute lagi setelah 400ms
        setTimeout(() => {
          if (document.querySelector('[data-tour="sell-stock-button"]')) {
            scrollToTarget("sell-stock-button");
            computePositionsRef.current();
          }
        }, 400);
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [isActive, currentStep?.id]);

  // --- Solusi Issue 2 (Bagian 1): Tahan navigasi dari 12 ke 13 ---
  // Mencegah context memindah halaman lebih awal
  useLayoutEffect(() => {
    if (isActive && currentStep?.id === "tut-go-portfolio") {
      navigate("/simulation", { replace: true });
    }
  }, [isActive, currentStep?.id, navigate]);

  // --- Solusi Issue 3: Step 14 Otomatis klik dompet pertama ---
  useEffect(() => {
    if (isActive && currentStep?.id === "tut-portfolio-filter") {
      const timer = setTimeout(() => {
        const walletList = document.querySelector('[data-tour="portfolio-card-list"]');
        if (walletList) {
          const firstWallet = 
            walletList.querySelector('div[role="button"], button') as HTMLElement || 
            walletList.firstElementChild as HTMLElement;
            
          if (firstWallet) {
            firstWallet.click();
            onNextRef.current();
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isActive, currentStep?.id]);

  // ----- Compute positions -----
  const computePositions = useCallback(
    (retryCount = 0) => {
      if (!currentStep) return;

      const targetRect = currentStep.target
        ? getTargetRect(currentStep.target)
        : null;

      if (currentStep.target && !targetRect && retryCount < 15) {
        setTimeout(() => computePositionsRef.current(retryCount + 1), 250);
        return;
      }

      const pos = computeTooltipPosition(
        targetRect,
        currentStep.position,
        160
      );

      // --- Solusi Issue 6: Optimasi responsivitas tooltip (Mobile) ---
      const padding = 16;
      const tooltipW = Math.min(TOOLTIP_WIDTH, window.innerWidth - padding * 2);
      
      if (pos.left + tooltipW > window.innerWidth - padding) {
        pos.left = window.innerWidth - tooltipW - padding;
      }
      if (pos.left < padding) {
        pos.left = padding;
      }

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

  // ----- Click-to-advance via event delegation -----
  useEffect(() => {
    // --- Solusi Issue 4 (Bagian 1): Paksa step 15 menggunakan tombol Lanjut ---
    const forceButton = currentStep?.id === "tut-portfolio-detail";

    if (!isActive || !currentStep?.target || currentStep.buttonText || forceButton || currentStep.isChoiceStep || currentStep.id === "tut-sell-button-highlight") return;

    const clickSelector = currentStep.clickTarget || currentStep.target;
    const isPrefixMatch = clickSelector.startsWith("^");
    const selector = isPrefixMatch
      ? `[data-tour^="${clickSelector.slice(1)}"]`
      : `[data-tour="${clickSelector}"]`;

    const handleDelegatedClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const match = target.closest(selector);
      if (!match) return;

      if (match instanceof HTMLButtonElement && match.disabled) return;

      const checkNext = () => {
        if (isLastStepRef.current) onEndRef.current();
        else onNextRef.current();
      };

      // --- Solusi Issue 1: Validasi Async Step 3 ke 4 ---
      // Menunggu modal dompet tertutup (elemen dihapus dari DOM)
      if (currentStep.id === "tut-fill-wallet") {
        const observer = new MutationObserver(() => {
          if (!document.querySelector('[data-tour="tutorial-modal"]')) {
            observer.disconnect();
            checkNext();
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        return; 
      }

      // --- Solusi Issue 5: Navigasi ke PortfolioStockDetailPage (Step 16) ---
      // Karena pakai capture phase, button native onClick akan menangani navigasi.
      // Jangan panggil .click() ulang — akan infinite loop.
      if (currentStep.id === "tut-portfolio-action") {
        // Biarkan native handler button menjalankan navigasi
        // (tidak perlu detailBtn.click() — native onClick sudah ada di tombol)
      }

      checkNext();
    };

    // Capture phase — fires before stopPropagation() on child buttons
    document.addEventListener("click", handleDelegatedClick, true);

    return () => {
      document.removeEventListener("click", handleDelegatedClick, true);
    };
  }, [isActive, currentStep?.id, navigate]);

  // ----- Scroll to target on step change -----
  useEffect(() => {
    if (!isActive || !currentStep?.target) return;
    scrollToTarget(currentStep.target);
    const timer = setTimeout(() => computePositionsRef.current(), 100);
    return () => clearTimeout(timer);
  }, [isActive, currentStep?.id]);

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

  // --- handleSellChoice untuk step isChoiceStep ---
  const handleSellChoice = (action: "sell" | "skip") => {
    if (action === "sell") {
      const confirmBtn = document.querySelector('[data-tour="sell-confirm-button"]') as HTMLElement;
      if (confirmBtn && !(confirmBtn instanceof HTMLButtonElement && confirmBtn.disabled)) {
        confirmBtn.click();
      }
    } else {
      const closeBtn = document.querySelector('[data-tour="sell-modal-close"]') as HTMLElement;
      if (closeBtn) {
        closeBtn.click();
      }
    }
    onNext();
  };

  const totalSteps = currentFlow.steps.length;
  // --- Solusi Issue 4 (Bagian 2): Override hasButton & logic ---
  const forceButton = currentStep.id === "tut-portfolio-detail";
  const isChoiceStep = !!currentStep.isChoiceStep;
  const hasTarget = !!currentStep.target;
  const hasButton = !!currentStep.buttonText || forceButton;
  
  const centerButtonLabel = forceButton 
    ? "Lanjut" 
    : (currentStep.buttonText ?? (isLastStep ? "Selesai" : "Lanjut"));

  const handleCenterButton = () => {
    // --- Solusi Issue 2 (Bagian 2): Perpindahan halaman terjadi di sini ---
    if (currentStep.id === "tut-go-portfolio") {
      navigate("/portfolio");
    }

    if (isLastStep) {
      onEnd();
    } else {
      onNext();
    }
  };

  return (
    <>
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
            // --- Solusi Issue 6: Lebar dinamis responsif untuk mobile ---
            maxWidth: "calc(100vw - 32px)",
          }}
        >
          {tooltipPos.arrow && <TooltipArrow direction={tooltipPos.arrow} />}

          <div className="px-5 pt-5 pb-3">
            <span className="inline-block text-xs text-brand font-medium bg-brand/10 px-2 py-0.5 rounded-full mb-2">
              {currentFlow.icon} {currentFlow.title}
            </span>
            <h3 className="text-sm font-medium text-text-primary mb-1">
              {currentStep.title}
            </h3>
            <p
              className="text-sm text-text-muted leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentStep.description }}
            />
          </div>

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
              {(!hasTarget || hasButton) && !isChoiceStep && (
                <button
                  onClick={handleCenterButton}
                  className="flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-brand text-white hover:bg-brand-800 transition-all cursor-pointer"
                >
                  {centerButtonLabel}
                </button>
              )}
              {isChoiceStep && (
                <>
                  <button
                    onClick={() => handleSellChoice("skip")}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium border border-border-primary text-text-muted hover:text-text-primary hover:bg-background-secondary transition-all cursor-pointer"
                  >
                    Lewati
                  </button>
                  <button
                    onClick={() => handleSellChoice("sell")}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-error text-white hover:bg-error-600 transition-all cursor-pointer"
                  >
                    Jual Sekarang
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
