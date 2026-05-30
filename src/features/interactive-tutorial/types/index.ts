// src/features/interactive-tutorial/types/index.ts

export type TutorialFlowId = "main-tutorial";

export interface TutorialFlowStep {
  id: string;
  title: string;
  description: string;
  /** Route halaman tempat step ini berjalan */
  page: string;
  /** data-tour target untuk highlight */
  target: string | null;
  /** data-tour target untuk click-to-advance (default: sama dengan target) */
  clickTarget?: string;
  /** Teks tombol aksi */
  buttonText?: string;
  /** Apakah klik tombol akan navigasi ke halaman lain */
  awaitNavigation?: boolean;
  /** Route tujuan jika awaitNavigation true */
  navigateTo?: string;
  /** Posisi tooltip */
  position?: "top" | "bottom" | "left" | "right" | "center";
  /** True = step terakhir, tampil "Selesai" */
  isLast?: boolean;
}

export interface TutorialFlow {
  id: TutorialFlowId;
  title: string;
  description: string;
  icon: string;
  steps: TutorialFlowStep[];
}

export interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}
