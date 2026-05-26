import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';
import api from '../lib/api';
import PageContainer from '../components/PageContainer.jsx';

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  const lessonId = params.get('lesson');
  const [status, setStatus] = useState('confirming');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }
    api
      .post('/payments/confirm', { sessionId })
      .then(() => setStatus('done'))
      .catch(() => setStatus('error'));
  }, [sessionId]);

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-12 max-w-md mx-auto text-center"
      >
        {status === 'confirming' && (
          <>
            <Loader2 className="w-12 h-12 animate-spin mx-auto text-brand-300" />
            <p className="mt-4 text-white/70">Confirming your payment…</p>
          </>
        )}
        {status === 'done' && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
              className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 grid place-items-center"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            </motion.div>
            <h1 className="font-display text-2xl font-bold mt-4">Payment confirmed</h1>
            <p className="text-white/60 mt-2">Your lesson is locked in. See you in class!</p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-2">
              {lessonId && (
                <Link to={`/lesson/${lessonId}`} className="btn-primary">
                  Go to lesson
                </Link>
              )}
              <Link to="/dashboard" className="btn-ghost">View dashboard</Link>
            </div>
          </>
        )}
        {status === 'error' && (
          <>
            <h1 className="font-display text-2xl font-bold">Could not confirm</h1>
            <p className="text-white/60 mt-2">
              We could not verify the payment. If money was charged, contact support.
            </p>
            <Link to="/dashboard" className="btn-primary mt-6 inline-flex">
              Back to dashboard
            </Link>
          </>
        )}
      </motion.div>
    </PageContainer>
  );
}
