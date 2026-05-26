import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Calendar,
  Video,
  Star,
  Clock,
  XCircle,
  PlayCircle,
  Loader2,
  CalendarClock,
} from 'lucide-react';
import api from '../lib/api';
import PageContainer from '../components/PageContainer.jsx';

const STATUS_STYLES = {
  booked: 'text-amber-300 border-amber-400/30 bg-amber-500/10',
  paid: 'text-emerald-300 border-emerald-400/30 bg-emerald-500/10',
  completed: 'text-brand-300 border-brand-400/30 bg-brand-500/10',
  cancelled: 'text-rose-300 border-rose-400/30 bg-rose-500/10',
  available: 'text-white/70 border-white/10 bg-white/5',
};

export default function StudentDashboard() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewFor, setReviewFor] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/lessons/mine/list');
      setLessons(data.lessons);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = async (id) => {
    if (!confirm('Cancel this lesson?')) return;
    try {
      await api.post(`/lessons/${id}/cancel`);
      toast.success('Lesson cancelled');
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed');
    }
  };

  const reschedule = async (id) => {
    const newTime = prompt('Enter new date/time (YYYY-MM-DDTHH:mm):');
    if (!newTime) return;
    try {
      await api.post(`/lessons/${id}/reschedule`, { startTime: newTime });
      toast.success('Lesson rescheduled');
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed');
    }
  };

  const submitReview = async () => {
    if (!reviewFor) return;
    try {
      await api.post('/reviews', {
        tutorId: reviewFor.tutor._id,
        lessonId: reviewFor._id,
        rating: reviewData.rating,
        comment: reviewData.comment,
      });
      toast.success('Thanks for your review!');
      setReviewFor(null);
      setReviewData({ rating: 5, comment: '' });
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed');
    }
  };

  const upcoming = lessons.filter((l) => ['booked', 'paid'].includes(l.status));
  const past = lessons.filter((l) => ['completed', 'cancelled'].includes(l.status));

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold">My Learning</h1>
        <p className="text-white/60 mt-1">Track your lessons and reviews.</p>
      </div>

      {loading ? (
        <div className="grid place-items-center py-20"><Loader2 className="w-6 h-6 animate-spin" /></div>
      ) : (
        <>
          <Section title="Upcoming" icon={CalendarClock}>
            {upcoming.length === 0 ? (
              <Empty msg="No upcoming lessons. Browse tutors to book one." cta={<Link to="/tutors" className="btn-primary text-sm mt-3">Find a tutor</Link>} />
            ) : (
              <div className="grid gap-3">
                {upcoming.map((l) => (
                  <LessonRow key={l._id} l={l} onCancel={cancel} onReschedule={reschedule} />
                ))}
              </div>
            )}
          </Section>

          <Section title="Past lessons" icon={Calendar}>
            {past.length === 0 ? (
              <Empty msg="No completed lessons yet." />
            ) : (
              <div className="grid gap-3">
                {past.map((l) => (
                  <div
                    key={l._id}
                    className="card p-5 flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-semibold">{l.title}</p>
                      <p className="text-sm text-white/60">
                        with {l.tutor?.name} • {format(new Date(l.startTime), 'MMM d, yyyy')}
                      </p>
                      <span className={`chip mt-2 border ${STATUS_STYLES[l.status]}`}>{l.status}</span>
                    </div>
                    <div className="flex gap-2">
                      {l.recordingUrl && (
                        <Link to={`/lesson/${l._id}`} className="btn-ghost text-sm">
                          <PlayCircle className="w-4 h-4" /> Replay
                        </Link>
                      )}
                      {l.status === 'completed' && (
                        <button onClick={() => setReviewFor(l)} className="btn-primary text-sm">
                          <Star className="w-4 h-4" /> Review
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </>
      )}

      {reviewFor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur p-4"
          onClick={() => setReviewFor(null)}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="card p-6 w-full max-w-md"
          >
            <h3 className="font-display text-xl font-bold">Review {reviewFor.tutor?.name}</h3>
            <p className="text-sm text-white/60 mt-1">{reviewFor.title}</p>

            <div className="flex gap-1 mt-5 justify-center">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setReviewData({ ...reviewData, rating: n })}
                  className="p-1"
                >
                  <Star
                    className={`w-9 h-9 transition ${
                      n <= reviewData.rating ? 'text-amber-400 fill-amber-400' : 'text-white/20'
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              value={reviewData.comment}
              onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
              className="input mt-4 min-h-[100px]"
              placeholder="What did you think of the lesson?"
            />

            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setReviewFor(null)} className="btn-ghost text-sm">
                Cancel
              </button>
              <button onClick={submitReview} className="btn-primary text-sm">
                Submit review
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </PageContainer>
  );
}

function Section({ title, icon: Icon, children }) {
  return (
    <section className="mb-10">
      <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
        <Icon className="w-5 h-5 text-brand-300" /> {title}
      </h2>
      {children}
    </section>
  );
}

function Empty({ msg, cta }) {
  return (
    <div className="card p-10 text-center">
      <p className="text-white/60">{msg}</p>
      {cta}
    </div>
  );
}

function LessonRow({ l, onCancel, onReschedule }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-5 flex flex-col md:flex-row md:items-center justify-between gap-3"
    >
      <div>
        <div className="flex items-center gap-2">
          <p className="font-semibold">{l.title}</p>
          <span className={`chip border ${STATUS_STYLES[l.status]}`}>{l.status}</span>
        </div>
        <p className="text-sm text-white/60 mt-0.5">
          with {l.tutor?.name} • {format(new Date(l.startTime), 'EEE, MMM d • h:mm a')}
        </p>
        <p className="text-xs text-white/40 mt-0.5 flex items-center gap-1">
          <Clock className="w-3 h-3" /> {l.durationMinutes} min
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {l.status === 'paid' && (
          <Link to={`/lesson/${l._id}`} className="btn-primary text-sm">
            <Video className="w-4 h-4" /> Join class
          </Link>
        )}
        <button onClick={() => onReschedule(l._id)} className="btn-ghost text-sm">
          Reschedule
        </button>
        <button onClick={() => onCancel(l._id)} className="btn-outline text-sm text-rose-300">
          <XCircle className="w-4 h-4" /> Cancel
        </button>
      </div>
    </motion.div>
  );
}
