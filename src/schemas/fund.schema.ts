import { z } from 'zod';

export const createFundSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    vintage_year: z.number().int().min(1900).max(2100),
    target_size_usd: z.number().positive(),
    status: z.enum(['Fundraising', 'Investing', 'Closed']),
  }),
});

export const updateFundSchema = z.object({
  body: z.object({
    id: z.string().uuid(),
    name: z.string().optional(),
    vintage_year: z.number().int().optional(),
    target_size_usd: z.number().optional(),
    status: z.enum(['Fundraising', 'Investing', 'Closed']).optional(),
  }),
});
