import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background-primary">
      <Sidebar />

      {/* Area Konten Utama - pb-20 di HP agar tidak tertutup navigasi melayang BottomNav */}
      <main className="flex-1 p-4 pb-20 md:pb-4 overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto w-full">
          <Outlet />
        </div>
      </main>

      {/* Navigasi Bawah khusus perangkat Mobile/HP */}
      <BottomNav />
    </div>
  );
};

export default DashboardLayout;