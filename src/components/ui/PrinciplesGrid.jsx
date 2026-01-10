import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Code, Palette, Zap, Sparkles } from 'lucide-react';
import { PRINCIPLES } from '../../constants';

const iconMap = {
    Code: Code,
    Palette: Palette,
    Zap: Zap,
    Sparkles: Sparkles
};

const PrincipleCard = ({ principle, index }) => {
    const Icon = iconMap[principle.icon];
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.3 + (index * 0.1) }}
            onMouseMove={handleMouseMove}
            className="!bg-white dark:!bg-slate-800/50 rounded-3xl p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group shadow-sm dark:shadow-none backdrop-blur-sm relative overflow-hidden"
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            650px circle at ${mouseX}px ${mouseY}px,
                            rgba(59, 130, 246, 0.15),
                            transparent 80%
                        )
                    `,
                }}
            />

            <div className="relative z-10">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors">{principle.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors">
                    {principle.description}
                </p>
            </div>
        </motion.div>
    );
};

const PrinciplesGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRINCIPLES.map((principle, i) => (
                <PrincipleCard key={i} principle={principle} index={i} />
            ))}
        </div>
    );
};

export default PrinciplesGrid;
