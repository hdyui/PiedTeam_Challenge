// src/features/news/components/NewsForm.tsx
import { useState } from "react";
import { RichTextEditor } from "@/shared/components/ui/RichTextEditor";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

interface NewsFormProps {
  initialData?: { title: string; coverImage: string; content: string };
  onSubmit: (data: any) => void;
  isEdit?: boolean;
}

export const NewsForm = ({
  initialData,
  onSubmit,
  isEdit = false,
}: NewsFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [content, setContent] = useState(initialData?.content || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, coverImage, content });
  };

  return (
    <Card className="max-w-5xl mx-auto shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-800">
          {isEdit ? "Cập nhật bài viết" : "Tạo bài viết mới"}
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Group: Tiêu đề */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-semibold text-gray-700"
            >
              Tiêu đề bài viết
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề ấn tượng..."
              className="focus-visible:ring-blue-500"
              required
            />
          </div>

          {/* Group: Ảnh bìa */}
          <div className="space-y-2">
            <Label
              htmlFor="coverImage"
              className="text-sm font-semibold text-gray-700"
            >
              URL Ảnh bìa (Cover Image)
            </Label>
            <Input
              id="coverImage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.png"
              className="focus-visible:ring-blue-500"
            />
            {coverImage && (
              <div className="mt-4 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="h-48 w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Group: Nội dung */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Nội dung bài viết
            </Label>
            <div className="border rounded-md overflow-hidden">
              <RichTextEditor value={content} onChange={setContent} />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-3 bg-gray-50/50 px-6 py-4 border-t">
          <Button variant="outline" type="button" className="w-24">
            Hủy
          </Button>
          <Button
            type="submit"
            className="w-40 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isEdit ? "Lưu thay đổi" : "Xuất bản ngay"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
