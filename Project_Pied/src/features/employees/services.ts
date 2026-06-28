import apiClient from "@/lib/axios";
import type { UpdateProfileRequest } from "./type";

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
};
