import { z } from 'zod';

import { apiFlashMessageSchema } from './api-flash-message.schema';

export const apiFormErrorsSchema = z.object({
  message: apiFlashMessageSchema,
  errors: z.record(z.string(), z.array(z.string())).optional(),
});

export type ApiFormErrors = z.infer<typeof apiFormErrorsSchema>;
