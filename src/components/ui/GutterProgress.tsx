import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * GutterProgress - A technical, minimalist scroll progress indicator.
 */
const GutterProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed left-24 top-0 z-40 hidden h-screen w-8 flex-col items-center border-r border-slate-100 py-24 md:flex dark:border-slate-800">
      {/* Progress Track */}
      <div className="relative flex-1 w-px bg-slate-100 dark:bg-slate-800">
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
            translateY: useTransform(scrollYProgress, [0, 1], ['0px', '-40px']),
          }}
          className="absolute top-0 left-[-1.5px] h-[40px] w-[4px] border border-sky-500 bg-transparent shadow-[0_0_8px_rgba(56,189,248,0.2)]"
        />
      </div>

      {/* Decorative Dots */}
      <div className="mt-12 flex flex-col gap-1.5">
        <div className="h-1 w-1 bg-slate-300 dark:bg-slate-700" />
        <div className="h-1 w-1 bg-slate-300 dark:bg-slate-700" />
        <div className="h-1.5 w-1.5 border border-sky-500 bg-transparent" />
      </div>
    </div>
  );
};

export default GutterProgress;
