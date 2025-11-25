import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const RollingEye = ({ parentRef, isHovered }) => {
    const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Only track if the parent card is being hovered
        if (!isHovered || !parentRef.current) {
            setPupilPos({ x: 0, y: 0 }); // Reset to center
            return;
        }

        const handleMouseMove = (e) => {
            // 1. Get the Eye's exact position on screen
            const eyeButton = document.getElementById("eye-anchor");
            if (!eyeButton) return;

            const rect = eyeButton.getBoundingClientRect();
            const eyeCenterX = rect.left + rect.width / 2;
            const eyeCenterY = rect.top + rect.height / 2;

            // 2. Calculate Vector (Mouse - EyeCenter)
            const dx = e.clientX - eyeCenterX;
            const dy = e.clientY - eyeCenterY;

            // 3. Calculate Angle and Distance
            const angle = Math.atan2(dy, dx);
            const distance = Math.min(3, Math.hypot(dx, dy) / 10);
            // Divide by 10 to dampen the speed, clamp at 3px max movement

            // 4. Resolve new Pupil Position
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            setPupilPos({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isHovered, parentRef]);

    return (
        <div id="eye-anchor" className="relative w-6 h-6 flex items-center justify-center">
            {/* Sclera (The White Part) - Custom SVG */}
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-indigo-400 group-hover:text-white transition-colors duration-300"
            >
                {/* Eye Outline */}
                <path
                    d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="transparent"
                />

                {/* The Pupil - Animated */}
                <motion.circle
                    cx="12"
                    cy="12"
                    r="3"
                    fill="currentColor"
                    animate={{
                        x: pupilPos.x,
                        y: pupilPos.y,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 15,
                        mass: 0.5 // Lightweight feel
                    }}
                />
            </svg>
        </div>
    );
};

export default RollingEye;
