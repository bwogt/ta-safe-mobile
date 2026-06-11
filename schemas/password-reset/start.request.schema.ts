import { z } from 'zod';

export const PasswordResetStartRequestSchema = z.object({
  email: z.email(),
});

export type PasswordResetStartRequest = z.infer<
  typeof PasswordResetStartRequestSchema
>;
