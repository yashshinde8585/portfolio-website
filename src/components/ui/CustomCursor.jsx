import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    // Motion values for cursor position (no re-renders)
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    // Spring physics for smooth follower movement
    const followerX = useSpring(cursorX, {
        damping: 25,
        stiffness: 200,
        mass: 0.5,
    });
    const followerY = useSpring(cursorY, {
        damping: 25,
        stiffness: 200,
        mass: 0.5,
    });

    // Motion values for scale (interactivity)
    const followerScale = useMotionValue(1);
    const followerScaleSpring = useSpring(followerScale, {
        damping: 20,
        stiffness: 300,
    });

    useEffect(() => {
        // Check if device has fine pointer (mouse) - don't render on touch devices
        const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
        if (!hasFinePointer) return;

        // Mouse move handler
        const handleMouseMove = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        // Detect clickable elements
        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable =
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.style.cursor === "pointer" ||
                window.getComputedStyle(target).cursor === "pointer";

            if (isClickable) {
                followerScale.set(1.5); // Expand ring
            }
        };

        const handleMouseOut = (e) => {
            const target = e.target;
            const isClickable =
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.style.cursor === "pointer" ||
                window.getComputedStyle(target).cursor === "pointer";

            if (isClickable) {
                followerScale.set(1); // Reset ring
            }
        };

        // Add event listeners
        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, [cursorX, cursorY, followerScale]);

    // Don't render on touch devices
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
        return null;
    }

    return (
        <>
            {/* Pointer Dot - Fixed to mouse position */}
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    mixBlendMode: "difference",
                }}
            />

            {/* Follower Ring - Follows with spring physics */}
            <motion.div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border-2 border-white rounded-full pointer-events-none z-[9998]"
                style={{
                    x: followerX,
                    y: followerY,
                    translateX: "-50%",
                    translateY: "-50%",
                    scale: followerScaleSpring,
                    mixBlendMode: "difference",
                }}
            />
        </>
    );
};

export default CustomCursor;
