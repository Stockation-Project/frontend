import React from "react";

interface FeatureIconBoxProps {
  icon: React.ComponentType<{ className?: string }>;
}

const FeatureIconBox = ({ icon: Icon }: FeatureIconBoxProps) => (
  <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center overflow-hidden flex-shrink-0">
    <Icon className="w-5 h-5 text-brand stroke-[2]" />
  </div>
);

export default FeatureIconBox;