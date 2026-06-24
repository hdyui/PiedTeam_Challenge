import { authApi } from "@/features/auth/services";
import { useAuthStore } from "@/features/auth/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      authApi.login(data),

    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);

      toast.success("Chào mừng bạn quay trở lại!");
      //const from = (location.state as any)?.form?.pathname || "/profile";
      navigate("/profile", { replace: true });
    },

    onError: (error: any) => {
      // Lấy message lỗi từ API trả về hoặc dùng mặc định
      const message = error.response?.data?.message || "Đăng nhập thất bại";
      toast.error(message);
    },
  });
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userData: {
      fullName: string;
      email: string;
      password: string;
      comfirmPassword: string;
    }) => authApi.register(userData),

    onSuccess: () => {
      toast.success("Đăng ký thành công", {
        description: "vui lòng đăng nhập để tiếp tục.",
      });

      navigate("/login");
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại",
      );
    },

    onSettled: () => {
      // có thể dùng để reset form hoặc thao tác cleanup
    },
  });
};

export const useLogoutMutation = () => {
  const clearTokens = useAuthStore((state) => state.clearTokens);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return authApi.logout();
    },

    onSuccess: () => {
      clearTokens();
      queryClient.removeQueries();

      queryClient.invalidateQueries();
      toast.success("Đăng xuất thành công");
      navigate("/");
    },

    onError: () => {
      clearTokens();
      //queryClien.removeQueries();
      toast.error("Đăng xuất thành công");
    },
  });
};
