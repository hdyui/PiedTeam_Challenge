import { useAuthStore } from "@/features/auth/store";
import { Navigate, Outlet } from "react-router-dom";

const RequireUnAuth = () => {
  const isAuthed = useAuthStore((state) => !!state.accessToken);
  const role = useAuthStore((state) => state.role);
  // const token = localStorage.getItem("accessToken");

  if (isAuthed) {
    // 1. Có token -> Đá về /home
    //return <Navigate to="/profile" replace />;
    return <Outlet />;
  }
};

export default RequireUnAuth;
