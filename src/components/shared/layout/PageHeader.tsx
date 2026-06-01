// src/components/shared/layout/PageHeader.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LogOut, HelpCircle } from "lucide-react";
import { useAuth } from "@/features/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  showBackButton?: boolean;
  showTutorialButton?: boolean;
  onTutorialClick?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  action,
  showBackButton = false,
  showTutorialButton = false,
  onTutorialClick,
}) => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Sesi Berhasil Diakhiri", {
      description: "Anda telah berhasil keluar dari akun Anda. Sampai jumpa kembali di Stockation!",
    });
    setIsConfirmOpen(false);
    navigate("/login");
  };

  return (
    <header className="flex-shrink-0 w-full mb-0 px-4 sm:py-2 py-4 border-b border-border-primary bg-background-primary/80 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* Back Button */}
          {showBackButton && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-xl text-text-secondary hover:text-text-primary border-border-primary h-9 w-9 flex-shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}

          <div className="min-w-0">
            {title && (
              <h1 className="text-base sm:text-lg font-semibold text-text-primary tracking-tight truncate leading-tight">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-xs text-text-muted mt-0.5 truncate hidden sm:block">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {action && <div className="flex items-center">{action}</div>}

          {showTutorialButton && onTutorialClick && (
            <Button
              variant="outline"
              size="sm"
              onClick={onTutorialClick}
              className="text-xs gap-1.5 rounded-lg border-border-primary"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tur Halaman</span>
            </Button>
          )}

          {isAuthenticated && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsConfirmOpen(true)}
                className="rounded-lg text-text-secondary hover:text-red-500 hover:bg-red-500/10 h-9 w-9 flex-shrink-0 transition-all duration-200 animate-in fade-in zoom-in duration-300"
                title="Keluar dari Akun"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Dialog Konfirmasi Logout */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="max-w-xs sm:max-w-sm rounded-2xl bg-background-primary border border-border-primary shadow-2xl p-6 [&>button]:hidden">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Glowing Red Icon Container */}
            <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center text-error">
              <LogOut className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-1">
              <DialogTitle className="text-base font-medium text-text-primary">
                Keluar dari Akun?
              </DialogTitle>
              <DialogDescription className="text-sm text-text-muted">
                Apakah Anda yakin ingin keluar? Anda harus masuk kembali untuk mengakses portofolio Anda.
              </DialogDescription>
            </div>

            <DialogFooter className="w-full !flex !flex-row gap-2 pt-2 border-t-0 bg-transparent -mx-0 -mb-0 p-0">
              <Button
                variant="outline"
                onClick={() => setIsConfirmOpen(false)}
                className="flex-1 rounded-xl h-9 border-border-primary text-text-secondary hover:bg-background-secondary"
              >
                Batal
              </Button>
              <Button
                onClick={handleLogout}
                className="flex-1 rounded-xl h-9 bg-error hover:bg-error-900 text-white font-medium shadow-md transition-all duration-200"
              >
                Keluar
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default PageHeader;
