import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useScrollSpy from "../hooks/useScrollSpy";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const activeSection = useScrollSpy(navLinks.map(link => link.id), 100);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuContainerVariants = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2 },
    },
  };

  const menuItemVariants = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 },
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-900/80" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Portfolio
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  aria-current={activeSection === link.id ? "page" : undefined}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${activeSection === link.id
                      ? "text-indigo-600 dark:text-indigo-400 font-bold"
                      : "text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                    }`}
                >
                  {link.name}
                  {/* Animated Underline */}
                  <span className="absolute bottom-0 left-0 h-0.5 bg-indigo-600 transition-all duration-300 w-0 group-hover:w-full"></span>
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="underline"
                      className="absolute bottom-0 left-0 block h-0.5 bg-indigo-600 w-full"
                    />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Social Icons Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300 transition-colors">
              <Twitter size={20} />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none dark:text-gray-200"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuContainerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  variants={menuItemVariants}
                  onClick={() => setIsOpen(false)}
                  aria-current={activeSection === link.id ? "page" : undefined}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${activeSection === link.id
                      ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400"
                      : "text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                    }`}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                variants={menuItemVariants}
                className="flex space-x-4 px-3 py-2 mt-4 border-t border-gray-200 dark:border-gray-700 pt-4"
              >
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  <Linkedin size={20} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300">
                  <Twitter size={20} />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
