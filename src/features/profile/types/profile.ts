import type { User } from "@/features/auth";

export interface ProfileUpdatePayload {
  first_name?: string;
  last_name?: string;
  avatar_url?: string | null;
  dob?: string | null;
  gender?: string | null;
  place_of_birth?: string | null;
  occupation?: string | null;
  address?: string | null;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: User;
}
