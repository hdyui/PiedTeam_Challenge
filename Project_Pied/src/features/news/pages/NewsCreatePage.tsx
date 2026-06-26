// src/features/news/pages/NewsCreatePage.tsx
import { NewsForm } from "../components/NewsForm";

export const NewsCreatePage = () => {
  const handleCreate = (data: any) => {
    console.log("Submit Create API:", data);
  };

  return (
    <div className="py-4 animate-in fade-in duration-300">
      <NewsForm onSubmit={handleCreate} />
    </div>
  );
};
