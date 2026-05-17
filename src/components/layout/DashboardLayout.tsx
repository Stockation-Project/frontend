import Sidebar from "./Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background-primary">
      <Sidebar />

      {/* Area Konten Utama */}
      <main className="flex-1 p-4 overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;