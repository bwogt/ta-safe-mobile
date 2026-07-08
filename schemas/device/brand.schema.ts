import z from 'zod';

export const BrandSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
});

export type Brand = z.infer<typeof BrandSchema>;
