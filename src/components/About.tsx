import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import ExperienceTimeline from './ui/ExperienceTimeline';
import ProfileCard from './ui/ProfileCard';
import StatCard from './ui/StatCard';

const STATS = [
  { stat: '400+', label: 'GitHub Commits (Production-Level)' },
  { stat: '6+', label: 'Developer Communities & Meetups' },
  { stat: '4+', label: 'Production-Ready Applications' },
];

/**
 * About - Minimalist storytelling section.
 * Optimization: Bold editorial typography, balanced negative space.
 */
const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % STATS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="about"
      className="relative bg-white pb-16 pt-20 transition-colors duration-500 dark:bg-[#020617]"
      aria-labelledby="about-title"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:pl-0 lg:pr-8">
        {/* Section Header: Bold & Minimalist */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2"
          >
            <h2
              id="about-title"
              className="text-5xl font-black uppercase tracking-tighter text-slate-900 sm:text-6xl dark:text-white"
            >
              MY <span className="text-sky-500">STORY</span>
            </h2>
            <div className="h-2 w-24 bg-sky-500" />
            <p className="mt-4 max-w-2xl text-lg font-medium text-slate-500 dark:text-slate-400">
              Building high-performance web applications with a focus on speed and scalability.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Profile & Focus Stats & Education */}
          <div className="relative space-y-8 lg:col-span-5">
            <div className="hidden lg:absolute lg:-right-8 lg:top-0 lg:block lg:h-full lg:w-px lg:bg-slate-200 lg:dark:bg-slate-800" />

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <ProfileCard />
              <div className="w-full">
                <StatCard
                  stat={STATS[currentIndex].stat}
                  label={STATS[currentIndex].label}
                  isActive={true}
                  onClick={() => undefined}
                />
              </div>
            </motion.div>

            {/* Academic Background moved to left - wrapped in a module container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-slate-100 bg-slate-50/30 p-6 dark:border-slate-800/50 dark:bg-slate-900/10"
            >
              <ExperienceTimeline section="education" />
            </motion.div>
          </div>

          {/* Right Column: Experience & Tech Stack */}
          <div className="space-y-12 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-16"
            >
              <ExperienceTimeline section="work" />
              <ExperienceTimeline section="tech" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
