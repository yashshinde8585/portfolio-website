import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, GitCommit, Code2, Users, Rocket, GraduationCap } from 'lucide-react';
import { memo } from 'react';

import { IconComponent } from '../../types';

interface StatCardProps {
  stat: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const ICON_MAP: Record<string, IconComponent> = {
  Projects: FolderGit2,
  'GitHub Commits (Production-Level)': GitCommit,
  Technologies: Code2,
  'Developer Communities & Meetups': Users,
  'Production-Ready Applications': Rocket,
  'Technical Consultant (Student Interest Group)': GraduationCap,
};

/**
 * StatCard - Minimalist editorial stat display.
 */
const StatCard = ({ stat, label, isActive, onClick }: StatCardProps) => {
  const IconComponent = ICON_MAP[label] || Code2;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={isActive}
      className="relative flex h-full flex-col justify-center border-l-4 border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:border-slate-900 dark:border-slate-800 dark:bg-slate-900/30 dark:hover:border-sky-500"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={stat}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-2"
        >
          <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {label}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center bg-white shadow-sm dark:bg-slate-800">
              <IconComponent size={24} className="text-slate-900 dark:text-sky-400" />
            </div>
            <div className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
              {stat}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(StatCard);
