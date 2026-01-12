import React from 'react';
import { AnimatePresence } from 'framer-motion';
import StatCard from './ui/StatCard';
import ProfileCard from './ui/ProfileCard';
import ExperienceTimeline from './ui/ExperienceTimeline';


const About = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const stats = [
        { stat: "400+", label: "GitHub Commits (Production-Level)" },
        { stat: "6+", label: "Developer Communities & Meetups" },
        { stat: "4+", label: "Production-Ready Applications" },
        { stat: "", label: "Technical Consultant (Student Interest Group)" }
    ];

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % stats.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [stats.length]);

    return (
        <section id="about" className="pt-24 pb-6 md:py-10 relative bg-slate-50 dark:bg-[#0F172A] transition-colors duration-300">
            <div className="w-full md:w-[90%] max-w-none mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 flex items-center gap-4">
                    <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-none">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                        </span>
                        <h2 className="text-sm md:text-base font-bold tracking-widest text-slate-900 dark:text-white uppercase">
                            About Me
                        </h2>
                    </div>
                    <div className="h-px bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent flex-1" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                    {/* Left Column - Profile & Stats (4 cols) */}
                    <div className="lg:col-span-4 space-y-4">
                        <ProfileCard />

                        {/* Dynamic Stat Card */}
                        <div className="w-full">
                            <StatCard
                                stat={stats[currentIndex].stat}
                                label={stats[currentIndex].label}
                                isActive={true}
                                onClick={() => { }}
                            />
                        </div>
                    </div>

                    {/* Right Column - Tech, Experience, Principles (8 cols) */}
                    <div className="lg:col-span-8 space-y-6 mt-4 lg:mt-0">
                        <ExperienceTimeline />

                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
