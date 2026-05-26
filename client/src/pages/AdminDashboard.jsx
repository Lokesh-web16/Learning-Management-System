import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Users,
  GraduationCap,
  Briefcase,
  CalendarRange,
  Banknote,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  ShieldAlert,
  Trash2,
} from 'lucide-react';
import api from '../lib/api';
import PageContainer from '../components/PageContainer.jsx';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const load = async () => {
    setLoading(true);
    try {
      const [s, u] = await Promise.all([api.get('/admin/stats'), api.get('/admin/users')]);
      setStats(s.data);
      setUsers(u.data.users);
    } catch (err) {
      toast.error('Could not load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleActive = async (u) => {
    try {
      await api.put(`/admin/users/${u._id}/active`, { isActive: !u.isActive });
      toast.success(`User ${u.isActive ? 'deactivated' : 'activated'}`);
      load();
    } catch {
      toast.error('Failed');
    }
  };

  const setRole = async (u, role) => {
    try {
      await api.put(`/admin/users/${u._id}/role`, { role });
      toast.success(`Role updated to ${role}`);
      load();
    } catch {
      toast.error('Failed');
    }
  };

  const remove = async (u) => {
    if (!confirm(`Delete ${u.name}? This is permanent.`)) return;
    try {
      await api.delete(`/admin/users/${u._id}`);
      toast.success('User deleted');
      load();
    } catch {
      toast.error('Failed');
    }
  };

  const filtered = users.filter((u) => filter === 'all' || u.role === filter);

  const cards = stats
    ? [
        { label: 'Total users', value: stats.users, icon: Users },
        { label: 'Students', value: stats.students, icon: GraduationCap },
        { label: 'Tutors', value: stats.tutors, icon: Briefcase },
        { label: 'Lessons', value: stats.lessons, icon: CalendarRange },
        { label: 'Payments', value: stats.payments, icon: CheckCircle2 },
        { label: 'Revenue', value: `$${stats.revenue}`, icon: Banknote },
      ]
    : [];

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold">Admin</h1>
        <p className="text-white/60 mt-1">Manage users and watch the platform pulse.</p>
      </div>

      {loading || !stats ? (
        <div className="grid place-items-center py-20"><Loader2 className="w-6 h-6 animate-spin" /></div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {cards.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="card p-5"
              >
                <c.icon className="w-5 h-5 text-brand-300" />
                <p className="mt-2 text-xl font-bold">{c.value}</p>
                <p className="text-xs text-white/60">{c.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl font-bold">Users</h2>
            <div className="flex p-1 bg-white/5 rounded-xl">
              {['all', 'student', 'tutor', 'admin'].map((r) => (
                <button
                  key={r}
                  onClick={() => setFilter(r)}
                  className={`px-3 py-1.5 text-xs rounded-lg capitalize transition ${
                    filter === r ? 'bg-white/10 text-white' : 'text-white/60'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-white/70 text-left">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u._id} className="border-t border-white/5 hover:bg-white/[0.02]">
                      <td className="px-4 py-3 font-medium">{u.name}</td>
                      <td className="px-4 py-3 text-white/70">{u.email}</td>
                      <td className="px-4 py-3">
                        <select
                          value={u.role}
                          onChange={(e) => setRole(u, e.target.value)}
                          className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs"
                        >
                          <option value="student">student</option>
                          <option value="tutor">tutor</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`chip border ${u.isActive ? 'border-emerald-400/30 text-emerald-300' : 'border-rose-400/30 text-rose-300'}`}>
                          {u.isActive ? 'active' : 'inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5 justify-end">
                          <button
                            onClick={() => toggleActive(u)}
                            className="btn-ghost text-xs"
                            title={u.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {u.isActive ? <ShieldAlert className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                          </button>
                          <button onClick={() => remove(u)} className="btn-outline text-xs text-rose-300">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </PageContainer>
  );
}
