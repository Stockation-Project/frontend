import axios from "axios";
import supabase from "@/lib/supabase";

// buat base url pake axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn(
        "Token expired atau tidak valid. Mengarahkan ke halaman login...",
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Hapus juga sesi Supabase agar tidak terjadi auto-login
      // saat AuthContext mount ulang di halaman login
      supabase.auth.signOut();

      // Hindari redirect-loop: jangan paksa pindah jika sudah berada di
      // halaman publik (login/register/landing). Ini juga mencegah user
      // tertendang keluar di tengah proses sinkronisasi OAuth Google.
      const publicPaths = ["/login", "/register", "/"];
      if (!publicPaths.includes(window.location.pathname)) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
