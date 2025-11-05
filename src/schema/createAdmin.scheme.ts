import { z } from "zod";

export const createAdminValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .trim(),
  password: z
    .string()
    .trim()
    .min(2, "Password must be at least 2 characters"), // corrected message
  role: z.string()
});
