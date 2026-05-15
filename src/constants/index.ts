import { Home, User, Briefcase, Mail } from 'lucide-react';
import { FaGitAlt, FaGithub, FaLinkedin, FaNodeJs, FaMousePointer } from 'react-icons/fa';
import {
  SiReact,
  SiTailwindcss,
  SiExpress,
  SiPostgresql,
  SiPostman,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiOpenjdk,
  SiFirebase,
  SiDocker,
  SiMongodb,
  SiGithub,
  SiRedis,
  SiAmazonwebservices,
  SiVercel,
  SiGithubcopilot,
  SiAnthropic,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

import airbnbProjectImg from '../assets/airbnb_project_opt.webp';
import luminaImg from '../assets/Lumina_opt.webp';
import {
  NavLink,
  SkillCategory,
  ExperienceData,
  PortfolioProject,
  SocialLink,
  ProfileData,
  Principle,
} from '../types';

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '#home', id: 'home', icon: Home },
  { name: 'About', href: '#about', id: 'about', icon: User },
  { name: 'Projects', href: '#projects', id: 'projects', icon: Briefcase },
  { name: 'Contact', href: '#contact', id: 'contact', icon: Mail },
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: 'Languages',
    items: [
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'Python', icon: SiPython },
      { name: 'Java', icon: SiOpenjdk },
    ],
  },
  {
    category: 'Full Stack',
    items: [
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Node.js', icon: FaNodeJs },
      { name: 'Express', icon: SiExpress },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Firebase', icon: SiFirebase },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'VS Code', icon: VscVscode },
      { name: 'Git', icon: FaGitAlt },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Postman', icon: SiPostman },
      { name: 'Docker', icon: SiDocker },
      { name: 'Redis', icon: SiRedis },
      { name: 'AWS', icon: SiAmazonwebservices },
      { name: 'Vercel', icon: SiVercel },
      { name: 'MCP', icon: SiAnthropic },
      { name: 'Copilot', icon: SiGithubcopilot },
      { name: 'Cursor', icon: FaMousePointer },
    ],
  },
];

export const EXPERIENCE_DATA: ExperienceData = {
  internships: {
    title: 'Internships',
    companies: [
      {
        name: 'BharatGo',
        role: 'Software Developer Intern',
        duration: 'Oct 2025 - Jan 2026',
        location: 'Pune, Maharashtra',
        workMode: 'Onsite',
        website: 'https://seller.bharatgo.com/login',
        description: [
          'Worked on full-stack eCommerce SaaS platform, building Node.js/Express backend services and React/Next.js interactive UIs.',
        ],
        logo: 'BG',
        isCurrent: true,
        projects: [
          { id: 1, text: 'Optimized React rendering performance', relatedTech: ['react'] },
          { id: 2, text: 'Implemented dark mode across the app', relatedTech: ['tailwind'] },
        ],
        techStack: [
          { id: 'react', label: 'React' },
          { id: 'tailwind', label: 'Tailwind CSS' },
        ],
      },
      {
        name: 'Leometric Technology Pvt Ltd',
        role: 'Web Developer Intern',
        duration: 'Jun 2025 - Aug 2025',
        location: 'Pune, Maharashtra',
        workMode: 'Onsite',
        website: 'https://www.sendmammogram.com/',
        description: [
          'Send Mammogram: Worked on HIPAA-secure UI and backend features for cloud breast image sharing platform, optimizing workflows and AWS integrations to reduce redundant imaging.',
        ],
        logo: 'SI',
        projects: [
          { id: 1, text: 'Developed real-time chat feature', relatedTech: ['firebase'] },
          { id: 2, text: 'Integrated Stripe payments', relatedTech: ['nextjs'] },
        ],
        techStack: [
          { id: 'nextjs', label: 'Next.js' },
          { id: 'firebase', label: 'Firebase' },
        ],
      },
    ],
  },
  academic: {
    title: 'Education',
    items: [
      {
        name: 'MIT World Peace University',
        role: 'Master of Computer Applications',
        duration: '2023 - 2025',
        location: 'Pune',
        specialization: 'Artificial Intelligence & Machine Learning',
        courses: ['Machine Learning', 'Cloud Computing', 'Advanced Web Tech'],
      },
      {
        name: 'K.K. Wagh Computer Science College',
        role: 'Bachelor of Computer Applications',
        duration: '2020 - 2023',
        location: 'Nashik',
        specialization: '',
        courses: ['Data Structures', 'DBMS', 'Software Engineering'],
      },
    ],
  },
  meetups: {
    title: 'Community',
    items: [
      {
        name: 'React NYC',
        role: 'Speaker',
        duration: '2023',
        location: 'New York, NY',
        description: "Gave a talk on 'Advanced Framer Motion' to over 200 developers.",
        logo: 'RN',
        images: [
          'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1470&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=1470&auto=format&fit=crop',
        ],
        projects: [{ id: 1, text: 'Shared open source contributions', relatedTech: ['git'] }],
        techStack: [
          { id: 'react', label: 'React' },
          { id: 'git', label: 'Git' },
        ],
      },
    ],
  },
  projects: {
    title: 'Featured Projects',
    items: [
      {
        name: 'E-Commerce Platform',
        role: 'Full Stack Developer',
        duration: '2023',
        location: 'Remote',
        description:
          'Built a full-stack Airbnb-style platform enabling users to host, discover, and review accommodations worldwide using MVC architecture with secure data handling and a responsive UI.',
        logo: 'EC',
        projects: [
          { id: 1, text: 'Implemented Stripe payment gateway', relatedTech: ['node'] },
          { id: 2, text: 'Built admin dashboard with charts', relatedTech: ['react'] },
        ],
        techStack: [
          { id: 'react', label: 'React' },
          { id: 'node', label: 'Node.js' },
          { id: 'mongo', label: 'MongoDB' },
        ],
      },
    ],
  },
  achievements: {
    title: 'Achievements',
    items: [
      {
        name: 'Hackathon Winner',
        role: 'Team Lead',
        duration: '2023',
        location: 'San Francisco, CA',
        description:
          'Won 1st place in the Global AI Hackathon for building an accessibility tool for the visually impaired.',
        logo: 'HW',
        projects: [{ id: 1, text: 'Developed computer vision model', relatedTech: ['python'] }],
        techStack: [
          { id: 'python', label: 'Python' },
          { id: 'tensorflow', label: 'TensorFlow' },
        ],
      },
    ],
  },
};

export const PROJECTS: PortfolioProject[] = [
  {
    id: 1,
    title: 'NexaSetu (Enterprise SaaS Dashboard)',
    desc: 'A production-grade project management platform featuring multi-tenant architecture, real-time synchronization, and advanced performance optimizations with Redis and TanStack Query.',
    tech: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'TanStack Query',
      'Redis',
      'Clerk Auth',
      'Node.js',
      'Express',
      'PostgreSQL',
    ],
    image: 'https://placehold.co/600x400/020617/sky-500?text=NexaSetu',
    links: {
      demo: 'https://nexasetu-frontend.onrender.com/',
      code: '#',
    },
  },
  {
    id: 2,
    title: 'Lumina (Smart Job Tracker)',
    desc: 'A Dedicated CRM for Your Career. An advanced application tracking dashboard featuring interactive Kanban boards, progress analytics, and deadline management.',
    tech: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Lexical Editor',
      'Framer Motion',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Axios',
      'OpenAPI',
    ],
    image: luminaImg,
    links: {
      demo: 'https://lumina-airesume-jobtracker.onrender.com/#/',
      code: '#',
    },
  },
  {
    id: 3,
    title: 'Wanderlust (Airbnb-clone)',
    desc: 'Built a full-stack Airbnb-style platform enabling users to host, discover, and review accommodations worldwide using MVC architecture.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: airbnbProjectImg,
    objectFit: 'contain',
    links: {
      demo: 'https://wanderlust-airbnb-clone-74tv.onrender.com/listings',
      code: 'https://github.com/yashshinde8585/wanderlust-airbnb-clone',
    },
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    icon: FaGithub,
    href: 'https://github.com/yashshinde8585',
    ariaLabel: 'Link to GitHub Profile',
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/yashshinde8585/',
    ariaLabel: 'Link to LinkedIn Profile',
  },
];

export const PROFILE: ProfileData = {
  name: 'Yash Shinde',
  title: 'Full-Stack Developer',
  location: 'Pune, India',
  bio: 'I build user-friendly web applications that solve real problems. I work on both the front and back parts of a website to ensure everything runs smoothly.',
  email: 'yashshinde8585@gmail.com',
};

export const PRINCIPLES: Principle[] = [
  {
    title: 'Clean Code',
    description: 'Writing maintainable, scalable code with modern best practices',
    icon: 'Code',
  },
  {
    title: 'Design Systems',
    description: 'Creating cohesive visual experiences with attention to detail',
    icon: 'Palette',
  },
  {
    title: 'Performance',
    description: 'Optimizing for speed and exceptional user experience',
    icon: 'Zap',
  },
  {
    title: 'Innovation',
    description: 'Exploring cutting-edge technologies and creative solutions',
    icon: 'Sparkles',
  },
];
