import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Code, ExternalLink } from 'lucide-react';
import { EXPERIENCE_DATA, SKILLS_DATA } from '../../constants';

const TimelineItem = ({ item, isLast, type }) => {
    // Helper to render text with clickable links
    const renderTextWithLinks = (text) => {
        if (typeof text !== 'string') return text;

        const urlRegex = /(https?:\/\/[^\s|)]+)/g;
        const parts = text.split(urlRegex);

        return parts.map((part, i) => {
            if (part.match(urlRegex)) {
                return (
                    <a
                        key={i}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline underline-offset-4 decoration-indigo-500/30 transition-all font-semibold"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative pl-12 pb-12 last:pb-0"
        >
            {/* Dashed Line */}
            {!isLast && (
                <div className="absolute left-[15px] top-16 -bottom-4 w-px border-l-2 border-dashed border-slate-200 dark:border-slate-800" />
            )}

            {/* Icon Marker */}
            <div className={`absolute left-0 top-6 w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 transition-all duration-300 ${item.isCurrent ? 'bg-indigo-600 border-indigo-600 shadow-md scale-110' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'}`}>
                {type === 'education' ? (
                    <GraduationCap size={14} className={item.isCurrent ? 'text-white' : 'text-slate-400'} />
                ) : (
                    <Briefcase size={14} className={item.isCurrent ? 'text-white' : 'text-slate-400'} />
                )}
            </div>

            {/* Card Wrapper for Content */}
            <div className="relative bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 transition-all hover:border-indigo-500/30 hover:shadow-lg hover:-translate-y-1">
                <div className="mb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white transition-colors leading-tight">
                            {item.role || item.name}
                        </h4>
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                                {item.duration}
                            </span>
                            {item.workMode && (
                                <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-500 text-[9px] font-bold uppercase tracking-wider">
                                    {item.workMode}
                                </span>
                            )}
                        </div>
                    </div>

                    <span className="text-slate-600 dark:text-slate-400 font-medium text-sm transition-colors block mb-2">
                        {item.name || item.school}
                    </span>
                </div>

                {/* Specialization */}
                {item.specialization && (
                    <div className="mb-3">
                        <span className="text-xs sm:text-sm font-semibold text-indigo-500 dark:text-indigo-400 leading-tight">
                            {item.specialization}
                        </span>
                    </div>
                )}

                {Array.isArray(item.description) ? (
                    <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300 transition-colors">
                        {item.description.map((point, idx) => (
                            <p key={idx} className="leading-relaxed">{renderTextWithLinks(point)}</p>
                        ))}
                    </div>
                ) : item.description ? (
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-xl transition-colors">
                        {renderTextWithLinks(item.description)}
                    </p>
                ) : null
                }

                {/* Course Tags */}
                {item.courses && (
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                        {item.courses.map((course, idx) => (
                            <span
                                key={idx}
                                className="px-2 py-0.5 text-[10px] font-semibold bg-white dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600/50 rounded transition-colors"
                            >
                                {course}
                            </span>
                        ))}
                    </div>
                )}

                {/* Website Link */}
                {item.website && (
                    <motion.a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center gap-2 mt-4 text-xs font-bold text-indigo-500 hover:text-indigo-400 transition-colors group"
                    >
                        View Project
                        <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.a>
                )}
            </div>
        </motion.div >
    );
};

const ExperienceTimeline = () => {
    const [activeTab, setActiveTab] = useState('work');

    const work = EXPERIENCE_DATA.internships.companies.map(i => ({ ...i, type: 'work' }));
    const education = EXPERIENCE_DATA.academic.items.map(i => ({ ...i, type: 'education' }));

    const data = activeTab === 'work' ? work : education;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.2 }}
            className="!bg-white dark:!bg-slate-800/50 p-4 md:p-6 shadow-sm dark:shadow-none transition-all duration-300 backdrop-blur-sm"
        >
            <div className="flex items-center gap-2 mb-6 bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-2xl overflow-x-auto scrollbar-hide">
                {['work', 'education', 'tech'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap ${activeTab === tab ? 'text-indigo-600 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        {activeTab === tab && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-white dark:bg-slate-700 shadow-[0_2px_10px_rgba(0,0,0,0.05)] rounded-xl"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">
                            {tab === 'work' && <Briefcase size={18} />}
                            {tab === 'education' && <GraduationCap size={18} />}
                            {tab === 'tech' && <Code size={18} />}
                        </span>
                        <span className="relative z-10 text-sm font-bold capitalize">
                            {tab === 'work' ? 'Experience' : tab === 'education' ? 'Education' : 'Tech Stack'}
                        </span>
                    </button>
                ))}
            </div>

            <div className="space-y-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        {activeTab === 'tech' ? (
                            <div className="space-y-6">
                                {SKILLS_DATA.map((category, catIdx) => (
                                    <div key={catIdx} className="space-y-3">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
                                            {category.category}
                                        </h4>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {category.items.map((skill, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-indigo-500/30 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all duration-300 group"
                                                >
                                                    <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                                                        <skill.icon className="text-lg sm:text-xl text-indigo-500" />
                                                    </div>
                                                    <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{skill.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            data.map((item, i) => (
                                <TimelineItem
                                    key={i}
                                    item={item}
                                    isLast={i === data.length - 1}
                                    type={item.type}
                                />
                            ))
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default ExperienceTimeline;
