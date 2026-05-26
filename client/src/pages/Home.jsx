import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Search,
  CalendarCheck,
  Video,
  CreditCard,
  PlayCircle,
  Star,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Code2,
  Music2,
  Calculator,
  FlaskConical,
  Quote,
  CheckCircle2,
  TrendingUp,
  Mic,
  MonitorPlay,
  GraduationCap,
} from 'lucide-react';
import SafeImage from '../components/SafeImage.jsx';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const HERO_AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop',
];

const SUBJECTS = [
  { name: 'Mathematics', icon: Calculator, img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop', tutors: '120+' },
  { name: 'Programming', icon: Code2, img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop', tutors: '85+' },
  { name: 'Languages', icon: Globe2, img: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop', tutors: '200+' },
  { name: 'Sciences', icon: FlaskConical, img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop', tutors: '95+' },
  { name: 'Business', icon: TrendingUp, img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop', tutors: '70+' },
  { name: 'Music', icon: Music2, img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop', tutors: '60+' },
];

const TESTIMONIALS = [
  {
    name: 'Jordan Reyes',
    role: 'CS Major • Stanford',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    quote: 'Aced my data structures final after just six lessons. My tutor explained recursion in a way no professor ever did.',
  },
  {
    name: 'Maya Chen',
    role: 'IELTS Candidate',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    quote: 'Went from 6.5 to 8.5 in four weeks. The recordings let me review every conversation. Worth every dollar.',
  },
  {
    name: 'Daniel Park',
    role: 'High School Senior',
    img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop',
    quote: 'Got into MIT. My calc tutor helped me build intuition I never had. The platform is also just beautiful to use.',
  },
];

const UNIVERSITIES = ['Stanford', 'MIT', 'Cambridge', 'Harvard', 'Oxford', 'ETH Zürich', 'Wharton', 'Berklee'];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* ============== HERO ============== */}
      <section className="relative pt-12 lg:pt-20 pb-28">
        {/* premium layered background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* base radial wash */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(70,96,255,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 30%, rgba(168,85,247,0.16), transparent 60%), radial-gradient(ellipse 60% 50% at 10% 70%, rgba(20,184,166,0.12), transparent 60%)',
            }}
          />
          {/* deep colored glows */}
          <div className="absolute -top-40 left-1/4 w-[800px] h-[800px] glow-blue rounded-full" />
          <div className="absolute top-20 -right-20 w-[700px] h-[700px] glow-purple rounded-full" />
          {/* film noise overlay */}
          <div className="absolute inset-0 bg-noise opacity-[0.5] mix-blend-overlay" />
          {/* fade out at bottom for clean handoff */}
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* COPY */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="lg:col-span-6 relative z-10"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 chip mb-7">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-white/80">Live 1-on-1 lessons • Top 1% tutors worldwide</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-[3rem] sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-extrabold tracking-[-0.04em] leading-[0.98]"
            >
              Learn <span className="gradient-text">anything,</span>
              <br />
              live, from the
              <br />
              world's best.
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-7 text-lg text-white/65 max-w-xl leading-relaxed">
              Book HD video lessons with hand-picked experts in math, code, languages,
              sciences, music, and more. Pay securely. Replay anytime.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link to="/tutors" className="btn-primary">
                <Search className="w-4 h-4" /> Find your tutor
              </Link>
              <Link to="/register" className="btn-ghost">
                Become a tutor <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12 flex items-center gap-5">
              <div className="flex -space-x-2.5">
                {HERO_AVATARS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-9 h-9 rounded-full border-2 border-ink-950 object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="ml-1 font-semibold text-sm">4.9</span>
                </div>
                <p className="text-xs text-white/55 mt-0.5">
                  <span className="text-white/85">10,000+</span> learners worldwide
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* HERO MOCKUP — single browser frame, NO floating cards */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:col-span-6 relative"
          >
            {/* soft glow underneath */}
            <div className="absolute -inset-4 -z-10 bg-gradient-to-br from-brand-500/15 via-purple-500/10 to-transparent rounded-[2.5rem] blur-2xl" />

            {/* the browser */}
            <div className="relative rounded-2xl border border-white/[0.09] bg-ink-800/80 backdrop-blur-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),0_0_60px_-30px_rgba(70,96,255,0.55)]">
              {/* top bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <span className="browser-dot bg-rose-400/80" />
                  <span className="browser-dot bg-amber-400/80" />
                  <span className="browser-dot bg-emerald-400/80" />
                </div>
                <div className="flex-1 mx-4 h-7 rounded-md bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-[11px] text-white/40 font-mono">
                  edumeet.com/lesson/calculus
                </div>
                <span className="chip text-rose-300 border-rose-400/30 bg-rose-500/10 hidden sm:inline-flex">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" /> LIVE
                </span>
              </div>

              {/* video */}
              <div className="relative aspect-[16/10]">
                <SafeImage
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=750&fit=crop"
                  alt="Live tutoring session"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />

                <div className="absolute top-4 left-4 chip bg-black/50 border-white/10 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="font-mono">42:18</span>
                </div>

                <div className="absolute top-4 right-4 chip bg-black/50 border-white/10 backdrop-blur-md">
                  <Mic className="w-3 h-3 text-emerald-400" /> 12 in class
                </div>

                {/* student PiP */}
                <div className="absolute bottom-24 right-4 w-28 h-20 rounded-xl overflow-hidden border-2 border-white/15 shadow-2xl">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=240&fit=crop"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[10px] bg-black/60 backdrop-blur">You</div>
                </div>

                {/* title */}
                <div className="absolute left-5 right-5 bottom-5">
                  <p className="text-[11px] text-white/60 mb-1 uppercase tracking-wider">Calculus Foundations • Week 3</p>
                  <p className="font-display font-semibold text-lg leading-tight">
                    Limits, derivatives, and the chain rule
                  </p>
                </div>

                {/* control bar */}
                <div className="absolute bottom-5 right-5 flex items-center gap-1.5">
                  <button className="w-9 h-9 rounded-full bg-white/15 backdrop-blur grid place-items-center hover:bg-white/25 transition">
                    <Mic className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white/15 backdrop-blur grid place-items-center hover:bg-white/25 transition">
                    <Video className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-rose-500 grid place-items-center hover:bg-rose-600 transition">
                    <PlayCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* tutor strip */}
              <div className="flex items-center gap-4 px-5 py-4 border-t border-white/[0.06] bg-white/[0.02]">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop"
                  className="w-11 h-11 rounded-full object-cover"
                  alt="Sarah Mitchell"
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm">Sarah Mitchell</p>
                  <p className="text-xs text-white/50">Mathematics • Stanford PhD</p>
                </div>
                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-semibold text-white">4.9</span>
                  <span className="text-white/40 hidden sm:inline">(128)</span>
                </div>
              </div>
            </div>

            {/* small inline stats row BELOW the frame, no overlap */}
            <div className="hidden md:grid grid-cols-3 gap-3 mt-5">
              <div className="card px-4 py-3">
                <p className="text-[10px] text-white/45 uppercase tracking-wider">Avg score gain</p>
                <p className="font-bold text-sm mt-0.5 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> +38%
                </p>
              </div>
              <div className="card px-4 py-3">
                <p className="text-[10px] text-white/45 uppercase tracking-wider">Lessons today</p>
                <p className="font-bold text-sm mt-0.5">2,847</p>
              </div>
              <div className="card px-4 py-3">
                <p className="text-[10px] text-white/45 uppercase tracking-wider">Active tutors</p>
                <p className="font-bold text-sm mt-0.5">630+</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============== UNIVERSITY MARQUEE ============== */}
      <section className="border-y border-white/[0.05] bg-white/[0.015] py-10 overflow-hidden">
        <p className="text-center text-[11px] text-white/35 uppercase tracking-[0.25em] mb-7 font-semibold">
          Tutors from the world's leading institutions
        </p>
        <div className="relative">
          <div className="flex marquee gap-16 whitespace-nowrap text-white/40 font-display font-bold text-2xl">
            {[...UNIVERSITIES, ...UNIVERSITIES, ...UNIVERSITIES].map((u, i) => (
              <span key={i} className="flex items-center gap-16">
                {u}
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============== SUBJECTS ============== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-brand-300 font-semibold text-xs uppercase tracking-[0.2em]">
              Browse by subject
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 tracking-tight">
              What do you want to <span className="gradient-text">master?</span>
            </h2>
          </div>
          <Link to="/tutors" className="btn-ghost text-sm">
            See all tutors <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUBJECTS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/tutors?subject=${encodeURIComponent(s.name)}`}
                className="group relative block aspect-[4/3] rounded-3xl overflow-hidden border border-white/[0.07] hover:border-white/20 transition"
              >
                <SafeImage
                  src={s.img}
                  alt={s.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-xl grid place-items-center border border-white/15">
                      <s.icon className="w-4 h-4" />
                    </div>
                    <span className="chip">{s.tutors} tutors</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{s.name}</h3>
                  <p className="text-sm text-white/65 mt-1 flex items-center gap-1 group-hover:text-white transition">
                    Browse tutors
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============== HOW IT WORKS ============== */}
      <section className="relative py-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] glow-blue rounded-full opacity-60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-brand-300 font-semibold text-xs uppercase tracking-[0.2em]">How it works</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 tracking-tight leading-[1.05]">
              Your first lesson in <br />
              <span className="gradient-text">under 5 minutes.</span>
            </h2>
            <div className="mt-10 space-y-2">
              {[
                { icon: Search, title: 'Discover', desc: 'Filter tutors by subject, price, and rating.' },
                { icon: CalendarCheck, title: 'Book a slot', desc: 'See live availability. Reschedule anytime.' },
                { icon: CreditCard, title: 'Pay securely', desc: 'Stripe-powered checkout, encrypted end-to-end.' },
                { icon: Video, title: 'Learn live', desc: 'HD classroom in your browser. Replay later.' },
              ].map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="group flex items-start gap-5 p-5 rounded-2xl hover:bg-white/[0.03] transition border border-transparent hover:border-white/[0.05]"
                >
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-500 grid place-items-center shadow-glow group-hover:scale-105 transition">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold text-lg flex items-center gap-3">
                      {s.title}
                      <span className="text-white/25 text-xs font-mono">0{i + 1}</span>
                    </h3>
                    <p className="text-white/55 mt-1 text-sm">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-glow">
              <SafeImage
                src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?w=1000&h=900&fit=crop"
                alt="Student learning online"
                className="w-full h-[560px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-lg leading-snug max-w-md">
                  "Best learning experience I've ever had online. The platform feels effortless."
                </p>
                <p className="text-sm text-white/55 mt-3">— Daniel, MIT '28</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============== FEATURES BENTO ============== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-brand-300 font-semibold text-xs uppercase tracking-[0.2em]">Why EduMeet</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 tracking-tight">
            Everything you need to <span className="gradient-text">actually learn.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-6 gap-4">
          {/* Big — HD Video */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 card p-8 relative overflow-hidden group"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-500 grid place-items-center">
                <MonitorPlay className="w-4 h-4" />
              </div>
              <span className="chip">Built-in classroom</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight">Cinematic HD classrooms</h3>
            <p className="text-white/60 mt-2 max-w-md">
              Crystal-clear video, screen sharing, and chat. No installs. Works on any device.
            </p>
            <div className="mt-7 relative rounded-2xl overflow-hidden border border-white/10">
              <SafeImage
                src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=900&h=520&fit=crop"
                alt="HD video lesson"
                className="w-full h-56 object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="chip text-emerald-300 border-emerald-400/30 bg-emerald-500/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 1080p HD
                </span>
                <span className="text-xs text-white/70 font-mono">42:18 / 60:00</span>
              </div>
            </div>
          </motion.div>

          {/* Vetted */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-2 card p-7 relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 grid place-items-center border border-emerald-400/20">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <h3 className="font-display text-xl font-bold mt-4 tracking-tight">Vetted experts only</h3>
            <p className="text-white/55 mt-1 text-sm">
              Every tutor is interviewed and credential-verified.
            </p>
            <div className="mt-6 flex -space-x-2">
              {HERO_AVATARS.slice(0, 4).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="w-10 h-10 rounded-full border-2 border-ink-900 object-cover"
                  alt=""
                />
              ))}
              <div className="w-10 h-10 rounded-full bg-white/[0.05] border-2 border-ink-900 grid place-items-center text-[11px] font-semibold">
                +500
              </div>
            </div>
          </motion.div>

          {/* Recordings */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            viewport={{ once: true }}
            className="md:col-span-2 card p-7 relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 grid place-items-center border border-purple-400/20">
              <PlayCircle className="w-5 h-5 text-purple-300" />
            </div>
            <h3 className="font-display text-xl font-bold mt-4 tracking-tight">Replay anytime</h3>
            <p className="text-white/55 mt-1 text-sm">
              Every lesson is recorded and available privately to you, forever.
            </p>
            <div className="mt-5 rounded-xl overflow-hidden border border-white/10 aspect-video relative bg-gradient-to-br from-purple-500/30 via-brand-500/20 to-emerald-500/10">
              {/* fake waveform */}
              <div className="absolute inset-0 flex items-center justify-center gap-0.5 px-6 opacity-40">
                {Array.from({ length: 32 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full bg-white"
                    style={{ height: `${20 + Math.abs(Math.sin(i * 0.7)) * 60}%` }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 grid place-items-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 grid place-items-center">
                  <PlayCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-white/70">
                <span>00:00</span>
                <span>42:18</span>
              </div>
            </div>
          </motion.div>

          {/* Secure pay */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-4 card p-7 relative overflow-hidden grid sm:grid-cols-2 gap-6 items-center"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 grid place-items-center border border-amber-400/20">
                <CreditCard className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="font-display text-xl font-bold mt-4 tracking-tight">Pay only for what you take</h3>
              <p className="text-white/55 mt-1 text-sm">
                No subscriptions. Stripe-secured checkout. Refundable up to 24h before.
              </p>
            </div>
            {/* Stylized receipt mock */}
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-5 overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 glow-blue rounded-full opacity-50" />
              <div className="relative">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <p className="text-white/45 text-[10px] uppercase tracking-wider">Lesson</p>
                    <p className="text-white/85 font-medium mt-0.5">Calculus 60 min</p>
                  </div>
                  <span className="chip text-emerald-300 border-emerald-400/30 bg-emerald-500/10">
                    <CheckCircle2 className="w-3 h-3" /> Paid
                  </span>
                </div>
                <div className="border-t border-dashed border-white/10 my-4" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/55">Total</span>
                  <span className="font-mono font-bold text-2xl gradient-text">$65.00</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-[10px] text-white/55">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Secured by Stripe • End-to-end encrypted
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============== TESTIMONIALS ============== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-brand-300 font-semibold text-xs uppercase tracking-[0.2em]">Loved by learners</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 tracking-tight">
            Stories that <span className="gradient-text">actually inspire.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="card p-7 hover:border-white/15 transition relative"
            >
              <Quote className="w-7 h-7 text-brand-300 opacity-50" />
              <p className="mt-5 text-white/85 leading-relaxed">"{t.quote}"</p>
              <div className="mt-7 flex items-center gap-3 pt-5 border-t border-white/[0.05]">
                <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-white/55">{t.role}</p>
                </div>
                <div className="ml-auto flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============== FINAL CTA ============== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10"
        >
          <SafeImage
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&h=900&fit=crop"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/97 via-ink-950/85 to-ink-950/30" />
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] glow-blue rounded-full opacity-70" />
          <div className="relative p-10 sm:p-16 max-w-2xl">
            <h2 className="font-display text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight">
              Your future self <br />
              <span className="gradient-text">starts today.</span>
            </h2>
            <p className="text-white/70 mt-5 text-lg max-w-md">
              Sign up free, browse hand-picked tutors, and book your first lesson in minutes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/register" className="btn-primary">
                <GraduationCap className="w-4 h-4" /> Create free account
              </Link>
              <Link to="/tutors" className="btn-ghost">
                Browse tutors <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/55">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free to join
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cancel anytime
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Secure payments
              </span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
