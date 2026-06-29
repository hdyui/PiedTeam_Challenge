import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePublicRecruitmentList } from "../hooks/useRecruitment";
import type { PublicRecruitmentQueryParams, RecruitmentLevel } from "../type";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
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
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  BriefcaseBusiness,
} from "lucide-react";
import { format } from "date-fns";

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

const RecruitmentPage = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<PublicRecruitmentQueryParams>({
    page: 1,
    limit: 10,
    search: "",
    level: "all",
  });
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = usePublicRecruitmentList(params);

  const recruitments = data?.value.items ?? [];
  const total = data?.value?.totalCount ?? 0;
  const totalPages = Math.ceil(total / (params.limit ?? 10));

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
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-sm">
              <BriefcaseBusiness className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Recruitment
              </h1>
              <p className="text-sm text-gray-500">
                Manage open positions across departments
              </p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/admin/recruitments/create")}
            className="gap-2 bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            New Position
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="pt-4 pb-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by title or department..."
                  className="pl-9 border-gray-200 focus-visible:ring-indigo-500"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Select
                value={params.level ?? ""}
                onValueChange={handleLevelChange}
              >
                <SelectTrigger className="w-full sm:w-44 border-gray-200">
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
              <Button
                variant="outline"
                onClick={handleSearch}
                className="border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200"
              >
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-gray-800">
                Positions
              </CardTitle>
              {!isLoading && (
                <CardDescription className="text-sm">
                  {total} result{total !== 1 ? "s" : ""}
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
                    Title
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Department
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Level
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Posted
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 pr-6 text-right">
                    Actions
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
                      <TableCell className="pr-6">
                        <Skeleton className="h-8 w-16 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : recruitments.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-40 text-center text-sm text-gray-400"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <BriefcaseBusiness className="h-8 w-8 text-gray-300" />
                        <span>No positions found</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  recruitments.map((item, idx) => {
                    const rowNumber =
                      ((params.page ?? 1) - 1) * (params.limit ?? 10) + idx + 1;
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
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${LEVEL_COLOR[item.level]}`}
                          >
                            {item.level}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {format(new Date(item.createdAt), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="pr-6 text-right">
                          <div
                            className="flex justify-end gap-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 text-xs text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                              onClick={() =>
                                navigate(
                                  `/admin/recruitments/update/${item.id}`,
                                )
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 text-xs text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                              onClick={() =>
                                navigate(`/admin/recruitments/${item.id}`)
                              }
                            >
                              View
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-100 px-6 py-3">
              <p className="text-sm text-gray-500">
                Page {params.page} of {totalPages}
              </p>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange((params.page ?? 1) - 1)}
                  disabled={(params.page ?? 1) <= 1}
                  className="h-8 w-8 p-0 border-gray-200"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange((params.page ?? 1) + 1)}
                  disabled={(params.page ?? 1) >= totalPages}
                  className="h-8 w-8 p-0 border-gray-200"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default RecruitmentPage;
