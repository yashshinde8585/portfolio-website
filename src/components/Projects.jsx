import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../constants";

const Projects = () => {

    return (
        <section id="projects" className="pt-24 pb-16 md:py-20 relative bg-slate-50 dark:bg-[#0F172A] transition-colors duration-300 overflow-hidden">
            <div className="w-full md:w-[90%] max-w-none mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="mb-12 flex items-center gap-4">
                    <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-none">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                        </span>
                        <h2 className="text-sm md:text-base font-bold tracking-widest text-slate-900 dark:text-white uppercase">
                            Selected Work
                        </h2>
                    </div>
                    <div className="h-px bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent flex-1" />
                </div>

                {/* Desktop Grid View */}
                <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative rounded-b-[2rem] overflow-hidden w-full bg-[#1e293b] dark:bg-slate-900 shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
                        >
                            {/* Image Section */}
                            <div className="relative h-48 overflow-hidden">
                                <div className="absolute inset-0 bg-[#0A0E1A]">
                                    <picture>
                                        <source srcSet={project.image} type="image/webp" />
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </picture>
                                    <div className="absolute inset-0 bg-[#0A0E1A]/10 group-hover:bg-transparent transition-colors duration-300" />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 flex-1 flex flex-col">
                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech.map((tech) => (
                                        <span key={tech} className="px-3 py-1 rounded-full bg-slate-700/50 dark:bg-white/5 border border-slate-600/50 dark:border-white/10 text-slate-300 text-xs font-bold">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Title & Desc */}
                                <div className="space-y-3 mb-6 flex-1">
                                    <h3 className="text-2xl font-black text-white tracking-tight leading-none">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed line-clamp-3">
                                        {project.desc}
                                    </p>
                                </div>

                                {/* Links */}
                                <div className="flex items-center gap-4 pt-4 mt-auto border-t border-slate-700/50 dark:border-white/5">
                                    <a
                                        href={project.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-lg transform transition hover:scale-105 active:scale-95 text-sm"
                                    >
                                        Live Demo <ArrowUpRight size={16} />
                                    </a>
                                    <a
                                        href={project.links.code}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-full border border-slate-600 dark:border-white/20 text-slate-300 dark:text-white hover:bg-slate-700 dark:hover:bg-white/10 transform transition hover:scale-110 hover:rotate-6"
                                    >
                                        <Github size={18} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Grid View (Hidden on Tablet/MD+) */}
                <div className="md:hidden space-y-8">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={project.id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative rounded-b-[2rem] overflow-hidden w-full bg-[#1e293b] dark:bg-slate-900 shadow-2xl flex flex-col"
                        >
                            {/* Image Section */}
                            <div className="relative w-full aspect-video overflow-hidden">
                                <div className="absolute inset-0 bg-[#0A0E1A]">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-[#0A0E1A]/10 transition-colors duration-300" />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-5 flex-1 flex flex-col">
                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech.map((tech) => (
                                        <span key={tech} className="px-3 py-1 rounded-full bg-slate-700/50 dark:bg-white/5 border border-slate-600/50 dark:border-white/10 text-slate-300 text-xs font-bold">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Title & Desc */}
                                <div className="space-y-3 mb-6 flex-1">
                                    <h3 className="text-2xl font-black text-white tracking-tight leading-none">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed line-clamp-3">
                                        {project.desc}
                                    </p>
                                </div>

                                {/* Links */}
                                <div className="flex items-center gap-4 pt-4 mt-auto border-t border-slate-700/50 dark:border-white/5">
                                    <a
                                        href={project.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-lg transform transition active:scale-95 text-sm"
                                    >
                                        Live Demo <ArrowUpRight size={16} />
                                    </a>
                                    <a
                                        href={project.links.code}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-full border border-slate-600 dark:border-white/20 text-slate-300 dark:text-white hover:bg-slate-700 dark:hover:bg-white/10 transform transition active:scale-95"
                                    >
                                        <Github size={18} />
                                    </a>
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
