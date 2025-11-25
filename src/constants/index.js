import { FaReact, FaNodeJs, FaGitAlt, FaDocker, FaFigma, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiNextdotjs, SiExpress, SiPostgresql, SiFirebase } from "react-icons/si";

export const SKILLS = [
    {
        category: "Frontend",
        items: [
            { name: "React", icon: FaReact },
            { name: "Next.js", icon: SiNextdotjs },
            { name: "TypeScript", icon: SiTypescript },
            { name: "Tailwind CSS", icon: SiTailwindcss },
        ],
    },
    {
        category: "Backend",
        items: [
            { name: "Node.js", icon: FaNodeJs },
            { name: "Express", icon: SiExpress },
            { name: "PostgreSQL", icon: SiPostgresql },
            { name: "Firebase", icon: SiFirebase },
        ],
    },
    {
        category: "Tools",
        items: [
            { name: "Git", icon: FaGitAlt },
            { name: "Docker", icon: FaDocker },
            { name: "Figma", icon: FaFigma },
        ],
    },
];

export const PROJECTS = [
    {
        id: 1,
        title: "E-Commerce Platform",
        desc: "A full-featured online store built with React, Node.js, and MongoDB. Includes user authentication, payment processing, and admin dashboard.",
        tech: ["React", "Node.js", "MongoDB", "Stripe"],
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
        links: {
            demo: "#",
            code: "#",
        },
    },
    {
        id: 2,
        title: "Task Management App",
        desc: "A collaborative task manager with real-time updates using Socket.io. Features drag-and-drop interface and team workspaces.",
        tech: ["Vue.js", "Firebase", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
        links: {
            demo: "#",
            code: "#",
        },
    },
    {
        id: 3,
        title: "Weather Dashboard",
        desc: "A beautiful weather application providing detailed forecasts and historical data visualization using D3.js.",
        tech: ["React", "D3.js", "OpenWeather API"],
        image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        links: {
            demo: "#",
            code: "#",
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
    {
        name: "Twitter",
        icon: FaTwitter,
        href: "https://twitter.com",
        ariaLabel: "Link to Twitter Profile",
    },
];
