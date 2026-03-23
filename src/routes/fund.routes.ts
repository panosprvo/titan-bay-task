import { Router } from 'express';
import { getAllFunds, getFundById, createFund, updateFund } from '../controllers/fund.controller.js';
import { validate } from '../middleware/validate.js';
import { createFundSchema, updateFundSchema } from '../schemas/fund.schema.js';

const router = Router();

router.get('/', getAllFunds);
router.get('/:id', getFundById);
router.post('/', validate(createFundSchema), createFund);
router.put('/', validate(updateFundSchema), updateFund);

export default router;
