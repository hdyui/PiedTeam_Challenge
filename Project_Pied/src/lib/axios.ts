import { useAuthStore } from "@/features/auth/store";
import axios from "axios";
import { env } from "./env";
import { toast } from "sonner";

const apiClient = axios.create({
  baseURL: env.API_URL, // Nhớ config .env, config biến môi trường
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 15_000, // 15s timeout
  // withCredentials: true, // gửi - nhận cookie nếu có (dùng cho auth)
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken; // lấy token từ auth store
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((p) => {
    if (token) p.resolve(token);
    else p.reject(error);
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => {
    return response.data?.value !== undefined
      ? response.data.value
      : response.data?.data !== undefined
        ? response.data.data
        : response.data;
  },
  async (error) => {
    const originalRequest = error.config; // lấy api trước đó đã gọi để có thể retry nếu cần

    const notAuthReqs = !originalRequest.url?.includes("/auth/");
    const is401 = error.response?.status === 401;
    const notRetriedYet = !originalRequest._retry;

    if (is401 && notAuthReqs && notRetriedYet) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }
      originalRequest._retry = true; // đứng đầu hàng đợi khi lỗi
      isRefreshing = true;

      try {
        // 1. Lấy refreshToken từ store
        const refreshToken = useAuthStore.getState().refreshToken;

        if (!refreshToken) {
          throw new Error("Không tìm thấy Refresh Token");
        }

        // 2. Gọi API xin token mới
        const res = await axios.post(
          `${env.API_URL}auth/refresh-token`,
          { refreshToken: refreshToken },
          { headers: { "Content-Type": "application/json" } },
        );

        // 3. Khai báo và lấy Access Token mới
        const newToken: string =
          res.data?.data?.accessToken ??
          res.data?.value?.accessToken ??
          res.data?.accessToken;

        // 4. Khai báo và lấy Refresh Token mới (Nếu BE ko trả về thì lấy lại cái cũ)
        const newRefreshToken: string =
          res.data?.data?.refreshToken ??
          res.data?.value?.refreshToken ??
          res.data?.refreshToken ??
          refreshToken;

        // 5. Cập nhật vào store (Lúc này newRefreshToken đã được khai báo ở trên nên gọi vô tư)
        useAuthStore.getState().setAuth({
          accessToken: newToken,
          refreshToken: newRefreshToken,
          role: useAuthStore.getState().role,
        });

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Nếu refresh cũng fail → Logout luôn
        processQueue(refreshError, null);
        useAuthStore.getState().clearAuth();
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại");
        window.location.href = "/login"; // Redirect cứng về login
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const message =
      error.response?.data?.message ?? error.message ?? "Đã có lỗi xảy ra";

    const isLogoutEndpoint = originalRequest.url?.includes("/auth/logout");

    if (!isLogoutEndpoint) {
      toast.error(message);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
