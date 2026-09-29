import z from 'zod';

export const deviceBrandSchema = z
  .object({
    id: z.int().positive(),
    name: z.string(),
  })
  .strict();

export const deviceModelSchema = z
  .object({
    id: z.int().positive(),
    name: z.string(),
    ram: z.string(),
    storage: z.string(),
    brand: deviceBrandSchema,
  })
  .strict();

export const deviceBrandsSchema = z.array(deviceBrandSchema);
export const deviceModelsSchema = z.array(deviceModelSchema);
