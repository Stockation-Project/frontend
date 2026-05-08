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

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />

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
    </AuthProvider>
  );
}

export default App;
