import { z } from 'zod';

export const searchDto = z.object({
  location: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  guests: z.number().int().positive().optional(),
});

export type SearchDto = z.infer<typeof searchDto>;
