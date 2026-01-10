import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StatCard from './ui/StatCard';
import ProfileCard from './ui/ProfileCard';
import ExperienceTimeline from './ui/ExperienceTimeline';


const About = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const stats = [
        { stat: "400+", label: "GitHub Commits (Production-Level)" },
        { stat: "10+", label: "Developer Communities & Meetups" },
        { stat: "4+", label: "Production-Ready Applications" },
        { stat: "", label: "Technical Consultant (Student Interest Group)" }
    ];

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % stats.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="about" className="pt-24 pb-6 md:py-10 relative bg-slate-50 dark:bg-[#0F172A] transition-colors duration-300">
            <div className="w-full md:w-[90%] max-w-none mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-4 text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">About Me</h2>
                    <div className="w-20 h-1 bg-indigo-600 rounded-full"></div>
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
