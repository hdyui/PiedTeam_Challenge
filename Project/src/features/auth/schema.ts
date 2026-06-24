import { z } from "zod";

export const RegisterSchema = z
  .object({
    fullName: z
      .string()
      .min(1, { message: "Full name is required" })
      .min(3, { message: "Full name must be at least 3 characters" })
      .max(50, { message: "Full name must be less than 50 characters" }),
    email: z
      .email({ message: "Email is not valid" })
      .min(1, { message: "Email is required" })
      .min(5, { message: "Email must be at least 5 characters" })
      .max(100, { message: "Email must be less than 100 characters" }),

    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    comfirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .superRefine(({ password, comfirmPassword }, ctx) => {
    if (password !== comfirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Confirm password does not match password",
        path: ["comfirmPassword"], // gán lỗi vào trường confirmPassword
      });
    }
  });
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z
    .email({ message: "Email is not valid" })
    .min(1, { message: "Email is required" })
    .min(5, { message: "Email must be at least 5 characters" })
    .max(100, { message: "Email must be less than 100 characters" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;
