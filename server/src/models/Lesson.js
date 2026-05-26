import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    subject: { type: String, required: true },
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    startTime: { type: Date, required: true },
    durationMinutes: { type: Number, default: 60 },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ['available', 'booked', 'paid', 'completed', 'cancelled'],
      default: 'available',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded'],
      default: 'unpaid',
    },
    meetingRoom: { type: String, default: '' }, // jitsi room name
    recordingUrl: { type: String, default: '' },
    paymentSessionId: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Lesson', lessonSchema);
