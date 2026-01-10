import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * ThemeToggle - Sun/Moon icon switch for Day/Night mode
 * Persists user preference in localStorage
 */
const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-full bg-white/10 md:bg-slate-100 dark:md:bg-slate-800 hover:bg-white/20 md:hover:bg-slate-200 dark:md:hover:bg-slate-700 transition-colors"
        >
            <motion.div
                initial={false}
                animate={{ rotate: isDarkMode ? 0 : 180 }}
                transition={{ duration: 0.3 }}
            >
                {isDarkMode ? (
                    <Moon size={18} className="text-slate-300 md:text-slate-600 dark:md:text-slate-300" />
                ) : (
                    <Sun size={18} className="text-slate-300 md:text-amber-500 dark:md:text-slate-300" />
                )}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
