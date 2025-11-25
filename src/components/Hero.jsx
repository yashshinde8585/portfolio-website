import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import DigitalAvatar from "./DigitalAvatar";

const Hero = () => {
    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
        >
            {/* Background Gradient/Glow */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 md:bg-blue-100/60 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 md:bg-indigo-50/80 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center z-10">
                {/* Text Content */}
                <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-sm uppercase tracking-[0.2em] text-sky-400 md:text-blue-600 font-semibold mb-4">
                            Full Stack Developer
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-100 md:text-slate-900 mb-6 leading-tight tracking-tight">
                            Building digital <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 md:from-blue-600 md:to-indigo-600">
                                experiences
                            </span>{" "}
                            that matter.
                        </h1>
                        <p className="text-lg text-slate-400 md:text-slate-600 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                            I design and build accessible, pixel-perfect, and performant web
                            applications. Let&apos;s turn your vision into reality.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <a
                                href="#projects"
                                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-sky-500 md:bg-blue-600 hover:bg-sky-600 md:hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]"
                            >
                                View Work
                                <ArrowRight className="ml-2" size={20} />
                            </a>
                            <a
                                href="/resume.pdf"
                                className="inline-flex items-center justify-center px-8 py-4 border border-white/10 md:border-slate-200 text-base font-medium rounded-full text-slate-100 md:text-slate-700 bg-white/5 md:bg-white hover:bg-white/10 md:hover:bg-slate-50 backdrop-blur-sm transition-all md:shadow-sm"
                            >
                                Download Resume
                                <Download className="ml-2" size={20} />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Digital Avatar */}
                <div className="md:w-1/2 h-[600px] w-full flex justify-center items-center relative">
                    <DigitalAvatar />
                </div>
            </div>
        </section>
    );
};

export default Hero;
