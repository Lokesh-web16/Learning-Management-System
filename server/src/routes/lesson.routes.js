import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import {
  createLesson,
  updateLesson,
  deleteLesson,
  listLessons,
  getLesson,
  bookLesson,
  cancelLesson,
  rescheduleLesson,
  completeLesson,
  myLessons,
} from '../controllers/lesson.controller.js';

const router = Router();

router.get('/', listLessons);
router.get('/mine/list', protect, myLessons);
router.post('/', protect, createLesson);
router.get('/:id', getLesson);
router.put('/:id', protect, updateLesson);
router.delete('/:id', protect, deleteLesson);
router.post('/:id/book', protect, bookLesson);
router.post('/:id/cancel', protect, cancelLesson);
router.post('/:id/reschedule', protect, rescheduleLesson);
router.post('/:id/complete', protect, completeLesson);

export default router;
