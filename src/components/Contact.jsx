import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Send, Loader2, ArrowRight, Check, Briefcase, Mail, MapPin, Sparkles, Copy } from "lucide-react";
import emailjs from "@emailjs/browser";
import { PROFILE } from "../constants";

const FloatingShape = ({ className, delay, duration, rotate }) => (
    <motion.div
        className={`absolute ${className} opacity-20 pointer-events-none`}
        animate={{
            y: [0, -20, 0],
            rotate: rotate ? [0, 360] : 0,
            scale: [1, 1.1, 1],
        }}
        transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay,
        }}
    >
        <div className="w-full h-full border border-indigo-500/30 rounded-card backdrop-blur-sm" />
    </motion.div>
);

const AnimatedInput = ({ label, name, type = "text", value, onChange, placeholder, required = false, isTextArea = false }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative group">
            <label
                htmlFor={name}
                className={`absolute transition-all duration-300 pointer-events-none z-10 ${isFocused || value
                    ? "-top-6 left-0 text-sm text-indigo-600 dark:text-indigo-400 font-medium"
                    : isTextArea
                        ? "top-3 left-4 text-slate-500 dark:text-slate-400"
                        : "top-3.5 left-4 text-slate-500 dark:text-slate-400"
                    }`}
            >
                {label}
            </label>

            {isTextArea ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-all min-h-[150px] resize-none"
                    required={required}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-all"
                    required={required}
                />
            )}

        </div>
    );
};

const Contact = () => {
    const formRef = useRef();
    const sectionRef = useRef(null);
    const [form, setForm] = useState({
        firstName: "",
        email: "",
        message: "",
        botcheck: ""
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [copied, setCopied] = useState(false);

    // Mouse Parallax Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const shapeX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-50, 50]), { stiffness: 150, damping: 20 });
    const shapeY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-50, 50]), { stiffness: 150, damping: 20 });
    const orbX = useSpring(useTransform(mouseX, [-0.5, 0.5], [30, -30]), { stiffness: 50, damping: 20 });
    const orbY = useSpring(useTransform(mouseY, [-0.5, 0.5], [30, -30]), { stiffness: 50, damping: 20 });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const validateForm = () => {
        const { firstName, email, message } = form;
        if (!firstName.trim()) return false;
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
        if (!message.trim()) return false;
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.botcheck) return;

        setErrorMessage("");
        if (!validateForm()) {
            setErrorMessage("Please fill in all fields.");
            return;
        }
        setLoading(true);
        setStatus("idle");

        const templateParams = {
            from_name: form.firstName,
            to_name: PROFILE.name,
            from_email: form.email,
            to_email: PROFILE.email,
            message: form.message,
        };

        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ).then(
            () => {
                setLoading(false);
                setStatus("success");
                setForm({ firstName: "", email: "", message: "", botcheck: "" });
                setTimeout(() => setStatus("idle"), 5000);
            },
            (error) => {
                setLoading(false);
                setStatus("error");
                console.error(error);
                setErrorMessage("Something went wrong. Please try again later.");
            }
        );
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="pt-24 pb-6 md:py-10 relative bg-slate-50 dark:bg-[#0F172A] transition-colors duration-300 overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Animated Glowing Orbs */}
            <motion.div style={{ x: orbX, y: orbY }} className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]" />
            <motion.div style={{ x: orbX, y: orbY }} className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />

            {/* Floating Geometric Shapes */}
            <motion.div style={{ x: shapeX, y: shapeY }} className="absolute inset-0 pointer-events-none">
                <FloatingShape className="top-1/4 left-10 w-24 h-24 border-indigo-500/20 rotate-12" delay={0} duration={6} rotate />
                <FloatingShape className="bottom-1/3 right-10 w-32 h-32 border-purple-500/20 -rotate-12 rounded-full" delay={1} duration={7} />
                <FloatingShape className="top-1/2 left-1/2 w-16 h-16 border-sky-500/20 rotate-45" delay={2} duration={5} rotate />
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-10 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-3 tracking-tighter"
                    >
                        Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x">scale your vision?</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 dark:text-slate-300 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto"
                    >
                        Currently available for <b>Full-Time SDE & Full-Stack</b> roles to help you build world-class products.
                    </motion.p>
                </div>

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="!bg-white dark:!bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-5 sm:p-8 md:p-12 backdrop-blur-xl relative overflow-hidden dark:shadow-none transition-all duration-300"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
                        {/* Left Column - Info */}
                        <div className="space-y-6 md:space-y-8">
                            <motion.div
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 sm:p-6 flex items-center gap-4 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all group cursor-default"
                            >
                                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                                    <Briefcase size={24} />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 dark:text-white font-bold mb-1 transition-colors">Current Status</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors">Open to Full-time Opportunities (Immediate Joiner)</p>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 sm:p-6 flex items-center gap-4 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all group relative"
                            >
                                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                                    <Mail size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-slate-900 dark:text-white font-bold mb-1 transition-colors">Email me at</h3>
                                    <a href={`mailto:${PROFILE.email}`} className="text-slate-600 dark:text-slate-400 text-sm transition-colors hover:text-indigo-600 block truncate">{PROFILE.email}</a>
                                </div>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(PROFILE.email);
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 2000);
                                    }}
                                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-400 hover:text-indigo-600 transition-all"
                                    title="Copy Email"
                                >
                                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                </button>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 sm:p-6 flex items-center gap-4 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all group cursor-default"
                            >
                                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 dark:text-white font-bold mb-1 transition-colors">Location</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors">Pune, India (Open to Remote/Relocate)</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column - Form */}
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-7 md:space-y-8">
                            <input type="text" name="botcheck" value={form.botcheck} onChange={handleChange} className="hidden" />

                            <AnimatedInput
                                label="Your Name"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                required
                            />

                            <AnimatedInput
                                label="Your Email Address"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />

                            <AnimatedInput
                                label="Let’s discuss an opportunity."
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                isTextArea
                                required
                            />

                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-4 group"
                            >
                                {/* Button Shimmer Effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        <span className="relative z-20">Send Message</span>
                                        <motion.div
                                            initial={{ x: 0, y: 0 }}
                                            whileHover={{ x: 5, y: -5 }}
                                            className="relative z-20"
                                        >
                                            <Send size={18} />
                                        </motion.div>
                                    </>
                                )}
                            </motion.button>

                            {status === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center justify-center gap-2 text-green-400 text-sm mt-2 bg-green-500/10 py-2 rounded-lg"
                                >
                                    <Check size={16} />
                                    <span>Message sent successfully!</span>
                                </motion.div>
                            )}
                            {errorMessage && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-400 text-center text-sm mt-2"
                                >
                                    {errorMessage}
                                </motion.p>
                            )}
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
