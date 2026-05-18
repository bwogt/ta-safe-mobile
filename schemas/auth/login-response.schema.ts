import { z } from 'zod';
import { apiFlashMessageSchema } from '../message/api-flash-message.schema';
import { userSchema } from '../user.schema';

export const loginResponseSchema = z.object({
  message: apiFlashMessageSchema,
  data: z.object({
    user: userSchema,
    token: z.string(),
  }),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
