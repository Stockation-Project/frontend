import { Briefcase, LayoutDashboard, Search, User, Wallet } from "lucide-react";
import React from "react";
import { useLocation } from "react-router-dom";

const Sidebar = React.FC = () => {
  const location = useLocation();

  // daftar menu di navbar
  const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/search", icon: Search, label: "Cari Saham" },
    { path: "/wallet", icon: Wallet, label: "Dompet" },
    { path: "/portfolio", icon: Briefcase, label: "Portofolio" },
    { path: "/profile", icon: User, label: "Profil" },
  ];
}