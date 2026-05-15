import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../services/profile.service";
import type { User } from "@/types/auth";
import type { ProfileUpdatePayload } from "../types/profile";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export const useProfile = () => {
  const { login } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

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
      
      toast.success("Profil berhasil diperbarui");
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal memperbarui profil");
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    isLoading,
    isUpdating,
    updateProfile,
    refreshProfile: fetchProfile,
  };
};
