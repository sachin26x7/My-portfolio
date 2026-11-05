import React from 'react';
import { Github, Link2, Linkedin, Mail, Twitter } from 'lucide-react';
import { SocialLink } from '../types/portfolio';

interface SocialIconProps {
  icon: SocialLink['icon'];
  className: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ icon, className }) => {
  const iconProps = { className, 'aria-hidden': true as const };

  switch (icon) {
    case 'github': return <Github {...iconProps} />;
    case 'linkedin': return <Linkedin {...iconProps} />;
    case 'twitter': return <Twitter {...iconProps} />;
    case 'mail': return <Mail {...iconProps} />;
    default: return <Link2 {...iconProps} />;
  }
};
