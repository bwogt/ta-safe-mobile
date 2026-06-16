import { z } from 'zod';

import { ApiFlashMessageSchema } from './api-flash-message.schema';

export const ApiFormErrorsSchema = z.object({
  message: ApiFlashMessageSchema,
  errors: z.record(z.string(), z.array(z.string())),
});

export type ApiFormErrors = z.infer<typeof ApiFormErrorsSchema>;
