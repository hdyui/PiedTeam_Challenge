// ─── Shared ──────────────────────────────────────────────────────────────────
export interface PaginationMeta {
  page: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiResponse<T> {
  value: T;
  isSuccess: boolean;
  isFailed: boolean;
  error: string | null;
  traceId: string;
}

// ─── News ─────────────────────────────────────────────────────────────────────
export interface PublicNewsItem {
  id: string;
  title: string;
  slug: string;
  coverImg: string | null;
  publishedAt: string;
}

export interface PublicNewsDetail {
  id: string;
  title: string;
  slug: string;
  coverImg: string | null;
  contentHtml: string;
  publishedAt: string;
}

export interface PublicNewsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

// ─── Recruitments ─────────────────────────────────────────────────────────────
export type RecruitmentLevel =
  | "Intern"
  | "Fresher"
  | "Junior"
  | "Middle"
  | "Senior";

export interface PublicRecruitmentItem {
  id: string;
  title: string;
  level: RecruitmentLevel;
  department: string;
  createdAt: string;
}

export interface PublicRecruitmentDetail {
  id: string;
  title: string;
  level: RecruitmentLevel;
  department: string;
  jobDescription: string;
  referenceInfo: string | null;
  createdAt: string;
}

export interface PublicRecruitmentQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  level?: RecruitmentLevel | "";
}
