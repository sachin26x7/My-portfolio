import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, MapPin, CheckCircle2, Cpu, Database, Code2 } from 'lucide-react';

export const About: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-primary-400" />
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-slate-400">About Me</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
          Crafting Responsive &amp;{' '}
          <span className="text-gradient-cyan">Scalable MERN</span>
          {' '}Web Experiences
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Translating ideas into full-stack reality with modern React interfaces, secure Express backends, and robust MongoDB databases.
        </p>
      </div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Column: Bio & Core Focus */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            {data.bio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Location & Quick Meta */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-mono text-slate-400 pt-2">
            <span className="flex items-center gap-1.5 bg-white/[0.05] px-3 py-1.5 rounded-lg border border-white/[0.07]">
              <MapPin className="w-4 h-4 text-coral-500" />
              {data.location}
            </span>
            <span className="flex items-center gap-1.5 bg-white/[0.05] px-3 py-1.5 rounded-lg border border-white/[0.07]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Open to Entry-Level Roles
            </span>
          </div>

          {/* Focus Pillars — Glowing Icon Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-5 rounded-2xl press-card hover:border-primary-500/20 transition-all duration-300 hover:-translate-y-1 space-y-3">
              <div className="w-10 h-10 icon-box-cyan flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-display font-bold text-white text-sm">Frontend Engineering</h4>
              <p className="text-xs text-slate-400">React.js, Redux &amp; Tailwind CSS</p>
            </div>
            <div className="p-5 rounded-2xl press-card hover:border-purple-500/20 transition-all duration-300 hover:-translate-y-1 space-y-3">
              <div className="w-10 h-10 icon-box-purple flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-display font-bold text-white text-sm">Node &amp; Express APIs</h4>
              <p className="text-xs text-slate-400">RESTful routing, JWT &amp; Middleware</p>
            </div>
            <div className="p-5 rounded-2xl press-card hover:border-emerald-500/20 transition-all duration-300 hover:-translate-y-1 space-y-3">
              <div className="w-10 h-10 icon-box-emerald flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-display font-bold text-white text-sm">MongoDB &amp; Storage</h4>
              <p className="text-xs text-slate-400">Mongoose schemas &amp; Aggregations</p>
            </div>
          </div>
        </div>

        {/* Right Column: Portrait Photo */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm">
            {/* Ambient glow — coral + cyan dual tone */}
            <div
              className="absolute -inset-3 rounded-3xl blur-2xl opacity-50"
              style={{ background: 'linear-gradient(135deg, rgba(255,65,108,0.6) 0%, rgba(6,182,212,0.4) 100%)' }}
            />

            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl group">
              <img
                src={data.avatarUrl}
                alt={data.name}
                loading="lazy"
                className="w-full h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/20 to-transparent" />

              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono text-primary-400">{data.title}</p>
                  <p className="text-sm font-bold text-white">{data.name}</p>
                </div>
                <div className="w-8 h-8 icon-box-cyan flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Stat Counters — Glowing Presentation Cards */}
      <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {data.stats.map((stat, idx) => {
          return (
            <div
              key={stat.id}
              className="p-6 rounded-2xl press-card hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-2 h-2 rounded-full mb-3 ${idx % 4 === 0 ? 'bg-primary-400' : idx % 4 === 1 ? 'bg-neon-blue' : idx % 4 === 2 ? 'bg-neon-purple' : 'bg-coral-500'}`} />
              <div className="text-3xl sm:text-4xl font-display font-black text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-200">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-xs text-slate-500 mt-1">
                  {stat.description}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};


