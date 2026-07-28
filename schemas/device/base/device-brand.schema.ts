import z from 'zod';

export const DeviceBrandSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
});

export type DeviceBrand = z.infer<typeof DeviceBrandSchema>;
