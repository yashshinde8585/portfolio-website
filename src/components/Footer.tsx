import { motion } from 'framer-motion';
import { ArrowUp, Mail } from 'lucide-react';
import { memo } from 'react';

import { SOCIAL_LINKS, PROFILE } from '../constants';

/**
 * Footer - Minimalist editorial site footer.
 */
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      className="border-t border-slate-100 bg-white py-8 transition-colors duration-500 dark:border-slate-800 dark:bg-[#020617]"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Branding & Copyright */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
              YASH <span className="text-sky-500">SHINDE</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              THANK YOU FOR VISITING MY PROFILE
            </p>
          </div>

          {/* Social Links (Mobile/Small screens) */}
          <div className="flex items-center gap-6 md:hidden">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 transition-colors hover:text-slate-900 dark:hover:text-sky-500"
                  aria-label={link.ariaLabel}
                >
                  <Icon size={20} />
                </a>
              );
            })}
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-slate-400 transition-colors hover:text-slate-900 dark:hover:text-sky-500"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 border border-slate-900 bg-slate-900 px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-sky-500 dark:border-sky-500 dark:bg-transparent dark:text-sky-500 dark:hover:bg-sky-500 dark:hover:text-slate-900"
          >
            BACK TO TOP
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-1" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
