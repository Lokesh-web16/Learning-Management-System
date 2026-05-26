import { Router } from 'express';
import { protect, requireRole } from '../middleware/auth.js';
import {
  listUsers,
  setUserActive,
  setUserRole,
  deleteUser,
  stats,
} from '../controllers/admin.controller.js';

const router = Router();

router.use(protect, requireRole('admin'));

router.get('/users', listUsers);
router.put('/users/:id/active', setUserActive);
router.put('/users/:id/role', setUserRole);
router.delete('/users/:id', deleteUser);
router.get('/stats', stats);

export default router;
