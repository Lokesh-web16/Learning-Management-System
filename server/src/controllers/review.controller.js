import Review from '../models/Review.js';
import Lesson from '../models/Lesson.js';
import User from '../models/User.js';

export async function createReview(req, res) {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Only students can leave reviews' });
  }
  const { tutorId, lessonId, rating, comment } = req.body;
  if (!tutorId || !rating) return res.status(400).json({ message: 'Missing fields' });

  // Make sure the student actually had a (paid/completed) lesson with this tutor
  const lesson = await Lesson.findOne({
    _id: lessonId,
    student: req.user._id,
    tutor: tutorId,
    status: { $in: ['paid', 'completed'] },
  });
  if (!lesson) return res.status(403).json({ message: 'You can only review tutors after a paid lesson' });

  const review = await Review.findOneAndUpdate(
    { tutor: tutorId, student: req.user._id, lesson: lessonId },
    { rating, comment, tutor: tutorId, student: req.user._id, lesson: lessonId },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  // Recalculate tutor rating
  const stats = await Review.aggregate([
    { $match: { tutor: review.tutor } },
    { $group: { _id: '$tutor', avg: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);
  if (stats[0]) {
    await User.findByIdAndUpdate(tutorId, {
      'tutorProfile.rating': Math.round(stats[0].avg * 10) / 10,
      'tutorProfile.reviewsCount': stats[0].count,
    });
  }

  res.status(201).json({ review });
}

export async function listForTutor(req, res) {
  const reviews = await Review.find({ tutor: req.params.tutorId })
    .populate('student', 'name avatar')
    .sort({ createdAt: -1 });
  res.json({ reviews });
}
