// src/components/shared/SectionHeader.tsx
import React from "react";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

/**
 * Komponen judul section yang konsisten digunakan di seluruh halaman.
 * Menghindari duplikasi class `text-base font-medium text-slate-600 mb-2`.
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, className = "" }) => {
  return (
    <h3 className={`text-base font-medium text-slate-600 mb-2 ${className}`}>
      {title}
    </h3>
  );
};

export default SectionHeader;
