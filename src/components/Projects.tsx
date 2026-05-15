import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import { useState, memo } from 'react';

import { PROJECTS } from '../constants';

/**
 * ProjectTimelineItem - Sequential display of projects as a journey.
 */
const ProjectTimelineItem = memo(
  ({
    project,
    index,
    isLast,
  }: {
    project: (typeof PROJECTS)[0];
    index: number;
    isLast: boolean;
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div className="relative pb-16 last:pb-0">
        {/* Journey Line */}
        {!isLast && (
          <div className="absolute left-[19px] top-12 h-[calc(100%-3rem)] w-[2px] bg-slate-100 dark:bg-slate-800 md:left-[23px]" />
        )}

        {/* Marker/Stop */}
        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center bg-slate-900 text-white shadow-xl dark:bg-sky-500 md:h-12 md:w-12 z-10">
          <span className="text-[10px] font-black tracking-tighter uppercase md:text-xs">
            P.{String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="ml-12 border border-slate-100 bg-white p-6 transition-all duration-500 hover:border-slate-900 md:ml-20 md:p-8 dark:border-slate-800 dark:bg-slate-900/30 dark:hover:border-sky-500"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Project Image Section */}
            <div className="relative lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden border border-slate-100 dark:border-slate-800">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                    filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
                  }}
                  transition={{ duration: 0.8 }}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>

            {/* Project Details Section */}
            <div className="flex flex-col lg:col-span-7">
              <div className="mb-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="border border-slate-100 bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <h3 className="mb-4 text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white md:text-2xl">
                {project.title}
              </h3>

              <p className="mb-8 max-w-xl text-base font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                {project.desc}
              </p>

              <div className="flex items-center gap-4">
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-slate-900 px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-white dark:hover:text-slate-900"
                >
                  Launch Project <ArrowUpRight size={14} />
                </a>
                <a
                  href={project.links.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View code for ${project.title}`}
                  className="flex h-12 w-12 items-center justify-center border border-slate-200 bg-white text-slate-600 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-sky-500 dark:hover:bg-sky-500 dark:hover:text-white"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
);

ProjectTimelineItem.displayName = 'ProjectTimelineItem';

/**
 * Projects - Vertical Journey Flow showcase.
 */
const Projects = () => {
  return (
    <section
      id="projects"
      className="relative bg-white pb-16 pt-20 transition-colors duration-500 dark:bg-[#020617]"
      aria-labelledby="projects-title"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:pl-0 lg:pr-8">
        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              <h2
                id="projects-title"
                className="text-5xl font-black uppercase tracking-tighter text-slate-900 sm:text-7xl dark:text-white"
              >
                PROJECT <span className="text-sky-500">JOURNEY</span>
              </h2>
            </div>
            <div className="h-2 w-48 bg-sky-500" />
            <p className="mt-4 max-w-2xl text-xl font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              Showcasing production-ready applications built for real-world performance and scale.
            </p>
          </motion.div>
        </div>

        {/* Journey Timeline */}
        <div className="relative">
          {PROJECTS.map((project, index) => (
            <ProjectTimelineItem
              key={project.id}
              project={project}
              index={index}
              isLast={index === PROJECTS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
