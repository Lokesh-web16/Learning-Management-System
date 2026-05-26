import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Loader2, X } from 'lucide-react';
import api from '../lib/api';
import TutorCard from '../components/TutorCard.jsx';
import PageContainer from '../components/PageContainer.jsx';

export default function TutorList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    q: searchParams.get('q') || '',
    subject: searchParams.get('subject') || '',
    minRating: searchParams.get('minRating') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'rating_desc',
  });

  const load = async (override) => {
    setLoading(true);
    try {
      const f = override || filters;
      const params = Object.fromEntries(
        Object.entries(f).filter(([, v]) => v !== '' && v != null)
      );
      const { data } = await api.get('/tutors', { params });
      setTutors(data.tutors);
      setSearchParams(params, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apply = (e) => {
    e.preventDefault();
    load();
  };

  const reset = () => {
    const cleared = { q: '', subject: '', minRating: '', maxPrice: '', sort: 'rating_desc' };
    setFilters(cleared);
    load(cleared);
  };

  const activeFilterCount = Object.entries(filters).filter(
    ([k, v]) => v !== '' && v != null && !(k === 'sort' && v === 'rating_desc')
  ).length;

  return (
    <PageContainer>
      <div className="relative mb-8 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-brand-500/15 via-purple-500/10 to-emerald-500/5 p-8 sm:p-10">
        <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
        <div className="relative">
          <h1 className="font-display text-4xl sm:text-5xl font-bold">Find your tutor</h1>
          <p className="text-white/70 mt-2 max-w-xl">
            {filters.subject ? (
              <>
                Showing top tutors for{' '}
                <span className="gradient-text font-semibold">{filters.subject}</span>.
              </>
            ) : (
              'Browse hundreds of vetted experts ready to help you reach your goals.'
            )}
          </p>
        </div>
      </div>

      <form
        onSubmit={apply}
        className="card p-4 sm:p-5 mb-8 grid md:grid-cols-12 gap-3"
      >
        <div className="md:col-span-4 relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={filters.q}
            onChange={(e) => setFilters({ ...filters, q: e.target.value })}
            className="input pl-10"
            placeholder="Search by name, headline, subject…"
          />
        </div>
        <input
          value={filters.subject}
          onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
          className="input md:col-span-2"
          placeholder="Subject"
        />
        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          value={filters.minRating}
          onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
          className="input md:col-span-2"
          placeholder="Min rating"
        />
        <input
          type="number"
          min="0"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          className="input md:col-span-2"
          placeholder="Max $/hr"
        />
        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="input md:col-span-2"
        >
          <option value="rating_desc">Top rated</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
        </select>
        <div className="md:col-span-12 flex gap-2 justify-between items-center">
          <p className="text-sm text-white/50">
            {loading ? '…' : `${tutors.length} tutor${tutors.length === 1 ? '' : 's'} found`}
            {activeFilterCount > 0 && (
              <span className="ml-2 chip">{activeFilterCount} filter{activeFilterCount === 1 ? '' : 's'}</span>
            )}
          </p>
          <div className="flex gap-2">
            {activeFilterCount > 0 && (
              <button type="button" onClick={reset} className="btn-ghost text-sm">
                <X className="w-4 h-4" /> Clear
              </button>
            )}
            <button type="submit" className="btn-primary text-sm">
              <SlidersHorizontal className="w-4 h-4" /> Apply
            </button>
          </div>
        </div>
      </form>

      {loading ? (
        <div className="grid place-items-center py-20 text-white/60">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : tutors.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-white/70">No tutors match your filters.</p>
          <button onClick={reset} className="btn-ghost text-sm mt-4">
            Reset filters
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {tutors.map((t) => (
            <TutorCard key={t._id} tutor={t} />
          ))}
        </motion.div>
      )}
    </PageContainer>
  );
}
