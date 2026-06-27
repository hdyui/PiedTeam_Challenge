// src/features/news/type.ts

export type NewsStatus = "draft" | "published" | "archived";

// ─── List item (từ GET /news) ───────────────────────────────────────────────
export interface NewsListItem {
  id: string;
  title: string;
  slug: string;
  coverImg: string | null;
  status: NewsStatus;
  author: {
    id: string;
    fullName: string;
  };
  createdAt: string;
  publishedAt: string | null;
}

// ─── Detail (từ GET /news/:id) ───────────────────────────────────────────────
export interface NewsImage {
  id: string;
  urlImage: string;
}

export interface NewsDetail extends NewsListItem {
  contentHtml: string;
  contentJson: object | null;
  images: NewsImage[];
  updatedAt: string;
}

// ─── Create payload (POST /news) ─────────────────────────────────────────────
export interface CreateNewsDto {
  title: string;
  coverImg?: string;
  contentHtml: string;
  contentJson?: object;
  status: NewsStatus;
  imageUrls?: string[];
}

// ─── Update payload (PUT /news/:id) ──────────────────────────────────────────
export interface UpdateNewsDto {
  title?: string;
  coverImg?: string;
  contentHtml?: string;
  contentJson?: object;
  status?: NewsStatus;
}

// ─── Query params (GET /news) ─────────────────────────────────────────────────
export interface NewsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: NewsStatus | "";
  authorId?: string;
  sortBy?: "createdAt" | "publishedAt" | "title";
  sortOrder?: "asc" | "desc";
}

// ─── Pagination wrapper ───────────────────────────────────────────────────────
export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationMeta;
}

// ─── API response shape ───────────────────────────────────────────────────────
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
