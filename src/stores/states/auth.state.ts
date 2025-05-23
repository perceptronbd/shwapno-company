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
  branches: Array<{
    id: string;
    name: string;
  }>;
}

export interface AuthState {
  user: User | null;
  accessToken: string;
  selectedBranchId: string;
}
