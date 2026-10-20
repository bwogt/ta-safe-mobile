import z from 'zod';
import { apiFlashMessageSchema } from './message';

export const userSchema = z
  .object({
    id: z.int().positive(),
    name: z.string().max(255),
    email: z.email(),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
    cpf_masked: z.string().regex(/^\*{3}\.\d{3}\.\d{3}-\*{2}$/),
    email_verified_at: z.string().nullable().optional(),
    created_at: z.iso.datetime(),
    updated_at: z.iso.datetime(),
  })
  .strict();

export const userSummarySchema = z
  .object({
    id: z.int().positive(),
    name: z.string(),
    email: z.email(),
    cpf: z.string().regex(/^\*{3}\.\d{3}\.\d{3}-\*{2}$/),
    created_at: z.iso.datetime(),
  })
  .strict();

export const userPublicSchema = z
  .object({
    id: z.int().positive(),
    name: z.string(),
    cpf: z.string().regex(/^\*{3}\.\d{3}\.\d{3}-\*{2}$/),
    email: z.email(),
    created_at: z.iso.datetime(),
  })
  .strict();

export const updateProfileRequestSchema = z.object({
  name: z.string().max(255),
  email: z.email(),
});

export const updateProfileResponseSchema = z
  .object({
    message: apiFlashMessageSchema,
    user: userSchema,
  })
  .strict();

export const findUserByEmailRequestSchema = z.object({
  email: z.email(),
});

export type User = z.infer<typeof userSchema>;
export type UserPublic = z.infer<typeof userPublicSchema>;
export type UpdateProfileRequest = z.infer<typeof updateProfileRequestSchema>;
export type UpdateProfileResponse = z.infer<typeof updateProfileResponseSchema>;

export type FindUserByEmailRequest = z.infer<
  typeof findUserByEmailRequestSchema
>;
