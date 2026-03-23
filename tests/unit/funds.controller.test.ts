import { describe, it, expect, vi } from 'vitest';
import * as fundController from '../../src/controllers/fund.controller.js';
import { prisma } from '../../src/controllers/fund.controller.js';

describe('Fund Controller Unit Tests', () => {
  it('should return all funds', async () => {
    // Define your mock data
    const mockFunds = [
      {
        id: '1',
        name: 'Fund A',
        vintage_year: 2024,
        target_size_usd: 100,
        status: 'Fundraising',
        created_at: new Date()
      }
    ];

    // Use spyOn to mock the prisma method
    const findManySpy = vi.spyOn(prisma.fund, 'findMany').mockResolvedValue(mockFunds as any);

    const req = {} as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as any;

    // Call the controller directly
    await fundController.getAllFunds(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFunds);

    // Cleanup
    findManySpy.mockRestore();
  });
});
