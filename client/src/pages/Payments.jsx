import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Loader2, CreditCard } from 'lucide-react';
import api from '../lib/api';
import PageContainer from '../components/PageContainer.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Payments() {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/payments/mine')
      .then((res) => setPayments(res.data.payments))
      .finally(() => setLoading(false));
  }, []);

  const total = payments
    .filter((p) => p.status === 'succeeded')
    .reduce((s, p) => s + p.amount, 0);

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold flex items-center gap-3">
          <CreditCard className="w-8 h-8 text-brand-300" /> Payments
        </h1>
        <p className="text-white/60 mt-1">
          {user?.role === 'tutor' ? 'Earnings history' : 'Your payment history'}
        </p>
      </div>

      <div className="card p-6 mb-6">
        <p className="text-white/60 text-sm">{user?.role === 'tutor' ? 'Total earned' : 'Total spent'}</p>
        <p className="text-3xl font-bold mt-1">${total}</p>
      </div>

      {loading ? (
        <div className="grid place-items-center py-20"><Loader2 className="w-6 h-6 animate-spin" /></div>
      ) : payments.length === 0 ? (
        <div className="card p-10 text-center text-white/60">No payments yet.</div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-left text-white/70">
              <tr>
                <th className="px-4 py-3">Lesson</th>
                <th className="px-4 py-3">{user?.role === 'tutor' ? 'Student' : 'Tutor'}</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="border-t border-white/5">
                  <td className="px-4 py-3 font-medium">{p.lesson?.title || '—'}</td>
                  <td className="px-4 py-3 text-white/70">
                    {user?.role === 'tutor' ? p.student?.name : p.tutor?.name}
                  </td>
                  <td className="px-4 py-3 text-white/70">{format(new Date(p.createdAt), 'MMM d, yyyy')}</td>
                  <td className="px-4 py-3 font-semibold">${p.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`chip border ${
                      p.status === 'succeeded' ? 'border-emerald-400/30 text-emerald-300' :
                      p.status === 'failed' ? 'border-rose-400/30 text-rose-300' :
                      'border-amber-400/30 text-amber-300'
                    }`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageContainer>
  );
}
