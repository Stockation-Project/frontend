// src/hooks/useQuestionnaire.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { riskQuestions } from "@/data/questionnaire";
import { questionnaireService } from "@/services/questionnaire.service"; // Import service baru
import type { RiskProfileKey } from "@/data/riskProfile";

export const useQuestionnaire = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [direction, setDirection] = useState(1);

  // State baru untuk efek loading saat submit API
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showResultModal, setShowResultModal] = useState(false);
  const [resultData, setResultData] = useState<{
    score: number;
    profile: RiskProfileKey;
  } | null>(null);

  const currentQuestion = riskQuestions[currentStep];
  const isLastStep = currentStep === riskQuestions.length - 1;
  const hasAnsweredCurrent = !!answers[currentQuestion.id];
  const totalSteps = riskQuestions.length;

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNext = async () => {
    if (isLastStep) {
      setIsSubmitting(true);
      try {
        // 1. Ekstrak array poin (number[]) dari state answers
        const pointsArray = riskQuestions.map((q) => {
          const selectedOptionId = answers[q.id];
          const selectedOption = q.options.find(
            (opt) => opt.id === selectedOptionId,
          );
          return selectedOption ? selectedOption.point : 0;
        });

        // 2. Tembak ke Backend
        const response = await questionnaireService.submit({
          answers: pointsArray,
        });

        // 3. Jika berhasil (Backend memberi profil dan modal 100jt), arahkan ke Dashboard
        if (response && response.success) {
          const scoreData = response.data.score;
          const profileData = response.data.user.risk_profile;
          setResultData({
            score: scoreData,
            profile: profileData as RiskProfileKey,
          });
          setShowResultModal(true);
        }
      } catch (error: any) {
        console.error("Gagal submit kuesioner:", error);
        alert(error.message || "Terjadi kesalahan saat mengirim data.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0 && !isSubmitting) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinishModal = () => {
    setShowResultModal(false);
    navigate("/dashboard");
  };

  return {
    currentStep,
    currentQuestion,
    answers,
    direction,
    isLastStep,
    hasAnsweredCurrent,
    totalSteps,
    isSubmitting, // Lempar status loading ke UI
    handleSelectOption,
    handleNext,
    handleBack,
    resultData,
    handleFinishModal,
    showResultModal,
  };
};
