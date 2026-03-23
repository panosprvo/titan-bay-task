import type { Request, Response } from 'express';
import { type InvestorType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllInvestors = async(req: Request, res: Response) => {
  const investors = await prisma.investor.findMany();
  res.status(200).json(investors);
}

export const createInvestor = async(req: Request, res: Response) => {
  const { name, investor_type, email } = req.body;
  if (!name || !investor_type || !email) {
    return res.status(400).json({ error: 'Missing required fields'});
  }
  try {
    const newInvestor = await prisma.investor.create({
      data: {
        name,
        investor_type: investor_type as InvestorType,
        email
      }
    });
    res.status(201).json(newInvestor);
  } catch (error) {
    console.error('Error creating investor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
