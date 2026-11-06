import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { MotionCard } from './MotionCard';
import { 
  Mail, 
  Copy, 
  Check, 
  MessageSquare,
  MailOpen,
  ExternalLink
} from 'lucide-react';
import { SocialIcon } from './SocialIcon';

export const Contact: React.FC = () => {
  const { data } = usePortfolio();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="portfolio-section flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm">
          <MessageSquare className="w-3.5 h-3.5 text-primary-400" />
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-slate-400">Get in Touch</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
          Let's Build Something <span className="text-gradient-coral">Great Together</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Have an opportunity, project, or want to connect? Send a message directly to my email inbox.
        </p>
      </div>

      <div className="mx-auto w-full max-w-xl">
        
        {/* Contact Info & Direct Email */}
        <div className="space-y-6">
          <MotionCard className="p-8 rounded-2xl press-card space-y-6">
            <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <span>Direct Communication</span>
              <MailOpen className="w-4 h-4 text-primary-400" />
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              I am actively checking my inbox and typically respond within 24 hours. Use the links below or send an email directly.
            </p>

            {/* Email Copy Card */}
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 rounded-lg icon-box-cyan w-9 h-9 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div className="truncate">
                  <div className="text-xs text-slate-500">Email Address</div>
                  <a 
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(data.email)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs sm:text-sm font-medium text-white hover:text-primary-400 transition-colors truncate block"
                    title="Click to compose in Gmail"
                  >
                    {data.email}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-white/[0.07] text-slate-400 hover:text-primary-400 transition-colors shrink-0"
                title="Copy email"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Direct Gmail compose button */}
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(data.email)}&su=Portfolio%20Inquiry`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-neon-coral text-white text-sm font-semibold transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Compose Directly in Gmail</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {/* Social List */}
            <div className="pt-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Connect With Me
              </div>
              <div className="space-y-2">
                {data.socials.map((soc) => (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] transition-all duration-200 text-sm font-medium text-slate-400 hover:text-primary-400"
                  >
                    <span>{soc.name}</span>
                    <SocialIcon icon={soc.icon} className="w-4 h-4 opacity-70" />
                  </a>
                ))}
              </div>
            </div>

          </MotionCard>
        </div>
      </div>

    </section>
  );
};
