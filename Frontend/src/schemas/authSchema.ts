import { z } from "zod";

export const emailSchema = z.object({
    email: z.string().email("Invalid Email"),
});

export const authSchema = z.object({
  email: z.string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password cannot exceed 20 characters"),
});

export type EmailFormData = z.infer<typeof emailSchema>;
export type AuthFormData = z.infer<typeof authSchema>;