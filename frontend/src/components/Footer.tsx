import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp, Heart, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, setIsAdminModalOpen, isOwner } = usePortfolio();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.06] bg-black/30 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left: Brand & Tag */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg icon-box-cyan flex items-center justify-center text-white font-bold font-mono text-xs">
              &lt;/&gt;
            </div>
            <span className="font-display font-bold text-white tracking-tight">
              {data.name}
            </span>
            <span className="text-xs font-mono text-primary-400">
              — MERN Full Stack
            </span>
          </div>
          <p className="text-xs text-slate-500">
            © {currentYear} {data.name}. All rights reserved.
          </p>
        </div>

        {/* Center: Tech Stack Info */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-coral-500 inline fill-current" />
          <span>using React, TypeScript &amp; Tailwind CSS</span>
        </div>

        {/* Right: Scroll to top & Owner link */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-500 hover:text-primary-400 border border-white/[0.07] hover:border-primary-500/30 bg-white/[0.03] hover:bg-white/[0.06] transition-all"
            title="Access Owner Customizer (Protected by PIN)"
          >
            {isOwner ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-primary-400" />
                <span>Owner Studio (Unlocked)</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Owner Access</span>
              </>
            )}
          </button>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white border border-white/[0.07] transition-all hover:-translate-y-0.5"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
