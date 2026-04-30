import { z } from 'zod';

export const flashMessageSchema = z.object({
  text: z.string(),
  type: z.enum(['success', 'error', 'warning', 'info']),
});

export type Message = z.infer<typeof flashMessageSchema>;
