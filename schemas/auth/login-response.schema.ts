import { z } from 'zod';
import { messageSchema } from '../message/message.schema';
import { userSchema } from '../user.schema';

export const loginResponseSchema = z.object({
  message: messageSchema,
  data: z.object({
    user: userSchema,
    token: z.string(),
  }),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
