import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, FileText, Settings, Sparkles } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const { data, setIsAdminModalOpen, isOwner } = usePortfolio();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
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
            <div className="w-9 h-9 rounded-xl icon-box-cyan flex items-center justify-center text-white font-bold font-mono text-base shadow-glow-cyan group-hover:scale-105 transition-transform duration-200">
              &lt;/&gt;
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary-400 bg-primary-500/10 font-semibold border border-primary-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.07] border border-white/[0.07] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-300" />
              )}
            </button>

            {/* Resume Button */}
            <a
              href={data.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white bg-white/[0.07] hover:bg-white/[0.12] border border-white/[0.09] transition-all duration-200 hover:-translate-y-0.5"
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
              {isOwner ? <Sparkles className="w-4 h-4 text-primary-400" /> : <Settings className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-400 hover:bg-white/[0.07]"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-300" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
              className="p-2 rounded-lg text-slate-200 hover:bg-white/[0.07]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090c15]/95 backdrop-blur-xl border-b border-white/[0.07] px-4 pt-2 pb-6 space-y-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'text-primary-400 bg-primary-500/10 border border-primary-500/20 font-semibold'
                    : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {item.name}
              </a>
            );
          })}

          <div className="pt-4 border-t border-white/[0.07] flex items-center gap-3">
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
      )}
    </header>
  );
};

