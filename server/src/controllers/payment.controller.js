import Stripe from 'stripe';
import Lesson from '../models/Lesson.js';
import Payment from '../models/Payment.js';
import User from '../models/User.js';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function createCheckoutSession(req, res) {
  if (!stripe) {
    return res.status(500).json({ message: 'Stripe not configured on server' });
  }
  const { lessonId } = req.body;
  const lesson = await Lesson.findById(lessonId).populate('tutor', 'name email');
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
  if (lesson.student?.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Book the lesson first' });
  }
  if (lesson.paymentStatus === 'paid') {
    return res.status(400).json({ message: 'Lesson already paid' });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(lesson.price * 100),
          product_data: {
            name: lesson.title,
            description: `Lesson with ${lesson.tutor.name}`,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}&lesson=${lesson._id}`,
    cancel_url: `${process.env.CLIENT_URL}/payment/cancel?lesson=${lesson._id}`,
    metadata: {
      lessonId: lesson._id.toString(),
      studentId: req.user._id.toString(),
      tutorId: lesson.tutor._id.toString(),
    },
  });

  await Payment.create({
    student: req.user._id,
    tutor: lesson.tutor._id,
    lesson: lesson._id,
    amount: lesson.price,
    sessionId: session.id,
    status: 'pending',
  });

  lesson.paymentSessionId = session.id;
  await lesson.save();

  res.json({ url: session.url, sessionId: session.id });
}

export async function confirmPayment(req, res) {
  if (!stripe) return res.status(500).json({ message: 'Stripe not configured' });
  const { sessionId } = req.body;
  if (!sessionId) return res.status(400).json({ message: 'sessionId required' });

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const payment = await Payment.findOne({ sessionId });
  if (!payment) return res.status(404).json({ message: 'Payment not found' });

  if (session.payment_status === 'paid' && payment.status !== 'succeeded') {
    payment.status = 'succeeded';
    await payment.save();

    const lesson = await Lesson.findById(payment.lesson);
    if (lesson) {
      lesson.paymentStatus = 'paid';
      lesson.status = 'paid';
      await lesson.save();
    }

    await User.findByIdAndUpdate(payment.tutor, {
      $inc: { 'tutorProfile.earnings': payment.amount },
    });
  }

  res.json({ payment, status: session.payment_status });
}

export async function myPayments(req, res) {
  const filter =
    req.user.role === 'tutor' ? { tutor: req.user._id } : { student: req.user._id };
  const payments = await Payment.find(filter)
    .populate('lesson', 'title startTime')
    .populate('tutor', 'name')
    .populate('student', 'name')
    .sort({ createdAt: -1 });
  res.json({ payments });
}
