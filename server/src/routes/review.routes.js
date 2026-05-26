import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { createReview, listForTutor } from '../controllers/review.controller.js';

const router = Router();
router.post('/', protect, createReview);
router.get('/tutor/:tutorId', listForTutor);

export default router;
