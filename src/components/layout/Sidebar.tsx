import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Search, Wallet, Briefcase, User } from "lucide-react";
import Logo from "../shared/brand/Logo";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/explore", icon: Search, label: "Eksplorasi" },
    { path: "/wallet", icon: Wallet, label: "Dompet" },
    { path: "/portfolio", icon: Briefcase, label: "Portofolio" },
    { path: "/profile", icon: User, label: "Profil" },
  ];

  return (
    <aside className="hidden md:flex h-screen bg-background-primary border-r border-border-secondary flex flex-col items-center py-2 px-3 gap-16 sticky top-0 flex-shrink-0 z-50">
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
                    ? "bg-brand shadow-md shadow-brand/20"
                    : "bg-background-secondary hover:bg-border-secondary"
                  }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors duration-200 ${
                    isActive ? "text-text-inverse" : "text-text-muted hover:text-brand"
                  }`}
                />
              </Link>

              {/* Tooltip */}
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 flex items-center">
                <div className="w-2 h-2 bg-background-primary border-l border-b border-border-primary rotate-45 -mr-1 flex-shrink-0" />
                {/* Label */}
                <div className="bg-background-primary text-slate-800 text-xs font-medium px-3 py-1.5 rounded-lg border border-border-primary shadow-md whitespace-nowrap">
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