import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav"; {/* TAMBAH: import BottomNav */}
import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <div className="hidden md:block"> {/* TAMBAH: sembunyikan sidebar di mobile */}
        <Sidebar />
      </div>

      {/* Area Konten Utama */}
      <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-x-hidden pb-20 md:pb-10"> {/* TAMBAH: pb-20 biar konten tidak ketutup BottomNav */}
        <div className="max-w-[1400px] mx-auto w-full">
          <Outlet />
        </div>
      </main>

      <BottomNav /> {/* TAMBAH: BottomNav untuk mobile */}
    </div>
  );
};

export default DashboardLayout;