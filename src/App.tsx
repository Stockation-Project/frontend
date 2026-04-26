// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import halaman yang sudah kita buat
import RegisterPage from "./pages/auth/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute untuk halaman Register */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Opsional: Jika user mengakses path kosong ('/'), lempar ke /register untuk sementara */}
        <Route path="/" element={<Navigate to="/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
