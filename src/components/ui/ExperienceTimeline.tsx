import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Code, ExternalLink } from 'lucide-react';
import { memo } from 'react';

import { EXPERIENCE_DATA, SKILLS_DATA } from '../../constants';
import { CompanyExperience, AcademicItem } from '../../types';

interface TimelineItemProps {
  item: CompanyExperience | AcademicItem;
  isLast: boolean;
  type: 'work' | 'education';
}

const TimelineItem = ({ item, isLast, type }: TimelineItemProps) => {
  const isWork = (it: CompanyExperience | AcademicItem): it is CompanyExperience =>
    'role' in it && type === 'work';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative pb-8 pl-10 last:pb-0"
    >
      {!isLast && (
        <div className="absolute left-[15px] top-10 h-[calc(100%-2.5rem)] w-[2px] bg-slate-200 dark:bg-slate-800" />
      )}

      <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center bg-slate-900 text-white dark:bg-sky-500">
        {type === 'work' ? <Briefcase size={14} /> : <GraduationCap size={14} />}
      </div>

      <div className="border border-slate-100 bg-white p-5 transition-all hover:border-slate-900 dark:border-slate-800 dark:bg-slate-900/30 dark:hover:border-sky-500">
        <div>
          <h4 className="text-base font-black uppercase tracking-tight text-slate-900 dark:text-white">
            {isWork(item) ? item.role : `${item.name}, ${item.location}`}
          </h4>
          <div className="mt-1 flex flex-col gap-1">
            {!isWork(item) && (
              <p className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
                {(item as AcademicItem).role}
              </p>
            )}
            {isWork(item) ? (
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                {item.name}
              </p>
            ) : (
              (item as AcademicItem).specialization && (
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Specialization in {(item as AcademicItem).specialization}
                </p>
              )
            )}
          </div>
        </div>

        {isWork(item) && item.description && (
          <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">
            {item.description.map((point, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-slate-300 dark:bg-slate-700" />
                {point}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4 dark:border-slate-800/50">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
            {item.duration}
          </span>
          {isWork(item) && item.website && (
            <a
              href={item.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 transition-colors hover:text-sky-500 dark:text-white dark:hover:text-sky-400"
            >
              Project Link
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface ExperienceTimelineProps {
  section?: 'work' | 'education' | 'tech';
}

const ExperienceTimeline = ({ section }: ExperienceTimelineProps) => {
  return (
    <div className="space-y-10">
      {/* Work Experience Section */}
      {(!section || section === 'work') && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center bg-slate-900 text-white dark:bg-sky-500">
              <Briefcase size={20} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
              Professional <span className="text-sky-500">Experience</span>
            </h3>
          </div>

          <div className="relative">
            {EXPERIENCE_DATA.internships.companies.map((item, i) => (
              <TimelineItem
                key={i}
                item={item}
                isLast={i === EXPERIENCE_DATA.internships.companies.length - 1}
                type="work"
              />
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {(!section || section === 'education') && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center bg-slate-900 text-white dark:bg-sky-500">
              <GraduationCap size={20} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
              Academic <span className="text-sky-500">Background</span>
            </h3>
          </div>

          <div className="relative">
            {EXPERIENCE_DATA.academic.items.map((item, i) => (
              <TimelineItem
                key={i}
                item={item}
                isLast={i === EXPERIENCE_DATA.academic.items.length - 1}
                type="education"
              />
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack Section */}
      {(!section || section === 'tech') && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center bg-slate-900 text-white dark:bg-sky-500">
              <Code size={20} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
              Technical <span className="text-sky-500">Arsenal</span>
            </h3>
          </div>

          <div className="space-y-8">
            {SKILLS_DATA.map((category, catIdx) => (
              <div key={catIdx} className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-slate-200 dark:bg-slate-800" />
                  <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                    {category.category}
                  </h4>
                  <div className="h-px flex-grow bg-slate-200 dark:bg-slate-800" />
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8">
                  {category.items.map((skill, i) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="group flex flex-col items-center justify-center gap-2 border border-slate-100 bg-white p-3 transition-all hover:border-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-500"
                      >
                        <div className="flex h-9 w-9 items-center justify-center bg-slate-50 transition-all duration-300 group-hover:bg-slate-900 dark:bg-slate-900 dark:group-hover:bg-sky-500">
                          <Icon
                            size={16}
                            className="text-slate-400 transition-colors duration-300 group-hover:text-white dark:text-slate-500"
                          />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-300">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ExperienceTimeline);
