import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ['student', 'tutor', 'admin'],
      default: 'student',
    },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
    isActive: { type: Boolean, default: true },

    // Student-specific
    preferences: {
      subjects: [{ type: String }],
      learningGoals: { type: String, default: '' },
    },

    // Tutor-specific
    tutorProfile: {
      headline: { type: String, default: '' },
      qualifications: { type: String, default: '' },
      experienceYears: { type: Number, default: 0 },
      subjects: [{ type: String }],
      hourlyRate: { type: Number, default: 0 },
      languages: [{ type: String }],
      availability: [
        {
          day: { type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
          from: String, // HH:mm
          to: String,
        },
      ],
      rating: { type: Number, default: 0 },
      reviewsCount: { type: Number, default: 0 },
      earnings: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password);
};

userSchema.methods.toSafe = function () {
  const u = this.toObject();
  delete u.password;
  return u;
};

export default mongoose.model('User', userSchema);
