import z from 'zod';

export const messageSchema = z.object({
  type: z.enum(['success', 'error', 'warning', 'info']),
  text: z.string(),
});

export type Message = z.infer<typeof messageSchema>;
