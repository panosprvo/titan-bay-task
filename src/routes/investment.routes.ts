import { Router } from 'express';
import { getAllInvestments, createInvestment } from '../controllers/investment.controller.js';

const router = Router();

router.get('/funds/:fund_id/investments', getAllInvestments);
router.post('/funds/:fund_id/investments', createInvestment);

export default router;
