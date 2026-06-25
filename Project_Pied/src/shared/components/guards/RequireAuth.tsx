import { useAuthStore } from "@/features/auth/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  // const token = localStorage.getItem("accessToken");
  const setTokens = useAuthStore((state) => state.setAuth);

  const location = useLocation();

  if (!setTokens) {
    // 1. Không có token -> Đá về /login
    // 2. from là nơi người dùng đang cố gắng truy cập trước khi bị redirect về login
    // from sẽ được lưu trong state của location để sau khi người dùng đăng nhập
    // thành công, có thể redirect lại đúng trang mà họ muốn truy cập ban đầu
    // 3. replace: true để thay thế lịch sử trình duyệt, tránh người dùng nhấn
    // nút "Quay lại" và bị redirect lại vào trang yêu cầu xác thực
    // replace: đè lịch sử, state: lưu địa chỉ cũ để quay lại sau
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Có token -> Cho đi tiếp vào các tầng bên trong
  return <Outlet />;
};

export default RequireAuth;
