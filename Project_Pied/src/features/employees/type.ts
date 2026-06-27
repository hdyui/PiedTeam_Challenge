import type { AccountStatus, UserRole } from "@/shared/types";

export interface Employee {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: "Admin" | "Employee";
  avatarUrl?: string; // Có thể có hoặc không
  createdAt: string;
  updatedAt: string;
}

// Type dùng lúc tạo hoặc cập nhật nhân viên (có thể bỏ bớt id, ngày tạo...)
export type EmployeePayload = Omit<Employee, "id" | "createdAt" | "updatedAt">;
// hiển thị trong table
export interface Employee {
  accountId: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  departmentId: string | null;
  role: UserRole;
  status: AccountStatus;
  createdAt: string;
}

// create
export interface CreateEmployeePayload {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone?: string;
  departmentId?: string;
}

// update
export interface UpdateEmployeePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  departmentId?: string;
  status?: AccountStatus; // đóng mở account
}

// params đẩy lên url để filter/search tbl
export interface EmployeeQueryParams {
  pageIndex: number;
  pageSize: number;
  search?: string; // tìm theo tên hoặc email
  status?: AccountStatus;
  departmentId?: string;
  sortBy?: string;
  isDescending?: boolean;
}
