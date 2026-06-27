// src/features/news/pages/NewsListPage.tsx
import { Link } from "react-router-dom";
import { DataTable, type ColumnDef } from "@/shared/components/ui/DataTable";
import { UrlPagination } from "@/shared/components/ui/UrlPagination";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

// Mock data
const mockNews = [
  {
    id: 1,
    title: "Ra mắt tính năng mới cực xịn",
    status: "Published",
    createdAt: "2023-10-01",
  },
  {
    id: 2,
    title: "Bảo trì hệ thống máy chủ định kỳ",
    status: "Draft",
    createdAt: "2023-10-05",
  },
];

export const NewsListPage = () => {
  const columns: ColumnDef<any>[] = [
    { header: "ID", accessorKey: "id" },
    {
      header: "Tiêu đề",
      cell: (item) => (
        <span className="font-medium text-gray-800">{item.title}</span>
      ),
    },
    {
      header: "Trạng thái",
      cell: (item) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            item.status === "Published"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    { header: "Ngày tạo", accessorKey: "createdAt" },
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
            to={`/admin/news/${item.id}/edit`}
            className="text-sm text-orange-500 hover:text-orange-700 font-medium transition-colors"
          >
            Sửa
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
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

      {/* Table Section */}
      <Card className="shadow-sm border-gray-200">
        <CardContent className="p-0">
          <DataTable data={mockNews} columns={columns} />
        </CardContent>
      </Card>

      {/* Pagination */}
      <UrlPagination totalPages={5} />
    </div>
  );
};
