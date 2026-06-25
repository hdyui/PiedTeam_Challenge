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
  departmentId?: string | null;
  firstName: string;
  lastName: string;
  phone?: string | null;
  position?: string | null;
  avatarUrl?: string | null;
}
// Cấu trúc trả về khi gọi API lấy thông tin người dùng đang đăng nhập (GetMe)
export interface GetMeResponse {
  accountId: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  profile: UserProfile;
}
