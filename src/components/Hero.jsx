import { motion } from "framer-motion";

import DigitalAvatar from "./DigitalAvatar";
import TimeGreeting from "./ui/TimeGreeting";

const Hero = () => {
    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
        >
            {/* Background Gradient/Glow */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 md:bg-blue-100/60 dark:md:bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 md:bg-indigo-50/80 dark:md:bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

            {/* Time Greeting Widget */}
            <TimeGreeting />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center z-10">
                {/* Text Content */}
                <div className="md:w-3/5 text-center md:text-left mb-8 md:mb-0 md:pr-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >

                        <h1 className="text-4xl md:text-6xl font-bold text-slate-100 md:text-slate-900 dark:md:text-slate-100 mb-6 leading-[1.1] tracking-tight">
                            Full-Stack Developer building{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 md:from-blue-600 md:to-indigo-600 dark:md:from-sky-400 dark:md:to-indigo-400">
                                scalable SaaS Applications.
                            </span>
                        </h1>
                        <p className="text-lg text-slate-400 md:text-slate-600 dark:md:text-slate-300 mt-6 mb-8 max-w-2xl mx-auto md:mx-0 leading-[1.8]">
                            Currently SDE Intern at <span className="text-slate-200 md:text-slate-700 dark:md:text-slate-200 font-semibold">BharatGo</span>. I specialize in building robust backends with <span className="text-indigo-400 md:text-indigo-500 font-medium">Node.js</span> and interactive frontends using <span className="text-sky-400 md:text-sky-500 font-medium">React</span> and <span className="text-sky-400 md:text-sky-500 font-medium">Next.js</span>.
                        </p>


                    </motion.div>
                </div>

                {/* Digital Avatar */}
                <div className="md:w-2/5 h-[400px] md:h-[600px] w-full flex justify-center items-center relative">
                    <DigitalAvatar />
                </div>
            </div>


        </section>
    );
};

export default Hero;
