import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import {
  upload,
  uploadRecording,
  deleteRecording,
  getRecording,
} from '../controllers/recording.controller.js';

const router = Router();

router.post('/:lessonId', protect, upload.single('recording'), uploadRecording);
router.get('/:lessonId', protect, getRecording);
router.delete('/:lessonId', protect, deleteRecording);

export default router;
