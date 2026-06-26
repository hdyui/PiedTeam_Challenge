// src/features/news/pages/NewsEditPage.tsx
import { useParams } from "react-router-dom";
import { NewsForm } from "../components/NewsForm";

export const NewsEditPage = () => {
  const { id } = useParams();

  const existingData = {
    title: `Bài viết đang sửa ID: ${id}`,
    coverImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2070",
    content: "<p>Nội dung cũ đang cần được cập nhật...</p>",
  };

  const handleUpdate = (data: any) => {
    console.log("Submit Update API:", data);
  };

  return (
    <div className="py-4 animate-in fade-in duration-300">
      <NewsForm initialData={existingData} onSubmit={handleUpdate} isEdit />
    </div>
  );
};
