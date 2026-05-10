import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Logo from "@/components/shared/brand/Logo";
import ProgressBar from "@/components/questionnaire/ProgressBar";
import OptionCard from "@/components/questionnaire/OptionCard";
import { riskQuestions } from "@/data/questionnaire";
import { motion, AnimatePresence } from "framer-motion";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import ResultModal from "@/components/questionnaire/ResultModal"; // Import Modal

const QuestionnairePage: React.FC = () => {
  const {
    currentStep,
    currentQuestion,
    answers,
    direction,
    isLastStep,
    hasAnsweredCurrent,
    totalSteps,
    handleSelectOption,
    handleNext,
    handleBack,
    isSubmitting,
    showResultModal,
    resultData,
    handleFinishModal,
  } = useQuestionnaire();

  // Rumus pergerakan animasi dua arah
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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header dengan Logo */}
      <header className="px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-10 flex-shrink-0 h-fit">
        <Logo variant="color" showText={true} />
      </header>

      {/* Area Utama */}
      <main className="flex-1 flex flex-col items-center px-4 max-w-4xl mx-auto w-full">
        {/* Progress Bar (Ditambah 1 karena currentStep dimulai dari 0) */}
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
            custom={direction} // Mengirim state direction ke dalam variants
            variants={slideVariants} // Memanggil rumus yang kita buat di atas
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full flex flex-col gap-4 md:gap-8 items-center"
          >
            <div className="text-center w-full max-w-5xl">
              <h1 className="text-xl md:text-2xl font-regular text-slate-900 tracking-tight leading-tight">
                {currentQuestion.question}
              </h1>
              {currentQuestion.subtitle && (
                <p className="text-slate-500 text-xs md:text-sm">
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

      {/* Footer Navigasi Lengket di Bawah */}
      <footer className="py-4 bg-white border-t border-slate-200 sticky bottom-0 z-10 w-full">
        <div className="px-4 sm:px-8 md:px-16 lg:px-40 mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0} // Matikan jika di halaman pertama
            className="h-11 px-6 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>

          <Button
            onClick={handleNext}
            disabled={!hasAnsweredCurrent || isSubmitting} // Matikan jika belum memilih
            className="h-11 px-8 rounded-xl bg-green-700 hover:bg-green-800 text-white font-medium shadow-md transition-all"
          >
            {isLastStep
              ? isSubmitting
                ? "Memproses..."
                : "Selesai" // Ubah teks saat loading
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
