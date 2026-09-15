import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Code, 
  BrainCircuit, 
  Server, 
  Wrench, 
  CheckCircle,
  Layers,
  Database
} from 'lucide-react';

export const Skills: React.FC = () => {
  const { data, openAdminModal, isOwner } = usePortfolio();

  const getCategoryIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('frontend') || lower.includes('language') || lower.includes('client') || lower.includes('ui')) {
      return <Code className="w-5 h-5 text-white" />;
    }
    if (lower.includes('ai') || lower.includes('machine') || lower.includes('data science') || lower.includes('intelligence')) {
      return <BrainCircuit className="w-5 h-5 text-white" />;
    }
    if (lower.includes('database') || lower.includes('storage') || lower.includes('sql') || lower.includes('mongo')) {
      return <Database className="w-5 h-5 text-white" />;
    }
    if (lower.includes('framework') || lower.includes('backend') || lower.includes('server') || lower.includes('api')) {
      return <Server className="w-5 h-5 text-white" />;
    }
    return <Wrench className="w-5 h-5 text-white" />;
  };

  const getIconBoxClass = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('frontend') || lower.includes('language') || lower.includes('client') || lower.includes('ui')) return 'icon-box-cyan';
    if (lower.includes('ai') || lower.includes('machine') || lower.includes('data science') || lower.includes('intelligence')) return 'icon-box-purple';
    if (lower.includes('database') || lower.includes('storage') || lower.includes('sql') || lower.includes('mongo')) return 'icon-box-blue';
    if (lower.includes('framework') || lower.includes('backend') || lower.includes('server') || lower.includes('api')) return 'icon-box-emerald';
    return 'icon-box-coral';
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm">
            <Layers className="w-3.5 h-3.5 text-primary-400" />
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-slate-400">Tech Stack &amp; Competencies</span>
          </div>
          <button
            onClick={() => openAdminModal('skills')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 border bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 border-white/[0.08] hover:border-primary-500/40 hover:text-primary-400 group cursor-pointer"
            title="Customize Skills"
          >
            <Wrench className="w-3 h-3 text-primary-400 group-hover:rotate-45 transition-transform duration-200" />
            <span>{isOwner ? 'Customize Skills' : 'Edit Skills'}</span>
          </button>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
          Skills &amp; <span className="text-gradient-cyan">Technical Toolkit</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          A battle-tested arsenal of languages, AI models, vector stores, and DevOps tools deployed across production environments.
        </p>
      </div>

      {data.skills.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-white/10 max-w-md mx-auto">
          <p className="text-slate-500 text-sm mb-4">No skill categories configured yet.</p>
          <button
            onClick={() => openAdminModal('skills')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl btn-neon-cyan text-white font-bold text-xs"
          >
            <Wrench className="w-4 h-4" />
            <span>Add Skills in Owner Studio</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {data.skills.map((cat) => (
            <div
              key={cat.id}
              className="p-6 sm:p-8 rounded-2xl press-card hover:border-white/15 hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-12 h-12 flex items-center justify-center ${getIconBoxClass(cat.category)} group-hover:scale-105 transition-transform duration-200`}>
                  {getCategoryIcon(cat.category)}
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-primary-400 transition-colors">
                    {cat.category}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{cat.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-white/[0.05] text-slate-300 border border-white/[0.07] hover:border-primary-500/40 hover:text-primary-400 hover:bg-primary-500/[0.08] transition-all duration-150"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-primary-400 opacity-80" />
                    <span>{skill.name}</span>
                    {skill.level && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.07] text-slate-500 ml-1">
                        {skill.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
};

