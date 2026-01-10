import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ArrowUpRight, ChevronRight } from "lucide-react";
import { PROJECTS } from "../constants";

const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextProject = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
    };

    const project = PROJECTS[currentIndex];
    const upcomingProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
            }
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
            }
        })
    };

    return (
        <section id="projects" className="pt-24 pb-16 md:py-20 relative bg-slate-50 dark:bg-[#0F172A] transition-colors duration-300 overflow-hidden">
            <div className="w-full md:w-[90%] max-w-none mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="mb-12 text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
                        Selected <span className="text-indigo-600 dark:text-indigo-400">Work</span>
                    </h2>
                    <div className="w-20 h-1 bg-indigo-600 rounded-full" />
                </div>

                {/* Desktop Showcase Slider */}
                <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch h-full min-h-[520px]">
                    {/* Featured Project - Spans 12 columns on md/tablet, 8 columns on lg/desktop */}
                    <div className="col-span-12 lg:col-span-8 relative rounded-[2rem] overflow-hidden group min-h-[520px]">
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute inset-0 w-full h-full"
                            >
                                <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/95 via-[#0A0E1A]/60 to-transparent" />
                                <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-end">
                                    <div className="space-y-6 max-w-2xl">
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech) => (
                                                <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-slate-300 text-xs font-bold">{tech}</span>
                                            ))}
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">{project.title}</h3>
                                            <p className="text-slate-400 text-base font-medium leading-relaxed">{project.desc}</p>
                                        </div>
                                        <div className="flex items-center gap-4 pt-4">
                                            <motion.a href={project.links.demo} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold shadow-lg">Live Demo <ArrowUpRight size={18} /></motion.a>
                                            <motion.a href={project.links.code} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }} className="p-4 rounded-full border border-white/20 text-white hover:bg-white/5"><Github size={20} /></motion.a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Next Project Preview Card (Visible only on Desktop/LG+) */}
                    <div className="hidden lg:block lg:col-span-4 relative rounded-[2rem] overflow-hidden cursor-pointer group" onClick={nextProject}>
                        <img src={upcomingProject.image} alt="Next Project" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 blur-[2px] opacity-60" />
                        <div className="absolute inset-0 bg-[#0A0E1A]/40 group-hover:bg-[#0A0E1A]/20 transition-colors" />
                        <div className="absolute inset-x-0 bottom-0 p-8 space-y-1">
                            <span className="text-sky-400 font-bold uppercase tracking-widest text-[10px]">Next Project</span>
                            <h4 className="text-2xl font-black text-white/50 group-hover:text-white transition-colors tracking-tight">{upcomingProject.title}</h4>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight size={24} className="text-white" />
                        </div>
                    </div>
                </div>

                {/* Mobile Grid View (Hidden on Tablet/MD+) */}
                <div className="md:hidden space-y-8">
                    {PROJECTS.map((project, index) => (
                        <motion.div key={project.id || index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative rounded-[2rem] overflow-hidden min-h-[420px]">
                            <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/95 via-[#0A0E1A]/60 to-transparent" />
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech) => (
                                            <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px] font-bold">{tech}</span>
                                        ))}
                                    </div>
                                    <h3 className="text-3xl font-black text-white tracking-tighter leading-none">{project.title}</h3>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed line-clamp-3">{project.desc}</p>
                                    <div className="flex items-center gap-3 pt-2">
                                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-xs font-bold shadow-lg">Live Demo <ArrowUpRight size={14} /></a>
                                        <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/20 text-white"><Github size={16} /></a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
