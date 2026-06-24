import apiClient from "@/lib/axios";

// Define interface Frontend cần (CHUẨN HÓA)
interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
}

export const authApi = {
  //Login: Normalize result → accessToken/refreshToken
  async login(credentials: {
    email: string;
    password: string;
  }): Promise<AuthTokens> {
    const { data } = await apiClient.post("/auth/login", credentials);
    // Backend trả: { message, result: { access_token, refresh_token } }
    // Frontend nhận: { accessToken, refreshToken }
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  },
  async register(userData: {
    fullName: string;
    email: string;
    password: string;
  }) {
    const { data } = await apiClient.post("/auth/register", userData);
    return data;
  },
  async getMe(): Promise<User> {
    const { data } = await apiClient.get("/user/me");

    // Backend trả: { message, result: { user: {...} } }
    // Frontend nhận: User object trực tiếp
    return data;
  },
  async logout() {
    const { data } = await apiClient.post("/auth/logout");
    return data;
  },
};
