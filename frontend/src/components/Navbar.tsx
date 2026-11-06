import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { BadgeCheck, CodeXml, FileText, Menu, Settings, X } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];

const getCurrentSection = () => {
  const activationLine = window.scrollY + 120;
  return sectionIds.reduce((active, section) => {
    const element = document.getElementById(section);
    return element && element.offsetTop <= activationLine ? section : active;
  }, 'hero');
};

// ─── Animated nav link with magnetic hover ─────────────────────────
const NavLink: React.FC<{
  item: NavItem;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  onRef: (el: HTMLAnchorElement | null, href: string) => void;
}> = ({ item, isActive, onClick, onRef }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    onRef(linkRef.current, item.href);
  }, []);

  return (
    <a
      ref={linkRef}
      href={item.href}
      onClick={(e) => onClick(e, item.href)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`nav-link relative z-10 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
        isActive
          ? 'text-white font-semibold'
          : 'text-slate-400 hover:text-white'
      }`}
    >
      <span className="relative inline-flex overflow-hidden">
        {item.name.split('').map((char, i) => (
          <span
            key={i}
            className="nav-letter inline-block transition-transform duration-300"
            style={{
              transitionDelay: hover ? `${i * 25}ms` : '0ms',
              transform: hover ? 'translateY(-1px)' : 'translateY(0)',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
      {/* Hover shimmer line */}
      <span
        className={`absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-transparent via-primary-400 to-transparent rounded-full transition-all duration-300 ${
          hover && !isActive
            ? 'w-3/4 -translate-x-1/2 opacity-60'
            : 'w-0 -translate-x-1/2 opacity-0'
        }`}
      />
    </a>
  );
};

// ─── Click ripple effect ────────────────────────────────────────────
interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const Navbar: React.FC = () => {
  const { data, setIsAdminModalOpen, isOwner } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const navigationTargetRef = useRef<string | null>(null);
  const navigationTimerRef = useRef<number | null>(null);

  // Sliding pill state
  const navContainerRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [pillStyle, setPillStyle] = useState<React.CSSProperties>({});
  const [pillVisible, setPillVisible] = useState(false);

  // Ripples
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleIdRef = useRef(0);

  // Register link refs
  const handleLinkRef = useCallback((el: HTMLAnchorElement | null, href: string) => {
    if (el) linkRefs.current.set(href, el);
  }, []);

  // Update sliding pill position
  const updatePill = useCallback(() => {
    const activeHref = `#${activeSection}`;
    const linkEl = linkRefs.current.get(activeHref);
    const containerEl = navContainerRef.current;

    if (!linkEl || !containerEl || activeSection === 'hero') {
      setPillVisible(false);
      return;
    }

    const containerRect = containerEl.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();

    setPillStyle({
      width: linkRect.width,
      height: linkRect.height,
      transform: `translateX(${linkRect.left - containerRect.left}px)`,
    });
    setPillVisible(true);
  }, [activeSection]);

  useEffect(() => {
    updatePill();
  }, [activeSection, updatePill]);

  useEffect(() => {
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [updatePill]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (navigationTargetRef.current) {
        setActiveSection(navigationTargetRef.current);
        if (navigationTimerRef.current !== null) {
          window.clearTimeout(navigationTimerRef.current);
        }
        navigationTimerRef.current = window.setTimeout(() => {
          navigationTargetRef.current = null;
          navigationTimerRef.current = null;
          handleScroll();
        }, 180);
        return;
      }

      setActiveSection(getCurrentSection());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (navigationTimerRef.current !== null) {
        window.clearTimeout(navigationTimerRef.current);
      }
    };
  }, []);

  // Clean up ripples
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => setRipples([]), 900);
    return () => clearTimeout(timer);
  }, [ripples]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Spawn ripple
    if (!prefersReducedMotion) {
      const bounds = e.currentTarget.getBoundingClientRect();
      rippleIdRef.current += 1;
      setRipples((prev) => [
        ...prev,
        {
          id: rippleIdRef.current,
          x: bounds.left + bounds.width / 2,
          y: bounds.top + bounds.height / 2,
        },
      ]);
    }

    const targetId = href.replace('#', '');
    navigationTargetRef.current = targetId;
    setActiveSection(targetId);

    if (navigationTimerRef.current !== null) {
      window.clearTimeout(navigationTimerRef.current);
    }

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      if (prefersReducedMotion || Math.abs(element.getBoundingClientRect().top) < 1) {
        navigationTargetRef.current = null;
        setActiveSection(getCurrentSection());
      }
    } else {
      navigationTargetRef.current = null;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#07090e]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'bg-transparent py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo / Name */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xl p-1"
            >
              <div className="w-9 h-9 rounded-xl icon-box-cyan flex items-center justify-center text-white shadow-glow-cyan group-hover:scale-105 transition-transform duration-200">
                <CodeXml className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-white tracking-tight group-hover:text-primary-400 transition-colors">
                  {data.name}
                </span>
                <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  MERN Full Stack
                </span>
              </div>
            </a>

            {/* Desktop Navigation with sliding pill */}
            <nav ref={navContainerRef} className="hidden md:flex items-center gap-0.5 lg:gap-1 relative">
              {/* Animated sliding pill */}
              <div
                className="nav-pill absolute top-0 left-0 rounded-lg pointer-events-none"
                style={{
                  ...pillStyle,
                  opacity: pillVisible ? 1 : 0,
                }}
              />
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <NavLink
                    key={item.name}
                    item={item}
                    isActive={isActive}
                    onClick={handleNavClick}
                    onRef={handleLinkRef}
                  />
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden md:flex items-center gap-2">
              {/* Resume Button */}
              <a
                href={data.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-resume-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white border border-white/[0.09] transition-all duration-300 hover:-translate-y-0.5"
              >
                <FileText className="w-4 h-4 text-primary-400" />
                Resume
              </a>

              {/* Owner Studio */}
              <button
                onClick={() => setIsAdminModalOpen(true)}
                title={isOwner ? 'Owner Studio (Unlocked)' : 'Owner Customizer (Requires PIN)'}
                className={`p-2 rounded-xl border transition-all duration-200 ${
                  isOwner
                    ? 'bg-primary-500/15 text-primary-400 border-primary-500/30 hover:bg-primary-500/25'
                    : 'text-slate-500 hover:text-slate-200 border-white/[0.07] hover:bg-white/[0.07]'
                }`}
              >
                {isOwner ? <BadgeCheck className="w-4 h-4 text-primary-400" /> : <Settings className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile controls */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open menu"
                className="p-2 rounded-lg text-slate-200 hover:bg-white/[0.07] transition-colors"
              >
                <div className="nav-hamburger-icon">
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu with staggered animation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-[#090c15]/95 backdrop-blur-xl border-b border-white/[0.07] px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`mobile-nav-item block px-4 py-2.5 rounded-xl text-base font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-primary-400 bg-primary-500/10 border border-primary-500/20 font-semibold'
                      : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                  }`}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms',
                    transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                    opacity: mobileMenuOpen ? 1 : 0,
                  }}
                >
                  {item.name}
                </a>
              );
            })}

            <div
              className="pt-4 border-t border-white/[0.07] flex items-center gap-3 transition-all duration-300"
              style={{
                transitionDelay: mobileMenuOpen ? `${navItems.length * 50}ms` : '0ms',
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(10px)',
              }}
            >
              <a
                href={data.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl btn-neon-cyan text-white font-semibold text-sm"
              >
                <FileText className="w-4 h-4" />
                Download Resume
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminModalOpen(true);
                }}
                className="p-2.5 rounded-xl border border-white/[0.09] text-slate-400 hover:bg-white/[0.07]"
                title="Owner Studio"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Click ripple effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="nav-click-ripple"
          aria-hidden="true"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        >
          <span className="nav-click-ripple__ring" />
          <span className="nav-click-ripple__ring nav-click-ripple__ring--delayed" />
          <span className="nav-click-ripple__dot" />
        </div>
      ))}
    </>
  );
};
