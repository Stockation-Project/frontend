import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Search, Wallet, Briefcase, User } from "lucide-react";
import Logo from "../shared/brand/Logo";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/search", icon: Search, label: "Cari Saham" },
    { path: "/wallet", icon: Wallet, label: "Dompet" },
    { path: "/portfolio", icon: Briefcase, label: "Portofolio" },
    { path: "/profile", icon: User, label: "Profil" },
  ];

  return (
    <aside className="h-screen bg-white border-r border-slate-100 flex flex-col items-center py-2 px-3 gap-16 sticky top-0 flex-shrink-0 z-50">
      {/* Logo */}
      <div className="flex flex-col items-center gap-0.5 [&_span]:!text-[8px]">
        <Logo variant="color" className="flex flex-col" />
      </div>

      {/* Navigasi Menu */}
      <nav className="flex flex-col gap-2 rounded-xl">
        {menuItems.map((item) => {
          const isActive = location.pathname.includes(item.path);
          const Icon = item.icon;

          return (
            <div key={item.path} className="relative group">
              <Link
                to={item.path}
                className={`flex items-center justify-center p-3 rounded-lg transition-all duration-200
                  ${isActive
                    ? "bg-green-700 shadow-md shadow-green-700/20"
                    : "bg-slate-100 hover:bg-slate-200"
                  }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors duration-200 ${
                    isActive ? "text-white" : "text-slate-500 hover:text-green-700"
                  }`}
                />
              </Link>

              {/* Tooltip */}
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 flex items-center">
                {/* TAMBAH: panah segitiga */}
                <div className="w-2 h-2 bg-white border-l border-b border-slate-200 rotate-45 -mr-1 flex-shrink-0" />
                {/* Label */}
                <div className="bg-white text-slate-800 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 shadow-md whitespace-nowrap">
                  {item.label}
                </div>
              </div>

            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;