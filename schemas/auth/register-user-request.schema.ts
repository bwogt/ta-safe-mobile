import z from 'zod';

export const registerUserRequestSchema = z.object({
  name: z.string().max(255),
  email: z.email(),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
  phone: z.string().regex(/^[(]\d{2}[)]\s\d{5}-\d{4}$/),
  password: z.string().min(8).max(255),
  password_confirmation: z.string().min(8).max(255),
});

export type RegisterUserRequest = z.infer<typeof registerUserRequestSchema>;
