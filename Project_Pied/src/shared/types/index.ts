export type UserRole = "Admin" | "Employee";
export type AccountStatus = "Active" | "Inactive";

export interface RequireAuthProps {
  allowedRoles?: UserRole[];
}
