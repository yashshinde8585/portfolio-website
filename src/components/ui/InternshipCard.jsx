import React, { useState, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import RollingEye from './RollingEye';

const InternshipCard = ({ company, index, onClick, clickable = true }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group relative w-full p-6 rounded-card bg-[#1E293B] md:bg-white border border-white/10 md:border-slate-200 overflow-hidden transition-all duration-300 hover:border-sky-500/30 md:hover:border-blue-500/30 md:shadow-sm ${clickable ? 'cursor-pointer' : ''}`}
            onClick={clickable ? onClick : undefined}
            onKeyDown={clickable ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(e);
                }
            } : undefined}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role={clickable ? "button" : undefined}
            tabIndex={clickable ? 0 : undefined}
            onMouseMove={handleMouseMove}
        >
            {/* Spotlight Overlay */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-card opacity-0 transition duration-500 group-hover:opacity-100 z-10"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          400px circle at ${mouseX}px ${mouseY}px,
                          rgba(99, 102, 241, 0.1),
                          transparent 80%
                        )
                    `,
                }}
            />

            <div className="relative z-20 flex items-center justify-between gap-6">
                {/* Left: Logo */}
                <div className="flex-shrink-0">
                    {company.logo && company.logo.startsWith('/') || company.logo && company.logo.startsWith('http') ? (
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center p-2">
                            <img
                                src={company.logo}
                                alt={`${company.name} logo`}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ) : (
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg border border-white/20">
                            <span className="text-white text-xl font-bold">
                                {company.logo || company.name.substring(0, 2).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                {/* Center: Content Hierarchy */}
                <div className="flex-1 space-y-2">
                    <h4 className="text-2xl font-bold text-slate-100 md:text-slate-900 tracking-tight">{company.name}</h4>
                    <p className="text-lg font-medium text-slate-400 md:text-slate-600">{company.role}</p>
                    <p className="text-sm font-medium text-slate-500 md:text-slate-500 uppercase tracking-wider">{company.duration}</p>
                </div>

                {/* Right: The Sentient Inspector Trigger */}
                <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-500/20 group-hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] group-hover:border-indigo-500/40">
                        <RollingEye parentRef={cardRef} isHovered={isHovered} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default InternshipCard;
