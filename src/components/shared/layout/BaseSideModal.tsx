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
        className="w-full sm:w-[50vw] sm:max-w-none p-0 flex flex-col bg-slate-50"
      >
        {/* Header Reusable */}
        <SheetHeader className="px-6 py-4 border-b border-slate-200 bg-white flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-bold text-slate-800 m-0">
            {title}
          </SheetTitle>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </SheetHeader>

        {/* Konten Dinamis */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>

        {/* Footer Reusable */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white space-y-3">
          <Button
            onClick={onAction}
            disabled={isActionDisabled || isLoading}
            className="w-full bg-[#329B0D] hover:bg-green-800 text-white h-12 rounded-xl font-semibold"
          >
            {isLoading ? "Memproses..." : actionText}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="w-full h-12 rounded-xl text-slate-600 border-slate-300 hover:bg-slate-50 font-semibold"
          >
            Tutup
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BaseSideModal;
