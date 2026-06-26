import type { AccountStatus, UserRole } from "@/shared/types";

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
