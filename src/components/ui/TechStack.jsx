import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS_DATA } from '../../constants';

const TechStack = () => {
    // Flatten skills for display
    const allSkills = SKILLS_DATA.flatMap(category => category.items).slice(0, 8); // Limit to 8 for the card

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.1 }}
            className="!bg-white dark:!bg-slate-800/50 border dark:border-slate-700 p-8 shadow-sm dark:shadow-none transition-all duration-300 backdrop-blur-sm"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">Tech Stack</h3>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {allSkills.map((skill, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-center gap-2 px-2 sm:px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-white transition-colors cursor-default w-full"
                    >
                        <skill.icon className="text-lg text-indigo-400" />
                        <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{skill.name}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default TechStack;
