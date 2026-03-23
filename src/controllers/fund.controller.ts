import type { Request, Response } from 'express';
import { type FundStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllFunds =  async (res: Response) => {
  const funds = await prisma.fund.findMany();
  res.status(200).json(funds);
}

export const getFundById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({error: 'Fund ID is required'});
  }
  const fund = await prisma.fund.findUnique({
    where: { id }
  });
  if (!fund) {
    return res.status(404).json({error: 'Fund not found'});
  }
  res.status(200).json(fund);
}

export const createFund = async (req: Request, res: Response) => {
  const { name, vintage_year, target_size_usd, status } = req.body;
  if (!name || !vintage_year || !target_size_usd || !status) {
    return res.status(400).json({ error: 'Missing required fields'});
  }
  try {
    const newFund = await prisma.fund.create({
      data: {
        name,
        vintage_year,
        target_size_usd,
        status: status as FundStatus
      }
    });
    res.status(201).json(newFund);
  } catch (error) {
    console.error('Error creating fund:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const updateFund = async(req: Request, res: Response) => {
  const { id, name, vintage_year, target_size_usd, status } = req.body;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({error: 'Fund ID is required'});
  }
  try {
    const updatedFund = await prisma.fund.update({
      where: { id },
      data: {
        name,
        vintage_year,
        target_size_usd,
        status: status as FundStatus
      }
    });
    res.status(200).json(updatedFund);
  } catch (error) {
    console.error('Error updating fund:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
