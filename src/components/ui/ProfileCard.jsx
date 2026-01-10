import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { PROFILE, SOCIAL_LINKS } from '../../constants';


const ProfileCard = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="!bg-white dark:!bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-5 flex flex-col items-start gap-3 relative overflow-hidden group shadow-sm dark:shadow-none transition-all duration-300 backdrop-blur-sm"
        >
            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl -mr-12 -mt-12 transition-all duration-500 group-hover:bg-indigo-500/20" />



            {/* Info */}
            <div className="space-y-1">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">{PROFILE.name}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm transition-colors">{PROFILE.title}</p>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs transition-colors">
                    <MapPin size={14} />
                    <span>{PROFILE.location}</span>
                </div>
            </div>

            {/* Bio */}
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                {PROFILE.bio}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full pt-2">
                <div className="flex gap-2">
                    {SOCIAL_LINKS.map((link, i) => (
                        <a
                            key={i}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700"
                            aria-label={link.ariaLabel}
                        >
                            <link.icon size={18} />
                        </a>
                    ))}
                    <a
                        href={`mailto:${PROFILE.email}`}
                        className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700"
                        aria-label="Email Me"
                    >
                        <Mail size={18} />
                    </a>
                </div>

                <a
                    href="#contact"
                    className="ml-auto px-6 py-3 rounded-xl bg-sky-500 md:bg-blue-600 dark:md:bg-sky-500 text-white font-medium hover:bg-sky-600 md:hover:bg-blue-700 dark:md:hover:bg-sky-600 transition-colors flex items-center gap-2"
                >
                    Let's Talk
                    <ExternalLink size={16} />
                </a>
            </div>
        </motion.div>
    );
};

export default ProfileCard;
