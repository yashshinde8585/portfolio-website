import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Send, Loader2, ArrowRight, Check } from "lucide-react";
import emailjs from "@emailjs/browser";

const Contact = () => {
    const formRef = useRef();
    const sectionRef = useRef(null);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        permission: false
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("idle");

    // Parallax effect for background text
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const validateForm = () => {
        const { firstName, lastName, email, message, permission } = form;
        if (!firstName.trim()) return false;
        if (!lastName.trim()) return false;
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
        if (!message.trim()) return false;
        if (!permission) return false;
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            alert("Please fill in all fields and grant permission.");
            return;
        }
        setLoading(true);
        setStatus("idle");

        const templateParams = {
            from_name: `${form.firstName} ${form.lastName}`,
            to_name: "Yash Shinde",
            from_email: form.email,
            to_email: "yashshinde8585@gmail.com",
            message: form.message,
        };

        emailjs
            .send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )
            .then(
                () => {
                    setLoading(false);
                    setStatus("success");
                    setForm({ firstName: "", lastName: "", email: "", message: "", permission: false });
                    setTimeout(() => setStatus("idle"), 5000);
                },
                (error) => {
                    setLoading(false);
                    setStatus("error");
                    console.error(error);
                    alert("Something went wrong. Please try again.");
                }
            );
    };

    return (
        <section ref={sectionRef} id="contact" className="min-h-screen relative flex items-end justify-end overflow-hidden bg-[#0F172A] md:bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
            {/* Mega Text Background with Parallax */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <motion.h1
                    style={{ y }}
                    className="font-black text-slate-100 md:text-slate-200/50 leading-none opacity-100"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <span style={{
                        fontSize: '35vw',
                        letterSpacing: '-0.05em',
                        transform: 'scaleY(4) scaleX(0.5)',
                        fontStretch: 'ultra-condensed',
                        WebkitTextStroke: '2px rgba(255,255,255,0.1)',
                        display: 'block'
                    }}>
                        CONTACT
                    </span>
                </motion.h1>
            </div>

            <div className="max-w-3xl w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-[#1E293B] md:bg-white border border-white/10 md:border-slate-200 p-8 md:p-10 rounded-3xl shadow-2xl md:shadow-xl relative overflow-hidden"
                >
                    {/* Top Accent Line with Glow */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-indigo-500 md:from-blue-600 md:to-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />

                    {/* Enhanced REACH US Label */}
                    <h3 className="text-base font-extrabold text-sky-400 md:text-blue-600 uppercase tracking-widest mb-8 flex items-center gap-2">
                        <span className="inline-block w-8 h-px bg-sky-500 md:bg-blue-600"></span>
                        Reach Us
                    </h3>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                            {/* Left Column */}
                            <div className="space-y-6">
                                <div className="group">
                                    <label htmlFor="firstName" className="block text-sm font-semibold text-slate-300 md:text-slate-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        placeholder="John"
                                        className="w-full bg-transparent border-b-2 border-white/10 md:border-slate-300 py-3 text-xl text-slate-100 md:text-slate-900 focus:border-sky-500 md:focus:border-blue-600 focus:shadow-[0_2px_8px_rgba(56,189,248,0.3)] focus:outline-none transition-all duration-300 placeholder:text-slate-500/30 md:placeholder:text-slate-400"
                                        required
                                    />
                                </div>
                                <div className="group">
                                    <label htmlFor="lastName" className="block text-sm font-semibold text-slate-300 md:text-slate-700 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        className="w-full bg-transparent border-b-2 border-white/10 md:border-slate-300 py-3 text-xl text-slate-100 md:text-slate-900 focus:border-sky-500 md:focus:border-blue-600 focus:shadow-[0_2px_8px_rgba(56,189,248,0.3)] focus:outline-none transition-all duration-300 placeholder:text-slate-500/30 md:placeholder:text-slate-400"
                                        required
                                    />
                                </div>
                                <div className="group">
                                    <label htmlFor="email" className="block text-sm font-semibold text-slate-300 md:text-slate-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full bg-transparent border-b-2 border-white/10 md:border-slate-300 py-3 text-xl text-slate-100 md:text-slate-900 focus:border-sky-500 md:focus:border-blue-600 focus:shadow-[0_2px_8px_rgba(56,189,248,0.3)] focus:outline-none transition-all duration-300 placeholder:text-slate-500/30 md:placeholder:text-slate-400"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="h-full flex flex-col">
                                <label htmlFor="message" className="block text-sm font-semibold text-slate-300 md:text-slate-700 mb-2">Type your message here</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project..."
                                    className="w-full flex-1 bg-transparent border-b-2 border-white/10 md:border-slate-300 py-3 text-xl text-slate-100 md:text-slate-900 focus:border-sky-500 md:focus:border-blue-600 focus:shadow-[0_2px_8px_rgba(56,189,248,0.3)] focus:outline-none transition-all duration-300 resize-none placeholder:text-slate-500/30 md:placeholder:text-slate-400 min-h-[200px]"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-4">
                            <div className="flex items-start gap-3 max-w-sm">
                                {/* Custom Styled Checkbox */}
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        name="permission"
                                        checked={form.permission}
                                        onChange={handleChange}
                                        className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-white/30 md:border-slate-300 bg-transparent checked:bg-sky-500 md:checked:bg-blue-600 checked:border-sky-500 md:checked:border-blue-600 transition-all duration-300 hover:border-sky-400 md:hover:border-blue-500"
                                        id="permission"
                                    />
                                    <Check className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-300" />
                                </div>
                                <label htmlFor="permission" className="text-sm text-slate-300 md:text-slate-600 leading-relaxed cursor-pointer hover:text-slate-100 md:hover:text-slate-900 transition-colors">
                                    I give permission to contact me at this email address.
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group flex items-center gap-3 px-8 py-3 bg-sky-500 md:bg-blue-600 text-white rounded-full font-bold transition-all duration-300 hover:bg-sky-600 md:hover:bg-blue-700 hover:scale-105 hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        <span>Send</span>
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                                    </>
                                )}
                            </button>
                        </div>

                        {status === "success" && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-green-400 text-center font-medium mt-4"
                            >
                                ✓ Message sent successfully!
                            </motion.p>
                        )}
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
