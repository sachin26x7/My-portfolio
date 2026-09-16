import React, { useState, useEffect } from 'react';
import { usePortfolio, AdminTab } from '../context/PortfolioContext';
import { ProfileData, ProjectItem, ExperienceItem, SkillCategory } from '../types/portfolio';
import { 
  X, 
  Lock, 
  Unlock, 
  Save, 
  RotateCcw, 
  Download, 
  Plus, 
  Trash2, 
  Check, 
  Copy,
  Layers,
  User,
  FolderGit2,
  KeyRound,
  GraduationCap,
  Briefcase,
  Wrench,
  Upload,
  ImageIcon
} from 'lucide-react';

export const AdminModal: React.FC = () => {
  const { 
    data, 
    isOwner, 
    isAdminModalOpen, 
    adminInitialTab,
    setIsAdminModalOpen, 
    verifyPin, 
    logoutOwner, 
    updateData, 
    resetToDefaults, 
    exportJSON 
  } = usePortfolio();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('profile');
  const [formData, setFormData] = useState<ProfileData>(data);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedJSON, setCopiedJSON] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Sync formData and initial tab whenever modal opens or data changes
  useEffect(() => {
    setFormData(data);
    if (isAdminModalOpen && adminInitialTab) {
      setActiveTab(adminInitialTab);
    }
  }, [data, isAdminModalOpen, adminInitialTab]);

  if (!isAdminModalOpen) return null;

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await verifyPin(pinInput);
    if (ok) {
      setPinError('');
      setPinInput('');
    } else {
      setPinError('Incorrect PIN code. Access denied.');
    }
  };

  const handleSave = async () => {
    const saved = await updateData(formData);
    if (saved) {
      setSaveError('');
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } else {
      setSaveError('Could not save changes. Check the backend URL and connection.');
    }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all data to original defaults?')) {
      const reset = await resetToDefaults();
      if (reset) {
        setSaveError('');
        setFormData(data);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2000);
      } else {
        setSaveError('Could not reset changes. Check the backend URL and connection.');
      }
    }
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(exportJSON());
    setCopiedJSON(true);
    setTimeout(() => setCopiedJSON(false), 2000);
  };

  const handleUpdateSocialUrl = (icon: 'github' | 'linkedin', url: string) => {
    setFormData({
      ...formData,
      socials: formData.socials.map((social) =>
        social.icon === icon ? { ...social, url } : social
      )
    });
  };

  // Helper to add a new project
  const handleAddProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: 'New MERN Web Application',
      category: 'Web',
      description: 'Describe what you built, stack details, and features.',
      tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
      demoUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      featured: false
    };
    setFormData({
      ...formData,
      projects: [newProj, ...formData.projects]
    });
  };

  const handleRemoveProject = (id: string) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter(p => p.id !== id)
    });
  };

  const handleUpdateProject = (index: number, field: keyof ProjectItem, val: any) => {
    const updated = [...formData.projects];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, projects: updated });
  };

  // Handlers for Education & Experience
  const handleAddExperience = (type: 'education' | 'work') => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: type === 'education' ? 'B.Tech in Computer Science' : 'Full Stack Web Developer',
      organization: type === 'education' ? 'University / College Name' : 'Company / Self-Directed',
      location: 'City, State',
      period: type === 'education' ? '2020 — 2024' : '2024 — Present',
      type: type,
      highlights: [
        type === 'education' 
          ? 'Relevant Coursework: Web Technologies, Database Management, Data Structures.'
          : 'Built and deployed responsive MERN stack web applications.'
      ]
    };
    setFormData({
      ...formData,
      experiences: [newItem, ...formData.experiences]
    });
  };

  const handleRemoveExperience = (id: string) => {
    setFormData({
      ...formData,
      experiences: formData.experiences.filter(e => e.id !== id)
    });
  };

  const handleUpdateExperience = (index: number, field: keyof ExperienceItem, val: any) => {
    const updated = [...formData.experiences];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, experiences: updated });
  };

  const handleAddHighlight = (expIndex: number) => {
    const updated = [...formData.experiences];
    updated[expIndex].highlights.push('New achievement or highlight point.');
    setFormData({ ...formData, experiences: updated });
  };

  const handleUpdateHighlight = (expIndex: number, hIndex: number, val: string) => {
    const updated = [...formData.experiences];
    updated[expIndex].highlights[hIndex] = val;
    setFormData({ ...formData, experiences: updated });
  };

  const handleRemoveHighlight = (expIndex: number, hIndex: number) => {
    const updated = [...formData.experiences];
    updated[expIndex].highlights.splice(hIndex, 1);
    setFormData({ ...formData, experiences: updated });
  };

  // Handlers for Skills & Technical Toolkit
  const skillLevelOptions = ['Beginner', 'Intermediate', 'Advanced', 'Proficient', 'Expert'];

  const handleAddSkillCategory = () => {
    const newCategory: SkillCategory = {
      id: `cat-${Date.now()}`,
      category: 'New Category (e.g. Cloud & DevOps)',
      description: 'Tools, platforms, and services',
      skills: [
        { name: 'Example Tool', level: 'Beginner' }
      ]
    };
    setFormData({
      ...formData,
      skills: [...formData.skills, newCategory]
    });
  };

  const handleRemoveSkillCategory = (id: string) => {
    if (window.confirm('Are you sure you want to delete this skill category and all its skills?')) {
      setFormData({
        ...formData,
        skills: formData.skills.filter(c => c.id !== id)
      });
    }
  };

  const handleUpdateSkillCategory = (catIndex: number, field: 'category' | 'description', val: string) => {
    const updated = [...formData.skills];
    updated[catIndex] = { ...updated[catIndex], [field]: val };
    setFormData({ ...formData, skills: updated });
  };

  const handleAddSkill = (catIndex: number) => {
    const updated = [...formData.skills];
    const categorySkills = [...updated[catIndex].skills, { name: '', level: 'Intermediate' }];
    updated[catIndex] = { ...updated[catIndex], skills: categorySkills };
    setFormData({ ...formData, skills: updated });
  };

  const handleUpdateSkill = (catIndex: number, skillIndex: number, field: 'name' | 'level', val: string) => {
    const updated = [...formData.skills];
    const categorySkills = [...updated[catIndex].skills];
    categorySkills[skillIndex] = { ...categorySkills[skillIndex], [field]: val };
    updated[catIndex] = { ...updated[catIndex], skills: categorySkills };
    setFormData({ ...formData, skills: updated });
  };

  const handleRemoveSkill = (catIndex: number, skillIndex: number) => {
    const updated = [...formData.skills];
    const categorySkills = [...updated[catIndex].skills];
    categorySkills.splice(skillIndex, 1);
    updated[catIndex] = { ...updated[catIndex], skills: categorySkills };
    setFormData({ ...formData, skills: updated });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1a1719]/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] border rounded-2xl flex flex-col overflow-hidden text-[#f9efe7] border-[#f1d2b8]/10 bg-[linear-gradient(90deg,_#0e1218_0%,_#17181d_28%,_#261d1d_52%,_#7e4d30_100%)] shadow-[0_35px_90px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.2)] transform-gpu">
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-[#f1d2b8]/10 flex items-center justify-between bg-[#1b1a1d]/30 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transform transition-transform duration-200 hover:-translate-y-0.5 ${
              isOwner ? 'bg-[linear-gradient(135deg,#f5d0b3,#f2a96c)] shadow-[0_8px_24px_rgba(255,170,110,0.25),inset_0_2px_0_rgba(255,255,255,0.25)]' : 'bg-[linear-gradient(135deg,rgba(255,164,117,0.28),rgba(255,120,72,0.15))] text-[#ffe7d5] border border-[#f7c9a8]/30 shadow-[inset_0_2px_0_rgba(255,255,255,0.12)]'
            }`}>
              {isOwner ? <Unlock className="w-4 h-4 text-white" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="font-display font-black text-transparent bg-gradient-to-r from-[#fffaf5] via-[#f8e1d0] to-[#f3b68d] bg-clip-text text-base leading-tight">
                {isOwner ? 'Owner Studio' : 'Access Verification'}
              </h3>
              <p className="text-[11px] font-mono text-[#f2d9c8]">
                {isOwner 
                  ? 'Editing live portfolio — changes saved to browser' 
                  : 'Enter your secret PIN to unlock editing'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="p-2 rounded-xl text-[#f2d9c8] hover:text-white hover:bg-white/[0.08] border border-[#f1d2b8]/10 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:-translate-y-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Not Authenticated: PIN Gate */}
        {!isOwner ? (
          <div className="p-8 max-w-sm mx-auto w-full my-auto space-y-6 text-center">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-[linear-gradient(135deg,#f8c8a0,#d97742)] mx-auto flex items-center justify-center shadow-[0_12px_30px_rgba(217,119,66,0.38),inset_0_2px_0_rgba(255,255,255,0.25)]">
              <KeyRound className="w-7 h-7 text-[#1f1a1a]" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xl font-display font-black text-transparent bg-gradient-to-r from-[#fffaf5] via-[#f6e8dd] to-[#f3b68d] bg-clip-text">Owner Access Required</h4>
              <p className="text-sm text-[#f5dac8]">
                Only the portfolio owner can edit content. Enter your secret PIN to unlock the studio.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-3">
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="● ● ● ● ● ●"
                autoFocus
                className="w-full px-4 py-3.5 text-center text-2xl tracking-[0.4em] font-mono rounded-xl bg-[#1a1a1d]/70 border border-[#f1d2b8]/10 text-[#fff4eb] placeholder-[#d9b99b] focus:outline-none focus:border-[#f3b68d] focus:ring-2 focus:ring-[#f3b68d]/20 transition-all shadow-[inset_0_2px_8px_rgba(0,0,0,0.25),0_1px_0_rgba(255,255,255,0.04)]"
              />
              {pinError && (
                <p className="text-xs text-red-400 font-medium flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  {pinError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[linear-gradient(135deg,#f4c39d,#d97b4a)] text-[#1f1a1a] font-bold text-sm shadow-[0_12px_30px_rgba(217,119,66,0.35),inset_0_2px_0_rgba(255,255,255,0.2)] transition-all hover:brightness-110 hover:-translate-y-0.5"
              >
                Unlock Studio →
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated: Editing Tabs */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-52 border-b md:border-b-0 md:border-r border-[#f1d2b8]/10 bg-[#1a1a1d]/35 p-2.5 flex md:flex-col gap-1 overflow-x-auto shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              {([
                { id: 'profile', icon: <User className="w-4 h-4" />, label: 'Profile & Bio' },
                { id: 'projects', icon: <FolderGit2 className="w-4 h-4" />, label: `Projects (${formData.projects.length})` },
                { id: 'skills', icon: <Wrench className="w-4 h-4" />, label: `Skills (${formData.skills.length})` },
                { id: 'education', icon: <GraduationCap className="w-4 h-4" />, label: `Exp & Edu (${formData.experiences.length})` },
                { id: 'stats', icon: <Layers className="w-4 h-4" />, label: 'Stats' },
                { id: 'security', icon: <KeyRound className="w-4 h-4" />, label: 'Security PIN' },
                { id: 'export', icon: <Download className="w-4 h-4" />, label: 'Export JSON' },
              ] as { id: AdminTab; icon: React.ReactNode; label: string }[]).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-[linear-gradient(135deg,rgba(249,196,150,0.18),rgba(241,145,88,0.10))] text-[#fff7f3] border border-[#f7c9a8]/30 font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_6px_12px_rgba(0,0,0,0.10)]'
                      : 'text-[#f5d8c4] hover:text-white hover:bg-white/[0.04] border border-transparent hover:-translate-y-0.5'
                  }`}
                >
                  <span className={activeTab === tab.id ? 'text-[#f8c89d]' : 'text-[#e9c4a4]'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              ))}

              <div className="mt-auto pt-3 border-t border-white/[0.06] hidden md:block">
                <button
                  onClick={logoutOwner}
                  className="w-full text-[11px] font-mono text-[#f0d7c5] hover:text-[#ffb09a] py-2 px-3 rounded-lg hover:bg-[#f18c55]/10 transition-all text-left flex items-center gap-2"
                >
                  <Lock className="w-3 h-3" />
                  Lock & Exit Studio
                </button>
              </div>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 p-5 overflow-y-auto space-y-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.07]">
                    <div className="w-7 h-7 rounded-lg bg-[linear-gradient(135deg,#f7c9a8,#d97742)] flex items-center justify-center shadow-[0_8px_18px_rgba(217,119,66,0.35),inset_0_2px_0_rgba(255,255,255,0.2)]">
                      <User className="w-3.5 h-3.5 text-[#1f1a1a]" />
                    </div>
                    <h4 className="font-display font-black text-transparent bg-gradient-to-r from-[#fffaf5] via-[#f6e8dd] to-[#f3b68d] bg-clip-text text-sm">Identity & Hero Settings</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-[#f4d8c5] mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0f1728] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-[#ff7a59] focus:ring-1 focus:ring-[#ff7a59]/25 transition-all placeholder-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-[#f4d8c5] mb-1.5">Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0f1728] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-[#ff7a59] focus:ring-1 focus:ring-[#ff7a59]/25 transition-all placeholder-slate-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-[#f4d8c5] mb-1.5">Hero Tagline</label>
                    <textarea
                      rows={2}
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0f1728] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-[#ff7a59] focus:ring-1 focus:ring-[#ff7a59]/25 transition-all placeholder-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-[#f4d8c5] mb-1.5">
                      Typing Animation Roles (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.typingRoles.join(', ')}
                      onChange={(e) => setFormData({
                        ...formData,
                        typingRoles: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#17181d]/70 border border-[#f1d2b8]/10 text-[#fffaf5] text-sm font-mono focus:outline-none focus:border-[#f3b68d] focus:ring-1 focus:ring-[#f3b68d]/25 transition-all placeholder-[#d9b99b] shadow-[inset_0_2px_8px_rgba(0,0,0,0.20)]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-[#f4d8c5] mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0f1728] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-[#ff7a59] focus:ring-1 focus:ring-[#ff7a59]/25 transition-all placeholder-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-[#f4d8c5] mb-1.5">Resume / CV URL</label>
                      <input
                        type="text"
                        value={formData.resumeUrl}
                        onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0f1728] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-[#ff7a59] focus:ring-1 focus:ring-[#ff7a59]/25 transition-all placeholder-slate-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-[#f4d8c5] mb-1.5">Avatar Image URL</label>
                    <input
                      type="text"
                      value={formData.avatarUrl}
                      onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#17181d]/70 border border-[#f1d2b8]/10 text-[#fffaf5] text-sm focus:outline-none focus:border-[#f3b68d] focus:ring-1 focus:ring-[#f3b68d]/25 transition-all placeholder-[#d9b99b] shadow-[inset_0_2px_8px_rgba(0,0,0,0.20)]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(['github', 'linkedin'] as const).map((icon) => {
                      const social = formData.socials.find((item) => item.icon === icon);
                      return (
                        <div key={icon}>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-[#f4d8c5] mb-1.5">
                            {icon === 'github' ? 'GitHub Profile URL' : 'LinkedIn Profile URL'}
                          </label>
                          <input
                            type="url"
                            value={social?.url || ''}
                            onChange={(e) => handleUpdateSocialUrl(icon, e.target.value)}
                            placeholder={`https://${icon}.com/your-profile`}
                            className="w-full px-3 py-2.5 rounded-xl bg-[#0f1728] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-[#ff7a59] focus:ring-1 focus:ring-[#ff7a59]/25 transition-all placeholder-slate-600"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 icon-box-purple flex items-center justify-center">
                        <FolderGit2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <h4 className="font-display font-bold text-white text-sm">Projects List</h4>
                    </div>
                    <button
                      onClick={handleAddProject}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg btn-neon-cyan text-white text-xs font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Project
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.projects.map((proj, idx) => (
                      <div
                        key={proj.id}
                        className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] space-y-3 hover:border-white/[0.12] transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => handleUpdateProject(idx, 'title', e.target.value)}
                            className="flex-1 font-bold text-sm bg-transparent border-b border-dashed border-white/20 focus:outline-none focus:border-primary-500 text-white"
                          />
                          <button
                            onClick={() => handleRemoveProject(proj.id)}
                            className="p-1.5 text-slate-600 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all"
                            title="Delete project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <textarea
                          rows={2}
                          value={proj.description}
                          onChange={(e) => handleUpdateProject(idx, 'description', e.target.value)}
                          placeholder="Project summary..."
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/[0.04] border border-white/[0.07] text-slate-300 placeholder-slate-600 focus:outline-none focus:border-primary-500/50 transition-all resize-none"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1">Category</span>
                            <input
                              type="text"
                              value={proj.category}
                              onChange={(e) => handleUpdateProject(idx, 'category', e.target.value)}
                              className="w-full p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07] text-slate-300 text-xs focus:outline-none focus:border-primary-500/50"
                            />
                          </div>

                          <div>
                            <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1">Demo URL</span>
                            <input
                              type="text"
                              value={proj.demoUrl || ''}
                              onChange={(e) => handleUpdateProject(idx, 'demoUrl', e.target.value)}
                              className="w-full p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07] text-slate-300 text-xs focus:outline-none focus:border-primary-500/50"
                            />
                          </div>

                          <div>
                            <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1">GitHub URL</span>
                            <input
                              type="text"
                              value={proj.githubUrl || ''}
                              onChange={(e) => handleUpdateProject(idx, 'githubUrl', e.target.value)}
                              className="w-full p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07] text-slate-300 text-xs focus:outline-none focus:border-primary-500/50"
                            />
                          </div>
                        </div>

                        {/* ── Technologies Used (Tags) ── */}
                        <div className="pt-1 space-y-1.5">
                          <span className="text-[10px] uppercase font-mono text-slate-400 block">
                            Technologies Used <span className="normal-case text-slate-600">(comma separated)</span>
                          </span>
                          <div className="flex flex-wrap gap-1.5 mb-1.5">
                            {proj.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary-500/10 border border-primary-500/30 text-primary-400 text-[11px] font-mono"
                              >
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newTags = proj.tags.filter((_, i) => i !== tIdx);
                                    handleUpdateProject(idx, 'tags', newTags);
                                  }}
                                  className="hover:text-red-400 transition-colors ml-0.5"
                                  title={`Remove ${tag}`}
                                >
                                  <X className="w-2.5 h-2.5" />
                                </button>
                              </span>
                            ))}
                          </div>
                          <input
                            type="text"
                            placeholder="e.g. React.js, Node.js, MongoDB — press Enter or comma to add"
                            className="w-full p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07] text-slate-300 text-xs focus:outline-none focus:border-primary-500/50 placeholder-slate-600"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ',') {
                                e.preventDefault();
                                const val = (e.target as HTMLInputElement).value.trim().replace(/,$/, '');
                                if (val && !proj.tags.includes(val)) {
                                  handleUpdateProject(idx, 'tags', [...proj.tags, val]);
                                }
                                (e.target as HTMLInputElement).value = '';
                              }
                            }}
                            onBlur={(e) => {
                              const val = e.target.value.trim().replace(/,$/, '');
                              if (val && !proj.tags.includes(val)) {
                                handleUpdateProject(idx, 'tags', [...proj.tags, val]);
                              }
                              e.target.value = '';
                            }}
                          />
                        </div>

                        {/* ── Project Image ── */}
                        <div className="pt-1 space-y-2">
                          <span className="text-[10px] uppercase font-mono text-slate-400 block">Project Thumbnail Image</span>

                          {/* Thumbnail Preview */}
                          {proj.image && (
                            <div className="relative w-full h-28 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-dark-900">
                              <img
                                src={proj.image}
                                alt="Project thumbnail"
                                className="w-full h-full object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-2">
                                <span className="text-[10px] font-mono text-white/70 truncate max-w-full">
                                  {proj.image.startsWith('data:') ? '📁 Uploaded file' : proj.image}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Upload File Button */}
                          <label
                            htmlFor={`img-upload-${proj.id}`}
                            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-dashed border-primary-500/40 bg-primary-500/5 hover:bg-primary-500/10 text-primary-400 text-xs font-semibold cursor-pointer transition-all"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            Upload Image from Device
                          </label>
                          <input
                            id={`img-upload-${proj.id}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                const base64 = ev.target?.result as string;
                                handleUpdateProject(idx, 'image', base64);
                              };
                              reader.readAsDataURL(file);
                            }}
                          />

                          {/* OR: URL Input */}
                          <div className="flex items-center gap-2">
                            <ImageIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <input
                              type="text"
                              value={proj.image?.startsWith('data:') ? '' : (proj.image || '')}
                              onChange={(e) => handleUpdateProject(idx, 'image', e.target.value)}
                              placeholder="Or paste image URL (https://...)" 
                              className="flex-1 p-1.5 rounded bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs placeholder-slate-400"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/[0.07]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 icon-box-emerald flex items-center justify-center">
                        <Wrench className="w-3.5 h-3.5 text-white" />
                      </div>
                      <h4 className="font-display font-bold text-white text-sm">Skills ({formData.skills.reduce((total, cat) => total + cat.skills.length, 0)})</h4>
                    </div>
                    <button
                      onClick={handleAddSkillCategory}
                      className="inline-flex items-center gap-2 rounded-xl border border-primary-500/40 bg-primary-500/10 px-3 py-2 text-xs font-semibold text-primary-400 transition-colors hover:bg-primary-500/20"
                    >
                      <Plus className="w-4 h-4" />
                      Add Category
                    </button>
                  </div>

                  <datalist id="skill-proficiency-levels">
                    {skillLevelOptions.map((level) => (
                      <option key={level} value={level} />
                    ))}
                  </datalist>

                  <div className="space-y-4">
                    {formData.skills.map((cat, catIdx) => (
                      <div
                        key={cat.id}
                        className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
                      >
                        <div className="mb-3 flex items-start gap-3">
                          <div className="flex-1 space-y-2">
                            <input
                              type="text"
                              value={cat.category}
                              onChange={(e) => handleUpdateSkillCategory(catIdx, 'category', e.target.value)}
                              placeholder="Category name"
                              className="w-full rounded-xl border border-white/[0.09] bg-white/[0.05] px-3 py-2 text-sm font-semibold text-white shadow-sm outline-none transition focus:border-primary-500 placeholder-slate-600"
                            />
                            <input
                              type="text"
                              value={cat.description}
                              onChange={(e) => handleUpdateSkillCategory(catIdx, 'description', e.target.value)}
                              placeholder="Category description"
                              className="w-full rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-2 text-xs text-slate-400 outline-none transition focus:border-primary-500 placeholder-slate-600"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveSkillCategory(cat.id)}
                            className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-2 text-slate-500 transition hover:border-red-400/50 hover:text-red-400"
                            title="Delete category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-2">
                          {cat.skills.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-3 py-4 text-sm text-slate-600">
                              No skills in this category yet.
                            </div>
                          ) : (
                            cat.skills.map((skill, sIdx) => (
                              <div
                                key={sIdx}
                                className="grid grid-cols-[minmax(0,1fr)_160px_90px] items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2"
                              >
                                <input
                                  type="text"
                                  value={skill.name}
                                  onChange={(e) => handleUpdateSkill(catIdx, sIdx, 'name', e.target.value)}
                                  placeholder="Skill name"
                                  className="w-full rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-sm font-medium text-slate-300 outline-none transition placeholder:text-slate-600 focus:border-primary-500/50"
                                />

                                <select
                                  value={skill.level || 'Intermediate'}
                                  onChange={(e) => handleUpdateSkill(catIdx, sIdx, 'level', e.target.value)}
                                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.05] px-2 py-1.5 text-xs font-medium text-slate-300 outline-none focus:border-primary-500 appearance-none"
                                >
                                  {skillLevelOptions.map((level) => (
                                    <option key={level} value={level} className="bg-[#0b0f1a]">{level}</option>
                                  ))}
                                </select>

                                <div className="flex justify-end">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveSkill(catIdx, sIdx)}
                                    className="inline-flex items-center gap-1 rounded-lg border border-white/[0.08] bg-white/[0.04] px-2 py-1.5 text-xs font-medium text-slate-500 transition hover:border-red-400/50 hover:text-red-400"
                                    title="Remove skill"
                                  >
                                    <X className="w-3 h-3" />
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        <div className="mt-3 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleAddSkill(catIdx)}
                            className="inline-flex items-center gap-2 rounded-lg border border-primary-500/40 bg-primary-500/10 px-3 py-2 text-xs font-semibold text-primary-400 transition hover:bg-primary-500/20"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Add Skill
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education & Experience Tab */}
              {activeTab === 'education' && (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.07]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 icon-box-blue flex items-center justify-center">
                        <GraduationCap className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-white text-sm">Education & Experience</h4>
                        <p className="text-[10px] text-slate-500">Customize your degrees and work experience.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAddExperience('education')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-500/15 border border-primary-500/40 text-primary-400 text-xs font-semibold hover:bg-primary-500/25 transition-colors"
                      >
                        <GraduationCap className="w-3.5 h-3.5" />
                        Add Education
                      </button>
                      <button
                        onClick={() => handleAddExperience('work')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.1] text-slate-300 text-xs font-semibold hover:bg-white/[0.1] transition-colors"
                      >
                        <Briefcase className="w-3.5 h-3.5" />
                        Add Work
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {formData.experiences.map((exp, expIdx) => (
                      <div
                        key={exp.id}
                        className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] space-y-3 hover:border-white/[0.12] transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-1">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                              exp.type === 'education' 
                                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            }`}>
                              {exp.type}
                            </span>
                            <input
                              type="text"
                              value={exp.role}
                              onChange={(e) => handleUpdateExperience(expIdx, 'role', e.target.value)}
                              placeholder="Degree or Role"
                              className="flex-1 font-bold text-sm bg-transparent border-b border-dashed border-white/20 focus:outline-none focus:border-primary-500 text-white"
                            />
                          </div>

                          <button
                            onClick={() => handleRemoveExperience(exp.id)}
                            className="p-1.5 text-slate-600 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all"
                            title="Delete entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-slate-500 mb-1">Organization / College</label>
                            <input type="text" value={exp.organization}
                              onChange={(e) => handleUpdateExperience(expIdx, 'organization', e.target.value)}
                              className="w-full p-2 rounded-lg bg-white/[0.04] border border-white/[0.07] text-slate-300 text-xs focus:outline-none focus:border-primary-500/50"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-slate-500 mb-1">Duration / Period</label>
                            <input type="text" value={exp.period}
                              onChange={(e) => handleUpdateExperience(expIdx, 'period', e.target.value)}
                              placeholder="2020 — 2024"
                              className="w-full p-2 rounded-lg bg-white/[0.04] border border-white/[0.07] text-slate-300 text-xs focus:outline-none focus:border-primary-500/50"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-mono text-slate-500 mb-1">Location</label>
                            <input type="text" value={exp.location || ''}
                              onChange={(e) => handleUpdateExperience(expIdx, 'location', e.target.value)}
                              placeholder="City, State"
                              className="w-full p-2 rounded-lg bg-white/[0.04] border border-white/[0.07] text-slate-300 text-xs focus:outline-none focus:border-primary-500/50"
                            />
                          </div>
                        </div>

                        {/* Bullet Highlights */}
                        <div className="pt-2 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-mono text-slate-400">
                              Highlights & Coursework
                            </span>
                            <button
                              type="button"
                              onClick={() => handleAddHighlight(expIdx)}
                              className="text-[11px] text-primary-500 hover:underline flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" /> Add bullet
                            </button>
                          </div>

                          {exp.highlights.map((h, hIdx) => (
                            <div key={hIdx} className="flex items-center gap-2">
                              <input
                                type="text"
                                value={h}
                                onChange={(e) => handleUpdateHighlight(expIdx, hIdx, e.target.value)}
                                className="flex-1 px-2.5 py-1.5 text-xs rounded bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveHighlight(expIdx, hIdx)}
                                className="p-1 text-slate-400 hover:text-red-400"
                                title="Remove bullet"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats Tab */}
              {activeTab === 'stats' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.07]">
                    <div className="w-7 h-7 icon-box-coral flex items-center justify-center">
                      <Layers className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h4 className="font-display font-bold text-white text-sm">Key Metrics / Stat Counters</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {formData.stats.map((stat, sIdx) => (
                      <div key={stat.id} className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] space-y-2">
                        <div>
                          <label className="text-[10px] uppercase font-mono text-slate-500 block mb-1">Display Value</label>
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => {
                              const updated = [...formData.stats];
                              updated[sIdx].value = e.target.value;
                              setFormData({ ...formData, stats: updated });
                            }}
                            className="w-full px-3 py-2 font-bold font-mono text-xl rounded-lg bg-white/[0.05] border border-white/[0.09] text-primary-400 focus:outline-none focus:border-primary-500 transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-mono text-slate-500 block mb-1">Label</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => {
                              const updated = [...formData.stats];
                              updated[sIdx].label = e.target.value;
                              setFormData({ ...formData, stats: updated });
                            }}
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/[0.04] border border-white/[0.07] text-slate-300 focus:outline-none focus:border-primary-500/50 transition-all"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-4 max-w-md">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.07]">
                    <div className="w-7 h-7 icon-box-purple flex items-center justify-center">
                      <KeyRound className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h4 className="font-display font-bold text-white text-sm">Change Owner Access PIN</h4>
                  </div>
                  <p className="text-xs text-slate-500">
                    This PIN prevents visitors from opening this editor. Remember your code after saving!
                  </p>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1.5">New PIN Code</label>
                    <input
                      type="text"
                      value={formData.adminPin}
                      onChange={(e) => setFormData({ ...formData, adminPin: e.target.value })}
                      className="w-full px-4 py-3 font-mono text-xl rounded-xl bg-white/[0.05] border border-white/[0.1] text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/25 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Export Tab */}
              {activeTab === 'export' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.07]">
                    <div className="w-7 h-7 icon-box-blue flex items-center justify-center">
                      <Download className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h4 className="font-display font-bold text-white text-sm">Export / Backup Configuration</h4>
                  </div>
                  <p className="text-xs text-slate-500">
                    Copy your customized JSON and replace <code className="text-primary-400 font-mono">initialPortfolioData</code> in <code className="text-primary-400 font-mono">src/data/portfolioData.ts</code> to bake these changes into the source code.
                  </p>
                  <pre className="p-4 rounded-xl bg-black/50 text-slate-300 text-xs font-mono overflow-auto max-h-60 border border-white/[0.08]">
                    {exportJSON()}
                  </pre>
                  <button
                    onClick={handleCopyJSON}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl btn-neon-cyan text-white font-semibold text-xs transition-all"
                  >
                    {copiedJSON ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedJSON ? '✓ Copied to Clipboard!' : 'Copy Configuration JSON'}</span>
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Modal Footer Controls (When Logged In) */}
        {isOwner && (
          <div className="px-5 py-3.5 border-t border-white/[0.07] bg-black/20 flex items-center justify-between">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 hover:text-red-400 px-2.5 py-1.5 rounded-lg hover:bg-red-500/10 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>

            <div className="flex items-center gap-3">
              {savedSuccess && (
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 font-mono">
                  <Check className="w-3.5 h-3.5" />
                  Saved for all viewers!
                </span>
              )}
              {saveError && (
                <span className="text-xs text-red-300 font-medium font-mono">{saveError}</span>
              )}

              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-neon-cyan text-white font-bold text-sm transition-all shadow-glow-cyan"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
