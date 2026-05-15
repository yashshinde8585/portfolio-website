import Lenis from 'lenis';
import { useEffect, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';

import BaseErrorBoundary from './components/BaseErrorBoundary';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Meta from './components/SEO/Meta';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load non-critical components
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const About = lazy(() => import('./components/About'));

/**
 * App - Root Application Entry.
 * Features: Error Boundaries, Theme Provider, SEO Meta, Smooth Scroll (Lenis).
 */
function App() {
  useEffect(() => {
    // Initialize Smooth Scrolling (Lenis)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BaseErrorBoundary>
      <ThemeProvider>
        <HelmetProvider>
          <Toaster position="bottom-right" richColors theme="system" />
          <Meta />
          <div className="min-h-screen bg-[#0F172A] text-slate-100 selection:bg-indigo-500/30 md:bg-slate-50 dark:md:bg-[#0F172A] md:text-slate-900 dark:md:text-slate-100">
            <Navbar />

            {/* Main Content */}
            <main className="relative z-10 w-full md:pl-24" id="main-content">
              <Hero />

              <div className="mx-auto max-w-7xl px-4 md:px-0 lg:pr-8">
                <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />
              </div>

              <Suspense
                fallback={
                  <div className="flex h-screen items-center justify-center text-slate-500">
                    Loading Experience...
                  </div>
                }
              >
                <About />
                <div className="mx-auto max-w-7xl px-4 md:px-0 lg:pr-8">
                  <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />
                </div>
                <Projects />
                <div className="mx-auto max-w-7xl px-4 md:px-0 lg:pr-8">
                  <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />
                </div>
                <Contact />
              </Suspense>
              <Footer />
            </main>
          </div>
        </HelmetProvider>
      </ThemeProvider>
    </BaseErrorBoundary>
  );
}

export default App;
