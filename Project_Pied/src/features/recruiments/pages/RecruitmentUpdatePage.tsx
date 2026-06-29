import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePublicRecruitmentDetail } from "../hooks/useRecruitment";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Separator } from "@/shared/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Loader2,
  Save,
  Trash2,
} from "lucide-react";
import type { RecruitmentLevel } from "../type";

// Plug in your actual mutation hooks:
// import { useUpdateRecruitment, useDeleteRecruitment } from "../hooks/useRecruitment";

const LEVEL_OPTIONS: RecruitmentLevel[] = [
  "Intern",
  "Fresher",
  "Junior",
  "Middle",
  "Senior",
];

interface FormState {
  title: string;
  department: string;
  level: RecruitmentLevel | "";
  jobDescription: string;
  referenceInfo: string;
}

type FieldError = Partial<Record<keyof FormState, string>>;

const validate = (form: FormState): FieldError => {
  const errors: FieldError = {};
  if (!form.title.trim()) errors.title = "Title is required.";
  if (!form.department.trim()) errors.department = "Department is required.";
  if (!form.level) errors.level = "Level is required.";
  if (!form.jobDescription.trim())
    errors.jobDescription = "Job description is required.";
  return errors;
};

const FieldWrapper = ({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <Label className="text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </Label>
    {children}
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

const FormSkeleton = () => (
  <div className="space-y-5">
    <Skeleton className="h-10 w-full" />
    <div className="grid grid-cols-2 gap-5">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  </div>
);

const RecruitmentUpdatePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = usePublicRecruitmentDetail(id ?? "");
  const detail = data?.value;

  const [form, setForm] = useState<FormState>({
    title: "",
    department: "",
    level: "",
    jobDescription: "",
    referenceInfo: "",
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Populate form once detail loads
  useEffect(() => {
    if (detail) {
      const deptName =
        typeof detail.department === "object"
          ? (detail.department as { name: string })?.name
          : detail.department;
      setForm({
        title: detail.title,
        department: deptName,
        level: detail.level,
        jobDescription: detail.jobDescription,
        referenceInfo: detail.referenceInfo ?? "",
      });
    }
  }, [detail]);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // updateRecruitment({ id, ...form, level: form.level as RecruitmentLevel });
      await new Promise((res) => setTimeout(res, 800)); // placeholder
      navigate(`/admin/recruitments/${id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // deleteRecruitment(id);
      await new Promise((res) => setTimeout(res, 600)); // placeholder
      navigate("/admin/recruitment");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Back */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="gap-2 text-gray-500 hover:text-gray-800 -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Page header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-sm">
              <BriefcaseBusiness className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Edit Position
              </h1>
              <p className="text-sm text-gray-500">
                {isLoading ? (
                  <Skeleton className="h-4 w-40 mt-1" />
                ) : (
                  (detail?.title ?? "Loading...")
                )}
              </p>
            </div>
          </div>

          {/* Delete */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                disabled={isLoading || isDeleting}
                className="gap-2 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this position?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove{" "}
                  <strong>&ldquo;{detail?.title}&rdquo;</strong>. This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-gray-200">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Yes, delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Basic Info */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Basic Information
            </CardTitle>
            <CardDescription className="text-xs text-gray-400">
              Update the core details of this position
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {isLoading ? (
              <FormSkeleton />
            ) : (
              <>
                <FieldWrapper
                  label="Position Title"
                  required
                  error={errors.title}
                >
                  <Input
                    placeholder="e.g. Frontend Developer"
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className={`border-gray-200 focus-visible:ring-indigo-500 ${errors.title ? "border-red-300 focus-visible:ring-red-400" : ""}`}
                  />
                </FieldWrapper>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FieldWrapper
                    label="Department"
                    required
                    error={errors.department}
                  >
                    <Input
                      placeholder="e.g. Engineering"
                      value={form.department}
                      onChange={(e) =>
                        handleChange("department", e.target.value)
                      }
                      className={`border-gray-200 focus-visible:ring-indigo-500 ${errors.department ? "border-red-300 focus-visible:ring-red-400" : ""}`}
                    />
                  </FieldWrapper>

                  <FieldWrapper label="Level" required error={errors.level}>
                    <Select
                      value={form.level}
                      onValueChange={(v) => handleChange("level", v)}
                    >
                      <SelectTrigger
                        className={`border-gray-200 ${errors.level ? "border-red-300" : ""}`}
                      >
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {LEVEL_OPTIONS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FieldWrapper>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Content
            </CardTitle>
            <CardDescription className="text-xs text-gray-400">
              Update the role description and any reference material
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className={`h-4 ${i === 5 ? "w-2/3" : "w-full"}`}
                  />
                ))}
              </div>
            ) : (
              <>
                <FieldWrapper
                  label="Job Description"
                  required
                  error={errors.jobDescription}
                >
                  <Textarea
                    placeholder="Describe the responsibilities, requirements..."
                    value={form.jobDescription}
                    onChange={(e) =>
                      handleChange("jobDescription", e.target.value)
                    }
                    rows={8}
                    className={`resize-none border-gray-200 focus-visible:ring-indigo-500 leading-relaxed ${errors.jobDescription ? "border-red-300 focus-visible:ring-red-400" : ""}`}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {form.jobDescription.length} characters
                  </p>
                </FieldWrapper>

                <Separator className="bg-gray-100" />

                <FieldWrapper
                  label="Reference Information"
                  error={errors.referenceInfo}
                >
                  <Textarea
                    placeholder="Optional links, salary range, or additional notes..."
                    value={form.referenceInfo}
                    onChange={(e) =>
                      handleChange("referenceInfo", e.target.value)
                    }
                    rows={4}
                    className="resize-none border-gray-200 focus-visible:ring-indigo-500 leading-relaxed"
                  />
                </FieldWrapper>
              </>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pb-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/recruitments/${id}`)}
            disabled={isSubmitting}
            className="border-gray-200 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || isLoading}
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 min-w-[140px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentUpdatePage;
