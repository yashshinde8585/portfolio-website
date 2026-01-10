import { useMotionValue, useTransform } from 'framer-motion';

/**
 * use3DTilt - Custom hook for 3D tilt effect
 * @param {React.RefObject} ref - Reference to the element to tilt
 * @param {Object} options - Configuration options
 * @param {number} options.maxRotation - Maximum rotation in degrees (default: 5)
 * @param {number} options.range - Mouse range for full rotation (default: 300)
 * @returns {Object} - { rotateX, rotateY, handleMouseMove, handleMouseLeave }
 */
export const use3DTilt = (ref, { maxRotation = 5, range = 300 } = {}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-range, range], [maxRotation, -maxRotation]);
    const rotateY = useTransform(mouseX, [-range, range], [-maxRotation, maxRotation]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        mouseX.set(x);
        mouseY.set(y);

        // For specular edge effect if needed
        const xPct = e.clientX - rect.left;
        const yPct = e.clientY - rect.top;
        ref.current.style.setProperty('--mouse-x', `${xPct}px`);
        ref.current.style.setProperty('--mouse-y', `${yPct}px`);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return {
        rotateX,
        rotateY,
        handleMouseMove,
        handleMouseLeave
    };
};
