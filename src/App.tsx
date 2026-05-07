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

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />
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
