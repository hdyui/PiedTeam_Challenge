// src/features/news/pages/NewsDetailPage.tsx
import { useParams, Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

export const NewsDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      {/* Nút Back & Action */}
      <div className="flex justify-between items-center">
        <Link
          to="/admin/news"
          className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-2"
        >
          &larr; Quay lại danh sách
        </Link>
        <Link to={`/admin/news/${id}/edit`}>
          <Button
            variant="outline"
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            Chỉnh sửa bài viết
          </Button>
        </Link>
      </div>

      {/* Nội dung bài viết */}
      <Card className="shadow-sm overflow-hidden border-gray-200">
        {/* Mock ảnh bìa */}
        <div className="w-full h-64 md:h-96 bg-gray-100 relative">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2070"
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        <CardContent className="p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Tiêu đề bài viết siêu to khổng lồ #{id}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
            <span>Đăng ngày: 15/10/2026</span>
            <span>•</span>
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
              Đã xuất bản
            </span>
          </div>

          {/* Render Rich Text an toàn */}
          {/* Cần cài: npm install -D @tailwindcss/typography để class prose hoạt động đẹp nhất */}
          <div
            className="prose prose-blue max-w-none text-gray-700 prose-headings:font-bold prose-img:rounded-xl"
            dangerouslySetInnerHTML={{
              __html:
                "<p>Nội dung chi tiết <strong>bài viết</strong> sẽ render HTML ở đây. Giao diện này sẽ tự động style các thẻ p, h1, h2, list cho bạn nhờ class prose.</p>",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};
