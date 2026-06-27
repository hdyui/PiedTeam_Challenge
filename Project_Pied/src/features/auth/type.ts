import type { AccountStatus, UserRole } from "@/shared/types";

export interface AuthResponse {
  value: {
    accessToken: string;
  };
  isSuccess: boolean;
  isFailed: boolean;
  error: unknown | null;
  traceId?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  Role: UserRole;
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
