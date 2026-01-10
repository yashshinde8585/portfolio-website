import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import avatarImage from "../assets/my_photo.jpg";

const DigitalAvatar = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showGlitch, setShowGlitch] = useState(true);

    useEffect(() => {
        // Trigger entrance animation
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);

        // Hide glitch effect after entrance
        const glitchTimer = setTimeout(() => {
            setShowGlitch(false);
        }, 1500);

        return () => {
            clearTimeout(timer);
            clearTimeout(glitchTimer);
        };
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Wireframe Layer (Entrance Animation) */}
            <motion.div
                initial={{ opacity: 1, scale: 0.95 }}
                animate={{ opacity: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            >
                <div className="w-[400px] h-[400px] border-2 border-cyan-400/50 rounded-lg animate-pulse" />
            </motion.div>

            {/* Main Avatar Container - Static */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="relative group"
            >
                {/* Static Container - No Floating Animation */}
                <div className="relative">
                    {/* Glass Container */}
                    <div className="relative p-8 bg-white/5 md:bg-white/60 backdrop-blur-xl rounded-3xl border border-white/10 md:border-white/10 dark:md:border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.3)] md:shadow-2xl">
                        {/* Avatar Image */}
                        <div className="relative overflow-hidden rounded-2xl">
                            <img
                                src={avatarImage}
                                alt="Digital Avatar"
                                width="350"
                                height="350"
                                className={`w-[280px] md:w-[350px] h-auto object-cover drop-shadow-2xl mix-blend-luminosity md:mix-blend-normal ${showGlitch ? 'glitch-entry' : ''}`}
                                style={{
                                    filter: "contrast(1.1) brightness(1.1)",
                                }}
                            />

                            {/* Duotone Color Overlay - Static */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 mix-blend-color pointer-events-none" />
                        </div>

                        {/* Scanner Line (Entrance Animation) */}
                        {isLoaded && (
                            <motion.div
                                initial={{ top: 0 }}
                                animate={{ top: "100%" }}
                                transition={{ delay: 0.8, duration: 1.2, ease: "linear" }}
                                className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70 pointer-events-none z-30"
                            />
                        )}
                    </div>

                    {/* Rim Light Glow - Static */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl -z-10" />
                </div>
            </motion.div>
        </div>
    );
};

export default DigitalAvatar;
