import { z } from 'zod';
import { ApiFlashMessageSchema } from '../message/api-flash-message.schema';
import { UserSchema } from '../user/user.schema';

export const LoginResponseSchema = z.object({
  message: ApiFlashMessageSchema,
  data: z.object({
    user: UserSchema,
    token: z.string(),
  }),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
