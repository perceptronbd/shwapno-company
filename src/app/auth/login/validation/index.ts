import { z } from "zod";

export const LoginValidation = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginValidationType = z.infer<typeof LoginValidation>;
