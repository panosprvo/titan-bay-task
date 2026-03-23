import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllInvestments = async(req: Request, res: Response) => {
  const { fund_id } = req.params;
  if (!fund_id || Array.isArray(fund_id)) {
    return res.status(400).json({error: 'Fund ID is required'});
  }
  const investments = await prisma.investment.findMany({
    where: { fund_id }
  });
  res.status(200).json(investments);
}

export const createInvestment = async(req: Request, res: Response) => {
  const { fund_id } = req.params;
  const { investor_id, amount_usd, investment_date } = req.body;
  if (!fund_id || Array.isArray(fund_id)) {
    return res.status(400).json({error: 'Fund ID is required'});
  }
  if (!investor_id || !amount_usd || !investment_date) {
    return res.status(400).json({ error: 'Missing required fields'});
  }
  try {
    const newInvestment = await prisma.investment.create({
      data: {
        fund_id,
        investor_id,
        amount_usd,
        investment_date: new Date(investment_date)
      }
    });
    res.status(201).json(newInvestment);
  } catch (error) {
    console.error('Error creating investment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
