import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const KineticReel = ({ images }) => {
    // Split images into 3 columns
    const col1 = images.slice(0, Math.ceil(images.length / 3));
    const col2 = images.slice(Math.ceil(images.length / 3), Math.ceil(2 * images.length / 3));
    const col3 = images.slice(Math.ceil(2 * images.length / 3));

    return (
        <div className="h-full w-full overflow-hidden bg-[#05050A] md:bg-white relative flex gap-4 p-4">
            <Column images={[...col1, ...col1]} direction="up" speed={20} />
            <Column images={[...col2, ...col2]} direction="down" speed={25} />
            <Column images={[...col3, ...col3]} direction="up" speed={22} />

            {/* Gradient Overlays for smooth fade */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#05050A] md:from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05050A] md:to-white to-transparent z-10 pointer-events-none" />
        </div>
    );
};

const Column = ({ images, direction, speed }) => {
    return (
        <div className="flex-1 relative h-full overflow-hidden">
            <motion.div
                initial={{ y: direction === 'up' ? "0%" : "-50%" }}
                animate={{ y: direction === 'up' ? "-50%" : "0%" }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop"
                }}
                className="flex flex-col gap-4 absolute w-full"
            >
                {images.map((img, i) => (
                    <div key={i} className="w-full aspect-[3/4] rounded-xl overflow-hidden relative group cursor-pointer">
                        <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-colors duration-300" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default KineticReel;
