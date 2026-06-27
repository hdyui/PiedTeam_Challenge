import type { AccountStatus, UserRole } from "@/shared/types";

// Dùng cho cả GET /users/{userId} và kết quả trả về của GET /auth/me (phần user)
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  position: string;
  phone: string;
  address: string | null;
  hobby: string | null;
  quote: string | null;
  avatarImg: string | null;
  coverImg: string | null;
  account: AccountDetail[];
  departments?: DepartmentBrief[]; // Lấy từ API detail user
}

export interface DepartmentBrief {
  id: string;
  name: string;
  departmentCode: string;
  joinedAt: string;
}

export interface AccountDetail {
  id: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
}

// Response đầy đủ cho GET /users/{userId}
export interface UserDetailResponse {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  position: string;
  phone: string;
  address: string | null;
  hobby: string | null;
  quote: string | null;
  avatarImg: string | null;
  coverImg: string | null;
  account: AccountDetail;
  departments: DepartmentBrief[];
  createdAt: string;
  updatedAt: string | null;
}

// Request Payload cho PUT /api/v1/users/{userId} (Update Profile)
export interface UpdateUserPayload {
  firstName: string;
  lastName: string;
  position: string;
  phone: string;
  address: string;
  hobby: string;
  quote: string;
  avatarImg: string;
  coverImg: string;
}
