import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { updateProfile, getById } from '../controllers/user.controller.js';

const router = Router();
router.put('/me', protect, updateProfile);
router.get('/:id', getById);

export default router;
