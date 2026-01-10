import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FolderGit2, GitCommit, Code2, Users, Rocket, GraduationCap } from 'lucide-react';

/**
 * StatCard - Clean box UI design with prominent typography
 * Large feature card that acts as a building block in the About section
 */
const StatCard = ({ stat, label, isActive, onClick }) => {
    const handleKeyDown = (e) => {
        // Trigger click on Enter or Space key
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
        }
    };

    // Get icon based on label
    const getIcon = () => {
        switch (label) {
            case 'Projects':
                return FolderGit2;
            case 'GitHub Commits (Production-Level)':
                return GitCommit;
            case 'Technologies':
                return Code2;
            case 'Developer Communities & Meetups':
                return Users;
            case 'Production-Ready Applications':
                return Rocket;
            case 'Technical Consultant (Student Interest Group)':
                return GraduationCap;
            default:
                return Code2;
        }
    };

    const Icon = getIcon();

    return (
        <motion.div
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-pressed={isActive}
            aria-label={`${label}: ${stat}. Click for more information`}
            className={`
                relative p-6 cursor-pointer transition-all duration-500
                bg-white/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 
                hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-200 dark:hover:border-indigo-500/30
                shadow-lg hover:shadow-xl dark:shadow-none backdrop-blur-xl h-full flex items-center justify-center
            `}
        >
            {/* Content Container with Animation */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={stat}
                    initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        mass: 1
                    }}
                    className="flex flex-col items-center"
                >
                    {/* Number and Icon on same line */}
                    <div className="flex items-center gap-3 mb-2">
                        {/* Icon */}
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-sky-500/10 to-indigo-500/10 border border-sky-500/20">
                            <Icon className="w-7 h-7 text-sky-500 dark:text-sky-400" />
                        </div>

                        {/* Hero Number */}
                        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent group-hover:from-sky-500 group-hover:to-indigo-500 transition-all">
                            {stat}
                        </div>
                    </div>

                    {/* Label */}
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">
                        {label}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Active Indicator */}
            {isActive && (
                <div className="absolute top-4 right-4 w-3 h-3 bg-sky-500 md:bg-blue-600 rounded-full animate-pulse" />
            )}
        </motion.div>
    );
};

StatCard.propTypes = {
    stat: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default StatCard;
