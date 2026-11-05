import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Github, Linkedin, Mail, ArrowRight, Download, Terminal, Sparkles } from 'lucide-react';

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
        const baseOpacity = window.innerWidth < 768 ? 0.28 : 0.5;
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

  const getSocialIcon = (iconType: string) => {
    switch (iconType) {
      case 'github': return <Github className="w-5 h-5" />;
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'mail': return <Mail className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <div
        ref={sceneRef}
        className="hero-3d-scene"
        role="img"
        aria-label={`Interactive 3D illustration of ${data.skills.slice(0, 3).map((category) => category.category).join(', ') || 'the developer technology stack'}`}
      >
        <div className="hero-scene-grid" />
        <div className="hero-orbit hero-orbit-outer">
          <span className="hero-orbit-point" />
        </div>
        <div className="hero-orbit hero-orbit-inner">
          <span className="hero-orbit-point" />
        </div>
        <div className="hero-scene-glow" />
        <div className="hero-prism-rig">
          <div className="hero-prism">
            <div className="hero-prism-face hero-prism-front">
              <span className="hero-prism-mark">
                {data.skills[0]?.skills[0]?.name || 'MERN'}
              </span>
              <span className="hero-prism-line" />
              <span className="hero-prism-line hero-prism-line-short" />
            </div>
            <div className="hero-prism-face hero-prism-side" />
            <div className="hero-prism-face hero-prism-top" />
          </div>
        </div>
        {data.skills.slice(0, 3).map((category, index) => (
          <div className={`hero-float-chip hero-float-chip-${index + 1}`} key={category.id}>
            {category.category}
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 z-10">

        {/* Kicker — "presents" label like reference image */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-slate-400">
            Fresher · Actively Seeking Full Stack MERN Roles
          </span>
        </div>

        {/* Main Heading */}
        <div className="space-y-2">
          <h1 className="text-center leading-[0.72] tracking-[-0.085em] font-display font-black whitespace-nowrap text-[clamp(2.1rem,4.8vw,9.5rem)] text-gradient-coral" style={{ letterSpacing: '-0.06em', wordSpacing: '0.08em' }}>
            {data.name || 'Your Name'}
          </h1>

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
