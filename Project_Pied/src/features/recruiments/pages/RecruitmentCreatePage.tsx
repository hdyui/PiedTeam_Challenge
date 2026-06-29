import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Separator } from "@/shared/components/ui/separator";
import { ArrowLeft, BriefcaseBusiness, Loader2, Save } from "lucide-react";
import type { RecruitmentLevel } from "../type";

// Replace with your actual mutation hook, e.g.:
// import { useCreateRecruitment } from "../hooks/useRecruitment";

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

const INITIAL_FORM: FormState = {
  title: "",
  department: "",
  level: "",
  jobDescription: "",
  referenceInfo: "",
};

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

const RecruitmentCreatePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldError>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Plug in your mutation hook here:
  // const { mutate: createRecruitment } = useCreateRecruitment();

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
      // createRecruitment({ ...form, level: form.level as RecruitmentLevel });
      await new Promise((res) => setTimeout(res, 800)); // placeholder
      navigate("/recruitments");
    } finally {
      setIsSubmitting(false);
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
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-sm">
            <BriefcaseBusiness className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              New Position
            </h1>
            <p className="text-sm text-gray-500">
              Fill in the details to post a new opening
            </p>
          </div>
        </div>

        {/* Basic Info */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Basic Information
            </CardTitle>
            <CardDescription className="text-xs text-gray-400">
              General details about the position
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <FieldWrapper label="Position Title" required error={errors.title}>
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
                  onChange={(e) => handleChange("department", e.target.value)}
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
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Content
            </CardTitle>
            <CardDescription className="text-xs text-gray-400">
              Describe the role and responsibilities in detail
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <FieldWrapper
              label="Job Description"
              required
              error={errors.jobDescription}
            >
              <Textarea
                placeholder="Describe the responsibilities, requirements, and what the candidate will be working on..."
                value={form.jobDescription}
                onChange={(e) => handleChange("jobDescription", e.target.value)}
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
                placeholder="Optional links, salary range, or additional notes for candidates..."
                value={form.referenceInfo}
                onChange={(e) => handleChange("referenceInfo", e.target.value)}
                rows={4}
                className="resize-none border-gray-200 focus-visible:ring-indigo-500 leading-relaxed"
              />
            </FieldWrapper>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pb-4">
          <Button
            variant="outline"
            onClick={() => navigate("/recruitments")}
            disabled={isSubmitting}
            className="border-gray-200 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 min-w-[120px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Post Position
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentCreatePage;
