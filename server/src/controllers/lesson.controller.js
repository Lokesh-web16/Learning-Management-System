import crypto from 'crypto';
import Lesson from '../models/Lesson.js';
import User from '../models/User.js';

// Tutor: create a new available lesson slot
export async function createLesson(req, res) {
  if (req.user.role !== 'tutor') {
    return res.status(403).json({ message: 'Only tutors can create lessons' });
  }
  const { title, description, subject, startTime, durationMinutes, price } = req.body;
  if (!title || !subject || !startTime || price == null) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  const lesson = await Lesson.create({
    title,
    description,
    subject,
    startTime,
    durationMinutes: durationMinutes || 60,
    price,
    tutor: req.user._id,
    status: 'available',
    meetingRoom: `edumeet-${crypto.randomBytes(6).toString('hex')}`,
  });
  res.status(201).json({ lesson });
}

export async function updateLesson(req, res) {
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
  if (lesson.tutor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const fields = ['title', 'description', 'subject', 'startTime', 'durationMinutes', 'price'];
  for (const f of fields) {
    if (req.body[f] !== undefined) lesson[f] = req.body[f];
  }
  await lesson.save();
  res.json({ lesson });
}

export async function deleteLesson(req, res) {
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
  if (lesson.tutor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  await lesson.deleteOne();
  res.json({ ok: true });
}

// Anyone can list available lessons (optionally by tutor)
export async function listLessons(req, res) {
  const { tutor, status } = req.query;
  const filter = {};
  if (tutor) filter.tutor = tutor;
  if (status) filter.status = status;
  const lessons = await Lesson.find(filter)
    .populate('tutor', 'name avatar tutorProfile')
    .populate('student', 'name avatar')
    .sort({ startTime: 1 });
  res.json({ lessons });
}

export async function getLesson(req, res) {
  const lesson = await Lesson.findById(req.params.id)
    .populate('tutor', 'name avatar tutorProfile')
    .populate('student', 'name avatar email');
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
  res.json({ lesson });
}

// Student books a lesson slot (locks it before payment)
export async function bookLesson(req, res) {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Only students can book lessons' });
  }
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
  if (lesson.status !== 'available') {
    return res.status(400).json({ message: 'Lesson is no longer available' });
  }
  lesson.student = req.user._id;
  lesson.status = 'booked';
  await lesson.save();
  res.json({ lesson });
}

export async function cancelLesson(req, res) {
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

  const isStudent = lesson.student && lesson.student.toString() === req.user._id.toString();
  const isTutor = lesson.tutor.toString() === req.user._id.toString();
  if (!isStudent && !isTutor && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  lesson.status = 'cancelled';
  await lesson.save();
  res.json({ lesson });
}

export async function rescheduleLesson(req, res) {
  const { startTime } = req.body;
  if (!startTime) return res.status(400).json({ message: 'startTime required' });

  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

  const isStudent = lesson.student && lesson.student.toString() === req.user._id.toString();
  const isTutor = lesson.tutor.toString() === req.user._id.toString();
  if (!isStudent && !isTutor) return res.status(403).json({ message: 'Forbidden' });

  lesson.startTime = startTime;
  await lesson.save();
  res.json({ lesson });
}

// Mark a lesson completed (tutor only)
export async function completeLesson(req, res) {
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
  if (lesson.tutor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  lesson.status = 'completed';
  await lesson.save();
  res.json({ lesson });
}

// "My lessons" — for students or tutors
export async function myLessons(req, res) {
  const filter = req.user.role === 'tutor' ? { tutor: req.user._id } : { student: req.user._id };
  const lessons = await Lesson.find(filter)
    .populate('tutor', 'name avatar tutorProfile')
    .populate('student', 'name avatar')
    .sort({ startTime: 1 });
  res.json({ lessons });
}
