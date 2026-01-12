import { useEffect, Suspense, lazy } from "react";
import { HelmetProvider } from 'react-helmet-async';
import Lenis from "lenis";
import { Toaster } from "sonner";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import Footer from "./components/Footer";
import Meta from "./components/SEO/Meta";

// Lazy load below-the-fold components
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const About = lazy(() => import("./components/About"));

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <HelmetProvider>
        <Toaster position="bottom-right" richColors theme="system" />
        <Meta />
        <div className="min-h-screen bg-[#0F172A] md:bg-slate-50 dark:md:bg-[#0F172A] text-slate-100 md:text-slate-900 dark:md:text-slate-100 selection:bg-indigo-500/30 md:flex">
          {/* Sidebar Column (10%) */}
          <div className="w-full md:w-[10%] shrink-0">
            <Navbar />
          </div>

          {/* Main Content Column (90%) */}
          <main className="relative z-10 w-full md:w-[90%]">
            <Hero />
            <Suspense fallback={<div className="h-screen flex items-center justify-center text-slate-500">Loading...</div>}>
              <About />
              <Projects />
              <Contact />
            </Suspense>
            <Footer />
          </main>
        </div>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
