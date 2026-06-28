// src/features/news/pages/NewsListPage.tsx
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DataTable, type ColumnDef } from "@/shared/components/ui/DataTable";
import { UrlPagination } from "@/shared/components/ui/UrlPagination";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useNewsList, useDeleteNews } from "../hooks/useNews";
import { NewsStatusBadge } from "../components/NewsStatusBadge";
import type { NewsListItem, NewsStatus } from "../type";
import { Trash2 } from "lucide-react";

const LIMIT = 10;

export const NewsListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState<NewsStatus | "all">("all");

  const { data, isLoading } = useNewsList({
    page,
    limit: LIMIT,
    search: search || undefined,
    status: status === "all" ? undefined : status,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { mutate: deleteNews } = useDeleteNews();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const handleStatusChange = (val: string) => {
    setStatus(val as NewsStatus | "all");
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      deleteNews(id);
    }
  };

  const columns: ColumnDef<NewsListItem>[] = [
    {
      header: "Ảnh bìa",
      cell: (item) =>
        item.coverImg ? (
          <img
            src={item.coverImg}
            alt={item.title}
            className="h-10 w-16 rounded object-cover border border-gray-100"
          />
        ) : (
          <div className="h-10 w-16 rounded bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
            No img
          </div>
        ),
    },
    {
      header: "Tiêu đề",
      cell: (item) => (
        <span className="font-medium text-gray-800 line-clamp-2">
          {item.title}
        </span>
      ),
    },
    {
      header: "Người đăng",
      cell: (item) => (
        <span className="text-sm text-gray-600">{item.author.fullName}</span>
      ),
    },
    {
      header: "Trạng thái",
      cell: (item) => <NewsStatusBadge status={item.status} />,
    },
    {
      header: "Ngày tạo",
      cell: (item) => (
        <span className="text-sm text-gray-500">
          {new Date(item.createdAt).toLocaleDateString("vi-VN")}
        </span>
      ),
    },
    {
      header: "Thao tác",
      cell: (item) => (
        <div className="flex gap-3 items-center">
          <Link
            to={`/admin/news/${item.id}`}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Xem
          </Link>
          <Link
            to={`/admin/news/update/${item.id}`}
            className="text-sm text-orange-500 hover:text-orange-700 font-medium transition-colors"
          >
            Sửa
          </Link>
          <button
            onClick={() => handleDelete(item.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="Xóa bài viết"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  const items = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Quản lý Tin tức
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Danh sách tất cả bài viết trên hệ thống
          </p>
        </div>
        <Link to="/admin/news/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            + Viết bài mới
          </Button>
        </Link>
      </div>

      {/* Bộ lọc */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Tìm kiếm theo tiêu đề..."
            className="max-w-sm"
          />
          <Button type="submit" variant="outline">
            Tìm
          </Button>
        </form>
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Tất cả trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="draft">Nháp</SelectItem>
            <SelectItem value="published">Đã xuất bản</SelectItem>
            <SelectItem value="archived">Lưu trữ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="shadow-sm border-gray-200">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="py-16 text-center text-gray-400">Đang tải...</div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              Chưa có bài viết nào.
            </div>
          ) : (
            <DataTable data={items} columns={columns} />
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {pagination && <UrlPagination totalPages={pagination.totalPages} />}
    </div>
  );
};
