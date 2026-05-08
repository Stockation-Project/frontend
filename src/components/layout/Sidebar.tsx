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
    <aside className="w-20 md:w-24 h-screen bg-white border-r border-slate-100 flex flex-col items-center py-8 sticky top-0 flex-shrink-0 z-50">
      {/* Logo Stockation (Hanya ikonnya saja agar muat) */}
      <div className="mb-10">
        <Logo variant="color" className="flex flex-col text-sm" />
      </div>

      {/* Navigasi Menu */}
      <nav className="flex flex-col gap-6 w-full px-4">
        {menuItems.map((item) => {
          const isActive = location.pathname.includes(item.path);
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="group relative flex items-center justify-center w-full aspect-square rounded-2xl transition-all duration-200"
              title={item.label}
            >
              <div
                className={`absolute inset-0 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "bg-green-700 shadow-md shadow-green-700/20"
                    : "group-hover:bg-slate-50"
                }`}
              />
              <Icon
                className={`relative w-6 h-6 z-10 transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-slate-400 group-hover:text-green-700"
                }`}
              />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
