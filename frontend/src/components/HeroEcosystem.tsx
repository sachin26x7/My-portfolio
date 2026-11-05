import React from 'react';
import { Atom, Braces, Code2, Database, GitBranch, Server, Workflow } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Technology = {
  name: string;
  group: string;
  icon: LucideIcon;
  position: string;
  accent: string;
};

const technologies: Technology[] = [
  { name: 'React.js', group: 'Frontend', icon: Atom, position: 'react', accent: 'coral' },
  { name: 'JavaScript', group: 'Frontend', icon: Braces, position: 'javascript', accent: 'amber' },
  { name: 'TypeScript', group: 'Frontend', icon: Code2, position: 'typescript', accent: 'blue' },
  { name: 'Node.js', group: 'Backend', icon: Server, position: 'node', accent: 'green' },
  { name: 'Express.js', group: 'Backend', icon: Workflow, position: 'express', accent: 'neutral' },
  { name: 'REST APIs', group: 'Backend', icon: Code2, position: 'rest', accent: 'coral' },
  { name: 'MongoDB', group: 'Data', icon: Database, position: 'mongodb', accent: 'green' },
  { name: 'MySQL', group: 'Data', icon: Database, position: 'mysql', accent: 'blue' },
  { name: 'Git', group: 'Tooling', icon: GitBranch, position: 'git', accent: 'amber' },
];

type HeroEcosystemProps = {
  sceneRef: React.RefObject<HTMLDivElement>;
};

export const HeroEcosystem: React.FC<HeroEcosystemProps> = ({ sceneRef }) => (
  <div ref={sceneRef} className="hero-3d-scene" role="group" aria-label="Interactive 3D developer technology ecosystem">
    <div className="hero-scene-grid" aria-hidden="true" />
    <div className="hero-scene-glow" aria-hidden="true" />
    <div className="hero-orbit hero-orbit-outer" aria-hidden="true">
      <span className="hero-orbit-point" />
    </div>
    <div className="hero-orbit hero-orbit-inner" aria-hidden="true">
      <span className="hero-orbit-point" />
    </div>
    <div className="hero-core-rig" aria-hidden="true">
      <div className="hero-core-shadow" />
      <div className="hero-core-shell">
        <div className="hero-core-screen">
          <span className="hero-core-mark">{'</>'}</span>
          <span className="hero-core-caption">FULL-STACK / ENGINEERING</span>
          <span className="hero-core-status"><i /> SYSTEM ONLINE</span>
        </div>
      </div>
      <span className="hero-core-satellite hero-core-satellite--one" />
      <span className="hero-core-satellite hero-core-satellite--two" />
    </div>
    {technologies.map(({ name, group, icon: Icon, position, accent }) => (
      <div
        role="img"
        className={`hero-tech-node hero-tech-node--${position} hero-tech-node--${accent}`}
        key={name}
        aria-label={`${name}, ${group}`}
      >
        <span className="hero-tech-icon" aria-hidden="true"><Icon size={17} strokeWidth={1.8} /></span>
        <span className="hero-tech-copy">
          <span className="hero-tech-group">{group}</span>
          <span className="hero-tech-name">{name}</span>
        </span>
        <span className="hero-tech-glint" aria-hidden="true" />
      </div>
    ))}
  </div>
);
