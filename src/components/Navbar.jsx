import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Twitter } from "lucide-react";
import useScrollSpy from "../hooks/useScrollSpy";

const navLinks = [
  { name: "Home", href: "#home", id: "home" },
  { name: "About", href: "#about", id: "about" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Contact", href: "#contact", id: "contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [scrolled, setScrolled] = useState(false); // Removed unused state
  const activeSection = useScrollSpy(navLinks.map((link) => link.id), 100);

  useEffect(() => {
    // const handleScroll = () => {
    //   setScrolled(window.scrollY > 20);
    // };
    // window.addEventListener("scroll", handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Floating Dock */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <nav className="flex items-center gap-1 p-1 rounded-full bg-white/10 md:bg-white/80 backdrop-blur-xl border border-white/10 md:border-slate-200 md:shadow-sm">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-colors duration-300 ${activeSection === link.id ? "text-slate-100 md:text-blue-600" : "text-slate-400 md:text-slate-600 hover:text-slate-100 md:hover:text-blue-600"
                }`}
            >
              {activeSection === link.id && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-white/10 md:bg-blue-50 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </a>
          ))}

          <div className="w-px h-6 bg-white/10 md:bg-slate-200 mx-2" />

          <div className="flex items-center gap-2 pr-2">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 text-slate-400 md:text-slate-600 hover:text-slate-100 md:hover:text-blue-600 transition-colors">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 text-slate-400 md:text-slate-600 hover:text-slate-100 md:hover:text-blue-600 transition-colors">
              <Linkedin size={18} />
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Header */}
      <nav className="fixed w-full z-50 md:hidden transition-all duration-300 bg-[#0F172A]/90 backdrop-blur-md border-b border-white/5">
        <div className="px-4 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-bold text-slate-100">Portfolio</a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-300 hover:text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0F172A] pt-20 px-4 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-medium ${activeSection === link.id ? "text-sky-400" : "text-slate-400"
                    }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-6 mt-8">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                  <Github size={24} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                  <Linkedin size={24} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
