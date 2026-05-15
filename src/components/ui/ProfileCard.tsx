import { motion } from 'framer-motion';
import { MapPin, Mail, ExternalLink } from 'lucide-react';
import { memo } from 'react';

import { PROFILE, SOCIAL_LINKS } from '../../constants';

/**
 * ProfileCard - Minimalist editorial summary card.
 */
const ProfileCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden border-l-4 border-slate-900 bg-slate-50 p-6 transition-all duration-300 dark:border-sky-500 dark:bg-slate-900/50"
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            {PROFILE.name}
          </h3>
          <p className="text-lg font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            {PROFILE.title}
          </p>
          <div className="flex items-center gap-2 font-medium text-slate-500 dark:text-slate-400">
            <MapPin size={16} aria-hidden="true" />
            <span className="text-sm uppercase tracking-wider">{PROFILE.location}</span>
          </div>
        </div>

        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">{PROFILE.bio}</p>

        <div className="flex flex-wrap items-center gap-4 pt-4">
          <div className="flex gap-2">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center border border-slate-200 bg-white text-slate-600 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-sky-500 dark:hover:bg-sky-500 dark:hover:text-white"
                  aria-label={link.ariaLabel}
                >
                  <Icon size={20} />
                </a>
              );
            })}
            <a
              href={`mailto:${PROFILE.email}`}
              className="flex h-12 w-12 items-center justify-center border border-slate-200 bg-white text-slate-600 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-sky-500 dark:hover:bg-sky-500 dark:hover:text-white"
              aria-label="Email Me"
            >
              <Mail size={20} />
            </a>
          </div>

          <a
            href="#contact"
            className="flex items-center gap-2 bg-slate-900 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-white dark:hover:text-slate-900"
          >
            Connect
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(ProfileCard);
