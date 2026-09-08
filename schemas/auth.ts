import z from 'zod';
import { userSchema } from './user';

export const loginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(255),
});

export const loginResponseSchema = z.object({
  user: userSchema,
  token: z.string(),
}).strict();

export const registerUserRequestSchema = z.object({
  name: z.string().max(255),
  email: z.email(),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
  password: z.string().min(8).max(255),
});

export const passwordResetStartRequestSchema = z.object({
  email: z.email(),
});

export const passwordResetRequestSchema = z.object({
  code: z.string().length(6),
  email: z.email(),
  password: z.string().min(8).max(255),
});

export const passwordResetCheckCodeRequestSchema = z.object({
  code: z.string().length(6),
  email: z.email(),
});


export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type RegisterUserRequest = z.infer<typeof registerUserRequestSchema>;
export type PasswordResetRequest = z.infer<typeof passwordResetRequestSchema>;

export type PasswordResetStartRequest = z.infer<
  typeof passwordResetStartRequestSchema
>;

export type PasswordResetCheckCodeRequest = z.infer<
  typeof passwordResetCheckCodeRequestSchema
>;
