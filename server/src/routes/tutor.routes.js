import { Router } from 'express';
import { listTutors, getTutor } from '../controllers/tutor.controller.js';

const router = Router();
router.get('/', listTutors);
router.get('/:id', getTutor);

export default router;
