interface Role {
  name: string;
}

interface UserRole {
  role: Role;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  userRoles: UserRole[];
}

export interface ProfileResponse {
  success: boolean;
  code: number;
  data: UserProfile;
  message: string;
}
