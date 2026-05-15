import { z } from 'zod';

import { messageSchema } from '../message/message.schema';

export const validationErrorResponseSchema = z.object({
  message: messageSchema,
  errors: z.record(z.string(), z.array(z.string())).optional(),
});

export type ValidationErrorResponse = z.infer<
  typeof validationErrorResponseSchema
>;
