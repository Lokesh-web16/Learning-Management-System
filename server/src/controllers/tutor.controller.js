import User from '../models/User.js';

export async function listTutors(req, res) {
  const { q, subject, minRating, maxPrice, sort } = req.query;
  const filter = { role: 'tutor', isActive: true };

  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: 'i' } },
      { 'tutorProfile.headline': { $regex: q, $options: 'i' } },
      { 'tutorProfile.subjects': { $regex: q, $options: 'i' } },
    ];
  }
  if (subject) filter['tutorProfile.subjects'] = { $regex: subject, $options: 'i' };
  if (minRating) filter['tutorProfile.rating'] = { $gte: Number(minRating) };
  if (maxPrice) filter['tutorProfile.hourlyRate'] = { $lte: Number(maxPrice) };

  let query = User.find(filter).select('-password');

  switch (sort) {
    case 'price_asc':
      query = query.sort({ 'tutorProfile.hourlyRate': 1 });
      break;
    case 'price_desc':
      query = query.sort({ 'tutorProfile.hourlyRate': -1 });
      break;
    case 'rating_desc':
      query = query.sort({ 'tutorProfile.rating': -1 });
      break;
    default:
      query = query.sort({ createdAt: -1 });
  }

  const tutors = await query.exec();
  res.json({ tutors });
}

export async function getTutor(req, res) {
  const tutor = await User.findOne({ _id: req.params.id, role: 'tutor' }).select('-password');
  if (!tutor) return res.status(404).json({ message: 'Tutor not found' });
  res.json({ tutor });
}
