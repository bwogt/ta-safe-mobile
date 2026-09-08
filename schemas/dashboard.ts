import z from 'zod';

export const dashboardStatsResponseSchema = z.object({
  total: z.number(),
  validated: z.number(),
  pending: z.number(),
  rejected: z.number(),
  in_analysis: z.number(),
}).strict();

export type DashboardStatResponse = z.infer<
  typeof dashboardStatsResponseSchema
>;
