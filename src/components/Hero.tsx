import { motion } from 'framer-motion';

import { PROFILE } from '../constants';

import DigitalAvatar from './DigitalAvatar';

/**
 * Hero - Minimalist, high-impact landing section.
 * Optimization: Bold typography, balanced negative space, semantic hierarchy.
 */
const Hero = () => {
  const [firstName] = PROFILE.name.split(' ');

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 pt-28 transition-colors duration-500 md:pt-12 dark:bg-[#020617]"
      aria-labelledby="hero-title"
    >
      {/* Minimal Background accents */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] bg-sky-100/30 blur-[100px] dark:bg-sky-900/10" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] bg-indigo-100/30 blur-[100px] dark:bg-indigo-900/10" />

      <div className="z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 md:flex-row md:pl-0 lg:pr-8">
        {/* Left Column: Bold Text */}
        <div className="mb-12 text-center md:mb-0 md:w-1/2 md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-4"
          >
            <h1
              id="hero-title"
              className="text-5xl font-black uppercase tracking-tight text-slate-900 leading-[1] sm:text-6xl lg:text-8xl dark:text-white"
            >
              HI — I&apos;M <br />
              <span className="text-sky-500">{firstName}</span>
            </h1>

            <h2 className="text-2xl font-black uppercase tracking-[0.1em] text-slate-800 leading-[1.1] sm:text-3xl lg:text-5xl dark:text-slate-200">
              <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                {PROFILE.title}
              </span>
            </h2>

            <p className="max-w-md pt-6 text-base font-medium leading-relaxed text-slate-500 lg:text-lg dark:text-slate-400">
              I specialize in building production-grade SaaS platforms with Node.js and modern React
              ecosystems.
            </p>
          </motion.div>
        </div>

        {/* Right Column: Avatar with "This is me!" tag */}
        <div className="relative flex w-full flex-col items-center justify-center md:w-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative h-[250px] w-[250px] sm:h-[350px] sm:w-[350px]">
              <DigitalAvatar />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="font-serif text-xl text-slate-500 italic tracking-wide dark:text-slate-400"
            >
              This is me!
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
