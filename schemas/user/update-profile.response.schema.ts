import z from 'zod';
import { ApiFlashMessageSchema } from '../message/api-flash-message.schema';
import { UserSchema } from './user.schema';

export const UpdateProfileResponseSchema = z.object({
  message: ApiFlashMessageSchema,
  user: UserSchema,
});

export type UpdateProfileResponse = z.infer<typeof UpdateProfileResponseSchema>;
