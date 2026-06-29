import { useNavigate, useParams } from "react-router-dom";
import { usePublicRecruitmentDetail } from "../hooks/useRecruitment";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Separator } from "@/shared/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ExternalLink,
  Pencil,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";
import type { RecruitmentLevel } from "../type";

const LEVEL_COLOR: Record<RecruitmentLevel, string> = {
  all: "bg-slate-100 text-slate-700 border-slate-200",
  Intern: "bg-slate-100 text-slate-700 border-slate-200",
  Fresher: "bg-green-50 text-green-700 border-green-200",
  Junior: "bg-blue-50 text-blue-700 border-blue-200",
  Middle: "bg-violet-50 text-violet-700 border-violet-200",
  Senior: "bg-amber-50 text-amber-700 border-amber-200",
};

const MetaItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start gap-3">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 mt-0.5">
      <Icon className="h-4 w-4 text-gray-500" />
    </div>
    <div>
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
        {label}
      </p>
      <div className="mt-0.5 text-sm font-medium text-gray-800">{value}</div>
    </div>
  </div>
);

const RecruitmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = usePublicRecruitmentDetail(id ?? "");

  const detail = data?.value;

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-6 flex items-center justify-center">
        <Card className="w-full max-w-md text-center border-gray-200 shadow-sm">
          <CardContent className="pt-10 pb-10 space-y-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 mx-auto">
              <BriefcaseBusiness className="h-6 w-6 text-red-400" />
            </div>
            <p className="text-base font-semibold text-gray-800">
              Position not found
            </p>
            <p className="text-sm text-gray-500">
              This position may have been removed or does not exist.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate("/recruitments")}
              className="mt-4 border-gray-200"
            >
              Back to list
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Back button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="gap-2 text-gray-500 hover:text-gray-800 -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Sidebar */}
          <div className="space-y-4">
            {/* Meta card */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Position Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <>
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </>
                ) : (
                  <>
                    <MetaItem
                      icon={BriefcaseBusiness}
                      label="Title"
                      value={detail?.title}
                    />
                    <Separator className="bg-gray-100" />
                    <MetaItem
                      icon={Building2}
                      label="Department"
                      value={
                        typeof detail?.department === "object"
                          ? (detail.department as { name: string })?.name
                          : detail?.department
                      }
                    />
                    <Separator className="bg-gray-100" />
                    <MetaItem
                      icon={TrendingUp}
                      label="Level"
                      value={
                        detail?.level ? (
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${LEVEL_COLOR[detail.level]}`}
                          >
                            {detail.level}
                          </span>
                        ) : null
                      }
                    />
                    <Separator className="bg-gray-100" />
                    <MetaItem
                      icon={CalendarDays}
                      label="Posted on"
                      value={
                        detail?.createdAt
                          ? format(new Date(detail.createdAt), "MMMM d, yyyy")
                          : ""
                      }
                    />
                  </>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="pt-4 pb-4 space-y-2">
                <Button
                  className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700"
                  disabled={isLoading}
                  onClick={() => navigate(`/admin/recruitments/${id}/edit`)}
                >
                  <Pencil className="h-4 w-4" />
                  Edit Position
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2 border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50"
                  onClick={() => navigate("/admin/recruitments")}
                >
                  View All Positions
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Title header */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="pt-6 pb-6">
                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-7 w-3/4" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                        {detail?.title}
                      </h1>
                      <span
                        className={`shrink-0 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${detail?.level ? LEVEL_COLOR[detail.level] : ""}`}
                      >
                        {detail?.level}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5" />
                      {typeof detail?.department === "object"
                        ? (detail.department as { name: string })?.name
                        : detail?.department}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton
                        key={i}
                        className={`h-4 ${i === 4 ? "w-2/3" : "w-full"}`}
                      />
                    ))}
                  </div>
                ) : (
                  <div
                    className="prose prose-sm prose-gray max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: detail?.jobDescription ?? "",
                    }}
                  />
                )}
              </CardContent>
            </Card>

            {/* Reference Info */}
            {(isLoading || detail?.referenceInfo) && (
              <Card className="border-gray-200 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-2">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Reference Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ) : (
                    <div
                      className="prose prose-sm prose-gray max-w-none text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: detail?.referenceInfo ?? "",
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentDetails;
