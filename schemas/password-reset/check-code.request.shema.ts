import { z } from 'zod';

export const PasswordResetCheckCodeRequestSchema = z.object({
  code: z.string().min(6).max(6),
  email: z.email(),
});

export type PasswordResetCheckCodeRequest = z.infer<
  typeof PasswordResetCheckCodeRequestSchema
>;
