import { motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "../constants";
import PropTypes from "prop-types";

const SpotlightCard = ({ project, index }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 3D Tilt Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        // Spotlight calculation
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);

        // Tilt calculation (normalized -0.5 to 0.5)
        x.set((clientX - left) / width - 0.5);
        y.set((clientY - top) / height - 0.5);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    // Bento grid classes based on index
    const gridClass = index === 0 || index === 3 ? "md:col-span-2" : "md:col-span-1";

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`group relative border border-white/10 md:border-slate-200 bg-[#1E293B] md:bg-white rounded-3xl overflow-hidden backdrop-blur-sm transition-all hover:bg-white/10 md:hover:bg-white hover:border-sky-500/50 md:hover:border-blue-500/50 md:shadow-md md:hover:shadow-lg md:hover:-translate-y-1 ${gridClass}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
                }}
            />

            <div className="relative h-full flex flex-col transform-style-3d">
                <div className="h-48 overflow-hidden">
                    <img
                        src={project.image}
                        alt={`Screenshot of ${project.title}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                <div className="p-6 flex-1 flex flex-col relative z-20">
                    <h3 className="text-xl font-bold text-slate-100 md:text-slate-900 mb-2 translate-z-10">{project.title}</h3>
                    <p className="text-slate-400 md:text-slate-600 text-sm line-clamp-3 mb-4 flex-1">
                        {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-xs font-medium text-sky-300 md:text-blue-700 bg-sky-500/10 md:bg-blue-100 rounded-full border border-sky-500/20 md:border-blue-200"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                        <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center text-sm font-medium text-slate-300 md:text-slate-500 hover:text-sky-400 md:hover:text-blue-600 transition-colors"
                        >
                            <ExternalLink size={16} className="mr-2" /> Live Demo
                        </a>
                        <a
                            href={project.links.code}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center text-sm font-medium text-slate-300 md:text-slate-500 hover:text-sky-400 md:hover:text-blue-600 transition-colors"
                        >
                            <Github size={16} className="mr-2" /> Source Code
                        </a>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

SpotlightCard.propTypes = {
    project: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};

const Projects = () => {
    return (
        <section id="projects" className="py-32 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-100 md:text-slate-900 mb-6">Selected Work</h2>
                    <div className="w-20 h-1 bg-sky-500 md:bg-blue-600 rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1000">
                    {PROJECTS.map((project, index) => (
                        <SpotlightCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
