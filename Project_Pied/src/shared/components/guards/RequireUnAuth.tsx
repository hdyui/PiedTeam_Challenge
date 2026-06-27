import { useAuthStore } from "@/features/auth/store";
import type { UserRole } from "@/shared/types";
import { Navigate, Outlet } from "react-router-dom";
const RequireUnAuth = () => {
  const isAuthed = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.role) as UserRole | null;
  if (isAuthed) {
    // xác thực xong thì phân quyền cho admin và employee đi đúng hướng
    if (role === "Admin") return <Navigate to="/admin" replace />;
    if (role === "Employee") return <Navigate to="/employee" replace />;
    // 1. Có token -> Đá về /home
    //return <Navigate to="/profile" replace />;
  }
  return <Outlet />;
};

export default RequireUnAuth;
