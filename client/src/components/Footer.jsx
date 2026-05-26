import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white/70">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-500 grid place-items-center">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold">EduMeet</span>
          <span className="text-white/40 text-sm">— Learn live with great tutors</span>
        </div>
        <p className="text-sm text-white/50">© {new Date().getFullYear()} EduMeet. Built with love.</p>
      </div>
    </footer>
  );
}
