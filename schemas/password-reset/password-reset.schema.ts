import { z } from 'zod';

export const passwordResetRequestSchema = z.object({
  code: z.string().min(6).max(6),
  email: z.email(),
  password: z.string().min(8).max(255),
});

export type PasswordResetRequest = z.infer<typeof passwordResetRequestSchema>;
