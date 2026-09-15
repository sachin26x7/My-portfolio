import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { BackgroundEffect } from './components/BackgroundEffect';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 transition-colors duration-300 relative selection:bg-primary-500/30 selection:text-primary-400">
      {/* Dynamic Background */}
      <BackgroundEffect />

      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Single-Page Sections */}
      <main className="relative z-10 space-y-8">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Owner Customization Studio (Protected) */}
      <AdminModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <AppContent />
      </PortfolioProvider>
    </ThemeProvider>
  );
};

export default App;
