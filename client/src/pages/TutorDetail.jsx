import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Star,
  Clock,
  GraduationCap,
  DollarSign,
  Calendar,
  CheckCircle2,
  Loader2,
  MessageSquare,
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../lib/api';
import PageContainer from '../components/PageContainer.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function TutorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tutor, setTutor] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const [t, l, r] = await Promise.all([
        api.get(`/tutors/${id}`),
        api.get('/lessons', { params: { tutor: id, status: 'available' } }),
        api.get(`/reviews/tutor/${id}`),
      ]);
      setTutor(t.data.tutor);
      setLessons(l.data.lessons);
      setReviews(r.data.reviews);
    } catch {
      toast.error('Could not load tutor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const bookAndPay = async (lesson) => {
    if (!user) {
      toast('Log in to book a lesson', { icon: '🔒' });
      navigate('/login');
      return;
    }
    if (user.role !== 'student') {
      toast.error('Only student accounts can book lessons');
      return;
    }
    setBookingId(lesson._id);
    try {
      await api.post(`/lessons/${lesson._id}/book`);
      const { data } = await api.post('/payments/checkout', { lessonId: lesson._id });
      window.location.href = data.url;
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Could not start checkout');
      setBookingId(null);
    }
  };

  if (loading || !tutor) {
    return (
      <PageContainer>
        <div className="grid place-items-center py-20 text-white/60">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      </PageContainer>
    );
  }

  const tp = tutor.tutorProfile || {};
  const initials = tutor.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8 mb-8 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl" />
        <div className="relative flex flex-col md:flex-row gap-6 items-start">
          {tutor.avatar ? (
            <img src={tutor.avatar} alt={tutor.name} className="w-28 h-28 rounded-2xl object-cover" />
          ) : (
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-500 grid place-items-center text-3xl font-bold">
              {initials}
            </div>
          )}
          <div className="flex-1">
            <h1 className="font-display text-3xl sm:text-4xl font-bold">{tutor.name}</h1>
            <p className="text-white/70 mt-1">{tp.headline || 'Experienced tutor'}</p>

            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-semibold text-white">{tp.rating?.toFixed(1) || '0.0'}</span>
                <span className="text-white/50">({tp.reviewsCount || 0} reviews)</span>
              </span>
              <span className="flex items-center gap-1 text-white/70">
                <Clock className="w-4 h-4" /> {tp.experienceYears || 0} years experience
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <DollarSign className="w-4 h-4" /> {tp.hourlyRate || 0}/hr
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {(tp.subjects || []).map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>
        </div>

        {tutor.bio && (
          <div className="mt-6">
            <h3 className="font-semibold text-white/90">About</h3>
            <p className="text-white/70 mt-2 leading-relaxed">{tutor.bio}</p>
          </div>
        )}

        {tp.qualifications && (
          <div className="mt-6">
            <h3 className="font-semibold text-white/90 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Qualifications
            </h3>
            <p className="text-white/70 mt-2">{tp.qualifications}</p>
          </div>
        )}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-300" /> Available lessons
          </h2>

          {lessons.length === 0 ? (
            <div className="card p-8 text-center text-white/60">
              No available slots right now. Check back soon.
            </div>
          ) : (
            <div className="space-y-3">
              {lessons.map((l) => (
                <motion.div
                  key={l._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between hover:border-brand-500/40 transition"
                >
                  <div>
                    <p className="font-semibold">{l.title}</p>
                    <p className="text-sm text-white/60 mt-0.5">{l.subject} • {l.durationMinutes} min</p>
                    <p className="text-sm text-white/80 mt-2">
                      {format(new Date(l.startTime), 'EEE, MMM d • h:mm a')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-emerald-400">${l.price}</span>
                    <button
                      onClick={() => bookAndPay(l)}
                      disabled={bookingId === l._id}
                      className="btn-primary text-sm"
                    >
                      {bookingId === l._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                      Book & pay
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-brand-300" /> Reviews
          </h2>
          {reviews.length === 0 ? (
            <div className="card p-6 text-center text-white/60 text-sm">No reviews yet.</div>
          ) : (
            <div className="space-y-3">
              {reviews.map((r) => (
                <div key={r._id} className="card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-500 grid place-items-center text-xs font-bold">
                      {r.student?.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{r.student?.name}</p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  {r.comment && <p className="text-sm text-white/70">{r.comment}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
