import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePublicRecruitmentList } from "../hooks/useRecruitment";
import type { PublicRecruitmentQueryParams, RecruitmentLevel } from "../type";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  BriefcaseBusiness,
  Building2,
  ChevronLeft,
  ChevronRight,
  Search,
  TrendingUp,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";

// ─── Constants ────────────────────────────────────────────────────────────────

const LEVEL_OPTIONS: { label: string; value: RecruitmentLevel | "all" }[] = [
  { label: "All levels", value: "all" },
  { label: "Intern", value: "Intern" },
  { label: "Fresher", value: "Fresher" },
  { label: "Junior", value: "Junior" },
  { label: "Middle", value: "Middle" },
  { label: "Senior", value: "Senior" },
];

const LEVEL_COLOR: Record<RecruitmentLevel, string> = {
  all: "bg-slate-100 text-slate-700 border-slate-200",
  Intern: "bg-slate-100 text-slate-700 border-slate-200",
  Fresher: "bg-green-50 text-green-700 border-green-200",
  Junior: "bg-blue-50 text-blue-700 border-blue-200",
  Middle: "bg-violet-50 text-violet-700 border-violet-200",
  Senior: "bg-amber-50 text-amber-700 border-amber-200",
};

// ─── Skeleton card ────────────────────────────────────────────────────────────

const RecruitmentCardSkeleton = () => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
    <div className="flex items-start justify-between gap-4">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-5 w-16 rounded-full" />
    </div>
    <div className="flex items-center gap-4">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-4 w-20" />
    </div>
    <Skeleton className="h-9 w-28 rounded-lg" />
  </div>
);

// ─── Recruitment card ─────────────────────────────────────────────────────────

interface RecruitmentCardProps {
  id: string;
  title: string;
  departmentName: string;
  level: RecruitmentLevel;
  createdAt: string;
  onClick: () => void;
}

const RecruitmentCard = ({
  title,
  departmentName,
  level,
  createdAt,
  onClick,
}: RecruitmentCardProps) => (
  <article
    onClick={onClick}
    className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all duration-200 space-y-4"
  >
    {/* Title + level badge */}
    <div className="flex items-start justify-between gap-3">
      <h2 className="text-base font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors leading-snug line-clamp-2">
        {title}
      </h2>
      <span
        className={`shrink-0 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${LEVEL_COLOR[level]}`}
      >
        {level}
      </span>
    </div>

    {/* Meta */}
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-gray-500">
      <span className="flex items-center gap-1.5">
        <Building2 className="h-3.5 w-3.5 text-gray-400" />
        {departmentName}
      </span>
      <span className="flex items-center gap-1.5">
        <CalendarDays className="h-3.5 w-3.5 text-gray-400" />
        {format(new Date(createdAt), "MMM d, yyyy")}
      </span>
    </div>

    {/* CTA */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors"
    >
      View Details
      <ArrowRight className="h-3.5 w-3.5" />
    </button>
  </article>
);

// ─── Main page ─────────────────────────────────────────────────────────────────

const PublicRecruitmentPage = () => {
  const navigate = useNavigate();

  const [params, setParams] = useState<PublicRecruitmentQueryParams>({
    page: 1,
    limit: 9,
    search: "",
    level: "all",
  });
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = usePublicRecruitmentList(params);

  const recruitments = data?.value?.items ?? [];
  const total = data?.value?.totalCount ?? 0;
  const totalPages = Math.ceil(total / (params.limit ?? 9));

  const handleSearch = () => {
    setParams((prev) => ({ ...prev, search: searchInput, page: 1 }));
  };

  const handleLevelChange = (value: string) => {
    setParams((prev) => ({
      ...prev,
      level: value as RecruitmentLevel | "all",
      page: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/60 via-white to-white">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-medium text-indigo-700">
            <BriefcaseBusiness className="h-3.5 w-3.5" />
            We're hiring!
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Join our team
          </h1>
          <p className="mx-auto max-w-xl text-base text-gray-500 leading-relaxed">
            Explore open positions across all departments. Find the role that
            fits your skills and grow with us.
          </p>

          {/* Inline search bar */}
          <div className="mx-auto mt-6 flex max-w-lg gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search positions..."
                className="pl-9 h-11 border-gray-200 rounded-xl focus-visible:ring-indigo-500"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              onClick={handleSearch}
              className="h-11 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700"
            >
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-5xl px-4 py-10 space-y-8">
        {/* Filters + count row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            {isLoading ? (
              <Skeleton className="h-4 w-28" />
            ) : (
              <>
                <span className="font-semibold text-gray-900">{total}</span>{" "}
                position{total !== 1 ? "s" : ""} available
              </>
            )}
          </p>

          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gray-400 shrink-0" />
            <Select
              value={params.level ?? "all"}
              onValueChange={handleLevelChange}
            >
              <SelectTrigger className="w-40 border-gray-200 rounded-xl">
                <SelectValue placeholder="All levels" />
              </SelectTrigger>
              <SelectContent>
                {LEVEL_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cards grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <RecruitmentCardSkeleton key={i} />
            ))}
          </div>
        ) : recruitments.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-24 space-y-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
              <BriefcaseBusiness className="h-6 w-6 text-gray-300" />
            </div>
            <p className="text-base font-medium text-gray-700">
              No positions found
            </p>
            <p className="text-sm text-gray-400">
              Try adjusting your search or filter.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 border-gray-200"
              onClick={() => {
                setSearchInput("");
                setParams({ page: 1, limit: 9, search: "", level: "all" });
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recruitments.map((item) => (
              <RecruitmentCard
                key={item.id}
                id={item.id}
                title={item.title}
                departmentName={item.department.name}
                level={item.level}
                createdAt={item.createdAt}
                onClick={() => navigate(`/recruitments/${item.id}`)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange((params.page ?? 1) - 1)}
              disabled={(params.page ?? 1) <= 1}
              className="h-9 w-9 p-0 border-gray-200 rounded-xl"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              const isActive = page === (params.page ?? 1);
              return (
                <Button
                  key={page}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className={`h-9 w-9 p-0 rounded-xl text-sm font-medium ${
                    isActive
                      ? "bg-indigo-600 hover:bg-indigo-700 border-indigo-600"
                      : "border-gray-200 text-gray-600 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  {page}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange((params.page ?? 1) + 1)}
              disabled={(params.page ?? 1) >= totalPages}
              className="h-9 w-9 p-0 border-gray-200 rounded-xl"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PublicRecruitmentPage;
