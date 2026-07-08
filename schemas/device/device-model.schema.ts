import z from 'zod';
import { BrandSchema } from './brand.schema';

export const DeviceModelSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
  ram: z.string(),
  storage: z.string(),
  brand: BrandSchema,
});
