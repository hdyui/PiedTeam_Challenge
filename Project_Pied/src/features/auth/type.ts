import type { AccountStatus, UserRole } from "@/shared/types";

export interface AuthResponse {
  accessToken: string;
  // refreshToken: string;
  description?: {
    hasActiveSubscription: boolean;
    subscriptionStatus?: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}
// Bản đồ map với bảng User (Thông tin cá nhân)
export interface UserProfile {
  id: string; // UserId
  email: string;
  departmentId?: string | null;
  firstName: string;
  lastName: string;
  phone?: string | null;
  position?: string | null;
  avatarUrl?: string | null;
}

export interface UserDto {
  fullName: string;
  email: string;
  password: string;
}
