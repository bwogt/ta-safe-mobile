import z from 'zod';
import { ApiFlashMessageSchema } from './api-flash-message.schema';

export const ApiMessageResponseSchema = z.object({
  message: ApiFlashMessageSchema,
});

export type ApiMessageResponse = z.infer<typeof ApiMessageResponseSchema>;
