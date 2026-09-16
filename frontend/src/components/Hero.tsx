import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Github, Linkedin, Mail, ArrowRight, Download, Terminal, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();

  // Typing animation state
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = data.typingRoles && data.typingRoles.length > 0
    ? data.typingRoles
    : ["AI Developer", "Python Engineer", "ML Enthusiast"];

  useEffect(() => {
    const currentRole = roles[roleIndex % roles.length];
    const typingSpeed = isDeleting ? 40 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setDisplayText(currentRole.slice(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        // Deleting backward
        setDisplayText(currentRole.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  const getSocialIcon = (iconType: string) => {
    switch (iconType) {
      case 'github': return <Github className="w-5 h-5" />;
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'mail': return <Mail className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-8 z-10">

        {/* Kicker — "presents" label like reference image */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-slate-400">
            Fresher · Actively Seeking Full Stack MERN Roles
          </span>
        </div>

        {/* Main Heading */}
        <div className="space-y-3">
          {(() => {
            const fullName = (data.name || 'Your Name').trim();
            const nameParts = fullName.split(/\s+/);
            const accentName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
            const mainName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : fullName;

            return (
              <>
                <h1 className="text-center leading-[0.8] tracking-[-0.075em] font-display font-black">
                  <span className="block text-white text-[clamp(2.6rem,5vw,7rem)] whitespace-nowrap">Hi, I'm</span>
                  <span className="block text-gradient-coral text-[clamp(3.4rem,8vw,17rem)] whitespace-nowrap">{mainName}</span>
                </h1>

                {accentName && (
                  <div className="flex justify-center">
                    <span className="inline-flex items-center justify-center min-w-[150px] sm:min-w-[200px] md:min-w-[260px] h-[150px] sm:h-[180px] md:h-[220px] px-4 rounded-[1.25rem] bg-[#8bbad2]/85 shadow-[0_18px_50px_-18px_rgba(139,186,210,0.9)]">
                      <span className="text-slate-950 text-[clamp(4rem,8vw,12rem)] font-black tracking-[-0.07em] leading-none">{accentName}</span>
                    </span>
                  </div>
                )}
              </>
            );
          })()}

          {/* Typing Effect */}
          <div className="flex items-center justify-center gap-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-300 min-h-[52px]">
            <Terminal className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400 inline-block shrink-0" />
            <span className="font-mono text-white/90">
              {displayText}
              <span className="inline-block w-2.5 h-6 sm:h-8 bg-primary-400 ml-1 translate-y-1 animate-pulse rounded-sm" />
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed">
          {data.tagline}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-white btn-neon-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={data.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-white bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <Download className="w-4 h-4 text-primary-400" />
            <span>Download CV</span>
          </a>
        </div>

        {/* Social Icons */}
        <div className="pt-6 flex items-center justify-center gap-3">
          {data.socials.map((social) => {
            const href = social.icon === 'mail'
              ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(data.email)}&su=Portfolio%20Inquiry`
              : social.url;

            return (
              <a
                key={social.id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="p-3 rounded-xl bg-white/[0.06] text-slate-400 hover:text-white border border-white/[0.08] hover:border-primary-500/40 hover:bg-primary-500/10 transition-all duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                {getSocialIcon(social.icon)}
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
