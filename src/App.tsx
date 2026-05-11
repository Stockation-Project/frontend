// src/App.tsx
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// context
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPages";
import QuestionnairePage from "./pages/questionnaire/QuestionnairePage";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPages from "./pages/dashboard/DashboardPages";
import StockDetailPage from "./pages/stock/StockDetailPage";

// import component shadcn
import { Toaster } from "./components/ui/sonner";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />
        <Route path="/dashboard/stock/:ticker" element={<StockDetailPage />} />

        {/* Rute Utama (Dengan Sidebar) */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPages />} />
          {/* Nanti Anda bisa tambahkan rute lain di sini: */}
          {/* <Route path="/wallet" element={<WalletPage />} /> */}
        </Route>

        <Route path="/" element={<Navigate to="/register" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
      {/* Mobile: atas tengah */}
      <Toaster position="top-center" className="sm:hidden" />

      {/* Desktop: bawah kiri */}
      <Toaster position="bottom-left" className="hidden sm:block"/>
    </AuthProvider>
  );
}

export default App;
