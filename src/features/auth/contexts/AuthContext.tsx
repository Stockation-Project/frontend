import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import supabase from "@/lib/supabase";
import authService from "../services/auth.service";
import type { User } from "../types/auth";
import type { Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  token: string | null;
  /** true selama proses inisialisasi auth (cek localStorage + sinkronisasi OAuth) */
  isInitializing: boolean;
  login: (userData: User, tokenData: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  // Cegah sinkronisasi ganda saat getSession & onAuthStateChange jalan bersamaan
  const syncingRef = useRef(false);

  // Sinkronkan sesi Supabase (hasil login Google) dengan backend kita.
  const syncSession = async (session: Session) => {
    // Jangan sync ulang jika sedang berjalan atau token backend sudah ada.
    if (syncingRef.current) return;
    if (localStorage.getItem("token")) return;
    // Jangan auto-sync jika user sudah berada di halaman login
    // (menandakan user sengaja logout/token expired)
    if (window.location.pathname === "/login") return;

    syncingRef.current = true;
    try {
      const response = await authService.syncGoogleUser(session, session.user);
      if (response.data) {
        // authService.syncGoogleUser sudah menyimpan token+user ke localStorage
        setToken(response.data.token);
        setUser(response.data.user);

        // Arahkan user baru ke kuesioner, atau ke dashboard jika masih di
        // halaman publik. Pakai window.location karena provider berada di
        // luar Router.
        const path = window.location.pathname;
        if (!response.data.user.risk_profile) {
          if (path !== "/questionnaire") {
            window.location.href = "/questionnaire";
          }
        } else if (path === "/" || path === "/login" || path === "/register") {
          window.location.href = "/dashboard";
        }
      }
    } catch (error) {
      console.error("Gagal sinkronisasi user Google:", error);
    } finally {
      syncingRef.current = false;
    }
  };

  useEffect(() => {
    let isMounted = true;

    // 1. Hydrasi cepat dari localStorage (user login email/password)
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    // 2. Resolusi sesi Supabase — menangani redirect balik dari OAuth Google.
    //    Ini yang menahan render route terproteksi sampai sinkronisasi selesai,
    //    sehingga tidak ada request 401 prematur yang menendang user ke login.
    const initialize = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user && !localStorage.getItem("token")) {
          await syncSession(session);
        }
      } catch (error) {
        console.error("Gagal inisialisasi auth:", error);
      } finally {
        if (isMounted) setIsInitializing(false);
      }
    };
    initialize();

    // 3. Listener perubahan auth real-time (mis. OAuth selesai setelah mount)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          await syncSession(session);
        } else if (event === "SIGNED_OUT") {
          authService.logout();
          setToken(null);
          setUser(null);
        }
      }
    );

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = (userData: User, tokenData: string) => {
    setUser(userData)
    setToken(tokenData)
    localStorage.setItem('token', tokenData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isInitializing, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// biar bisa di panggil component lain
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
};
