import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(255),
  email: z.email(),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
  cpf_masked: z.string(),
  email_verified_at: z.string().nullable().optional(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export type User = z.infer<typeof UserSchema>;
