export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  dob: string | null;
  gender: string | null;
  place_of_birth: string | null;
  occupation: string | null;
  address: string | null;
  risk_profile: string | null;
  created_at: string;
}
export interface RegisterResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

