import {
    SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiExpress, SiPostgresql, SiFirebase, SiFigma, SiMongodb, SiVuedotjs, SiD3Dotjs, SiPostman
} from 'react-icons/si';
import { FaGitAlt, FaGithub, FaLinkedin, FaNodeJs, FaMousePointer } from 'react-icons/fa';

import airbnbProjectImg from '../assets/airbnb_project_opt.webp';
import luminaImg from '../assets/Lumina_opt.webp';

export const SKILLS_DATA = [
    {
        category: "Frontend",
        items: [
            { name: "React", icon: SiReact },
            { name: "Next.js", icon: SiNextdotjs },
            { name: "Tailwind CSS", icon: SiTailwindcss },
        ],
    },
    {
        category: "Backend",
        items: [
            { name: "Node.js", icon: FaNodeJs },
            { name: "Express", icon: SiExpress },
            { name: "PostgreSQL", icon: SiPostgresql },
        ],
    },
    {
        category: "Tools",
        items: [
            { name: "Git", icon: FaGitAlt },
            { name: "Postman", icon: SiPostman },
            { name: "Cursor", icon: FaMousePointer },
        ],
    },
];

export const EXPERIENCE_DATA = {
    internships: {
        title: "Internships",
        companies: [
            {
                name: "BharatGo",
                role: "Software Developer Intern",
                duration: "Oct 2025 - Jan 2026",
                location: "Pune, Maharashtra",
                workMode: "Onsite",
                website: "https://seller.bharatgo.com/login",
                description: [
                    "Worked on full-stack eCommerce SaaS platform, building Node.js/Express backend services and React/Next.js interactive UIs.",
                ],
                logo: "BG",
                isCurrent: true,
                projects: [
                    { id: 1, text: "Optimized React rendering performance", relatedTech: ["react"] },
                    { id: 2, text: "Implemented dark mode across the app", relatedTech: ["tailwind"] }
                ],
                techStack: [
                    { id: "react", label: "React" },
                    { id: "tailwind", label: "Tailwind CSS" }
                ]
            },
            {
                name: "Leometric Technology Pvt Ltd",
                role: "Web Developer Intern",
                duration: "Jun 2025 - Aug 2025",
                location: "Pune, Maharashtra",
                workMode: "Onsite",
                website: "https://www.sendmammogram.com/",
                description: [
                    "Send Mammogram: Worked on HIPAA-secure UI and backend features for cloud breast image sharing platform, optimizing workflows and AWS integrations to reduce redundant imaging.",
                ],
                logo: "SI",
                projects: [
                    { id: 1, text: "Developed real-time chat feature", relatedTech: ["firebase"] },
                    { id: 2, text: "Integrated Stripe payments", relatedTech: ["nextjs"] }
                ],
                techStack: [
                    { id: "nextjs", label: "Next.js" },
                    { id: "firebase", label: "Firebase" }
                ]
            },

        ]
    },
    academic: {
        title: "Education",
        items: [
            {
                name: "MIT World Peace University",
                role: "Master of Computer Applications",
                duration: "2023 - 2025",
                location: "Pune",
                specialization: "Artificial Intelligence and Machine Learning",
                courses: ["Machine Learning", "Cloud Computing", "Advanced Web Tech"],
            },
            {
                name: "K.K. Wagh Computer Science College",
                role: "Bachelor of Computer Applications",
                duration: "2020 - 2023",
                location: "Nashik",
                specialization: "Computer Science",
                courses: ["Data Structures", "DBMS", "Software Engineering"],
            }
        ]
    },
    meetups: {
        title: "Community",
        items: [
            {
                name: "React NYC",
                role: "Speaker",
                duration: "2023",
                location: "New York, NY",
                description: "Gave a talk on 'Advanced Framer Motion' to over 200 developers.",
                logo: "RN",
                images: [
                    "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1470&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=1470&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1470&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=1470&auto=format&fit=crop"
                ],
                projects: [
                    { id: 1, text: "Shared open source contributions", relatedTech: ["git"] }
                ],
                techStack: [
                    { id: "react", label: "React" },
                    { id: "git", label: "Git" }
                ]
            }
        ]
    },
    projects: {
        title: "Featured Projects",
        items: [
            {
                name: "E-Commerce Platform",
                role: "Full Stack Developer",
                duration: "2023",
                location: "Remote",
                description: "Built a full-stack Airbnb-style platform enabling users to host, discover, and review accommodations worldwide using MVC architecture with secure data handling and a responsive UI.",
                logo: "EC",
                projects: [
                    { id: 1, text: "Implemented Stripe payment gateway", relatedTech: ["node"] },
                    { id: 2, text: "Built admin dashboard with charts", relatedTech: ["react"] }
                ],
                techStack: [
                    { id: "react", label: "React" },
                    { id: "node", label: "Node.js" },
                    { id: "mongo", label: "MongoDB" }
                ]
            },
            {
                name: "Task Management App",
                role: "Frontend Lead",
                duration: "2022",
                location: "Remote",
                description: "A collaborative task manager with real-time updates using Socket.io. Features drag-and-drop interface and team workspaces.",
                logo: "TM",
                projects: [
                    { id: 1, text: "Real-time updates with Socket.io", relatedTech: ["socket"] },
                    { id: 2, text: "Drag and drop Kanban board", relatedTech: ["react"] }
                ],
                techStack: [
                    { id: "react", label: "React" },
                    { id: "firebase", label: "Firebase" }
                ]
            }
        ]
    },
    achievements: {
        title: "Achievements",
        items: [
            {
                name: "Hackathon Winner",
                role: "Team Lead",
                duration: "2023",
                location: "San Francisco, CA",
                description: "Won 1st place in the Global AI Hackathon for building an accessibility tool for the visually impaired.",
                logo: "HW",
                projects: [
                    { id: 1, text: "Developed computer vision model", relatedTech: ["python"] }
                ],
                techStack: [
                    { id: "python", label: "Python" },
                    { id: "tensorflow", label: "TensorFlow" }
                ]
            },
            {
                name: "Open Source Contributor",
                role: "Contributor",
                duration: "2022 - Present",
                location: "Global",
                description: "Active contributor to major React libraries and ecosystem tools.",
                logo: "OS",
                projects: [
                    { id: 1, text: "Merged 20+ PRs to popular repos", relatedTech: ["git"] }
                ],
                techStack: [
                    { id: "git", label: "Git" },
                    { id: "react", label: "React" }
                ]
            }
        ]
    }
};

export const PROJECTS = [
    {
        id: 1,
        title: "Lumina (Smart Job Tracker)",
        desc: "A Dedicated CRM for Your Career. An advanced application tracking dashboard featuring interactive Kanban boards, progress analytics, and deadline management. It transforms the job search into a structured pipeline, ensuring no opportunity falls through the cracks.",
        tech: ["Vue.js", "Firebase", "Tailwind CSS"],
        image: luminaImg,
        links: {
            demo: "https://lumina-airesume-jobtracker.onrender.com/#/",
            code: "#",
        },
    },
    {
        id: 2,
        title: "Wanderlust (Airbnb-clone)",
        desc: "Built a full-stack Airbnb-style platform enabling users to host, discover, and review accommodations worldwide using MVC architecture with secure data handling and a responsive UI.",
        tech: ["React", "Node.js", "MongoDB", "Stripe"],
        image: airbnbProjectImg,
        objectFit: "contain",
        links: {
            demo: "https://wanderlust-airbnb-clone-74tv.onrender.com/listings",
            code: "https://github.com/yashshinde8585/wanderlust-airbnb-clone",
        },
    },

];

export const SOCIAL_LINKS = [
    {
        name: "GitHub",
        icon: FaGithub,
        href: "https://github.com",
        ariaLabel: "Link to GitHub Profile",
    },
    {
        name: "LinkedIn",
        icon: FaLinkedin,
        href: "https://linkedin.com",
        ariaLabel: "Link to LinkedIn Profile",
    },

];

export const PROFILE = {
    name: "Yash Shinde",
    title: "Full-Stack Developer",
    location: "Pune, India",
    bio: "I build user-friendly web applications that solve real problems. I work on both the front and back parts of a website to ensure everything runs smoothly, and I enjoy exploring how Artificial Intelligence can make applications smarter and more useful.",
    email: "yashshinde8585@gmail.com",
};

export const PRINCIPLES = [
    {
        title: "Clean Code",
        description: "Writing maintainable, scalable code with modern best practices",
        icon: "Code"
    },
    {
        title: "Design Systems",
        description: "Creating cohesive visual experiences with attention to detail",
        icon: "Palette"
    },
    {
        title: "Performance",
        description: "Optimizing for speed and exceptional user experience",
        icon: "Zap"
    },
    {
        title: "Innovation",
        description: "Exploring cutting-edge technologies and creative solutions",
        icon: "Sparkles"
    }
];
