import { z } from "zod";

export const emailSchema = z.object({
    email: z.string().email("Invalid Email"),
});

export const authSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password must be a least 6 characters"),
});

export type EmailFormData = z.infer<typeof emailSchema>;
export type AuthFormData = z.infer<typeof authSchema>;