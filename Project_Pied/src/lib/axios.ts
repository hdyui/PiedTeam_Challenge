import { useAuthStore } from "@/features/auth/store";
import axios from "axios";
import { toast } from "sonner";
import { env } from "./env";

const apiClient = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
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
    return response.data?.data !== undefined
      ? response.data.data
      : response.data;
  },

  async (error) => {
    const originalRequest = error.config;

    const notAuthReq = !originalRequest.url?.include("/auth/");
    const is401 = error.response?.status === 401;
    const notRetriedYet = !originalRequest._retry;
    {
      /*
  if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const response = await axios.post(
          `${env.API_URL}auth/refresh`,
          {},
          {
            withCredentials: true, // cho phep set cookies
          },
        );
        const newToken: string =
          response.data?.data?.accessToken ?? response.data?.accessToken;
        useAuthStore.getState().setTokens({
          accessToken: newToken,
          role: useAuthStore.getState().role,
        });

        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().clearTokens();
        toast.error("Phien dang nhap da het han, vui long dang nhap lai nhe!");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  */
    }
    if (is401 && notAuthReq && notRetriedYet) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const response = await axios.post(
          `${env.API_URL}auth/refresh`,
          {},
          {
            withCredentials: true, // cho phep set cookies
          },
        );
        const newToken: string =
          response.data?.data?.accessToken ?? response.data?.accessToken;
        useAuthStore.getState().setAuth({
          accessToken: newToken,
          role: useAuthStore.getState().role,
        });

        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().clearAuth();
        toast.error("Phien dang nhap da het han, vui long dang nhap lai nhe!");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    const message =
      error.repsonse?.data?.message ?? error.message ?? "Da co loi xay ra";
    const isLogoutEndpoint = originalRequest.url?.include("/auth/logout");
    if (!isLogoutEndpoint) {
      toast.error(message);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
