import apiClient from "@/lib/axios";
import supabase from "@/lib/supabase";
import type {
  LoginPayload,
  RegisterPayload,
  LoginResponse,
  RegisterResponse,
} from "../types/auth";

const authService = {
  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    try {
      const response = await apiClient.post<RegisterResponse>(
        "/users/register",
        payload,
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Gagal melakukan Registrasi",
      );
    }
  },

  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginResponse>(
        "/users/login",
        payload,
      );

      // simpan token ke local storaage
      if (response.data.data?.token) {
        localStorage.setItem("token", response.data.data.token);
        // Opsional: Simpan juga data user dasar jika diperlukan untuk UI cepat
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Email atau Password Salah",
      );
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  syncGoogleUser: async (session: any, user: any): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginResponse>(
        "/users/google-sync",
        { session, user },
      );

      if (response.data.data?.token) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Gagal sinkronisasi data Google",
      );
    }
  },

  loginWithGoogle: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      throw new Error("Gagal login dengan Google: " + error.message);
    }
  },
};

export default authService;
