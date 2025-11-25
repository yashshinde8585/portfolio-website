import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, Code, Server, Database, Globe, Layout, Smartphone, Terminal, Cpu, Layers, X } from 'lucide-react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, useSphere, usePlane } from '@react-three/cannon';
import { Html } from '@react-three/drei';
import RollingEye from './ui/RollingEye';
import KineticReel from './ui/KineticReel';

const SKILLS = [
    {
        name: "Frontend",
        icon: Layout,
        items: [
            { name: "React", icon: Code },
            { name: "TypeScript", icon: Code },
            { name: "Tailwind", icon: Layout },
            { name: "Three.js", icon: Globe },
            { name: "HTML/CSS", icon: Layout }
        ]
    },
    {
        name: "Backend",
        icon: Server,
        items: [
            { name: "Node.js", icon: Server },
            { name: "Python", icon: Terminal },
            { name: "PostgreSQL", icon: Database },
            { name: "MongoDB", icon: Database }
        ]
    },
    {
        name: "Tools",
        icon: Cpu,
        items: [
            { name: "Git", icon: Code },
            { name: "Docker", icon: Layers },
            { name: "AWS", icon: Globe },
            { name: "Figma", icon: Layout }
        ]
    }
];

const EXPERIENCE_DATA = {
    internships: {
        title: "Internships",
        companies: [
            {
                name: "BharatGo",
                logo: "/BharatGo_Logo.png",
                role: "Software Developer Intern",
                duration: "Present - 2 months",
                location: "Pune, Maharashtra",
                description: "Worked on React-based web applications and learned modern development practices",
                projects: [
                    { id: 1, text: "Built responsive dashboard using React and TypeScript", relatedTech: ["react", "ts", "node"] },
                    { id: 2, text: "Implemented REST API integration with Node.js backend", relatedTech: ["node", "mongo"] },
                    { id: 3, text: "Optimized application performance by 40%", relatedTech: ["react", "ts", "git"] }
                ],
                techStack: [
                    { id: "next", label: "Next.js" },
                    // { id: "react", label: "React" },
                    { id: "ts", label: "TypeScript" },
                    { id: "tailwind", label: "Tailwind CSS" },
                    { id: "node", label: "Node.js" },
                    { id: "express", label: "Express.js" },
                    { id: "postgres", label: "PostgreSQL" },
                    // { id: "git", label: "Git" }
                ]
            },
            {
                name: "Leometric Technology Pvt Ltd",
                logo: "/Leometric Technology Logo.jpeg",
                role: "Full Stack Developer",
                duration: "Winter 2023 (4 months)",
                location: "Remote",
                description: "Built features for the main product using Node.js and React",
                projects: [
                    { id: 4, text: "Developed user authentication system with JWT", relatedTech: ["node", "express", "postgres"] },
                    { id: 5, text: "Created real-time chat feature using Socket.io", relatedTech: ["react", "socket", "node"] },
                    { id: 6, text: "Implemented payment gateway integration", relatedTech: ["react", "stripe", "node"] }
                ],
                techStack: [
                    { id: "react", label: "React" },
                    { id: "node", label: "Node.js" },
                    { id: "express", label: "Express" },
                    { id: "postgres", label: "PostgreSQL" },
                    { id: "socket", label: "Socket.io" },
                    { id: "stripe", label: "Stripe" }
                ]
            },
            {
                name: "Iostreak Solutions Pvt Ltd",
                logo: "/Iostreak Logo.png",
                role: "Web Development Intern",
                duration: "Summer 2023 (2 months)",
                location: "New York, NY",
                description: "Created responsive websites and learned industry best practices",
                projects: [
                    { id: 7, text: "Built 5+ client websites using modern frameworks", relatedTech: ["html", "css", "js", "tailwind"] },
                    { id: 8, text: "Implemented SEO optimization strategies", relatedTech: ["html", "wordpress"] },
                    { id: 9, text: "Collaborated with design team on UI/UX improvements", relatedTech: ["figma", "css"] }
                ],
                techStack: [
                    { id: "html", label: "HTML" },
                    { id: "css", label: "CSS" },
                    { id: "js", label: "JavaScript" },
                    { id: "tailwind", label: "Tailwind" },
                    { id: "wordpress", label: "WordPress" },
                    { id: "figma", label: "Figma" }
                ]
            }
        ]
    },
    academic: {
        title: "Academic",
        items: [
            {
                name: "Master of Computer Applications",
                role: "AI/ML Specialization",
                duration: "2023 - 2025",
                logo: "🎓",
                location: "MIT World Peace University, Pune",
                description: "Graduated with High Honors. Focused on Software Engineering and Artificial Intelligence.",
                projects: [
                    { id: 101, text: "Final Year Project: AI-Powered Portfolio Builder", relatedTech: ["react", "ai", "python"] },
                    { id: 102, text: "Research Paper on Distributed Systems", relatedTech: ["research", "systems"] }
                ],
                techStack: [
                    { id: "java", label: "Java" },
                    { id: "python", label: "Python" },
                    { id: "cpp", label: "C++" },
                    { id: "dsa", label: "DSA" }
                ]
            },
            {
                name: "Academic Achievements",
                role: "Dean's List & Awards",
                duration: "2023 - 2024",
                logo: "🏆",
                location: "University of Technology",
                description: "Recognized for outstanding academic performance and contributions to the tech community.",
                projects: [
                    { id: 103, text: "Ranked Top 5% in Class", relatedTech: [] },
                    { id: 104, text: "Winner of National Hackathon 2023", relatedTech: ["hackathon", "innovation"] }
                ],
                techStack: []
            }
        ]
    },
    meetups: {
        title: "Community & Meetups",
        items: [
            {
                name: "Tech Conferences 2024",
                role: "Attendee & Networker",
                duration: "2024",
                logo: "🎤",
                location: "Various Locations",
                description: "Participated in major tech conferences to stay updated with industry trends and network with professionals.",
                projects: [
                    { id: 201, text: "React India 2024 - Goa", relatedTech: ["react", "networking"] },
                    { id: 202, text: "AWS Summit - Mumbai", relatedTech: ["aws", "cloud"] }
                ],
                techStack: [
                    { id: "react", label: "React" },
                    { id: "aws", label: "AWS" },
                    { id: "networking", label: "Networking" }
                ],
                images: [
                    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2072&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1475721027767-4d529c145753?q=80&w=2068&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1560523159-4a9692d222f9?q=80&w=2070&auto=format&fit=crop"
                ]
            },
            {
                name: "Hackathon Organizer",
                role: "Core Team Member",
                duration: "2023",
                logo: "🚀",
                location: "University Campus",
                description: "Organized a 24-hour national level hackathon with over 500+ participants.",
                projects: [
                    { id: 203, text: "Managed event logistics and sponsorship", relatedTech: ["management"] },
                    { id: 204, text: "Mentored junior developer teams", relatedTech: ["mentorship"] }
                ],
                techStack: [
                    { id: "management", label: "Management" },
                    { id: "leadership", label: "Leadership" }
                ],
                images: [
                    "https://images.unsplash.com/photo-1504384308090-c54be3852f33?q=80&w=1887&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"
                ]
            },
            {
                name: "Open Source Contributor",
                role: "Active Contributor",
                duration: "Ongoing",
                logo: "🌐",
                location: "Remote",
                description: "Actively contributing to various open source projects on GitHub.",
                projects: [
                    { id: 205, text: "Contributed to popular React libraries", relatedTech: ["react", "opensource"] },
                    { id: 206, text: "Fixed bugs in documentation sites", relatedTech: ["docs"] }
                ],
                techStack: [
                    { id: "git", label: "Git" },
                    { id: "github", label: "GitHub" }
                ],
                images: [
                    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1607799275518-d58665d099db?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop"
                ]
            }
        ]
    }
};

const SkillBall = ({ position, icon: Icon, name }) => {
    const [ref, api] = useSphere(() => ({
        mass: 1,
        position,
        args: [0.6],
        linearDamping: 0.4,
        angularDamping: 0.4
    }));

    // 1. Track the previous scroll position
    const prevScroll = useRef(0);

    // Give random initial velocity
    useEffect(() => {
        const x = (Math.random() - 0.5) * 5;
        const y = (Math.random() - 0.5) * 5;
        api.velocity.set(x, y, 0);
        prevScroll.current = window.scrollY;
    }, [api]);

    useFrame(() => {
        // 2. Get current scroll and calculate speed
        const currentScroll = window.scrollY;
        const scrollSpeed = Math.abs(currentScroll - prevScroll.current);

        // 3. The "Seismic" Threshold
        // We only shake if the user is scrolling decently fast (> 2px per frame)
        if (scrollSpeed > 2) {

            // 4. Calculate Force (Scaled down so it's not too crazy)
            const force = scrollSpeed * 0.05;

            // 5. Apply the Physics Impulse
            // We apply random forces to X, Y, and Z to simulate turbulence
            api.applyImpulse(
                [
                    (Math.random() - 0.5) * force,
                    (Math.random() - 0.5) * force,
                    (Math.random() - 0.5) * force
                ],
                [0, 0, 0] // Apply force at the center of the ball
            );
        }

        // Update ref for the next frame
        prevScroll.current = currentScroll;
    });

    return (
        <mesh ref={ref} castShadow receiveShadow>
            <sphereGeometry args={[0.6, 32, 32]} />
            <meshStandardMaterial color="#4f46e5" roughness={0.2} metalness={0.8} envMapIntensity={1} />
            <Html center distanceFactor={10} transform>
                <div className="flex flex-col items-center justify-center pointer-events-none select-none">
                    <Icon className="text-white w-6 h-6 mb-1" />
                    <span className="text-xs text-white font-bold whitespace-nowrap">{name}</span>
                </div>
            </Html>
        </mesh>
    );
};

const Wall = (props) => {
    usePlane(() => ({ ...props }));
    return null; // Invisible wall
};

const SkillsScene = () => {
    return (
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight intensity={0.8} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Physics gravity={[0, 0, 0]}>
                {SKILLS.flatMap(s => s.items).map((skill, i) => (
                    <SkillBall
                        key={i}
                        position={[Math.random() * 6 - 3, Math.random() * 6 - 3, Math.random() * 2 - 1]}
                        icon={skill.icon}
                        name={skill.name}
                    />
                ))}
                {/* Physics Walls */}
                <Wall position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
                <Wall position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} />
                <Wall position={[-6, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
                <Wall position={[6, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
                <Wall position={[0, 0, -2]} />
            </Physics>
        </Canvas>
    );
};

const StatCard = ({ stat, label, onClick, isActive, onMouseEnter }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const iconVariants = {
        hidden: {
            opacity: 0,
            scale: 0.5,
            x: -10
        },
        hover: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 12
            }
        }
    };

    return (
        <motion.div
            className={`p-4 bg-[#1E293B] md:bg-white rounded-xl border border-white/10 md:border-slate-200 backdrop-blur-sm text-center cursor-pointer transition-all relative overflow-hidden flex flex-col items-center justify-center gap-3 group h-full md:shadow-sm ${isActive ? 'border-sky-500/50 md:border-blue-500/50 bg-white/10 md:bg-slate-50' : 'hover:bg-white/10 md:hover:bg-slate-50 hover:border-sky-500/50 md:hover:border-blue-500/50'}`}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            role="button"
            tabIndex={0}
            onMouseEnter={onMouseEnter}
            onMouseMove={handleMouseMove}
            whileHover="hover"
            initial="hidden"
            animate="hidden"
        >
            {/* Spotlight Overlay */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          250px circle at ${mouseX}px ${mouseY}px,
                          rgba(99, 102, 241, 0.15),
                          transparent 80%
                        )
                    `,
                }}
            />

            {/* Orb Container */}
            {!isActive && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.3)] backdrop-blur-md flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <motion.div variants={iconVariants}>
                            <ArrowRight className="text-white w-5 h-5" />
                        </motion.div>
                    </div>
                </div>
            )}

            {/* Text Content */}
            <div className="flex flex-col items-center justify-center z-20">
                <h4 className="text-2xl font-bold text-slate-100 md:text-slate-900 mb-1">{stat}</h4>
                <p className="text-xs font-medium text-slate-400 md:text-slate-500 uppercase tracking-wider">{label}</p>
            </div>
        </motion.div>
    );
};

const InternshipCard = ({ company, index, onClick }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative w-full p-6 rounded-2xl bg-[#1E293B] md:bg-white border border-white/10 md:border-slate-200 overflow-hidden cursor-pointer transition-all duration-300 hover:border-sky-500/30 md:hover:border-blue-500/30 md:shadow-sm"
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(e);
                }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="button"
            tabIndex={0}
            onMouseMove={handleMouseMove}
        >
            {/* Spotlight Overlay */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100 z-10"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          400px circle at ${mouseX}px ${mouseY}px,
                          rgba(99, 102, 241, 0.1),
                          transparent 80%
                        )
                    `,
                }}
            />

            <div className="relative z-20 flex items-center justify-between gap-6">
                {/* Left: Content Hierarchy */}
                <div className="flex-1 space-y-2">
                    <h4 className="text-2xl font-bold text-slate-100 md:text-slate-900 tracking-tight">{company.name}</h4>
                    <p className="text-lg font-medium text-slate-400 md:text-slate-600">{company.role}</p>
                    <p className="text-sm font-medium text-slate-500 md:text-slate-500 uppercase tracking-wider">{company.duration}</p>
                </div>

                {/* Right: The Sentient Inspector Trigger */}
                <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-500/20 group-hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] group-hover:border-indigo-500/40">
                        <RollingEye parentRef={cardRef} isHovered={isHovered} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const About = () => {
    const [activeInfo, setActiveInfo] = useState(null);
    const [showDetailed, setShowDetailed] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showInstruction, setShowInstruction] = useState(false);
    const [hoveredProject, setHoveredProject] = useState(null);

    // 3D Tilt & Specular Edge Logic
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-300, 300], [5, -5]); // Tilt X based on Mouse Y
    const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]); // Tilt Y based on Mouse X

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        mouseX.set(x);
        mouseY.set(y);

        // For specular edge
        const xPct = e.clientX - rect.left;
        const yPct = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${xPct}px`);
        cardRef.current.style.setProperty('--mouse-y', `${yPct}px`);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Helper to determine pill style
    const getPillStyle = (techId) => {
        if (!hoveredProject) return "opacity-100 scale-100 bg-indigo-500/20 border-indigo-500/30 text-indigo-300";

        const isRelevant = hoveredProject.relatedTech.includes(techId);
        return isRelevant
            ? "opacity-100 scale-100 bg-indigo-500/40 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]"
            : "opacity-20 blur-[1px] grayscale bg-white/5 border-white/5 text-gray-500";
    };

    // Show instruction immediately on hover
    useEffect(() => {
        if (activeInfo && !showDetailed) {
            setShowInstruction(true);
        } else {
            setShowInstruction(false);
        }
    }, [activeInfo, showDetailed]);

    return (
        <section id="about" className="py-32 relative bg-[#0F172A] md:bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Bio Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8 relative z-10"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-100 md:text-slate-900">
                            About Me
                        </h2>
                        <div className="w-20 h-1 bg-sky-500 md:bg-blue-600 rounded-full" />

                        <div className="space-y-6 text-lg text-slate-400 md:text-slate-600 leading-relaxed">
                            <p>
                                I&apos;m a passionate Full Stack Developer with over 3 years of experience building web applications. My journey started with a curiosity for how things work on the internet, which led me to dive deep into the world of coding.
                            </p>
                            <p>
                                I love optimizing performance and creating accessible, user-friendly interfaces. Whether it&apos;s architecting a complex backend or polishing a pixel-perfect frontend, I enjoy every step of the development process.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-6">
                            <StatCard
                                stat="3+"
                                label="Years Exp."
                                isActive={activeInfo === 'internships'}
                                onClick={() => setActiveInfo('internships')}
                            />
                            <StatCard
                                stat="3.8"
                                label="GPA"
                                isActive={activeInfo === 'academic'}
                                onClick={() => setActiveInfo('academic')}
                            />
                            <StatCard
                                stat="10+"
                                label="Meetups"
                                isActive={activeInfo === 'meetups'}
                                onClick={() => setActiveInfo('meetups')}
                            />
                        </div>
                    </motion.div>

                    {/* Skills Gravity Well / Info Display */}
                    <div className="h-[600px] w-full relative rounded-3xl overflow-hidden bg-gradient-to-b from-indigo-900/20 to-transparent border border-white/5">
                        <div className="absolute inset-0 flex items-center justify-center">
                            {/* Fallback grid for mobile */}
                            <div className="md:hidden grid grid-cols-3 gap-4 p-4">
                                {SKILLS.flatMap(s => s.items).slice(0, 9).map((skill, i) => (
                                    <div key={i} className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-xl">
                                        <skill.icon className="text-2xl text-indigo-400 mb-2" />
                                        <span className="text-xs text-gray-400">{skill.name}</span>
                                    </div>
                                ))}
                            </div>

                            {/* 3D Scene or Info Display */}
                            <div className="hidden md:block w-full h-full relative perspective-1000">
                                <AnimatePresence mode="wait">
                                    {activeInfo ? (
                                        <motion.div
                                            key={activeInfo}
                                            ref={cardRef}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                            onMouseMove={handleMouseMove}
                                            onMouseLeave={handleMouseLeave}
                                            style={{
                                                rotateX,
                                                rotateY,
                                                transformStyle: "preserve-3d"
                                            }}
                                            className="absolute inset-0 p-8 flex flex-col bg-[#0F172A] md:bg-white border border-white/10 md:border-slate-200 rounded-2xl specular-border md:shadow-xl"
                                        >
                                            {!showDetailed ? (
                                                <>
                                                    <h3 className="text-3xl font-bold text-slate-100 md:text-slate-900 mb-6">
                                                        {EXPERIENCE_DATA[activeInfo].title}
                                                    </h3>

                                                    {activeInfo === 'internships' && (
                                                        <div className="space-y-4">
                                                            {EXPERIENCE_DATA.internships.companies.map((company, i) => (
                                                                <InternshipCard
                                                                    key={i}
                                                                    company={company}
                                                                    index={i}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setShowDetailed(true);
                                                                        setCurrentIndex(i);
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}

                                                    {activeInfo === 'academic' && (
                                                        <div className="space-y-4">
                                                            {EXPERIENCE_DATA.academic.items.map((item, i) => (
                                                                <InternshipCard
                                                                    key={i}
                                                                    company={item}
                                                                    index={i}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setShowDetailed(true);
                                                                        setCurrentIndex(i);
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}

                                                    {activeInfo === 'meetups' && (
                                                        <div className="space-y-4">
                                                            {EXPERIENCE_DATA.meetups.items.map((item, i) => (
                                                                <InternshipCard
                                                                    key={i}
                                                                    company={item}
                                                                    index={i}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setShowDetailed(true);
                                                                        setCurrentIndex(i);
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <motion.div
                                                    key={currentIndex}
                                                    initial={{ opacity: 0, x: 50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -50 }}
                                                    className="h-full flex flex-col relative"
                                                >
                                                    {/* Close Button - Top Right */}
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            setShowDetailed(false);
                                                        }}
                                                        style={{ transform: "translateZ(50px)" }}
                                                        className="absolute -top-4 -right-4 z-50 flex items-center justify-center p-2 rounded-full bg-white/5 md:bg-white text-slate-400 md:text-slate-600 border border-white/5 md:border-slate-200 hover:bg-white/10 md:hover:bg-slate-50 hover:text-white md:hover:text-slate-900 hover:border-white/20 hover:scale-110 transition-all duration-300 ease-out cursor-pointer md:shadow-md"
                                                        aria-label="Close details"
                                                    >
                                                        <X size={20} />
                                                    </button>

                                                    {(activeInfo === 'internships' || activeInfo === 'academic' || activeInfo === 'meetups') && (
                                                        (() => {
                                                            let selectedItem;
                                                            if (activeInfo === 'internships') selectedItem = EXPERIENCE_DATA.internships.companies[currentIndex];
                                                            else if (activeInfo === 'academic') selectedItem = EXPERIENCE_DATA.academic.items[currentIndex];
                                                            else if (activeInfo === 'meetups') selectedItem = EXPERIENCE_DATA.meetups.items[currentIndex];

                                                            if (!selectedItem) return null;

                                                            // Special Render for Meetups: Kinetic Reel
                                                            if (activeInfo === 'meetups') {
                                                                return (
                                                                    <div className="absolute inset-0 z-40 rounded-2xl overflow-hidden">
                                                                        <KineticReel images={selectedItem.images} />

                                                                        {/* Overlay Info */}
                                                                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#05050A] via-[#05050A]/80 to-transparent z-50 pointer-events-none">
                                                                            <h3 className="text-3xl font-bold text-white mb-2">{selectedItem.name}</h3>
                                                                            <p className="text-indigo-400 font-medium">{selectedItem.role}</p>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }

                                                            return (
                                                                <>
                                                                    {/* 1. Header Group */}
                                                                    <header className="flex items-center gap-4 mb-8 pr-12" style={{ transform: "translateZ(20px)" }}>
                                                                        <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm text-4xl overflow-hidden">
                                                                            {selectedItem.logo.startsWith('/') ? (
                                                                                <img
                                                                                    src={selectedItem.logo}
                                                                                    alt={selectedItem.name}
                                                                                    className="w-full h-full object-cover"
                                                                                />
                                                                            ) : (
                                                                                selectedItem.logo
                                                                            )}
                                                                        </div>
                                                                        <div>
                                                                            <h3 className="text-3xl font-bold text-slate-100 md:text-slate-900">
                                                                                {selectedItem.name}
                                                                            </h3>
                                                                            <p className="text-lg font-medium text-sky-400 md:text-blue-600">
                                                                                {selectedItem.role}
                                                                            </p>
                                                                        </div>
                                                                    </header>

                                                                    {/* 2. Meta Grid */}
                                                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                                                        <div className="p-4 bg-white/5 md:bg-slate-50 rounded-lg border border-transparent md:border-slate-100">
                                                                            <p className="text-xs uppercase tracking-wider text-slate-400/60 md:text-slate-500 mb-1">Duration</p>
                                                                            <p className="text-base font-medium text-slate-100/90 md:text-slate-700">{selectedItem.duration}</p>
                                                                        </div>
                                                                        <div className="p-4 bg-white/5 md:bg-slate-50 rounded-lg border border-transparent md:border-slate-100">
                                                                            <p className="text-xs uppercase tracking-wider text-slate-400/60 md:text-slate-500 mb-1">Location</p>
                                                                            <p className="text-base font-medium text-slate-100/90 md:text-slate-700">{selectedItem.location}</p>
                                                                        </div>
                                                                    </div>

                                                                    {/* 3. Sections */}
                                                                    <div className="space-y-6 mb-8 pr-2 pb-4">
                                                                        <div>
                                                                            <h4 className="text-lg font-semibold text-slate-100 md:text-slate-900 mb-3">About</h4>
                                                                            <p className="text-slate-300 md:text-slate-600 leading-relaxed">{selectedItem.description}</p>
                                                                        </div>

                                                                        <div>
                                                                            <h4 className="text-lg font-semibold text-slate-100 md:text-slate-900 mb-3">Key Highlights</h4>
                                                                            <ul className="space-y-2">
                                                                                {selectedItem.projects && selectedItem.projects.map((project) => (
                                                                                    <li
                                                                                        key={project.id}
                                                                                        className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-default group/item"
                                                                                        onMouseEnter={() => setHoveredProject(project)}
                                                                                        onMouseLeave={() => setHoveredProject(null)}
                                                                                    >
                                                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 md:bg-blue-600 group-hover/item:bg-sky-400 md:group-hover/item:bg-blue-500 transition-colors" />
                                                                                        <span className="text-slate-300 md:text-slate-600 group-hover/item:text-slate-100 md:group-hover/item:text-slate-900 transition-colors">
                                                                                            {project.text}
                                                                                        </span>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    </div>

                                                                    {/* 4. Tech Stack */}
                                                                    <div className="mt-auto pt-6 border-t border-white/10 md:border-slate-200">
                                                                        <h4 className="text-lg font-semibold text-slate-100 md:text-slate-900 mb-4">Skills & Technologies</h4>
                                                                        <div className="flex flex-wrap gap-2">
                                                                            {selectedItem.techStack && selectedItem.techStack.map((tech) => (
                                                                                <span
                                                                                    key={tech.id}
                                                                                    className={`px-2 py-0.5 text-xs font-medium rounded-full border transition-all duration-500 ease-out ${getPillStyle(tech.id)}`}
                                                                                >
                                                                                    {tech.label}
                                                                                </span>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            );
                                                        })()
                                                    )}
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="skills"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full h-full cursor-grab active:cursor-grabbing"
                                        >
                                            <SkillsScene />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
