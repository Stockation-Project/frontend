// src/components/shared/BottomNav.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Search, Wallet, Briefcase, User } from "lucide-react";

const menuItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/search", icon: Search, label: "Explore" },
  { path: "/wallet", icon: Wallet, label: "Dompet" },
  { path: "/portfolio", icon: Briefcase, label: "Portofolio" },
  { path: "/profile", icon: User, label: "Profil" },
];

const BottomNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-primary rounded-t-2xl border-t border-border-secondary flex items-center justify-between px-10 py-3 md:hidden">
      {menuItems.map((item) => {
        const isActive = location.pathname.includes(item.path);
        const Icon = item.icon;

        return (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center gap-1"
          >
            <Icon
              className={`w-4 h-4 transition-colors duration-200 ${
                isActive ? "text-brand" : "text-slate-400"
              }`}
            />
            <span
              className={`text-[8px] transition-colors duration-200 ${
                isActive ? "text-brand" : "text-slate-500"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;