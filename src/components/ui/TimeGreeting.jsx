import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Coffee, CloudSun, Hand } from 'lucide-react';

const TimeGreeting = () => {
    const [time, setTime] = useState(new Date());
    const [greeting, setGreeting] = useState('');
    const [Icon, setIcon] = useState(Sun);
    const [showWave, setShowWave] = useState(true);

    useEffect(() => {
        // Show wave for 4 seconds
        const waveTimer = setTimeout(() => {
            setShowWave(false);
        }, 4000);

        return () => clearTimeout(waveTimer);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);

        const updateGreeting = () => {
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 12) {
                setGreeting('Good Morning');
                setIcon(Coffee);
            } else if (hour >= 12 && hour < 17) {
                setGreeting('Good Afternoon');
                setIcon(Sun);
            } else if (hour >= 17 && hour < 21) {
                setGreeting('Good Evening');
                setIcon(CloudSun);
            } else {
                setGreeting('Good Night');
                setIcon(Moon);
            }
        };

        updateGreeting();
        const greetingTimer = setInterval(updateGreeting, 60000); // Check every minute

        return () => {
            clearInterval(timer);
            clearInterval(greetingTimer);
        };
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute top-6 right-6 z-50 hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 dark:bg-slate-900/30 backdrop-blur-md border border-slate-200/20 dark:border-slate-700/30 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 group"
        >
            <div className="p-1.5 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                {showWave ? (
                    <motion.div
                        animate={{ rotate: [0, 25, -10, 20, -5, 0] }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "loop"
                        }}
                        style={{ originX: 0.7, originY: 0.7 }}
                    >
                        <Hand size={16} />
                    </motion.div>
                ) : (
                    <Icon size={16} />
                )}
            </div>

            <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-0.5">
                    {greeting}
                </span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 font-mono">
                    {formatTime(time)}
                </span>
            </div>

            {/* Pulsing Status Dot to show it's "Live" */}
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
        </motion.div>
    );
};

export default TimeGreeting;
