import React, { Suspense, lazy, useEffect } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { HomePage } from './pages/HomePage';
import { Navbar } from './components/Navbar';
import type { InodoVariant } from './components/InodoPromotionalPage';

const LazyInodoPromotionalPage = lazy(() =>
  import('./components/InodoPromotionalPage').then((mod) => ({
    default: mod.InodoPromotionalPage,
  })),
);

const ROUTE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Paradise Views Landscaping | Landscape Design & Construction',
    description:
      'Transform your outdoor space with Paradise Views Landscaping. Explore landscape design, patios, retaining walls, decks, outdoor living, and landscaping services in the Toronto and Etobicoke area.',
  },
  '/why-choose-us': {
    title: 'Why Choose Us | Concept by InoDo',
    description: 'A website redesign concept for Paradise Views Landscaping designed by InoDo.',
  },
  '/gallery': {
    title: 'Gallery | Concept by InoDo',
    description: 'A website redesign concept for Paradise Views Landscaping designed by InoDo.',
  },
  '/services': {
    title: 'Services | Concept by InoDo',
    description: 'A website redesign concept for Paradise Views Landscaping designed by InoDo.',
  },
  '/contact': {
    title: 'Contact | Concept by InoDo',
    description: 'A website redesign concept for Paradise Views Landscaping designed by InoDo.',
  },
};

function SecondaryRouteShell({ variant }: { variant: InodoVariant }) {
  return (
    <div className="min-h-screen bg-[#151515]">
      <Navbar />
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#151515] flex items-center justify-center text-white/60 font-display text-xs tracking-[0.2em]">
            LOADING CONCEPT...
          </div>
        }
      >
        <LazyInodoPromotionalPage variant={variant} />
      </Suspense>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    const meta = ROUTE_META[location.pathname] || ROUTE_META['/'];
    document.title = meta.title;

    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', meta.description);
    }

    // Maintain canonical URL dynamically
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}${location.pathname}`;

    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/why-choose-us"
            element={<SecondaryRouteShell variant="why-choose-us" />}
          />
          <Route
            path="/gallery"
            element={<SecondaryRouteShell variant="gallery" />}
          />
          <Route
            path="/services"
            element={<SecondaryRouteShell variant="services" />}
          />
          <Route
            path="/contact"
            element={<SecondaryRouteShell variant="contact" />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </MotionConfig>
  );
}
