import z from 'zod';

export const RegisterUserRequestSchema = z.object({
  name: z.string().max(255),
  email: z.email(),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
  password: z.string().min(8).max(255),
});

export type RegisterUserRequest = z.infer<typeof RegisterUserRequestSchema>;
