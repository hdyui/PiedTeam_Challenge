import { useAuthStore } from "@/features/auth/store";
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Nhớ config .env
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10s timeout
  withCredentials: true, // cho phép gửi nhận cookies từ server
});

// Interceptor để tự động thêm token vào header nếu có
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken; // Lấy token từ Zustand store/ useAuthStore.getState() thay thế cho hook
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    //phase 3 step 1: return date truc tiep
    //component se nhan duoc user thay vi data.user
    //tuy nhien, de linh hoat, to co the tra ve response.data, va component co the tu trich xuat data can thiet
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config; // dòng này là để lấy API A gọi bị lỗi 401
    const status = error.response.status;
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // !originalRequest._retry là chưa từng bị sai token,
      // nếu đã từng bị sai token rồi thì không retry nữa để tránh vòng lặp vô hạn
      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }
        //API này dùng để cookies để gửi RT
        //nến ta cần gửi credentials và không cần body
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}auth/refresh`,
          {},
          {
            withCredentials: true,
          },
        );
        console.log("Response từ refresh token:", response);
        const { accessToken } = response.data;
        console.log("Access token mới:", accessToken);
        useAuthStore.getState().setTokens(accessToken, refreshToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest); // retry lại API A với access token mới
      } catch (refreshError) {
        useAuthStore.getState().clearTokens();
        //window.location.href = "/login"; // hoặc navigate("/login") nếu bạn dùng React Router
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
export default apiClient;
