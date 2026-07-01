import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authApi } from "../services";
import { useAuthStore } from "../store";
import { queryClient } from "@/lib/queryClient";
import { jwtDecode } from "jwt-decode";
import type { AuthResponse, JwtPayload, LoginRequest } from "../type";

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  // Dùng để tạo, cập nhật hoặc xóa dữ liệu (POST, PUT, DELETE) lên server
  return useMutation({
    mutationFn: (userData: {
      fullName: string;
      email: string;
      password: string; //truyền vào dư ko cần định nghĩa cũng k lỗi
    }) => authApi.register(userData),

    onSuccess: () => {
      toast.success("Đăng ký thành công");
      const from = (location as any)?.from?.pathname || "/profile";
      navigate(from, { replace: true });
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại",
      );
      console.log(error.response?.data?.message);
    },

    onSettled: () => {
      //có thể dùng để reset form hoặc các thao tác cleanup khác
    },
  });
};

export const useLoginMutation = () => {
  const location = useLocation();

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/";

  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: (data) => authApi.login(data),
    onSuccess: (res) => {
      const decoded = jwtDecode<JwtPayload>(res.value.accessToken);
      console.log(decoded);
      setAuth({
        accessToken: res.value.accessToken,
        role: decoded.Role,
      });
      toast.success("Đăng nhập thành công");
      console.log(decoded.Role);
      if (decoded.Role === "Admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/employee");
      }
    },
  });
};
export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const clearTokens = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: () => {
      return authApi.logout();
    },

    onSuccess: () => {
      clearTokens();
      queryClient.removeQueries();

      // xóa 1 key thôi, vd khi update thì xóa key của 1 cái cũ thôi r add
      // queryClient.invalidateQueries({ queryKey: ["rituals"] });

      toast.success("Đăng xuất thành công");
      navigate("/login");
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          "Đăng xuất gặp sự cố, nhưng vẫn đăng xuất",
      );
      clearTokens();
      queryClient.removeQueries();
      console.log(error.response?.data?.message);
    },

    onSettled: () => {
      //có thể dùng để reset form hoặc các thao tác cleanup khác
    },
  });
};

export const useUser = () => {
  // Dùng để đọc/lấy dữ liệu (GET) từ server.
  return useQuery({
    //-----------------------------------
    //     1. QUERY KEY: BẮT BUỘC
    //-----------------------------------
    queryKey: ["me"], // id của cache
    // me: unique - id của cache để nhận dạng cache nào
    // data cùng key sẽ ghi đè lên nhau
    // là 1 cái mảng để: linh hoạt trong việc thêm key
    /**
     *  Query Key Concept:
     * - Key: = ID của Cache
     * - Cùng key = chung cache
     * - Khác key = khác cache
     */

    //-----------------------------------
    //     2. QUERY FUNCTION: BẮT BUỘC
    //-----------------------------------
    queryFn: authApi.getMe,

    /**
     * enabled: !!accessToken;
     *
     *
     */
  });
};
