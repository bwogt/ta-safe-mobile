import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(255),
});

export type LoginFormData = z.infer<typeof loginSchema>;
