import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile, uploadUserAvatar } from "../services/profile.service";
import type { User } from "@/features/auth";
import type { ProfileUpdatePayload } from "../types/profile";
import { toast } from "sonner";
import { useAuth } from "@/features/auth";

export const useProfile = () => {
  const { login } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getUserProfile();
      setProfile(response.data);
    } catch (error: any) {
      toast.error("Gagal mengambil data profil");
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (payload: ProfileUpdatePayload) => {
    setIsUpdating(true);
    try {
      const response = await updateUserProfile(payload);
      setProfile(response.data);
      // Update local storage and context
      const token = localStorage.getItem("token") || "";
      login(response.data, token);
      
      toast.success("Profil berhasil diperbarui",{
        description: "Perubahan pada profil Anda telah berhasil disimpan.",
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Terjadi kesalahan saat memperbarui profil",{
        description: "Silakan coba lagi nanti.",
      });
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  const uploadAvatar = async (base64Image: string) => {
    setIsUploadingAvatar(true);
    try {
      const response = await uploadUserAvatar(base64Image);
      setProfile(response.data);
      // Update local storage and context
      const token = localStorage.getItem("token") || "";
      login(response.data, token);
      
      toast.success("Foto profil berhasil diperbarui", {
        description: "Foto profil Anda telah berhasil diperbarui.",
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal memperbarui foto profil", {
        description: "Silakan coba lagi nanti.",
      });
      throw error;
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    isLoading,
    isUpdating,
    isUploadingAvatar,
    updateProfile,
    uploadAvatar,
    refreshProfile: fetchProfile,
  };
};
