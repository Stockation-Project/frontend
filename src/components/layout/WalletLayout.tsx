import Sidebar from "./Sidebar";
import React from "react";

interface WalletLayoutProps {
  children: React.ReactNode;
}

const WalletLayout: React.FC<WalletLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default WalletLayout;
