import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store";

export default function RequireAuth() {
  const token = useAuthStore((state) => !!state.accessToken);

  //const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage
  const location = useLocation(); // Lấy thông tin về vị trí hiện tại

  // Nếu không có token, chuyển hướng đến trang login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />; // Nếu có token, render các component con
  return <div>RequireAuth</div>;
}
