import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import {
  createCheckoutSession,
  confirmPayment,
  myPayments,
} from '../controllers/payment.controller.js';

const router = Router();
router.post('/checkout', protect, createCheckoutSession);
router.post('/confirm', protect, confirmPayment);
router.get('/mine', protect, myPayments);

export default router;
