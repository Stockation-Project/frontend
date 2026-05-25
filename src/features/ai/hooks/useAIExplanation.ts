import { useState, useCallback } from "react";
import { getAIExplanation } from "../services/ai.service";

export const useAIExplanation = () => {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExplanation = useCallback(async (term: string, context?: string) => {
    // Jika sudah ada penjelasan, tidak perlu fetch lagi
    if (explanation) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAIExplanation(term, context);
      setExplanation(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal mendapatkan penjelasan AI");
    } finally {
      setIsLoading(false);
    }
  }, [explanation]);

  return { explanation, isLoading, error, fetchExplanation };
};
