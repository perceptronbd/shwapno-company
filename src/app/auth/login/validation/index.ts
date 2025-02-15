import { z } from "zod";

export const LoginValidation = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


export type LoginValidationType = z.infer<typeof LoginValidation>;