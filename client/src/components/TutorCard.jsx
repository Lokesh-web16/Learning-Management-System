import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, BadgeCheck, Clock, DollarSign } from 'lucide-react';

export default function TutorCard({ tutor }) {
  const tp = tutor.tutorProfile || {};
  const initials = tutor.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className="card p-6 group hover:border-brand-500/40 hover:shadow-glow transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          {tutor.avatar ? (
            <img src={tutor.avatar} alt={tutor.name} className="w-16 h-16 rounded-2xl object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-500 grid place-items-center text-xl font-bold">
              {initials}
            </div>
          )}
          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-ink-900 grid place-items-center">
            <BadgeCheck className="w-3 h-3 text-white" />
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-bold truncate">{tutor.name}</h3>
          <p className="text-sm text-white/60 line-clamp-1">{tp.headline || 'Experienced tutor'}</p>

          <div className="mt-2 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="font-semibold text-white">{tp.rating?.toFixed?.(1) || '0.0'}</span>
              <span className="text-white/50">({tp.reviewsCount || 0})</span>
            </span>
            <span className="flex items-center gap-1 text-white/60">
              <Clock className="w-4 h-4" /> {tp.experienceYears || 0} yrs
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-white/70 line-clamp-3 min-h-[60px]">
        {tutor.bio || 'No bio yet.'}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {(tp.subjects || []).slice(0, 3).map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-1 font-semibold">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          {tp.hourlyRate || 0}
          <span className="text-white/50 text-sm font-normal">/hr</span>
        </div>
        <Link to={`/tutors/${tutor._id}`} className="btn-primary text-sm">
          View profile
        </Link>
      </div>
    </motion.div>
  );
}
