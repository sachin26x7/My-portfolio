import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight, Download, Terminal } from 'lucide-react';
import { SocialIcon } from './SocialIcon';
import { HeroEcosystem } from './HeroEcosystem';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;
    if (!section || !scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const updateScrollProgress = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / section.offsetHeight));
        const baseOpacity = window.innerWidth < 768 ? 0.38 : window.innerWidth < 1024 ? 0.3 : 0.74;
        scene.style.setProperty('--hero-scroll-scale', (1 - progress * 0.16).toFixed(3));
        scene.style.setProperty('--hero-scroll-opacity', (baseOpacity * (1 - progress * 0.75)).toFixed(3));
        scene.style.setProperty('--hero-scroll-rotation', `${(progress * 14).toFixed(2)}deg`);
        scene.style.setProperty('--hero-scroll-offset', `${(progress * 40).toFixed(2)}px`);
      });
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;
    sceneRef.current?.style.setProperty('--hero-tilt-x', `${(-pointerY * 12).toFixed(2)}deg`);
    sceneRef.current?.style.setProperty('--hero-tilt-y', `${(pointerX * 16).toFixed(2)}deg`);
  };

  const handlePointerLeave = () => {
    sceneRef.current?.style.removeProperty('--hero-tilt-x');
    sceneRef.current?.style.removeProperty('--hero-tilt-y');
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="hero-stage relative flex min-h-[88svh] items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <HeroEcosystem sceneRef={sceneRef} />

      <div className="hero-copy relative z-10 mx-auto w-full max-w-7xl space-y-7 text-center lg:text-left">

        {/* Kicker — "presents" label like reference image */}
        <div className="hero-kicker mx-auto inline-flex w-fit max-w-full items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 backdrop-blur-sm lg:mx-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.14em] sm:tracking-[0.2em] uppercase text-slate-400">
            Fresher · Actively Seeking Full Stack MERN Roles
          </span>
        </div>

        {/* Main Heading */}
        <div className="space-y-3">
          <h1 className="hero-title font-display font-black leading-[0.98] tracking-[-0.065em] text-gradient-coral text-[clamp(2.65rem,5.6vw,5.8rem)]">
            {data.name || 'Your Name'}
          </h1>

          {/* Typing Effect */}
          <div className="hero-role flex min-h-[3.25rem] items-center justify-center gap-2.5 text-slate-200 lg:justify-start sm:gap-3">
            <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400 inline-block shrink-0" />
            <span className="font-mono text-[clamp(1.05rem,2.4vw,2rem)] font-medium tracking-[-0.035em] text-white/90">
              {displayText}
              <span className="hero-terminal-cursor ml-1 inline-block h-5 w-1.5 translate-y-0.5 rounded-sm bg-primary-400 sm:h-7" aria-hidden="true" />
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p className="hero-tagline mx-auto max-w-[42rem] text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl lg:mx-0">
          {data.tagline}
        </p>

        {/* CTAs */}
        <div className="hero-actions flex flex-wrap items-center justify-center gap-3 pt-1 lg:justify-start sm:gap-4">
          <a
            href="#projects"
            className="inline-flex min-h-12 items-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white btn-neon-coral transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950 sm:px-7"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={data.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950 sm:px-7"
          >
            <Download className="w-4 h-4 text-primary-400" />
            <span>Download CV</span>
          </a>
        </div>

        {/* Social Icons */}
        <div className="hero-socials flex items-center justify-center gap-3 pt-3 lg:justify-start sm:gap-3.5">
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
                className="rounded-xl border border-white/[0.09] bg-white/[0.055] p-3 text-slate-400 transition-all duration-200 hover:-translate-y-1 hover:border-primary-500/40 hover:bg-primary-500/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950 sm:p-3.5"
              >
                <SocialIcon icon={social.icon} className="w-5 h-5" />
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
