import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, memo, useCallback } from 'react';

import { NAV_LINKS, SOCIAL_LINKS } from '../constants';
import { useActiveSection } from '../hooks/useActiveSection';

/**
 * Navbar - Minimalist editorial navigation system.
 */
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGreetingVisible, setIsGreetingVisible] = useState(false);

  const activeSectionId = useActiveSection(NAV_LINKS.map((link) => link.id));

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGreetingVisible((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const activeLink = NAV_LINKS.find((l) => l.id === (activeSectionId || 'home'));
  const displayName = activeSectionId === 'home' || !activeSectionId ? '' : activeLink?.name;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-24 flex-col items-center bg-white py-8 transition-colors duration-500 md:flex dark:bg-[#020617]">
        {/* Logo/Greeting */}
        <div className="relative mb-8 flex h-8 w-full items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h3
              key={isGreetingVisible ? 'name' : 'greeting'}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              transition={{ duration: 0.4 }}
              className="absolute text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white"
            >
              {isGreetingVisible ? 'YASH' : "HELLO I'M"}
            </motion.h3>
          </AnimatePresence>
        </div>

        {/* Navigation Links */}
        <nav className="flex w-full flex-col gap-4 px-2" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = (activeSectionId || 'home') === link.id;
            const Icon = link.icon;

            return (
              <a
                key={link.id}
                href={link.href}
                className={`group relative flex flex-col items-center gap-1.5 p-3 transition-all duration-300 ${
                  isActive
                    ? 'text-sky-500'
                    : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 border-r-4 border-sky-500 bg-slate-50 dark:bg-slate-900/50"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <span className="relative z-10 text-[8px] font-black uppercase tracking-widest">
                  {link.name}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Social Links & Theme Status */}
        <div className="mt-auto flex w-full flex-col items-center gap-4 px-4">
          <div className="h-px w-8 bg-slate-200 dark:bg-slate-800" />
          <div className="flex w-full flex-col gap-4 pb-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.ariaLabel}
                  className="flex aspect-square w-full items-center justify-center border border-slate-100 bg-slate-50 text-slate-400 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white dark:border-slate-800 dark:bg-slate-900/30 dark:hover:border-sky-500 dark:hover:bg-sky-500 dark:hover:text-slate-900"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur-xl transition-all duration-300 md:hidden dark:border-slate-800 dark:bg-[#020617]/90">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <AnimatePresence mode="wait">
              <motion.span
                key={displayName}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white"
              >
                {displayName}
              </motion.span>
            </AnimatePresence>
          </div>
          <button
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle Menu"
            className="p-2 text-slate-900 transition-colors dark:text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white dark:bg-[#020617] md:hidden"
          >
            <div className="relative flex h-full flex-col px-8 pt-32">
              <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
                {NAV_LINKS.map((link, index) => {
                  const isActive = activeSectionId === link.id;
                  return (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`text-4xl font-black uppercase tracking-tighter ${
                        isActive ? 'text-sky-500' : 'text-slate-300 dark:text-slate-700'
                      }`}
                    >
                      {link.name}
                    </motion.a>
                  );
                })}
              </nav>

              <div className="mt-auto pb-12">
                <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                  Let&apos;s build the future.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Navbar);
