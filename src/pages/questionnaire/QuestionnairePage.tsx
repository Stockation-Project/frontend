import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Logo from "@/components/shared/brand/Logo";
import { useQuestionnaire, ProgressBar, OptionCard, riskQuestions, ResultModal } from "@/features/questionnaire";
import { motion, AnimatePresence } from "framer-motion";

const QuestionnairePage: React.FC = () => {
  const {
    currentStep,
    currentQuestion,
    answers,
    direction,
    isLastStep,
    hasAnsweredCurrent,
    handleSelectOption,
    handleNext,
    handleBack,
    isSubmitting,
    showResultModal,
    resultData,
    handleFinishModal,
  } = useQuestionnaire();

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
      {/* Header dengan Logo */}
      <header className="px-4 py-3 bg-background-primary border-b border-border-primary sticky top-0 z-10 flex-shrink-0 h-fit">
        <Logo variant="color" showText={true} />
      </header>

      {/* Area Utama */}
      <main className="flex-1 flex flex-col items-center px-4 max-w-4xl mx-auto w-full">
        <div className="w-full py-4">
          <ProgressBar
            currentStep={currentStep + 1}
            totalSteps={riskQuestions.length}
          />
        </div>

        {/* Pertanyaan */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            custom={direction} 
            variants={slideVariants} 
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full flex flex-col gap-4 md:gap-8 items-center"
          >
            <div className="text-center w-full max-w-5xl">
              <h1 className="text-xl md:text-2xl font-regular text-text-primary tracking-tight leading-tight">
                {currentQuestion.question}
              </h1>
              {currentQuestion.subtitle && (
                <p className="text-text-muted text-xs md:text-sm">
                  {currentQuestion.subtitle}
                </p>
              )}
            </div>

            {/* Pilihan Jawaban */}
            <div className="w-full max-w-2xl space-y-2.5 mb-6">
              {currentQuestion.options.map((opt, index) => (
                <OptionCard
                  key={opt.id}
                  index={index}
                  text={opt.text}
                  isSelected={answers[currentQuestion.id] === opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Navigasi*/}
      <footer className="py-4 bg-background-primary border-t border-border-primary sticky bottom-0 z-10 w-full">
        <div className="px-4 sm:px-8 md:px-16 lg:px-40 mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0} 
            className="h-11 px-6 rounded-xl border-border-primary text-text-secondary hover:bg-background-secondary font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>

          <Button
            onClick={handleNext}
            disabled={!hasAnsweredCurrent || isSubmitting}
            className="h-11 px-8 rounded-xl bg-brand hover:bg-brand-950 text-white font-medium shadow-md transition-all"
          >
            {isLastStep
              ? isSubmitting
                ? "Memproses..."
                : "Selesai"
              : "Lanjut"}
            {!isLastStep && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </footer>
      {resultData && (
        <ResultModal
          isOpen={showResultModal}
          score={resultData.score}
          profileKey={resultData.profile}
          onContinue={handleFinishModal}
        />
      )}
    </div>
  );
};

export default QuestionnairePage;
