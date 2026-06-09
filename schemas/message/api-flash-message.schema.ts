import z from 'zod';

export const ApiFlashMessageSchema = z.object({
  type: z.enum(['success', 'error', 'warning', 'info']),
  text: z.string(),
});

export type ApiFlashMessage = z.infer<typeof ApiFlashMessageSchema>;
