import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Logo from "@/components/shared/Logo";
import ProgressBar from "@/components/questionnaire/ProgressBar";
import OptionCard from "@/components/questionnaire/OptionCard";
import { riskQuestions } from "@/data/questionnaire";
import { motion, AnimatePresence } from "framer-motion";

const QuestionnairePage: React.FC = () => {
  const navigate = useNavigate();

  // State untuk melacak urutan pertanyaan (dimulai dari 0)
  const [currentStep, setCurrentStep] = useState(0);

  // State untuk menyimpan jawaban { questionId: optionId }
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const [direction, setDirection] = useState(1);

  const currentQuestion = riskQuestions[currentStep];
  const isLastStep = currentStep === riskQuestions.length - 1;

  // Handler memilih opsi
  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  // Handler tombol Lanjut
  const handleNext = () => {
    if (isLastStep) {
      // TODO: Logika hitung total poin dan tembak API PUT Profile Risiko
      console.log("Kuesioner Selesai! Jawaban:", answers);
      alert("Selesai! Mengarahkan ke Dashboard...");
      navigate("/dashboard");
    } else {
      setDirection(1)
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Handler tombol Kembali
  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep((prev) => prev - 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50, // Jika maju, mulai dari kanan (+). Jika mundur, mulai dari kiri (-).
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50, // Jika mundur, buang ke kanan (+). Jika maju, buang ke kiri (-).
      opacity: 0,
    }),
  };

  // Validasi: Tombol 'Lanjut' hanya bisa diklik jika sudah memilih jawaban
  const hasAnsweredCurrent = !!answers[currentQuestion.id];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header dengan Logo */}
      <header className="py-3 px-5 sticky top-0 z-10 bg-white border-b border-slate-100 flex-shrink-0">
        <Logo variant="color" showText={true} />
      </header>

      {/* Area Utama */}
      <main className="flex-1 flex flex-col items-center px-4 py-2 max-w-4xl mx-auto w-full">
        {/* Progress Bar (Ditambah 1 karena currentStep dimulai dari 0) */}
        <div className="w-full mb-6 mt-4">
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
            className="w-full flex flex-col items-center"
          >
            <div className="text-center mb-6 w-full max-w-2xl">
              <h1 className="text-3xl md:text-2xl font-medium text-slate-900 tracking-tight mb-4 leading-tight">
                {currentQuestion.question}
              </h1>
              {currentQuestion.subtitle && (
                <p className="text-slate-500 text-lg">
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
      <footer className="py-6 px-4 sm:px-8 border-t border-slate-100 bg-white sticky bottom-0 z-10 w-full">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0} // Matikan jika di halaman pertama
            className="h-12 px-6 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>

          <Button
            onClick={handleNext}
            disabled={!hasAnsweredCurrent} // Matikan jika belum memilih
            className="h-12 px-8 rounded-xl bg-green-700 hover:bg-green-800 text-white font-medium shadow-md transition-all"
          >
            {isLastStep ? "Selesai" : "Lanjut"}
            {!isLastStep && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default QuestionnairePage;
