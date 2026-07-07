import z from 'zod';

export const DashboardStatsResponseSchema = z.object({
  total: z.number(),
  validated: z.number(),
  pending: z.number(),
  rejected: z.number(),
  in_analysis: z.number(),
});

export type DashboardStatResponse = z.infer<
  typeof DashboardStatsResponseSchema
>;
