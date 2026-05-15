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
    <header className="mb-8">
      {/* Tombol Kembali — hanya tampil jika showBackButton=true */}
      {showBackButton && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate(-1)}
          className="mb-4 rounded-xl text-slate-600 hover:text-slate-900 border-border-primary h-10 w-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
      )}

      <div className="flex items-center justify-between">
        {title && (
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="text-sm text-slate-500 mt-1">{description}</p>
            )}
          </div>
        )}
        {action && <div>{action}</div>}
      </div>
    </header>
  );
};

export default PageHeader;
