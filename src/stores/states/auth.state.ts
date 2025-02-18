export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface User {
  id: string;
  firstName: string;
  phone: string;
  email: string;
  roles: string[];
}

export interface AuthResponse {
  success: boolean;
  code: number;
  data: User;
  message: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string;
}
