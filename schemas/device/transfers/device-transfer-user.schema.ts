import z from 'zod';

export const DeviceTransferUserSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
  created_at: z.iso.datetime(),
});

export type DeviceTransferUserSchema = z.infer<typeof DeviceTransferUserSchema>;
