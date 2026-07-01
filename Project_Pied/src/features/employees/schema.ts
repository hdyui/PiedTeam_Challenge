import { z } from "zod";

export const UpdateProfileSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "Fullname is required" })
    .min(3, { message: "Full name must be at least 3 characters" })
    .max(50, { message: "Full name must be less than 50 characters" }),
  email: z
    .email({ message: "Email is not valid" })
    .min(1, { message: "Email is required" })
    .min(5, { message: "Email must be at least 5 characters" })
    .max(100, { message: "Email must be less than 100 characters" }),
});
export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;
