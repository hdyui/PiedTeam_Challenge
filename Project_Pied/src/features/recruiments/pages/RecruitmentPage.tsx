import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useDeleteRecruitment,
  usePublicRecruitmentList,
} from "../hooks/useRecruitment";
import type { PublicRecruitmentQueryParams, RecruitmentLevel } from "../type";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useDebounce } from "@/shared/hooks/useDebounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  BriefcaseBusiness,
  Edit,
  Eye,
  SlidersHorizontal,
  Trash2,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";

const DEFAULT_LIMIT = 10;

const LEVEL_OPTIONS: { label: string; value: RecruitmentLevel | "all" }[] = [
  { label: "Tất cả cấp bậc", value: "all" },
  { label: "Intern", value: "Intern" },
  { label: "Fresher", value: "Fresher" },
  { label: "Junior", value: "Junior" },
  { label: "Middle", value: "Middle" },
  { label: "Senior", value: "Senior" },
];

const LEVEL_COLOR: Record<RecruitmentLevel, string> = {
  all: "bg-slate-100 text-slate-700 border-slate-200",
  Intern: "bg-slate-100 text-slate-700 border-slate-200",
  Fresher: "bg-green-100 text-green-700 border-green-200",
  Junior: "bg-blue-100 text-blue-700 border-blue-200",
  Middle: "bg-violet-100 text-violet-700 border-violet-200",
  Senior: "bg-amber-100 text-amber-700 border-amber-200",
};

const getStatusBadgeClass = (status?: string | null) => {
  const normalized = (status ?? "").toLowerCase();

  if (normalized.includes("open") || normalized.includes("active")) {
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }

  if (normalized.includes("draft") || normalized.includes("pending")) {
    return "bg-amber-100 text-amber-700 border-amber-200";
  }

  if (normalized.includes("close") || normalized.includes("inactive")) {
    return "bg-rose-100 text-rose-700 border-rose-200";
  }

  return "bg-slate-100 text-slate-700 border-slate-200";
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const parseLevel = (value: string | null): RecruitmentLevel | "all" => {
  const valid = LEVEL_OPTIONS.map((o) => o.value);
  return (valid as string[]).includes(value ?? "")
    ? (value as RecruitmentLevel | "all")
    : "all";
};

const parsePage = (value: string | null): number => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
};

const RecruitmentPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // ── State derived from URL (source of truth) ────────────────────────────────
  const page = parsePage(searchParams.get("page"));
  const level = parseLevel(searchParams.get("level"));
  const search = searchParams.get("search") ?? "";

  const params: PublicRecruitmentQueryParams = {
    page,
    limit: DEFAULT_LIMIT,
    search,
    level,
  };

  const { data, isLoading } = usePublicRecruitmentList(params);
  const { mutate: deleteRecruitment, isPending: isDeleting } =
    useDeleteRecruitment();

  const recruitments = data?.value?.items ?? [];
  const total = data?.value?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / DEFAULT_LIMIT));

  // ── Search input with live debounce, synced back to the URL ────────────────
  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput.trim(), 350);
  const isFirstRender = useRef(true);

  useEffect(() => {
    setSearchInput(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (debouncedSearch) next.set("search", debouncedSearch);
        else next.delete("search");
        next.set("page", "1");
        return next;
      },
      { replace: true },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleLevelChange = (value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value === "all") next.delete("level");
      else next.set("level", value);
      next.set("page", "1");
      return next;
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(newPage));
      return next;
    });
  };

  // ── Delete ───────────────────────────────────────────────────────────────────
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const pendingDeleteItem = recruitments.find(
    (item) => item.id === pendingDeleteId,
  );

  const handleConfirmDelete = () => {
    if (!pendingDeleteId) return;
    setDeleteError(null);
    deleteRecruitment(pendingDeleteId, {
      onSuccess: () => {
        setPendingDeleteId(null);
        // If we deleted the last item on a page beyond page 1, step back a page
        if (recruitments.length === 1 && page > 1) {
          handlePageChange(page - 1);
        }
      },
      onError: () => {
        setDeleteError("Xóa thất bại, vui lòng thử lại.");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-sm">
              <BriefcaseBusiness className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Tuyển dụng
              </h1>
              <p className="text-sm text-gray-500">
                Quản lý các vị trí đang mở ở các phòng ban
              </p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/admin/recruitments/create")}
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 w-40 h-9"
          >
            <Plus className="h-4 w-4" />
            Vị trí mới
          </Button>
        </div>

        {/* Filters */}
        <div className="grid gap-3 rounded-xl p-1 sm:grid-cols-[minmax(0,1fr)_260px] sm:items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Tìm kiếm theo tiêu đề hoặc phòng ban..."
                className="h-11 rounded-xl border-gray-200 bg-slate-50 pl-11 pr-4 text-sm shadow-sm transition focus:bg-white focus:border-blue-300"
              />
            </div>
            {searchInput ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setSearchInput("")}
                className="h-11 min-w-[104px] rounded-xl border-blue-200 bg-blue-50 px-4 text-blue-700 shadow-sm transition hover:bg-blue-100 hover:text-blue-800"
              >
                Xóa
              </Button>
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-slate-50 p-1.5 shadow-sm">
            <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-gray-600">
              <SlidersHorizontal className="size-4 text-gray-500" />
              Cấp bậc
            </div>
            <Select value={level} onValueChange={handleLevelChange}>
              <SelectTrigger className="h-11 w-[140px] rounded-xl border-gray-200 bg-white shadow-sm">
                <SelectValue placeholder="Tất cả cấp bậc" />
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

        {/* Table */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-gray-800">
                Danh sách vị trí
              </CardTitle>
              {!isLoading && (
                <CardDescription className="text-sm">
                  {total} kết quả
                </CardDescription>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/70 hover:bg-gray-50/70">
                  <TableHead className="w-10 text-center text-xs font-medium text-gray-500 pl-6">
                    #
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Tiêu đề
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Phòng ban
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Cấp bậc
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Ngày đăng
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Trạng thái
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 pl-13 text-left">
                    Thao tác
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <TableRow key={i} className="hover:bg-transparent">
                      <TableCell className="pl-6">
                        <Skeleton className="h-4 w-6" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-48" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-28" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell className="pr-6">
                        <Skeleton className="h-8 w-16 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : recruitments.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-40 text-center text-sm text-gray-400"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <BriefcaseBusiness className="h-8 w-8 text-gray-300" />
                        <span>Không tìm thấy vị trí nào</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  recruitments.map((item, idx) => {
                    const rowNumber = (page - 1) * DEFAULT_LIMIT + idx + 1;
                    return (
                      <TableRow
                        key={item.id}
                        className="cursor-pointer hover:bg-indigo-50/40 transition-colors"
                        onClick={() =>
                          navigate(`/admin/recruitments/${item.id}`)
                        }
                      >
                        <TableCell className="pl-6 text-center text-sm text-gray-400 font-mono">
                          {rowNumber}
                        </TableCell>
                        <TableCell className="font-medium text-gray-800">
                          {item.title}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {item.department.name}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex w-16 justify-center items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${LEVEL_COLOR[item.level]}`}
                          >
                            {item.level}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {format(new Date(item.createdAt), "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex w-16 justify-center items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(item.status)}`}
                          >
                            {item.status ?? "Không rõ"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div
                            className="flex justify-center gap-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 text-xs text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                              onClick={() =>
                                navigate(
                                  `/admin/recruitments/update/${item.id}`,
                                )
                              }
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 text-xs text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                              onClick={() =>
                                navigate(`/admin/recruitments/${item.id}`)
                              }
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 text-xs text-gray-600 hover:text-red-600 hover:bg-red-50"
                              onClick={() => setPendingDeleteId(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>

          {/* Pagination — always visible */}
          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-3">
            <p className="text-sm text-gray-500">
              Trang {page} / {totalPages}
            </p>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                className="h-8 w-8 p-0 border-gray-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
                className="h-8 w-8 p-0 border-gray-200"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!pendingDeleteId}
        onOpenChange={(open) => {
          if (!open) {
            setPendingDeleteId(null);
            setDeleteError(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa vị trí này?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này sẽ xóa vĩnh viễn{" "}
              <strong>&ldquo;{pendingDeleteItem?.title}&rdquo;</strong>. Thao
              tác này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteError && <p className="text-sm text-red-500">{deleteError}</p>}
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isDeleting}
              className="border-gray-200"
            >
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleConfirmDelete();
              }}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600 text-white gap-2"
            >
              {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
              Đồng ý xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RecruitmentPage;
