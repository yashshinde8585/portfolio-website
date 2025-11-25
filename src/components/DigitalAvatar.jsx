import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import avatarImage from "../assets/avatar.jpg";

const DigitalAvatar = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showGlitch, setShowGlitch] = useState(true);

    // Mouse tracking for interactive lighting
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 3D Parallax values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animations for parallax
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

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

    const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        // Update mouse position for lighting
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);

        // Update parallax (normalized -0.5 to 0.5)
        x.set((clientX - left) / width - 0.5);
        y.set((clientY - top) / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            className="relative w-full h-full flex items-center justify-center perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Wireframe Layer (Entrance Animation) */}
            <motion.div
                initial={{ opacity: 1, scale: 0.95 }}
                animate={{ opacity: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            >
                <div className="w-[400px] h-[400px] border-2 border-cyan-400/50 rounded-lg animate-pulse" />
            </motion.div>

            {/* Main Avatar Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative group"
            >
                {/* Floating Animation */}
                <motion.div
                    animate={{
                        y: [-10, 10, -10],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative"
                >
                    {/* Glass Container */}
                    <div className="relative p-8 bg-white/5 md:bg-white/60 backdrop-blur-xl rounded-3xl border border-white/10 md:border-slate-200 shadow-2xl md:shadow-2xl">
                        {/* Avatar Image */}
                        <div className="relative overflow-hidden rounded-2xl">
                            <motion.img
                                src={avatarImage}
                                alt="Digital Avatar"
                                className={`w-[350px] h-auto object-cover drop-shadow-2xl mix-blend-luminosity md:mix-blend-normal ${showGlitch ? 'glitch-entry' : ''}`}
                                style={{
                                    // mixBlendMode: "luminosity",
                                    filter: "contrast(1.1) brightness(1.1)",
                                }}
                            />

                            {/* Interactive Lighting Overlay */}
                            <motion.div
                                className="absolute inset-0 mix-blend-overlay opacity-60 pointer-events-none"
                                style={{
                                    background: useTransform(
                                        [mouseX, mouseY],
                                        ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, rgba(59, 130, 246, 0.6), rgba(139, 92, 246, 0.3) 40%, transparent 70%)`
                                    ),
                                }}
                            />

                            {/* Duotone Color Overlay */}
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

                    {/* Rim Light Glow */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl -z-10 group-hover:blur-2xl transition-all duration-500" />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default DigitalAvatar;
