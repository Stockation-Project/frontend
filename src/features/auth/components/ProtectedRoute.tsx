// src/features/auth/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * Gerbang untuk route terproteksi.
 *
 * Menahan render sampai inisialisasi auth selesai (termasuk sinkronisasi
 * sesi Google/OAuth). Ini mencegah race condition di mana halaman dashboard
 * memanggil API sebelum token tersimpan — yang sebelumnya memicu 401 dan
 * menendang user kembali ke /login tepat setelah login Google.
 */
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();

  // Selama auth masih diinisialisasi, jangan render apa pun (dan jangan
  // redirect) agar sinkronisasi OAuth sempat menyelesaikan penyimpanan token.
  if (isInitializing) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background-primary">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
          <p className="text-sm text-text-muted">Memuat sesi Anda...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Simpan tujuan awal agar bisa kembali setelah login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
