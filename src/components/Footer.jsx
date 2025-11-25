import { ArrowUp, Heart } from "lucide-react";
import { SOCIAL_LINKS } from "../constants";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="bg-[#0F172A] md:bg-slate-50 border-t border-white/10 md:border-slate-200 py-12 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="text-gray-500 text-sm flex items-center justify-center md:justify-start">
                        © {new Date().getFullYear()} Yash Shinde.
                    </p>
                </div>

                <div className="flex space-x-6">
                    {SOCIAL_LINKS.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={link.ariaLabel}
                            className="text-gray-500 hover:text-white md:hover:text-blue-600 transition-colors"
                        >
                            <link.icon size={20} />
                        </a>
                    ))}
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className="absolute bottom-8 right-8 p-3 rounded-full bg-white/5 border border-white/10 text-white shadow-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hidden md:flex"
                aria-label="Back to Top"
            >
                <ArrowUp size={20} />
            </button>
        </footer>
    );
};

export default Footer;
