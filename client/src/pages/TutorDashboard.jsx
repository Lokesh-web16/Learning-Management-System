import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import {
  Plus,
  Calendar,
  DollarSign,
  Users,
  Star,
  Loader2,
  Trash2,
  Edit3,
  CheckCircle2,
  Video,
  Upload,
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../lib/api';
import PageContainer from '../components/PageContainer.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const empty = {
  title: '',
  description: '',
  subject: '',
  startTime: '',
  durationMinutes: 60,
  price: 30,
};

export default function TutorDashboard() {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [uploadingFor, setUploadingFor] = useState(null);

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

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/lessons/${editingId}`, form);
        toast.success('Lesson updated');
      } else {
        await api.post('/lessons', form);
        toast.success('Lesson created');
      }
      setShowForm(false);
      setForm(empty);
      setEditingId(null);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed');
    }
  };

  const startEdit = (l) => {
    setEditingId(l._id);
    setForm({
      title: l.title,
      description: l.description,
      subject: l.subject,
      startTime: l.startTime.slice(0, 16),
      durationMinutes: l.durationMinutes,
      price: l.price,
    });
    setShowForm(true);
  };

  const remove = async (id) => {
    if (!confirm('Delete this lesson?')) return;
    try {
      await api.delete(`/lessons/${id}`);
      toast.success('Deleted');
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed');
    }
  };

  const complete = async (id) => {
    try {
      await api.post(`/lessons/${id}/complete`);
      toast.success('Lesson marked completed');
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed');
    }
  };

  const uploadRecording = async (lessonId, file) => {
    if (!file) return;
    setUploadingFor(lessonId);
    try {
      const fd = new FormData();
      fd.append('recording', file);
      await api.post(`/recordings/${lessonId}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Recording uploaded');
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Upload failed');
    } finally {
      setUploadingFor(null);
    }
  };

  const tp = user?.tutorProfile || {};
  const stats = [
    { label: 'Total lessons', value: lessons.length, icon: Calendar },
    { label: 'Earnings', value: `$${tp.earnings || 0}`, icon: DollarSign },
    { label: 'Reviews', value: tp.reviewsCount || 0, icon: Users },
    { label: 'Rating', value: (tp.rating || 0).toFixed(1), icon: Star },
  ];

  return (
    <PageContainer>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold">Tutor Hub</h1>
          <p className="text-white/60 mt-1">Manage your lessons, earnings, and recordings.</p>
        </div>
        <button
          onClick={() => {
            setForm(empty);
            setEditingId(null);
            setShowForm(true);
          }}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" /> Create lesson
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card p-5"
          >
            <s.icon className="w-5 h-5 text-brand-300" />
            <p className="mt-2 text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-white/60">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {!tp.headline && (
        <div className="card p-5 mb-8 border-amber-400/30 bg-amber-500/5">
          <p className="text-amber-200 text-sm">
            Complete your tutor profile to start attracting students.{' '}
            <Link to="/profile" className="underline">Edit profile</Link>
          </p>
        </div>
      )}

      <h2 className="font-display text-2xl font-bold mb-4">My lessons</h2>

      {loading ? (
        <div className="grid place-items-center py-20"><Loader2 className="w-6 h-6 animate-spin" /></div>
      ) : lessons.length === 0 ? (
        <div className="card p-10 text-center text-white/60">No lessons yet. Create your first one!</div>
      ) : (
        <div className="grid gap-3">
          {lessons.map((l) => (
            <motion.div
              key={l._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-5 flex flex-col lg:flex-row lg:items-center gap-4 justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{l.title}</p>
                  <span className="chip">{l.status}</span>
                </div>
                <p className="text-sm text-white/60 mt-0.5">
                  {l.subject} • {format(new Date(l.startTime), 'EEE, MMM d • h:mm a')} • ${l.price}
                </p>
                {l.student && (
                  <p className="text-xs text-emerald-300 mt-1">Booked by {l.student.name}</p>
                )}
                {l.recordingUrl && (
                  <p className="text-xs text-brand-300 mt-1">Recording available</p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {l.status === 'paid' && (
                  <Link to={`/lesson/${l._id}`} className="btn-primary text-sm">
                    <Video className="w-4 h-4" /> Start class
                  </Link>
                )}
                {(l.status === 'paid' || l.status === 'completed') && (
                  <label className="btn-ghost text-sm cursor-pointer">
                    {uploadingFor === l._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    {l.recordingUrl ? 'Replace recording' : 'Upload recording'}
                    <input
                      type="file"
                      accept="video/*"
                      hidden
                      onChange={(e) => uploadRecording(l._id, e.target.files?.[0])}
                    />
                  </label>
                )}
                {l.status === 'paid' && (
                  <button onClick={() => complete(l._id)} className="btn-ghost text-sm">
                    <CheckCircle2 className="w-4 h-4" /> Complete
                  </button>
                )}
                {l.status === 'available' && (
                  <button onClick={() => startEdit(l)} className="btn-ghost text-sm">
                    <Edit3 className="w-4 h-4" /> Edit
                  </button>
                )}
                <button onClick={() => remove(l._id)} className="btn-outline text-sm text-rose-300">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur grid place-items-center p-4"
          onClick={() => setShowForm(false)}
        >
          <motion.form
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={submit}
            className="card p-6 w-full max-w-lg"
          >
            <h3 className="font-display text-xl font-bold mb-4">
              {editingId ? 'Edit lesson' : 'New lesson'}
            </h3>
            <div className="grid gap-3">
              <div>
                <label className="label">Title</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" />
              </div>
              <div>
                <label className="label">Subject</label>
                <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input" placeholder="Mathematics" />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input min-h-[80px]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Start time</label>
                  <input
                    type="datetime-local"
                    required
                    value={form.startTime}
                    onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Duration (min)</label>
                  <input type="number" min="15" value={form.durationMinutes} onChange={(e) => setForm({ ...form, durationMinutes: +e.target.value })} className="input" />
                </div>
              </div>
              <div>
                <label className="label">Price (USD)</label>
                <input type="number" min="0" required value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} className="input" />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setShowForm(false)} className="btn-ghost text-sm">Cancel</button>
              <button type="submit" className="btn-primary text-sm">{editingId ? 'Save' : 'Create'}</button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </PageContainer>
  );
}
