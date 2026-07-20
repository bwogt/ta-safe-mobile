import z from 'zod';

export const DeviceValidatedAttributesSchema = z
  .object({
    cpf: z.boolean(),
    user_name: z.boolean(),
    brand_name: z.boolean(),
    model_name: z.boolean(),
    ram: z.boolean(),
    storage: z.boolean(),
    color: z.boolean(),
  })
  .nullable();

export type DeviceValidatedAttributes = z.infer<
  typeof DeviceValidatedAttributesSchema
>;
