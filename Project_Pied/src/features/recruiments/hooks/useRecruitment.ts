import { useQuery } from "@tanstack/react-query";
import type { PublicRecruitmentQueryParams } from "../type";
import { publicApi } from "../services";
import { publicKeys } from "@/features/publicNews/hooks/usePublicNewsList";

// ─── GET /public/recruitments ─────────────────────────────────────────────────
export const usePublicRecruitmentList = (
  params?: PublicRecruitmentQueryParams,
) => {
  return useQuery({
    queryKey: publicKeys.recruitments.list(params ?? {}),
    queryFn: () => publicApi.getRecruitmentList(params),
  });
};

// ─── GET /public/recruitments/:id ────────────────────────────────────────────
export const usePublicRecruitmentDetail = (id: string) => {
  return useQuery({
    queryKey: publicKeys.recruitments.detail(id),
    queryFn: () => publicApi.getRecruitmentById(id),
    enabled: !!id,
  });
};
