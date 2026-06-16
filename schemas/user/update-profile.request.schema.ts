import z from 'zod';

export const UpdateProfileRequestSchema = z.object({
  name: z.string().max(255),
  email: z.email(),
});

export type UpdateProfileRequest = z.infer<typeof UpdateProfileRequestSchema>;
