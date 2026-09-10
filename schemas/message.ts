import z from 'zod';

export const apiFlashMessageSchema = z
  .object({
    type: z.enum(['success', 'error', 'warning', 'info']),
    text: z.string(),
  })
  .strict();

export const apiFormErrorsSchema = z
  .object({
    message: apiFlashMessageSchema,
    errors: z.record(z.string(), z.array(z.string())),
  })
  .strict();

export const apiMessageResponseSchema = z
  .object({
    message: apiFlashMessageSchema,
  })
  .strict();

export type ApiFlashMessage = z.infer<typeof apiFlashMessageSchema>;
export type ApiFormErrors = z.infer<typeof apiFormErrorsSchema>;
