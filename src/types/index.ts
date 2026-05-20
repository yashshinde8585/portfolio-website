import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';

export type IconComponent = IconType | LucideIcon;

export interface NavLink {
  id: string;
  name: string;
  href: string;
  icon: IconComponent;
}

export interface SkillItem {
  name: string;
  icon: IconComponent;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface ProjectDetail {
  id: number;
  text: string;
  relatedTech: string[];
}

export interface TechStackItem {
  id: string;
  label: string;
}

export interface CompanyExperience {
  name: string;
  role: string;
  duration: string;
  location: string;
  workMode: string;
  website?: string;
  description: string[];
  logo: string;
  isCurrent?: boolean;
  projects: ProjectDetail[];
  techStack: TechStackItem[];
}

export interface AcademicItem {
  name: string;
  role: string;
  duration: string;
  location: string;
  specialization: string;
  courses: string[];
}

export interface CommunityEvent {
  name: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  logo: string;
  images?: string[];
  projects: ProjectDetail[];
  techStack: TechStackItem[];
}

export interface ExperienceData {
  internships: {
    title: string;
    companies: CompanyExperience[];
  };
  academic: {
    title: string;
    items: AcademicItem[];
  };
  meetups: {
    title: string;
    items: CommunityEvent[];
  };
  projects: {
    title: string;
    items: {
      name: string;
      role: string;
      duration: string;
      location: string;
      description: string;
      logo: string;
      projects: ProjectDetail[];
      techStack: TechStackItem[];
    }[];
  };
  achievements: {
    title: string;
    items: {
      name: string;
      role: string;
      duration: string;
      location: string;
      description: string;
      logo: string;
      projects: ProjectDetail[];
      techStack: TechStackItem[];
    }[];
  };
}

export interface PortfolioProject {
  id: number;
  title: string;
  desc: string;
  tech: string[];
  image: string;
  objectFit?: 'cover' | 'contain';
  links: {
    demo: string;
    code: string;
  };
}

export interface SocialLink {
  name: string;
  icon: IconComponent;
  href: string;
  ariaLabel: string;
}

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  bio: string;
  email: string;
}

export interface Principle {
  title: string;
  description: string;
  icon: 'Code' | 'Palette' | 'Zap' | 'Sparkles';
}
