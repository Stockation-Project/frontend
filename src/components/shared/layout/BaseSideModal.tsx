import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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
        className="!w-full sm:!w-[65vw] md:!w-[50vw] sm:!max-w-none p-0 flex flex-col bg-slate-50"
      >
        {/* Header Reusable */}
        <SheetHeader className="px-4 py-3 border-b border-slate-200 bg-white flex flex-row items-center justify-between">
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
        <div className="px-4 py-2 border-t border-slate-200 bg-white flex flex-col sm:flex-row-reverse gap-3">
          <Button
            onClick={onAction}
            disabled={isActionDisabled || isLoading}
            className="flex-1 min-w-0 bg-[#329B0D] hover:bg-green-800 text-white py-3 sm:py-5 rounded-xl font-medium"
          >
            {isLoading ? "Memproses..." : actionText}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 min-w-0 py-3 sm:py-5 rounded-xl text-slate-600 border-slate-300 hover:bg-slate-50 font-medium"
          >
            Tutup
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BaseSideModal;
