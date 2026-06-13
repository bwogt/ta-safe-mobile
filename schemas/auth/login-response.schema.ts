import { z } from 'zod';
import { UserSchema } from '../user/user.schema';

export const LoginResponseSchema = z.object({
  user: UserSchema,
  token: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
