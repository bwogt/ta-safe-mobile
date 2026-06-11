import { z } from 'zod';

export const PasswordResetCheckCodeRequestSchema = z.object({
  code: z.string().length(6),
  email: z.email(),
});

export type PasswordResetCheckCodeRequest = z.infer<
  typeof PasswordResetCheckCodeRequestSchema
>;
