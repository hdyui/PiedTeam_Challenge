import apiClient from "@/lib/axios";
import type { AccountListItem, AccountDetail } from "./type";
import type {} from "./schema";
import type { UpdateProfileRequest } from "../employees/type";
import type {
  CreateAccountFormValues,
  ResetPasswordFormValues,
  UpdateAccountFormValues,
} from "../employees/schema";

export const userApi = {
  // Lấy chi tiết user theo id (GET /users/{userId}) -> UserDetailResponse
  getUserById: async (userId: string): Promise<any> => {
    const res = await apiClient.get(`/users/${userId}`);
    return res;
  },

  async updateProfile(
    userId: string,
    data: UpdateProfileRequest,
  ): Promise<any> {
    return apiClient.put(`/users/${userId}`, data);
  },

  uploadFile: async (file: File, folder: string): Promise<any> => {
    const formData = new FormData();
    formData.append("File", file); // Bắt buộc viết hoa chữ F theo đúng Swagger của BE
    formData.append("Folder", folder); // Bắt buộc viết hoa chữ F

    const res = await apiClient.post("/auth/uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  },

  // Xoá tài khoản theo userId (employee tự xoá account của mình)
  // ⚠️ Nếu BE xoá theo accountId thì dùng accountApi.deleteAccount bên dưới.
  deleteUser: async (userId: string): Promise<any> => {
    const res = await apiClient.delete(`/users/${userId}`);
    return res; // 204 No Content
  },
};

export const accountApi = {
  // 1. Lấy danh sách Account (Có phân trang & search)
  getAccounts: async (params: {
    page?: number;
    pageSize?: number;
    search?: string;
    role?: string;
    status?: string;
  }) => {
    const res = await apiClient.get("/accounts", { params });
    return res;
  },

  // 2. Lấy chi tiết 1 Account
  getAccountById: async (accountId: string) => {
    const res = await apiClient.get(`/accounts/${accountId}`);
    return res as any;
  },

  // 3. Tạo mới Account (FormData + ép Header Multipart)
  createAccount: async (data: CreateAccountFormValues) => {
    const formData = new FormData();

    formData.append("Email", data.email);
    formData.append("Password", data.password);
    formData.append("Role", data.role);
    formData.append("Status", data.status);
    formData.append("FirstName", data.firstName);
    formData.append("LastName", data.lastName);
    formData.append("Position", data.position);
    formData.append("Phone", data.phone);

    if (data.address) formData.append("Address", data.address);
    if (data.hobby) formData.append("Hobby", data.hobby);
    if (data.quote) formData.append("Quote", data.quote);

    if (data.avatarImg?.[0]) formData.append("AvatarImg", data.avatarImg[0]);
    if (data.coverImg?.[0]) formData.append("CoverImg", data.coverImg[0]);

    const res = await apiClient.post("/accounts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res as any;
  },

  // 4. Cập nhật Account (JSON)
  updateAccount: async (accountId: string, data: UpdateAccountFormValues) => {
    const res = await apiClient.put(`/accounts/${accountId}`, data);
    return res as any;
  },

  // 5. Reset Mật khẩu (JSON)
  resetPassword: async (accountId: string, data: ResetPasswordFormValuess) => {
    const res = await apiClient.put(
      `/accounts/${accountId}/reset-password`,
      data,
    );
    return res as any;
  },

  // 6. Xoá (Soft Delete) Account theo accountId
  deleteAccount: async (accountId: string) => {
    const res = await apiClient.delete(`/accounts/${accountId}`);
    return res as any; // 204 No Content
  },
};
