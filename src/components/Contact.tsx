import { motion } from 'framer-motion';
import { Check, Mail, Github, Linkedin, Copy, ArrowUpRight } from 'lucide-react';
import { useState, memo } from 'react';

import { PROFILE, SOCIAL_LINKS } from '../constants';
import { IconComponent } from '../types';

const ContactCard = ({
  icon: Icon,
  title,
  value,
  href,
  isCopyable = false,
  isExternal = false,
}: {
  icon: IconComponent;
  title: string;
  value: string;
  href?: string;
  isCopyable?: boolean;
  isExternal?: boolean;
}) => {
  const [copied, setCopied] = useState(false);

  const handleAction = () => {
    if (isCopyable) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const Content = (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative border border-slate-100 bg-white p-6 transition-all duration-500 hover:border-slate-900 dark:border-slate-800 dark:bg-slate-900/30 dark:hover:border-sky-500"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center bg-slate-50 transition-colors group-hover:bg-slate-900 group-hover:text-white dark:bg-slate-800 dark:group-hover:bg-sky-500 dark:group-hover:text-slate-900">
          <Icon size={24} />
        </div>
        {(isExternal || isCopyable) && (
          <div className="text-slate-300 transition-colors group-hover:text-slate-900 dark:text-slate-700 dark:group-hover:text-sky-500">
            {isCopyable ? (
              copied ? (
                <Check size={18} className="text-green-500" />
              ) : (
                <Copy size={18} />
              )
            ) : (
              <ArrowUpRight size={18} />
            )}
          </div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-900 dark:text-slate-500 dark:group-hover:text-white">
          {title}
        </h3>
        <p className="mt-2 text-xl font-black tracking-tight text-slate-900 dark:text-white">
          {value}
        </p>
      </div>

      {/* Decorative Accent */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-slate-900 transition-all duration-500 group-hover:w-full dark:bg-sky-500" />
    </motion.div>
  );

  if (href && !isCopyable) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {Content}
      </a>
    );
  }

  return (
    <div onClick={handleAction} className={isCopyable ? 'cursor-pointer' : ''}>
      {Content}
    </div>
  );
};

const Contact = () => {
  const githubLink = SOCIAL_LINKS.find((link) => link.name === 'GitHub')?.href || '#';
  const linkedinLink = SOCIAL_LINKS.find((link) => link.name === 'LinkedIn')?.href || '#';

  return (
    <section
      id="contact"
      className="relative bg-white pb-16 pt-20 transition-colors duration-500 dark:bg-[#020617]"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:pl-0 lg:pr-8">
        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              <h2
                id="contact-title"
                className="text-5xl font-black uppercase tracking-tighter text-slate-900 sm:text-7xl dark:text-white"
              >
                CONNECT <span className="text-sky-500">NOW</span>
              </h2>
            </div>
            <div className="h-2 w-48 bg-sky-500" />
            <p className="mt-4 max-w-2xl text-xl font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              Feel free to reach out for collaborations, opportunities, or just to say hello.
            </p>
          </motion.div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ContactCard icon={Mail} title="Direct Email" value={PROFILE.email} isCopyable />
          <ContactCard
            icon={Linkedin}
            title="Professional"
            value="LinkedIn Profile"
            href={linkedinLink}
            isExternal
          />
          <ContactCard
            icon={Github}
            title="Open Source"
            value="GitHub Profile"
            href={githubLink}
            isExternal
          />
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);
