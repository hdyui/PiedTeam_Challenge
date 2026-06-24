import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  RegisterSchema,
  type RegisterSchemaType,
} from "@/features/auth/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card";

import { Loader2, User, Mail, Lock } from "lucide-react";
import { useRegisterMutation } from "@/features/auth/hooks/useAuth";

export const RegisterPage = () => {
  const registerMutation = useRegisterMutation();
  const {
    register, // dùng để đăng ký các input vào form
    handleSubmit, // là một Func gọi 1 hàm khác sau đó dùng để xử lý submit form,
    //nó sẽ tự động gọi validate và trả về data đã được validate nếu hợp lệ -> xử lí tiếp hàm được gọi
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    //mode: khi nao validate?
    mode: "onTouched",
    // - onSubmit: chỉ validate khi submit form
    // - onChange: validate ngay khi người dùng nhập dữ liệu vào input
    // - onBlur: validate khi người dùng rời khỏi input
    // - onTouched: validate khi người dùng rời khỏi input và đã tương tác với nó (touched)
    resolver: zodResolver(RegisterSchema),
    // dùng để tích hợp Zod schema vào React Hook Form, nó sẽ tự động validate form dựa trên schema đã định nghĩa
    // chuyển định nghĩa schema của Zod thành resolver mà React Hook Form có thể hiểu được
    //defaul values: giá trị mặc định của form, nếu không có thì sẽ là undefined, nhưng nếu có thì sẽ giúp form có giá trị ban đầu và tránh lỗi uncontrolled component
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      comfirmPassword: "",
    },
  });
  const onSubmit = async (data: RegisterSchemaType) => {
    registerMutation.mutate(data);
  };

  // const [errors, setErrors] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const handleChange = (
  //   field: "username" | "email" | "password" | "confirmPassword",
  //   value: string,
  // ) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));

  //   setErrors((prev) => ({
  //     ...prev,
  //     [field]: "",
  //   }));
  // };

  // const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  // const newErrors = {
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // };
  // if (!formData.username.trim()) {
  //   newErrors.username = "Username không được để trống";
  // }
  // if (!formData.email.trim()) {
  //   newErrors.email = "Email không được để trống";
  // } else if (!formData.email.includes("@")) {
  //   newErrors.email = "Email không hợp lệ";
  // }
  // if (!formData.password.trim()) {
  //   newErrors.password = "Password không được để trống";
  // } else if (formData.password.length < 6) {
  //   newErrors.password = "Password phải có ít nhất 6 ký tự";
  // }
  // if (!formData.confirmPassword.trim()) {
  //   newErrors.confirmPassword = "Vui lòng nhập lại password";
  // } else if (formData.confirmPassword !== formData.password) {
  //   newErrors.confirmPassword = "Password không khớp";
  // }
  // setErrors(newErrors);
  // if (
  //   newErrors.username ||
  //   newErrors.email ||
  //   newErrors.password ||
  //   newErrors.confirmPassword
  // ) {
  //   toast.error("Đăng ký thất bại", {
  //     description: "Vui lòng kiểm tra lại thông tin.",
  //   });
  //   return;
  // }
  // setIsLoading(true);
  // try {
  //   setIsLoading(true);
  //   await authsApi.register({
  //     name: formData.username,
  //     email: formData.email,
  //     password: formData.password,
  //   });
  //   toast.success("Đăng ký thành công 🎉");
  //   navigate("/login");
  // } catch (error) {
  //   toast.error("Đăng ký thất bại", {
  //     description: "Có lỗi xảy ra. Vui lòng thử lại.",
  //   });
  // } finally {
  //   setIsLoading(false);
  // }
  // console.log("render");
  //   navigate("/login");
  // };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold">
            Đăng ký
          </CardTitle>

          <CardDescription className="text-center text-base">
            Tạo tài khoản mới để sử dụng ShopApp
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Username
                </Label>

                <Input
                  {...register("fullName")}
                  placeholder="Nhập username"
                  className={errors.fullName ? "border-destructive" : ""}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>

                <Input {...register("email")} placeholder="you@example.com" />

                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>

                <Input
                  type="password"
                  {...register("password")}
                  placeholder="Nhập mật khẩu"
                />

                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Confirm Password
                </Label>

                <Input
                  type="password"
                  {...register("comfirmPassword")}
                  placeholder="Nhập lại mật khẩu"
                />

                {errors.comfirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.comfirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full"
              >
                {registerMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {registerMutation.isPending ? "Đang đăng ký..." : "Đăng ký"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Đã có tài khoản?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Đăng nhập
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
