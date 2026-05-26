import User from '../models/User.js';

export async function updateProfile(req, res) {
  const allowed = ['name', 'avatar', 'bio', 'preferences', 'tutorProfile'];
  const updates = {};
  for (const key of allowed) {
    if (req.body[key] !== undefined) updates[key] = req.body[key];
  }
  // Block changing tutorProfile if you're not a tutor
  if (updates.tutorProfile && req.user.role !== 'tutor') {
    delete updates.tutorProfile;
  }
  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  }).select('-password');
  res.json({ user });
}

export async function getById(req, res) {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json({ user });
}
