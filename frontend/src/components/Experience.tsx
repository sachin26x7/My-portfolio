import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase, GraduationCap, Calendar, MapPin, Milestone } from 'lucide-react';
import { MotionCard } from './MotionCard';

export const Experience: React.FC = () => {
  const { data } = usePortfolio();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLDivElement>('.education-card-unfold');
    const setCardsOpen = () => cards.forEach((card) => card.classList.add('education-card-unfold--open'));

    if (
      !cards.length ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      setCardsOpen();
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      cards.forEach((card) => {
        if (entry.isIntersecting) {
          card.classList.remove('education-card-unfold--open');
          card.classList.add('education-card-unfold--active');
        } else {
          card.classList.remove('education-card-unfold--active', 'education-card-unfold--open');
        }
      });
    });

    observer.observe(section);
    return () => observer.disconnect();
  }, [data.experiences]);

  return (
    <section ref={sectionRef} id="experience" className="portfolio-section flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm">
          <Milestone className="w-3.5 h-3.5 text-primary-400" />
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-slate-400">Track Record</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
          Experience &amp; <span className="text-gradient-cyan">Education</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          My professional journey scaling AI systems, high-volume data pipelines, and distributed software.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-white/[0.08] space-y-12">
        {data.experiences.map((item, index) => {
          const isWork = item.type === 'work';
          return (
            <div key={item.id} className="relative group">
              {/* Timeline Marker Icon */}
              <div className="absolute -left-[37px] sm:-left-[45px] top-1 w-9 h-9 rounded-xl bg-[#07090e] border-2 border-primary-500 flex items-center justify-center shadow-glow-cyan group-hover:scale-110 group-hover:icon-box-cyan text-primary-400 group-hover:text-white transition-all duration-200">
                {isWork ? (
                  <Briefcase className="w-4 h-4" />
                ) : (
                  <GraduationCap className="w-4 h-4" />
                )}
              </div>

              {/* Card Content */}
              <MotionCard
                className={`portfolio-card-3d p-6 sm:p-7 rounded-2xl press-card hover:border-white/15 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] transition-all duration-200 ${!isWork ? 'education-card-unfold' : ''}`}
                style={!isWork ? {
                  animationDelay: `${data.experiences.slice(0, index).filter(({ type }) => type === 'education').length * 450}ms`,
                } : undefined}
                onAnimationEnd={(event) => {
                  if (event.animationName !== 'education-card-unfold') return;
                  event.currentTarget.classList.remove('education-card-unfold--active');
                  event.currentTarget.classList.add('education-card-unfold--open');
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-primary-400 transition-colors">
                      {item.role}
                    </h3>
                    <div className="text-base font-semibold text-primary-400">
                      {item.organization}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500">
                    <span className="flex items-center gap-1 bg-white/[0.05] px-2.5 py-1 rounded-md border border-white/[0.07]">
                      <Calendar className="w-3.5 h-3.5 text-primary-400" />
                      {item.period}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1 bg-white/[0.05] px-2.5 py-1 rounded-md border border-white/[0.07]">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2 mt-4 text-sm sm:text-base text-slate-300">
                  {item.highlights.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 shrink-0" />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </MotionCard>
            </div>
          );
        })}
      </div>

    </section>
  );
};
