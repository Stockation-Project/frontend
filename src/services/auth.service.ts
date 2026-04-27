import apiClient from "./api";
import type {
  LoginPayload,
  RegisterPayload,
  LoginResponse,
  RegisterResponse,
} from "@/types/auth";

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
};

export default authService
