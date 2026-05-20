import { motion } from 'framer-motion';
import { Sun, Moon, Coffee, CloudSun, Hand } from 'lucide-react';
import { useState, useEffect, memo, useMemo } from 'react';

/**
 * TimeGreeting - Context-aware greeting component.
 * Optimization: Precise timer management, typed Lucide icons.
 */
const TimeGreeting = () => {
  const [time, setTime] = useState(new Date());
  const [showWave, setShowWave] = useState(true);

  useEffect(() => {
    const waveTimer = setTimeout(() => {
      setShowWave(false);
    }, 4000);

    const timeTimer = setInterval(() => setTime(new Date()), 1000);

    return () => {
      clearTimeout(waveTimer);
      clearInterval(timeTimer);
    };
  }, []);

  const { greeting, Icon } = useMemo(() => {
    const hour = time.getHours();
    if (hour >= 5 && hour < 12) return { greeting: 'Good Morning', Icon: Coffee };
    if (hour >= 12 && hour < 17) return { greeting: 'Good Afternoon', Icon: Sun };
    if (hour >= 17 && hour < 21) return { greeting: 'Good Evening', Icon: CloudSun };
    return { greeting: 'Good Night', Icon: Moon };
  }, [time]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="group absolute right-6 top-6 z-50 hidden items-center gap-3 rounded-full border border-slate-200/20 bg-white/5 px-4 py-2 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-indigo-500/10 md:flex dark:border-slate-700/30 dark:bg-slate-900/30"
    >
      <div className="rounded-full bg-indigo-500/10 p-1.5 text-indigo-500 transition-transform group-hover:scale-110 dark:text-indigo-400">
        {showWave ? (
          <motion.div
            animate={{ rotate: [0, 25, -10, 20, -5, 0] }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'loop',
            }}
            style={{ originX: 0.7, originY: 0.7 }}
          >
            <Hand size={16} />
          </motion.div>
        ) : (
          <Icon size={16} />
        )}
      </div>

      <div className="flex flex-col items-start leading-none">
        <span className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {greeting}
        </span>
        <span className="font-mono text-sm font-bold text-slate-700 dark:text-slate-200">
          {formatTime(time)}
        </span>
      </div>

      <div className="ml-1 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
    </motion.div>
  );
};

export default memo(TimeGreeting);
