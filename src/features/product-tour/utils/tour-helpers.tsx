// src/features/product-tour/utils/tour-helpers.tsx
// Shared helpers for both ProductTour and InteractiveTutorial

import React from "react";
import type { Rect } from "../types";

// ============================================================
// Constants
// ============================================================

export const OVERLAY_Z = 9998;
export const TOOLTIP_Z = 9999;
export const TOOLTIP_WIDTH = 340;
export const TOOLTIP_GAP = 16;
export const CUTOUT_PADDING = 8;

// ============================================================
// Helpers
// ============================================================

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function getTargetRect(target: string): Rect | null {
  const el = document.querySelector(`[data-tour="${target}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

/** Scroll target ke viewport — instant, no animation */
export function scrollToTarget(target: string): void {
  const el = document.querySelector(`[data-tour="${target}"]`);
  if (!el) return;
  el.scrollIntoView({ behavior: "instant", block: "nearest" });
}

export function computeTooltipPosition(
  targetRect: Rect | null,
  position: "top" | "bottom" | "left" | "right" | "center" | undefined,
  estimatedHeight: number
): { top: number; left: number; arrow: "up" | "down" | "left" | "right" | null } {
  if (!targetRect || position === "center") {
    return {
      top: window.innerHeight / 2 - 130,
      left: window.innerWidth / 2 - TOOLTIP_WIDTH / 2,
      arrow: null,
    };
  }

  const pos = position ?? "bottom";
  let top = 0;
  let left = 0;
  let arrow: "up" | "down" | "left" | "right" | null = "down";

  switch (pos) {
    case "bottom":
      top = targetRect.top + targetRect.height + TOOLTIP_GAP;
      left = targetRect.left + targetRect.width / 2 - TOOLTIP_WIDTH / 2;
      arrow = "up";
      break;
    case "top":
      top = targetRect.top - estimatedHeight - TOOLTIP_GAP;
      left = targetRect.left + targetRect.width / 2 - TOOLTIP_WIDTH / 2;
      arrow = "down";
      break;
    case "left":
      top = targetRect.top + targetRect.height / 2 - 100;
      left = targetRect.left - TOOLTIP_WIDTH - TOOLTIP_GAP;
      arrow = "right";
      break;
    case "right":
      top = targetRect.top + targetRect.height / 2 - 100;
      left = targetRect.left + targetRect.width + TOOLTIP_GAP;
      arrow = "left";
      break;
  }

  // Smart flip
  if (arrow === "up" && top + estimatedHeight > window.innerHeight - 16) {
    top = targetRect.top - estimatedHeight - TOOLTIP_GAP;
    arrow = "down";
  } else if (arrow === "down" && top < 16) {
    top = targetRect.top + targetRect.height + TOOLTIP_GAP;
    arrow = "up";
  } else if (arrow === "left" && left < 16) {
    left = targetRect.left + targetRect.width + TOOLTIP_GAP;
    arrow = "right";
  } else if (arrow === "right" && left + TOOLTIP_WIDTH > window.innerWidth - 16) {
    left = targetRect.left - TOOLTIP_WIDTH - TOOLTIP_GAP;
    arrow = "left";
  }

  left = clamp(left, 16, window.innerWidth - TOOLTIP_WIDTH - 16);
  top = clamp(top, 16, window.innerHeight - estimatedHeight - 16);

  if (window.innerWidth < 640) {
    top = targetRect.top + targetRect.height + TOOLTIP_GAP;
    left = clamp(left, 8, window.innerWidth - TOOLTIP_WIDTH - 8);
    arrow = "up";
  }

  return { top, left, arrow };
}

// ============================================================
// Cutout Overlay
// ============================================================

export const CutoutOverlay: React.FC<{ highlightRect: Rect | null }> = ({ highlightRect }) => {
  if (!highlightRect) {
    return (
      <div
        className="fixed inset-0 bg-black/50"
        style={{ zIndex: OVERLAY_Z }}
      />
    );
  }

  const r = highlightRect;
  const spread = Math.max(window.innerWidth, window.innerHeight);

  return (
    <div
      className="fixed"
      style={{
        zIndex: OVERLAY_Z,
        top: r.top - CUTOUT_PADDING,
        left: r.left - CUTOUT_PADDING,
        width: r.width + CUTOUT_PADDING * 2,
        height: r.height + CUTOUT_PADDING * 2,
        border: "1.5px dashed rgba(54, 165, 20, 0.8)",
        borderRadius: 18,
        boxShadow: `0 0 0 ${spread}px rgba(0,0,0,0.5)`,
        pointerEvents: "none",
      }}
    />
  );
};

// ============================================================
// Step Dots
// ============================================================

export const StepDots: React.FC<{ total: number; current: number }> = ({ total, current }) => (
  <div className="flex items-center gap-1.5">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`rounded-full transition-all duration-300 ${
          i === current
            ? "w-2 h-2 bg-brand"
            : "w-1.5 h-1.5 bg-border-primary"
        }`}
      />
    ))}
  </div>
);

// ============================================================
// Tooltip Arrow
// ============================================================

export const TooltipArrow: React.FC<{ direction: "up" | "down" | "left" | "right" }> = ({
  direction,
}) => {
  if (direction === "up") {
    return (
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-background-primary" />
    );
  }
  if (direction === "down") {
    return (
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-background-primary" />
    );
  }
  if (direction === "left") {
    return (
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-background-primary" />
    );
  }
  if (direction === "right") {
    return (
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-background-primary" />
    );
  }
  return null;
};
