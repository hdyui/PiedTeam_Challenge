// src/features/news/components/NewsStatusBadge.tsx
import type { NewsStatus } from "../type";

const STATUS_CONFIG: Record<NewsStatus, { label: string; className: string }> =
  {
    published: {
      label: "Đã xuất bản",
      className: "bg-green-100 text-green-700",
    },
    draft: {
      label: "Nháp",
      className: "bg-gray-100 text-gray-600",
    },
    archived: {
      label: "Lưu trữ",
      className: "bg-yellow-100 text-yellow-700",
    },
  };

interface NewsStatusBadgeProps {
  status: NewsStatus;
}

export const NewsStatusBadge = ({ status }: NewsStatusBadgeProps) => {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.draft;
  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full ${config.className}`}
    >
      {config.label}
    </span>
  );
};
