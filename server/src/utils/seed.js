import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Lesson from '../models/Lesson.js';
import Review from '../models/Review.js';
import crypto from 'crypto';

const TUTORS = [
  {
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@demo.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'PhD in Mathematics from Stanford. I help students fall in love with calculus, algebra, and statistics through real-world problems.',
    headline: 'PhD Mathematics • 12+ years teaching',
    qualifications: 'Stanford PhD, ex-Google Research',
    experienceYears: 12,
    subjects: ['Mathematics', 'Calculus', 'Statistics'],
    languages: ['English', 'French'],
    hourlyRate: 65,
    rating: 4.9,
  },
  {
    name: 'Marcus Chen',
    email: 'marcus.chen@demo.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: 'Senior Software Engineer turned tutor. I teach Python, JavaScript, React, and system design with a project-based approach.',
    headline: 'Senior Engineer • Full-stack & ML',
    qualifications: 'BSc CS, MIT • Ex-Meta engineer',
    experienceYears: 9,
    subjects: ['Programming', 'Python', 'JavaScript', 'React'],
    languages: ['English', 'Mandarin'],
    hourlyRate: 80,
    rating: 4.8,
  },
  {
    name: 'Aisha Patel',
    email: 'aisha.patel@demo.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    bio: 'Native English & Spanish speaker. Conversational fluency in 8 weeks or your money back. Friendly, patient, and fun.',
    headline: 'Languages coach • TEFL certified',
    qualifications: 'MA Linguistics, Cambridge',
    experienceYears: 7,
    subjects: ['English', 'Spanish', 'IELTS'],
    languages: ['English', 'Spanish', 'Hindi'],
    hourlyRate: 35,
    rating: 4.95,
  },
  {
    name: 'David Thompson',
    email: 'david.thompson@demo.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Physics & Chemistry tutor. Former Cambridge researcher. I make hard concepts click with diagrams, demos, and storytelling.',
    headline: 'PhD Physics • Cambridge alum',
    qualifications: 'Cambridge PhD, Royal Society Fellow',
    experienceYears: 15,
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    languages: ['English'],
    hourlyRate: 70,
    rating: 4.85,
  },
  {
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@demo.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    bio: 'Wharton MBA, ex-McKinsey consultant. I teach business strategy, finance, and case interview prep for top firms.',
    headline: 'MBA Wharton • Strategy coach',
    qualifications: 'Wharton MBA, ex-McKinsey',
    experienceYears: 8,
    subjects: ['Business', 'Finance', 'Case Prep'],
    languages: ['English', 'Spanish', 'Portuguese'],
    hourlyRate: 95,
    rating: 4.9,
  },
  {
    name: 'James O’Brien',
    email: 'james.obrien@demo.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    bio: 'Professional musician & Berklee grad. Guitar, piano, music theory — beginner to performance level.',
    headline: 'Berklee grad • Touring musician',
    qualifications: 'Berklee College of Music',
    experienceYears: 11,
    subjects: ['Music', 'Guitar', 'Piano'],
    languages: ['English'],
    hourlyRate: 45,
    rating: 4.75,
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@demo.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    bio: 'Data scientist & ML engineer. I teach Python, SQL, statistics, and the math behind machine learning, hands-on.',
    headline: 'ML Engineer • Data science mentor',
    qualifications: 'MSc Data Science, ETH Zurich',
    experienceYears: 6,
    subjects: ['Data Science', 'Machine Learning', 'Python'],
    languages: ['English', 'Hindi'],
    hourlyRate: 75,
    rating: 4.92,
  },
  {
    name: 'Olivia Bennett',
    email: 'olivia.bennett@demo.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    bio: 'Creative writing coach & published author. Help with essays, college apps, fiction, and finding your voice.',
    headline: 'Author • Writing coach',
    qualifications: 'MFA Creative Writing, Iowa',
    experienceYears: 10,
    subjects: ['Writing', 'English Literature', 'Essays'],
    languages: ['English'],
    hourlyRate: 55,
    rating: 4.88,
  },
];

const REVIEW_AUTHORS = [
  'Alex Johnson',
  'Maya Davis',
  'Liam Carter',
  'Zoe Kim',
  'Noah Patel',
  'Ava Reyes',
];

function nextDayAt(daysFromNow, hour) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  d.setHours(hour, 0, 0, 0);
  return d;
}

export async function seedDemoData() {
  const tutorCount = await User.countDocuments({ role: 'tutor' });
  if (tutorCount > 0) return;

  console.log('Seeding demo tutors and lessons…');

  const passwordHash = await bcrypt.hash('demo1234', 10);

  // Create demo students for reviews
  const studentDocs = await User.insertMany(
    REVIEW_AUTHORS.map((name, i) => ({
      name,
      email: `student${i + 1}@demo.com`,
      password: passwordHash,
      role: 'student',
      avatar: `https://i.pravatar.cc/200?img=${i + 30}`,
    }))
  );

  for (const t of TUTORS) {
    const tutor = await User.create({
      name: t.name,
      email: t.email,
      password: passwordHash,
      role: 'tutor',
      avatar: t.avatar,
      bio: t.bio,
      tutorProfile: {
        headline: t.headline,
        qualifications: t.qualifications,
        experienceYears: t.experienceYears,
        subjects: t.subjects,
        languages: t.languages,
        hourlyRate: t.hourlyRate,
        rating: t.rating,
        reviewsCount: 3,
        earnings: 0,
      },
    });

    // 3 available lessons per tutor across the next 2 weeks
    const slots = [
      { day: 1, hour: 16 },
      { day: 3, hour: 18 },
      { day: 6, hour: 10 },
    ];
    for (const s of slots) {
      await Lesson.create({
        title: `${t.subjects[0]} session with ${t.name.split(' ')[0]}`,
        description: `Personalized 1-on-1 lesson on ${t.subjects[0]}.`,
        subject: t.subjects[0],
        startTime: nextDayAt(s.day, s.hour),
        durationMinutes: 60,
        price: t.hourlyRate,
        tutor: tutor._id,
        status: 'available',
        meetingRoom: `edumeet-${crypto.randomBytes(6).toString('hex')}`,
      });
    }

    // Reviews
    const samples = [
      { rating: 5, comment: 'Amazing tutor — super patient and clear explanations.' },
      { rating: 5, comment: 'Improved more in 4 lessons than a whole semester at school!' },
      { rating: 4, comment: 'Great experience. Highly recommend.' },
    ];
    for (let i = 0; i < samples.length; i++) {
      await Review.create({
        tutor: tutor._id,
        student: studentDocs[i]._id,
        rating: samples[i].rating,
        comment: samples[i].comment,
      });
    }
  }

  console.log(`Seeded ${TUTORS.length} tutors with lessons and reviews.`);
}
