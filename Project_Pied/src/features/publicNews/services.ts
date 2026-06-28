// src/features/public/services/index.ts
import apiClient from "@/lib/axios";
import type {
  ApiResponse,
  PaginatedResponse,
  PublicNewsDetail,
  PublicNewsItem,
  PublicNewsQueryParams,
  PublicRecruitmentDetail,
  PublicRecruitmentItem,
  PublicRecruitmentQueryParams,
} from "../publicNews/types";

export const publicApi = {
  // ─── GET /public/news ────────────────────────────────────────────────────────
  async getNewsList(
    params?: PublicNewsQueryParams,
  ): Promise<ApiResponse<PaginatedResponse<PublicNewsItem>>> {
    return apiClient.get("/public/news", {
      params,
    }) as unknown as Promise<ApiResponse<PaginatedResponse<PublicNewsItem>>>;
  },

  // ─── GET /public/news/:slug ──────────────────────────────────────────────────
  async getNewsBySlug(slug: string): Promise<ApiResponse<PublicNewsDetail>> {
    return apiClient.get(`/news/slug/${slug}`) as unknown as Promise<
      ApiResponse<PublicNewsDetail>
    >;
  },

  // ─── GET /public/recruitments ────────────────────────────────────────────────
  async getRecruitmentList(
    params?: PublicRecruitmentQueryParams,
  ): Promise<ApiResponse<PaginatedResponse<PublicRecruitmentItem>>> {
    return apiClient.get("/public/recruitments", {
      params,
    }) as unknown as Promise<
      ApiResponse<PaginatedResponse<PublicRecruitmentItem>>
    >;
  },

  // ─── GET /public/recruitments/:id ───────────────────────────────────────────
  async getRecruitmentById(
    id: string,
  ): Promise<ApiResponse<PublicRecruitmentDetail>> {
    return apiClient.get(`/public/recruitments/${id}`) as unknown as Promise<
      ApiResponse<PublicRecruitmentDetail>
    >;
  },
};
