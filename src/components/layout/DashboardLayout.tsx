import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import React from "react";
import { Outlet } from "react-router-dom";
import {
  InteractiveTutorial,
  useTutorialContext,
} from "@/features/interactive-tutorial";

const DashboardLayout: React.FC = () => {
  const {
    isActive,
    currentFlow,
    currentStep,
    currentStepIndex,
    isLastStep,
    nextStep,
    endTutorial,
  } = useTutorialContext();

  return (
    <div className="flex h-screen bg-background-primary overflow-hidden">
      <Sidebar />

      <main className="flex-1 pb-20 md:pb-4 overflow-hidden h-full flex flex-col">
        <div className="max-w-[1400px] mx-auto w-full flex-1 flex flex-col overflow-hidden">
          <Outlet />
        </div>
      </main>

      <BottomNav />

      <InteractiveTutorial
        isActive={isActive}
        currentFlow={currentFlow}
        currentStep={currentStep}
        currentStepIndex={currentStepIndex}
        isLastStep={isLastStep}
        onNext={nextStep}
        onEnd={endTutorial}
      />
    </div>
  );
};

export default DashboardLayout;