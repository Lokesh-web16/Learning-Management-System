import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import PageContainer from '../components/PageContainer.jsx';

export default function PaymentCancel() {
  const [params] = useSearchParams();
  const lessonId = params.get('lesson');

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-12 max-w-md mx-auto text-center"
      >
        <XCircle className="w-14 h-14 mx-auto text-rose-400" />
        <h1 className="font-display text-2xl font-bold mt-4">Payment cancelled</h1>
        <p className="text-white/60 mt-2">
          No charges were made. You can try again whenever you're ready.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          {lessonId ? (
            <Link to={`/lesson/${lessonId}`} className="btn-ghost">Try again</Link>
          ) : null}
          <Link to="/tutors" className="btn-primary">Browse tutors</Link>
        </div>
      </motion.div>
    </PageContainer>
  );
}
