import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Lock, User, GraduationCap, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const u = await register(form);
      toast.success(`Welcome, ${u.name.split(' ')[0]}!`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] grid place-items-center px-4 py-10 relative">
      <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8 w-full max-w-md relative"
      >
        <h1 className="font-display text-3xl font-bold">Create your account</h1>
        <p className="text-white/60 mt-1 text-sm">It's free and takes a minute.</p>

        <div className="mt-6 grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-xl">
          {[
            { v: 'student', label: 'Student', icon: GraduationCap },
            { v: 'tutor', label: 'Tutor', icon: Briefcase },
          ].map((r) => (
            <button
              key={r.v}
              type="button"
              onClick={() => setForm({ ...form, role: r.v })}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm transition ${
                form.role === r.v
                  ? 'bg-gradient-to-r from-brand-500 to-purple-500 text-white shadow-glow'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <r.icon className="w-4 h-4" />
              {r.label}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="label">Full name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input pl-10"
                placeholder="Jane Doe"
              />
            </div>
          </div>
          <div>
            <label className="label">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input pl-10"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="label">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input pl-10"
                placeholder="At least 6 characters"
              />
            </div>
          </div>
          <button disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-sm text-white/60 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-300 hover:text-brand-200 font-medium">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
