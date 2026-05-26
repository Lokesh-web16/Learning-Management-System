import User from '../models/User.js';
import Lesson from '../models/Lesson.js';
import Payment from '../models/Payment.js';

export async function listUsers(_req, res) {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json({ users });
}

export async function setUserActive(req, res) {
  const { isActive } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: !!isActive },
    { new: true }
  ).select('-password');
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json({ user });
}

export async function setUserRole(req, res) {
  const { role } = req.body;
  if (!['student', 'tutor', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select(
    '-password'
  );
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json({ user });
}

export async function deleteUser(req, res) {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true });
}

export async function stats(_req, res) {
  const [users, students, tutors, lessons, payments, revenue] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: 'student' }),
    User.countDocuments({ role: 'tutor' }),
    Lesson.countDocuments(),
    Payment.countDocuments({ status: 'succeeded' }),
    Payment.aggregate([
      { $match: { status: 'succeeded' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
  ]);
  res.json({
    users,
    students,
    tutors,
    lessons,
    payments,
    revenue: revenue[0]?.total || 0,
  });
}
