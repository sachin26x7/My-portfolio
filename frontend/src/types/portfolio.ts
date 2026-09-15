export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'mail';
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  description?: string;
}

export interface SkillItem {
  name: string;
  level?: string;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'AI' | 'Web' | 'Automation' | 'ML';
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location?: string;
  period: string;
  type: 'work' | 'education';
  highlights: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  typingRoles: string[];
  bio: string[];
  location: string;
  avatarUrl: string;
  resumeUrl: string;
  email: string;
  stats: StatItem[];
  socials: SocialLink[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  adminPin: string; // Used to authenticate owner customization after deployment
}
