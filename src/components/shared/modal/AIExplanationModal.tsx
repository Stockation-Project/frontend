import React, { useEffect } from "react";
import BaseSideModal from "../layout/BaseSideModal";
import { Sparkles, Bot } from "lucide-react";
import { useAIExplanation } from "@/features/ai/hooks/useAIExplanation";

interface AIExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  term: string;
  context?: string;
  customStaticExplanation?: string;
}

const AIExplanationModal: React.FC<AIExplanationModalProps> = ({
  isOpen,
  onClose,
  term,
  context,
  customStaticExplanation,
}) => {
  const { explanation, isLoading, error, fetchExplanation } = useAIExplanation();
  const isStatic = !!customStaticExplanation;

  useEffect(() => {
    if (isOpen && term && !isStatic) {
      fetchExplanation(term, context);
    }
  }, [isOpen, term, context, isStatic, fetchExplanation]);

  return (
    <BaseSideModal
      isOpen={isOpen}
      onClose={onClose}
      title="Penjelasan AI"
      actionText="Mengerti"
      onAction={onClose}
      isActionDisabled={isLoading}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center">
            <Bot className="w-5 h-5 text-brand" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{term}</h3>
            <p className="text-xs text-text-muted">Dianalisis oleh Stockation AI</p>
          </div>
        </div>

        <div className="bg-background-primary rounded-xl p-5 border border-border-primary shadow-sm relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-brand-50 rounded-full blur-2xl opacity-60"></div>
          
          {isStatic ? (
            <div className="relative z-10">
              <p className="text-sm leading-relaxed text-text-primary text-justify">
                {customStaticExplanation}
              </p>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Sparkles className="w-8 h-8 text-brand animate-pulse" />
              <p className="text-sm font-medium text-text-secondary animate-pulse">
                AI sedang menyiapkan penjelasan...
              </p>
              <div className="w-full space-y-3 mt-4">
                <div className="h-2 bg-border-primary rounded w-full animate-pulse"></div>
                <div className="h-2 bg-border-primary rounded w-5/6 animate-pulse"></div>
                <div className="h-2 bg-border-primary rounded w-4/6 animate-pulse"></div>
              </div>
            </div>
          ) : error ? (
            <div className="py-4">
              <p className="text-sm text-error-500">{error}</p>
              <p className="text-xs text-text-muted mt-2">
                Silakan coba lagi beberapa saat.
              </p>
            </div>
          ) : (
            <div className="relative z-10">
              <p className="text-sm leading-relaxed text-text-primary text-justify">
                {explanation ? (
                  <span dangerouslySetInnerHTML={{ __html: explanation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ) : (
                  "Penjelasan tidak tersedia."
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </BaseSideModal>
  );
};

export default AIExplanationModal;
