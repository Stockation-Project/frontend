// src/components/shared/layout/PageHeader.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  /** Tampilkan tombol kembali (ChevronLeft). Default: false */
  showBackButton?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  action,
  showBackButton = false,
}) => {
  const navigate = useNavigate();

  return (
    <header className="flex-shrink-0 w-full mb-0 px-4 py-2 border-b border-border-primary bg-background-primary">
      <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* Tombol Kembali — sejajar horizontal dengan judul */}
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

        {action && <div className="flex-shrink-0 flex items-center">{action}</div>}
      </div>
    </header>
  );
};

export default PageHeader;
