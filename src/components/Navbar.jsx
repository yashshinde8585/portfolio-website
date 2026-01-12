import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Home, User, Briefcase, Mail } from "lucide-react";
import useScrollSpy from "../hooks/useScrollSpy";



const navLinks = [
  { name: "Home", href: "#home", id: "home", icon: Home },
  { name: "About", href: "#about", id: "about", icon: User },
  { name: "Projects", href: "#projects", id: "projects", icon: Briefcase },
  { name: "Contact", href: "#contact", id: "contact", icon: Mail },
];



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isName, setIsName] = useState(false);
  const [clickedSection, setClickedSection] = useState(null);
  const activeSection = useScrollSpy(navLinks.map((link) => link.id), 100);

  // Use the clicked section as active temporarily for instant feedback
  const effectiveSection = clickedSection || activeSection || "home";

  useEffect(() => {
    if (clickedSection === activeSection) {
      setClickedSection(null);
    }
  }, [activeSection, clickedSection]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsName((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentNavLink = navLinks.find(l => l.id === effectiveSection);
  const displayName = effectiveSection === "home" ? "Yash Shinde" : (currentNavLink?.name || "Portfolio");

  return (
    <>
      {/* Desktop Sidebar (Left Dashboard) */}
      <aside className="hidden md:flex flex-col items-center h-[calc(100vh-2rem)] sticky top-4 my-4 ml-4 rounded-[5rem] border border-white/5 shadow-2xl bg-[#020617] py-8 z-50">
        {/* Brand / Logo */}
        <div className="mb-6 p-2 flex flex-col items-center gap-2">

          <div className="text-center h-4 w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h3
                key={isName ? "name" : "greeting"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="text-slate-200 font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent absolute"
              >
                {isName ? "Yash" : "Hi I'm"}
              </motion.h3>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 w-full px-4">
          {navLinks.map((link) => {
            const isActive = effectiveSection === link.id;
            const Icon = link.icon;

            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setClickedSection(link.id)}
                className={`relative group flex flex-col items-center gap-1.5 p-3 rounded-3xl transition-all duration-300 ${isActive ? "text-sky-400" : "text-slate-500 hover:text-slate-300"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-sky-500/10 rounded-3xl border border-sky-500/20 shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-sm"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}

                <div className={`relative z-10 p-2 rounded-2xl transition-colors ${isActive ? "bg-sky-500/20 text-sky-300" : "bg-white/5 group-hover:bg-white/10"}`}>
                  <Icon size={20} />
                </div>
                <span className="relative z-10 text-[10px] font-medium tracking-wide uppercase">{link.name}</span>

                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,1)]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Footer / Socials */}
        <div className="mt-auto flex flex-col items-center gap-6 w-full px-4">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

          <div className="flex flex-col gap-3 w-full">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center p-3 rounded-3xl bg-slate-900/50 border border-white/5 text-slate-400 hover:text-white hover:border-white/10 hover:bg-white/5 transition-all duration-300 group"
            >
              <Github size={18} className="group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center p-3 rounded-3xl bg-slate-900/50 border border-white/5 text-slate-400 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group"
            >
              <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <nav className="fixed w-full z-50 md:hidden transition-all duration-300 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-6 bg-gradient-to-b from-sky-400 to-indigo-600 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.4)]" />
            <AnimatePresence mode="wait">
              <motion.span
                key={displayName}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-lg font-bold text-slate-100 tracking-tight"
              >
                {displayName}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-white transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Premium dark backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#0f1629] to-[#0a0e27]" />

            {/* Simplified gradient orbs - Better performance */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-[80px] opacity-40" />
              <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-purple-600/20 to-pink-500/20 rounded-full blur-[80px] opacity-30" />
            </div>

            {/* Content */}
            <div className="relative h-full pt-20 px-6 flex flex-col">
              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col justify-center gap-3">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  const isActive = effectiveSection === link.id;
                  return (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      onClick={() => {
                        setClickedSection(link.id);
                        setIsOpen(false);
                      }}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="group relative"
                    >
                      {/* Content */}
                      <div className={`relative flex items-center gap-4 p-4 rounded-full transition-all duration-300 ${isActive
                        ? 'bg-white/10 border border-white/10 shadow-lg backdrop-blur-md'
                        : 'hover:bg-white/5 border border-transparent'
                        }`}>

                        {/* Icon */}
                        <div className={`p-2 rounded-full transition-colors ${isActive ? 'bg-blue-600/20 text-blue-400' : 'text-slate-500 group-hover:text-slate-200'
                          }`}>
                          <Icon size={20} />
                        </div>

                        {/* Text */}
                        <span className={`text-lg font-medium tracking-wide ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                          }`}>
                          {link.name}
                        </span>

                        {/* Minimal Active Indicator */}
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
                        )}
                      </div>
                    </motion.a>
                  );
                })}
              </nav>

              {/* Bottom Section - Social Icons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="pb-8"
              >
                {/* Premium gradient divider */}
                <div className="mb-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                {/* Social Icons */}
                <div className="flex items-center justify-center gap-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="group relative p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl hover:bg-white/[0.08] hover:border-white/20 hover:scale-110 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(255,255,255,0.1)]"
                  >
                    <Github size={24} className="text-slate-400 group-hover:text-white transition-colors duration-300" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="group relative p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-cyan-500/20 hover:border-blue-400/40 hover:scale-110 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(59,130,246,0.3)]"
                  >
                    <Linkedin size={24} className="text-slate-400 group-hover:text-blue-300 transition-colors duration-300" />
                  </a>
                  <a
                    href="mailto:yashshinde8585@gmail.com"
                    className="group relative p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20 hover:border-purple-400/40 hover:scale-110 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(168,85,247,0.3)]"
                  >
                    <Mail size={24} className="text-slate-400 group-hover:text-purple-300 transition-colors duration-300" />
                  </a>
                </div>

                {/* Premium footer text */}
                <p className="text-center text-slate-500 text-sm mt-8 font-medium">
                  Let&apos;s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">extraordinary</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Navbar);
