// src/components/layout/BottomNav.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Search, Wallet, Briefcase, User } from "lucide-react";

const menuItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/explore", icon: Search, label: "Eksplorasi" },
  { path: "/wallet", icon: Wallet, label: "Dompet" },
  { path: "/portfolio", icon: Briefcase, label: "Portofolio" },
  { path: "/profile", icon: User, label: "Profil" },
];

const BottomNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-primary/80 backdrop-blur-md rounded-t-2xl border-t border-border-secondary flex items-center justify-between px-10 py-3 md:hidden shadow-lg">
      {menuItems.map((item) => {
        const isActive = location.pathname.includes(item.path);
        const Icon = item.icon;

        return (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center gap-1 transition-all active:scale-95"
          >
            <Icon
              className={`w-4.5 h-4.5 transition-colors duration-200 ${
                isActive ? "text-brand" : "text-text-muted hover:text-text-secondary"
              }`}
            />
            <span
              className={`text-[9px] transition-colors duration-200 ${
                isActive ? "text-brand font-medium" : "text-text-muted"
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