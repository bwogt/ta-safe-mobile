import { z } from 'zod';

export const passwordResetStartRequestSchema = z.object({
  email: z.email(),
});

export type PasswordResetStartRequest = z.infer<
  typeof passwordResetStartRequestSchema
>;
