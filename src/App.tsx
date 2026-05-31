// src/App.tsx
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// context
import { AuthProvider } from "@/features/auth";
import { TutorialProvider } from "@/features/interactive-tutorial";

// Pages
import LandingPage from "./pages/landing/LandingPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPages";
import QuestionnairePage from "./pages/questionnaire/QuestionnairePage";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPages from "./pages/dashboard/DashboardPages";
import StockDetailPage from "./pages/stock/StockDetailPage";
import SimulationBuyPage from "./pages/simulation/SimulationBuyPage";
import PortfolioDetailPage from "./pages/portfolio/PortfolioDetailPage";
import PortfolioStockDetailPage from "./pages/portfolio/PortfolioStockDetailPage";
import WalletPage from "./pages/wallet/WalletPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ExplorePage from "./pages/explore/ExplorePage";

// import component shadcn
import { Toaster } from "./components/ui/sonner";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <TutorialProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />

        {/* Rute Utama (Dengan Sidebar) */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPages />} />
          <Route path="/simulation" element={<SimulationBuyPage />} />
          <Route
            path="/stock/:ticker"
            element={<StockDetailPage />}
          />
          <Route
            path="/portfolio/:portfolioId/stocks/:ticker"
            element={<PortfolioStockDetailPage />}
          />
          <Route path="/portfolio" element={<PortfolioDetailPage />} />
          <Route path="/portfolio/:id" element={<PortfolioDetailPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route path="/" element={<LandingPage />} />
      </Routes>
    </AnimatePresence>
    </TutorialProvider>
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
