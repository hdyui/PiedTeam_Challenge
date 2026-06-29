import apiClient from "@/lib/axios";
import type { ApiResponse, PaginatedResponse } from "@/shared/types/types";
import type {
  PublicRecruitmentDetail,
  PublicRecruitmentItem,
  PublicRecruitmentQueryParams,
} from "./type";

// ─── GET /public/recruitments ────────────────────────────────────────────────
export const publicApi = {
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
    return apiClient.get(`/recruitments/${id}`) as unknown as Promise<
      ApiResponse<PublicRecruitmentDetail>
    >;
  },
};
