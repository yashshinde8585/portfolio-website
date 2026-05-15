import { motion } from 'framer-motion';
import { useState, memo } from 'react';

import avatarImage from '../assets/my_photo.jpg';

/**
 * DigitalAvatar - Minimalist frame design.
 * Optimization: Grayscale luminosity, hardware-accelerated transitions.
 */
const DigitalAvatar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Outer Border (Minimalist Frame) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-full border-[12px] border-slate-900/5 bg-slate-100 p-2 shadow-xl dark:border-white/5 dark:bg-slate-800">
          <div className="relative overflow-hidden rounded-full">
            <motion.img
              src={avatarImage}
              alt="Yash Shinde"
              className="h-auto w-[220px] object-cover mix-blend-luminosity grayscale transition-all duration-700 md:w-[300px]"
              animate={{
                scale: isHovered ? 1.05 : 1,
                filter: isHovered ? 'grayscale(0%) contrast(1.1)' : 'grayscale(100%) contrast(1)',
              }}
            />

            {/* Minimalist Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-transparent opacity-50" />
          </div>
        </div>

        {/* Decorative Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-4 rounded-full border border-dashed border-slate-300 dark:border-slate-700"
        />
      </motion.div>
    </div>
  );
};

export default memo(DigitalAvatar);
