import { z } from "zod";

export const UpdateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  position: z.string().min(1, "Position is required"),
  phone: z.string().regex(/^[0-9]{10,11}$/, "Invalid phone number"),
  address: z.string().nullable().optional(),
  hobby: z.string().nullable().optional(),
  quote: z.string().nullable().optional(),
  avatarImg: z.string().url().nullable().optional(),
  coverImg: z.string().url().nullable().optional(),
});

export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),
    newPassword: z.string().min(6, "Mật khẩu mới phải từ 6 ký tự"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp!",
    path: ["confirmPassword"],
  });
export type ChangePasswordTypes = z.infer<typeof ChangePasswordSchema>;
