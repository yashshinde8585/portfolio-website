import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Mail, Heart, ExternalLink } from "lucide-react";
import { SOCIAL_LINKS, PROFILE } from "../constants";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="relative bg-[#0F172A] md:bg-white dark:md:bg-[#0F172A] border-t border-white/5 md:border-slate-200 dark:md:border-white/5 py-8 md:py-6 overflow-hidden transition-colors duration-300">
            {/* Background Decorative Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-30" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Mobile-only social section */}
                <div className="flex md:hidden flex-col items-center gap-6 mb-8">
                    <div className="flex items-center gap-6">
                        {SOCIAL_LINKS.map((link) => {
                            const Icon = link.icon;
                            return (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    whileTap={{ scale: 0.9 }}
                                    className="text-slate-400 hover:text-indigo-400 transition-colors"
                                    aria-label={link.ariaLabel}
                                >
                                    <Icon size={22} />
                                </motion.a>
                            );
                        })}
                        <motion.a
                            href={`mailto:${PROFILE.email}`}
                            whileTap={{ scale: 0.9 }}
                            className="text-slate-400 hover:text-indigo-400 transition-colors"
                        >
                            <Mail size={22} />
                        </motion.a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-0 md:pt-0 border-t border-white/5 md:border-none flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <p className="text-slate-500 dark:text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                            © {new Date().getFullYear()} Yash Shinde
                        </p>
                    </div>

                    {/* Back to Top */}
                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 md:bg-white dark:md:bg-slate-900 border border-white/10 md:border-slate-200 dark:md:border-white/10 text-slate-400 md:text-slate-600 dark:md:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all text-[10px] md:text-xs font-bold shadow-sm"
                    >
                        BACK TO TOP
                        <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
