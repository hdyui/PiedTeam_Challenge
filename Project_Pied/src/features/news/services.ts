// src/features/news/services.ts
import apiClient from "@/lib/axios";
import type {
  ApiResponse,
  CreateNewsDto,
  NewsDetail,
  NewsListItem,
  NewsQueryParams,
  PaginatedResponse,
  UpdateNewsDto,
} from "./type";

export const newsApi = {
  // ─── GET /news ──────────────────────────────────────────────────────────────
  async getList(
    params?: NewsQueryParams,
  ): Promise<ApiResponse<PaginatedResponse<NewsListItem>>> {
    return apiClient.get("/news", {
      params,
    }) as unknown as Promise<ApiResponse<PaginatedResponse<NewsListItem>>>;
  },

  // ─── GET /news/:id ───────────────────────────────────────────────────────────
  async getById(id: string): Promise<ApiResponse<NewsDetail>> {
    return apiClient.get(`/news/${id}`) as unknown as Promise<
      ApiResponse<NewsDetail>
    >;
  },

  // ─── POST /news ──────────────────────────────────────────────────────────────
  async create(
    dto: CreateNewsDto,
  ): Promise<
    ApiResponse<
      Pick<NewsDetail, "id" | "title" | "slug" | "status" | "createdAt">
    >
  > {
    return apiClient.post("/news", dto) as unknown as Promise<
      ApiResponse<
        Pick<NewsDetail, "id" | "title" | "slug" | "status" | "createdAt">
      >
    >;
  },

  // ─── PUT /news/:id ───────────────────────────────────────────────────────────
  async update(
    id: string,
    dto: UpdateNewsDto,
  ): Promise<
    ApiResponse<Pick<NewsDetail, "id" | "title" | "status" | "updatedAt">>
  > {
    return apiClient.put(`/news/${id}`, dto) as unknown as Promise<
      ApiResponse<Pick<NewsDetail, "id" | "title" | "status" | "updatedAt">>
    >;
  },

  // ─── DELETE /news/:id (Soft Delete) ──────────────────────────────────────────
  async remove(id: string): Promise<ApiResponse<null>> {
    return apiClient.delete(`/news/${id}`) as unknown as Promise<
      ApiResponse<null>
    >;
  },

  // ─── POST /news/:id/images ───────────────────────────────────────────────────
  async uploadImages(
    id: string,
    files: File[],
  ): Promise<
    ApiResponse<
      { id: string; newsId: string; urlImage: string; isActive: boolean }[]
    >
  > {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    return apiClient.post(`/news/${id}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }) as unknown as Promise<
      ApiResponse<
        { id: string; newsId: string; urlImage: string; isActive: boolean }[]
      >
    >;
  },

  // ─── DELETE /news/:newsId/images/:imageId ────────────────────────────────────
  async removeImage(
    newsId: string,
    imageId: string,
  ): Promise<ApiResponse<null>> {
    return apiClient.delete(
      `/news/${newsId}/images/${imageId}`,
    ) as unknown as Promise<ApiResponse<null>>;
  },
};
