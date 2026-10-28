import z from 'zod';
import { deviceModelSchema } from './brand';
import { deviceSummarySchema } from './device';
import { userSummarySchema } from './user';

// ─────────────────────────────────────────────
// Local Schemas
// ─────────────────────────────────────────────

const deviceTransferStatusSchema = z.enum([
  'pending',
  'accepted',
  'canceled',
  'rejected',
]);

const deviceTransferSummarySchema = z.object({
  id: z.int().positive(),
  type: z.enum(['sent', 'received']),
  status: deviceTransferStatusSchema,
  device_model: deviceModelSchema,
  created_at: z.iso.datetime(),
});

// ─────────────────────────────────────────────
// Exported schemas
// ─────────────────────────────────────────────

export const deviceTransferSchema = z
  .object({
    id: z.int().positive(),
    type: z.enum(['sent', 'received']),
    status: deviceTransferStatusSchema,
    source_user: userSummarySchema,
    target_user: userSummarySchema,
    device: deviceSummarySchema,
    created_at: z.iso.datetime(),
    updated_at: z.iso.datetime(),
  })
  .strict();

export const createDeviceTransferRequestSchema = z.object({
  device_id: z.int().positive(),
  target_user_id: z.int().positive(),
});

export const paginatedDeviceTransfersSchema = z
  .object({
    data: z.array(deviceTransferSummarySchema),
    meta: z.object({
      has_more_page: z.boolean(),
      next_cursor: z.string().nullable(),
    }),
  })
  .strict();

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type CreateDeviceTransferRequest = z.infer<
  typeof createDeviceTransferRequestSchema
>;

export type DeviceTransfer = z.infer<typeof deviceTransferSchema>;
export type DeviceTransferSummary = z.infer<typeof deviceTransferSummarySchema>;
export type DeviceTransferStatus = z.infer<typeof deviceTransferStatusSchema>;
