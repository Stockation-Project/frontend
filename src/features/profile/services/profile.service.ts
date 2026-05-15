import apiClient from "@/lib/axios";
import type { ProfileResponse, ProfileUpdatePayload } from "../types/profile";

export const getUserProfile = async (): Promise<ProfileResponse> => {
  const response = await apiClient.get("/users/profile");
  return response.data;
};

export const updateUserProfile = async (
  payload: ProfileUpdatePayload
): Promise<ProfileResponse> => {
  const response = await apiClient.put("/users/profile", payload);
  return response.data;
};
