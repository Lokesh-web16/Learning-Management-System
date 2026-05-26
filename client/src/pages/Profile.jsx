import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Save, User, Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../lib/api';
import PageContainer from '../components/PageContainer.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Profile() {
  const { user, refresh } = useAuth();
  const [base, setBase] = useState({ name: '', avatar: '', bio: '' });
  const [tutor, setTutor] = useState({
    headline: '',
    qualifications: '',
    experienceYears: 0,
    subjects: '',
    hourlyRate: 0,
    languages: '',
  });
  const [prefs, setPrefs] = useState({ subjects: '', learningGoals: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    setBase({ name: user.name || '', avatar: user.avatar || '', bio: user.bio || '' });
    if (user.tutorProfile) {
      const tp = user.tutorProfile;
      setTutor({
        headline: tp.headline || '',
        qualifications: tp.qualifications || '',
        experienceYears: tp.experienceYears || 0,
        subjects: (tp.subjects || []).join(', '),
        hourlyRate: tp.hourlyRate || 0,
        languages: (tp.languages || []).join(', '),
      });
    }
    if (user.preferences) {
      setPrefs({
        subjects: (user.preferences.subjects || []).join(', '),
        learningGoals: user.preferences.learningGoals || '',
      });
    }
  }, [user]);

  if (!user) return null;

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...base };
      if (user.role === 'tutor') {
        payload.tutorProfile = {
          ...tutor,
          subjects: tutor.subjects.split(',').map((s) => s.trim()).filter(Boolean),
          languages: tutor.languages.split(',').map((s) => s.trim()).filter(Boolean),
          experienceYears: +tutor.experienceYears,
          hourlyRate: +tutor.hourlyRate,
        };
      }
      if (user.role === 'student') {
        payload.preferences = {
          subjects: prefs.subjects.split(',').map((s) => s.trim()).filter(Boolean),
          learningGoals: prefs.learningGoals,
        };
      }
      await api.put('/users/me', payload);
      await refresh();
      toast.success('Profile saved');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold">My profile</h1>
        <p className="text-white/60 mt-1">Tell others who you are.</p>
      </div>

      <form onSubmit={save} className="grid lg:grid-cols-3 gap-6">
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 lg:col-span-1"
        >
          <h2 className="font-display text-lg font-bold flex items-center gap-2">
            <User className="w-5 h-5 text-brand-300" /> Basic info
          </h2>
          <div className="mt-4 space-y-3">
            <div>
              <label className="label">Full name</label>
              <input value={base.name} onChange={(e) => setBase({ ...base, name: e.target.value })} className="input" required />
            </div>
            <div>
              <label className="label">Avatar URL</label>
              <input value={base.avatar} onChange={(e) => setBase({ ...base, avatar: e.target.value })} className="input" placeholder="https://…" />
            </div>
            <div>
              <label className="label">Bio</label>
              <textarea value={base.bio} onChange={(e) => setBase({ ...base, bio: e.target.value })} className="input min-h-[110px]" placeholder="Say something about yourself" />
            </div>
            <div className="text-xs text-white/50">
              <p>Email: <span className="text-white/80">{user.email}</span></p>
              <p>Role: <span className="text-white/80 capitalize">{user.role}</span></p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="card p-6 lg:col-span-2"
        >
          {user.role === 'tutor' ? (
            <>
              <h2 className="font-display text-lg font-bold flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-brand-300" /> Tutor profile
              </h2>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="label">Headline</label>
                  <input value={tutor.headline} onChange={(e) => setTutor({ ...tutor, headline: e.target.value })} className="input" placeholder="e.g. PhD in Mathematics, 10+ years" />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Qualifications</label>
                  <textarea value={tutor.qualifications} onChange={(e) => setTutor({ ...tutor, qualifications: e.target.value })} className="input min-h-[80px]" />
                </div>
                <div>
                  <label className="label">Experience (years)</label>
                  <input type="number" min="0" value={tutor.experienceYears} onChange={(e) => setTutor({ ...tutor, experienceYears: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="label">Hourly rate (USD)</label>
                  <input type="number" min="0" value={tutor.hourlyRate} onChange={(e) => setTutor({ ...tutor, hourlyRate: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="label">Subjects (comma separated)</label>
                  <input value={tutor.subjects} onChange={(e) => setTutor({ ...tutor, subjects: e.target.value })} className="input" placeholder="Math, Physics" />
                </div>
                <div>
                  <label className="label">Languages</label>
                  <input value={tutor.languages} onChange={(e) => setTutor({ ...tutor, languages: e.target.value })} className="input" placeholder="English, Spanish" />
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-display text-lg font-bold flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-brand-300" /> Learning preferences
              </h2>
              <div className="mt-4 space-y-3">
                <div>
                  <label className="label">Subjects you want to learn</label>
                  <input value={prefs.subjects} onChange={(e) => setPrefs({ ...prefs, subjects: e.target.value })} className="input" placeholder="Math, Physics" />
                </div>
                <div>
                  <label className="label">Learning goals</label>
                  <textarea value={prefs.learningGoals} onChange={(e) => setPrefs({ ...prefs, learningGoals: e.target.value })} className="input min-h-[120px]" placeholder="What do you hope to achieve?" />
                </div>
              </div>
            </>
          )}

          <div className="mt-6 flex justify-end">
            <button disabled={saving} className="btn-primary">
              <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </motion.section>
      </form>
    </PageContainer>
  );
}
