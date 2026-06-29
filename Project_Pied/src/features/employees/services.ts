import apiClient from "@/lib/axios";
import type { UpdateProfileRequest } from "./type";
import type { AccountListItem, AccountDetail } from "./type";
import type {
  CreateAccountFormValues,
  UpdateAccountFormValues,
  ResetPasswordFormValues,
} from "./schema";

export const userApi = {
  async updateProfile(
    userId: string,
    data: UpdateProfileRequest,
  ): Promise<any> {
    return apiClient.put(
      `/users/${userId}`,
      data, // 4. TRUYỀN DATA VÀO ĐÂY NỮA
    );
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
    console.log("Sự thật về biến res:", res);
    return res;
  },

  // src/features/accounts/services.ts
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
    // Tùy theo Interceptor bác cài, có thể là res.data hoặc res.value
    return res;
  },

  // 2. Lấy chi tiết 1 Account
  getAccountById: async (accountId: string) => {
    const res = await apiClient.get(`/accounts/${accountId}`);
    return res as any;
  },

  // 3. Tạo mới Account (Gửi FormData vì có kèm File ảnh)
  // 3. Tạo mới Account (Gửi BẰNG FORMDATA chuẩn Swagger)
  // 3. Tạo mới Account (Chốt hạ: FormData + Ép Header Multipart)
  createAccount: async (data: CreateAccountFormValues) => {
    const formData = new FormData();

    // Ép đúng chuẩn viết hoa chữ cái đầu (PascalCase) theo Swagger
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

    // ÉP BUỘC HEADER MULTIPART Ở ĐÂY! KHÔNG ĐỂ API CLIENT TỰ BIÊN TỰ DIỄN NỮA!
    const res = await apiClient.post("/accounts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res as any;
  },

  // 4. Cập nhật Account (Gửi JSON)
  updateAccount: async (accountId: string, data: UpdateAccountFormValues) => {
    const res = await apiClient.put(`/accounts/${accountId}`, data);
    return res as any;
  },

  // 5. Reset Mật khẩu (Gửi JSON)
  resetPassword: async (accountId: string, data: ResetPasswordFormValues) => {
    const res = await apiClient.put(
      `/accounts/${accountId}/reset-password`,
      data,
    );
    return res as any;
  },

  // 6. Xóa (Soft Delete) Account
  deleteAccount: async (accountId: string) => {
    const res = await apiClient.delete(`/accounts/${accountId}`);
    return res as any; // Trả về 204 No Content
  },
};
