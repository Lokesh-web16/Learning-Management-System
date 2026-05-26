import path from 'path';
import fs from 'fs';
import multer from 'multer';
import Lesson from '../models/Lesson.js';

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-z0-9.\-_]/gi, '_');
    cb(null, `${Date.now()}-${safe}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
  fileFilter: (_req, file, cb) => {
    if (/^video\//.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only video files allowed'));
  },
});

export async function uploadRecording(req, res) {
  const lesson = await Lesson.findById(req.params.lessonId);
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
  if (lesson.tutor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Only the tutor can upload recordings' });
  }
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  lesson.recordingUrl = `/uploads/${req.file.filename}`;
  await lesson.save();
  res.status(201).json({ lesson });
}

export async function deleteRecording(req, res) {
  const lesson = await Lesson.findById(req.params.lessonId);
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
  if (lesson.tutor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  if (lesson.recordingUrl) {
    const filePath = path.join(process.cwd(), lesson.recordingUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    lesson.recordingUrl = '';
    await lesson.save();
  }
  res.json({ ok: true });
}

// Authorize stream: only the booked student or the tutor can fetch the URL
export async function getRecording(req, res) {
  const lesson = await Lesson.findById(req.params.lessonId);
  if (!lesson || !lesson.recordingUrl) {
    return res.status(404).json({ message: 'No recording' });
  }
  const isStudent = lesson.student && lesson.student.toString() === req.user._id.toString();
  const isTutor = lesson.tutor.toString() === req.user._id.toString();
  if (!isStudent && !isTutor && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }
  res.json({ url: lesson.recordingUrl });
}
