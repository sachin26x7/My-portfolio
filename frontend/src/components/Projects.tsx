import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ExternalLink, Github, FolderGit2, Sparkles } from 'lucide-react';

export const Projects: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm">
          <FolderGit2 className="w-3.5 h-3.5 text-primary-400" />
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-slate-400">Featured Portfolio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
          Full Stack &amp; <span className="text-gradient-coral">MERN Projects</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Explore full-stack MERN applications, responsive user interfaces, and secure RESTful backend services.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.projects.map((project) => (
          <div
            key={project.id}
            className="group flex flex-col rounded-2xl overflow-hidden press-card hover:border-white/15 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] hover:-translate-y-2 transition-all duration-300"
          >
            {/* Thumbnail Image Container */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-900">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent"></div>
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-black/70 backdrop-blur-md text-primary-400 border border-white/10">
                  {project.category}
                </span>
              </div>

              {project.featured && (
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono font-medium icon-box-purple text-white shadow">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </span>
                </div>
              )}
            </div>

            {/* Project Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-display font-bold text-white group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Chips */}
              <div className="pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.05] text-slate-400 border border-white/[0.07] hover:border-primary-500/30 hover:text-primary-400 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-white/[0.07] flex items-center justify-between">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-primary-400 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
