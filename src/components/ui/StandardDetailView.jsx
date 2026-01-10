import { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * StandardDetailView - Displays standard experience details (internships, academic)
 * with header, meta grid, description, projects, and tech stack
 */
const StandardDetailView = ({ selectedItem, hoveredProject, onProjectHover, getPillStyle }) => {
    return (
        <>
            {/* 1. Header Group */}
            <header className="flex items-center gap-4 mb-8 pr-12" style={{ transform: "translateZ(20px)" }}>
                <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm text-4xl overflow-hidden">
                    {selectedItem.logo && selectedItem.logo.startsWith('/') ? (
                        <img
                            src={selectedItem.logo}
                            alt={selectedItem.name}
                            loading="lazy"
                            decoding="async"
                            width="64"
                            height="64"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-slate-100 md:text-slate-900">{selectedItem.logo || '📍'}</span>
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
            <div className="space-y-6 mb-8 pr-2 pb-4 overflow-y-auto scrollbar-hide flex-1">
                <div>
                    <h4 className="text-lg font-semibold text-slate-100 md:text-slate-900 mb-3">About</h4>
                    <p className="text-slate-300 md:text-slate-700 leading-relaxed">{selectedItem.description}</p>
                </div>

                {selectedItem.projects && (
                    <div>
                        <h4 className="text-lg font-semibold text-slate-100 md:text-slate-900 mb-3">Key Highlights</h4>
                        <ul className="space-y-2">
                            {selectedItem.projects.map((project) => (
                                <li
                                    key={project.id}
                                    className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-default group/item"
                                    onMouseEnter={() => onProjectHover(project)}
                                    onMouseLeave={() => onProjectHover(null)}
                                >
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 md:bg-blue-600 group-hover/item:bg-sky-400 md:group-hover/item:bg-blue-500 transition-colors" />
                                    <span className="text-slate-300 md:text-slate-700 group-hover/item:text-slate-100 md:group-hover/item:text-slate-900 transition-colors">
                                        {project.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* 4. Tech Stack */}
            <div className="mt-auto pt-6 border-t border-white/10 md:border-slate-200">
                <h4 className="text-lg font-semibold text-slate-100 md:text-slate-900 mb-4">Skills & Technologies</h4>
                <div className="flex flex-wrap gap-2">
                    {selectedItem.techStack && selectedItem.techStack.map((tech) => (
                        <span
                            key={tech.id}
                            className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-300 ease-out ${getPillStyle(tech.id)}`}
                        >
                            {tech.label}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
};

StandardDetailView.propTypes = {
    selectedItem: PropTypes.shape({
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        logo: PropTypes.string,
        projects: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            relatedTech: PropTypes.arrayOf(PropTypes.string)
        })),
        techStack: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        }))
    }).isRequired,
    hoveredProject: PropTypes.object,
    onProjectHover: PropTypes.func.isRequired,
    getPillStyle: PropTypes.func.isRequired
};

export default StandardDetailView;
