import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface BaseSideModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode; // Pastikan ejaannya benar: children
  actionText: string;
  onAction: () => void;
  isLoading?: boolean;
  isActionDisabled?: boolean;
}

const BaseSideModal: React.FC<BaseSideModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actionText,
  onAction,
  isLoading = false,
  isActionDisabled = false,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      {/* Mengatur lebar 50% layar (sm:max-w-[50vw]) dan muncul dari kanan */}
      <SheetContent
        side="right"
        className="!w-full sm:!w-[65vw] md:!w-[50vw] sm:!max-w-none p-0 flex flex-col bg-background-secondary"
      >
        {/* Header Reusable */}
        <SheetHeader className="px-4 py-3 border-b border-border-primary bg-background-primary flex flex-row items-center justify-between">
          <SheetTitle className="text-lg font-medium text-slate-900 m-0">
            {title}
          </SheetTitle>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-slate-100 transition-colors"
          >
            {/* <X className="w-4 h-4 text-slate-500" /> */}
          </button>
        </SheetHeader>

        {/* Konten Dinamis */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>

        {/* Footer Reusable */}
        <div className="px-4 py-3 border-t border-border-primary bg-background-primary flex flex-row gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 h-10 bg-transparent border border-slate-900 hover:bg-slate-50 active:bg-slate-100 text-slate-900 rounded-xl text-sm font-regular transition-all duration-200 cursor-pointer"
          >
            Tutup
          </Button>
          <Button
            onClick={onAction}
            disabled={isActionDisabled || isLoading}
            className="flex-1 h-10 bg-brand hover:bg-brand-950 active:bg-brand text-white rounded-xl text-sm font-regular shadow-lg shadow-brand/20 transition-all duration-200 cursor-pointer"
          >
            {isLoading ? "Memproses..." : actionText}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BaseSideModal;
