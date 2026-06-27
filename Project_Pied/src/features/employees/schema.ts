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
