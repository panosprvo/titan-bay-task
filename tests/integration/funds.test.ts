import { describe, it, expect, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import { prisma } from '../../src/controllers/fund.controller.js';

describe('Funds API Integration Tests', () => {
  afterAll(async () => {
    await prisma.fund.deleteMany({
      where: { name: "Vitest Venture Fund" }
    });
    await prisma.$disconnect();
  });

  it('GET /funds should return a list of funds', async () => {
    const res = await request(app).get('/funds');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('vintage_year');
    }
  });

  it('POST /funds should fail with invalid data (Zod Validation)', async () => {
    const invalidFund = {
      name: "",
      vintage_year: 1800,
    };

    const res = await request(app)
      .post('/funds')
      .send(invalidFund);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Validation failed');
  });

  it('POST /funds should create a new fund with valid data', async () => {
    const newFund = {
      name: "Vitest Venture Fund",
      vintage_year: 2026,
      target_size_usd: 1000000,
      status: "Fundraising"
    };

    const res = await request(app)
      .post('/funds')
      .send(newFund);

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Vitest Venture Fund");
  });
});
