import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-background-primary overflow-hidden">
      <Sidebar />

      <main className="flex-1 pb-20 md:pb-4 overflow-hidden h-full flex flex-col">
        <div className="max-w-[1400px] mx-auto w-full flex-1 flex flex-col overflow-hidden">
          <Outlet />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default DashboardLayout;