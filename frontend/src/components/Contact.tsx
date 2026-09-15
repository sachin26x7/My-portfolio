import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  Info
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { data } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'activation_needed' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter a message';
    } else if (formData.message.trim().length < 5) {
      errs.message = 'Message must be at least 5 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setServerMessage('');

    try {
      // Send real email directly to owner's inbox via FormSubmit API
      const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(data.email)}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject ? `[Portfolio Contact] ${formData.subject}` : `[Portfolio Contact] New message from ${formData.name}`,
          message: formData.message,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const result = await response.json();

      if (result.success === 'true' || result.success === true) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 }
        });
        setStatus('success');
        setServerMessage(result.message || 'Your message has been sent successfully to Sachin!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else if (result.message && result.message.toLowerCase().includes('activation')) {
        // First-time activation notice
        setStatus('activation_needed');
        setServerMessage(
          `FormSubmit requires a one-time activation. A confirmation email has been sent to ${data.email}. Please open your Gmail and click "Activate Form" once to start receiving all submissions directly!`
        );
      } else {
        // Fallback error with direct mail option
        setStatus('error');
        setServerMessage(result.message || 'Failed to submit form. Please use direct email below.');
      }
    } catch (err: any) {
      setStatus('error');
      setServerMessage('Network error submitting form. You can send directly using your mail app.');
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Direct Gmail composer link
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(data.email)}&su=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Sachin,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`)}`;

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Contact Info & Direct Email */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-2xl press-card space-y-6">
            <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <span>Direct Communication</span>
              <Sparkles className="w-4 h-4 text-primary-400" />
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              I am actively checking my inbox and typically respond within 24 hours. Feel free to use the form or send an email directly.
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
                    <ArrowUpRight className="w-4 h-4 opacity-70" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="p-8 rounded-2xl press-card space-y-5"
          >
            {/* Status alerts */}
            {status === 'success' && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-start gap-3 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Message Delivered!</h4>
                  <p className="text-xs mt-1">{serverMessage || `Your email was sent to ${data.email}. Sachin will reply soon.`}</p>
                </div>
              </div>
            )}

            {status === 'activation_needed' && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-start gap-3 animate-fadeIn">
                <Info className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">One-Time Inbox Activation Sent</h4>
                  <p className="text-xs mt-1 leading-relaxed">{serverMessage}</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 space-y-2 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Could Not Send Online</h4>
                    <p className="text-xs mt-0.5">{serverMessage}</p>
                  </div>
                </div>
                <div className="pt-2">
                  <a
                    href={gmailComposeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-xs font-semibold text-red-400 transition-colors"
                  >
                    <span>Click here to compose directly in Gmail</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* Name field */}
            <div>
              <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-1.5">
                Your Name *
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ada Lovelace"
                className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? 'border-red-500 focus:ring-red-500/30'
                    : 'border-white/[0.09] focus:border-primary-500 focus:ring-primary-500/25'
                }`}
              />
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-1.5">
                Your Email Address *
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ada@example.com"
                className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500/30'
                    : 'border-white/[0.09] focus:border-primary-500 focus:ring-primary-500/25'
                }`}
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>

            {/* Subject field */}
            <div>
              <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-1.5">
                Subject / Project Topic
              </label>
              <input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Junior Full Stack Opportunity / Project"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.09] text-white placeholder-slate-600 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/25 transition-all"
              />
            </div>

            {/* Message field */}
            <div>
              <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-1.5">
                Message *
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Hi Sachin, I saw your MERN portfolio and would like to discuss..."
                className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                  errors.message
                    ? 'border-red-500 focus:ring-red-500/30'
                    : 'border-white/[0.09] focus:border-primary-500 focus:ring-primary-500/25'
                }`}
              ></textarea>
              {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white btn-neon-coral transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? (
                <>
                  <span className="w-4 h-4 border-2 border-dark-950 border-t-transparent rounded-full animate-spin"></span>
                  <span>Sending Message to Sachin...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>

    </section>
  );
};
