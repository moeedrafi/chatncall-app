import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});
export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type LoginSchema = z.infer<typeof loginSchema>;

export const chatSchema = z.object({
  message: z.string().min(1),
});
export type ChatSchema = z.infer<typeof chatSchema>;
