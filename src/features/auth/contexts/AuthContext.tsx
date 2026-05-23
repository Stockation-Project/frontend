import React, { createContext, useState, useContext, useEffect } from "react";
import supabase from "@/lib/supabase";
import authService from "../services/auth.service";
import type { User } from "../types/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
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

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          // Sinkronisasi data Google ke Backend
          try {
            const response = await authService.syncGoogleUser(session, session.user);
            if (response.data) {
              setToken(response.data.token);
              setUser(response.data.user);
              
              // Redirect otomatis setelah berhasil sync
              if (!response.data.user.risk_profile) {
                if (window.location.pathname !== "/questionnaire") {
                  window.location.href = "/questionnaire";
                }
              } else if (window.location.pathname === "/" || window.location.pathname === "/login" || window.location.pathname === "/register") {
                window.location.href = "/dashboard";
              }
            }
          } catch (error) {
            console.error("Gagal sinkronisasi user Google:", error);
          }
        } else if (event === "SIGNED_OUT") {
          // Handle sign out if triggered from Supabase
          authService.logout();
          setToken(null);
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = (userData: User, tokenData: string) => {
    setUser(userData)
    setToken(tokenData)
    localStorage.setItem('token', tokenData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated: !!token }}
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
