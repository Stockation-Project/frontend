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
  <aside className=" h-screen bg-white border-r border-slate-100 flex flex-col items-center py-2 px-3 gap-16 sticky top-0 flex-shrink-0 z-50">
    {/* Logo */}
    <div className="flex flex-col items-center gap-0.5 [&_span]:!text-[8px]">
      <Logo variant="color"  className="flex flex-col" />
    </div>

    {/* Navigasi Menu — dibungkus 1 container */}
    <nav className="flex flex-col gap-2  rounded-xl">
      {menuItems.map((item) => {
        const isActive = location.pathname.includes(item.path);
        const Icon = item.icon;

        return (
          <Link
            key={item.path}
            to={item.path}
            title={item.label}
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
        );
      })}
    </nav>
  </aside>
);
};

export default Sidebar;
