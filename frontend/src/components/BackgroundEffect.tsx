import React from 'react';

export const BackgroundEffect: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

      {/* ── Deep midnight canvas ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#07090e] via-[#090c15] to-[#0a0d18]" />

      {/* ── Diagonal stripe texture ── */}
      <div className="absolute inset-0 diagonal-stripes opacity-100" />

      {/* ── Top-left: coral-pink organic blob (matches reference image) ── */}
      <div
        className="absolute -top-[18%] -left-[12%] w-[480px] md:w-[680px] h-[520px] md:h-[720px] animate-blob-float"
        style={{
          background: 'radial-gradient(ellipse at 40% 50%, rgba(255,65,108,0.75) 0%, rgba(255,75,43,0.55) 35%, transparent 70%)',
          filter: 'blur(55px)',
          borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
        }}
      />
      {/* Coral blob second layer for depth */}
      <div
        className="absolute -top-[5%] -left-[5%] w-[300px] md:w-[420px] h-[280px] md:h-[400px]"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(255,100,60,0.40) 0%, transparent 65%)',
          filter: 'blur(40px)',
          borderRadius: '55% 45% 60% 40% / 45% 55% 45% 55%',
        }}
      />

      {/* ── Top-right: sunset-orange organic blob (matches reference image) ── */}
      <div
        className="absolute -top-[15%] -right-[12%] w-[420px] md:w-[600px] h-[460px] md:h-[650px] animate-blob-float"
        style={{
          background: 'radial-gradient(ellipse at 55% 45%, rgba(255,140,50,0.70) 0%, rgba(255,96,36,0.50) 35%, transparent 68%)',
          filter: 'blur(55px)',
          borderRadius: '45% 55% 40% 60% / 55% 45% 55% 45%',
          animationDelay: '-6s',
        }}
      />

      {/* ── Bottom-center: deep purple ambient glow ── */}
      <div
        className="absolute -bottom-[15%] left-[25%] w-[500px] md:w-[700px] h-[350px] md:h-[500px]"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.20) 0%, rgba(139,92,246,0.12) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* ── Dark curved wave bands (presentation deck depth) ── */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <path d="M0 400 Q360 300 720 420 Q1080 540 1440 380 L1440 900 L0 900 Z" fill="white" />
        <path d="M0 500 Q360 400 720 520 Q1080 640 1440 480 L1440 900 L0 900 Z" fill="white" opacity="0.5" />
        <path d="M0 620 Q360 520 720 640 Q1080 760 1440 580 L1440 900 L0 900 Z" fill="white" opacity="0.3" />
      </svg>

      {/* ── Subtle grid lines (tech aesthetic) ── */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                            linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '5rem 5rem',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)',
        }}
      />

    </div>
  );
};
