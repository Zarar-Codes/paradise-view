import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { MobileMenu } from './MobileMenu';

export const NAV_ITEMS = [
  { label: 'HOME', path: '/' },
  { label: 'WHY CHOOSE US', path: '/why-choose-us' },
  { label: 'GALLERY', path: '/gallery' },
  { label: 'SERVICES', path: '/services' },
  { label: 'CONTACT', path: '/contact' },
] as const;

interface NavbarProps {
  onEstimateClick?: () => void;
}

export function Navbar({ onEstimateClick }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleEstimateAction = () => {
    setMobileOpen(false);
    if (location.pathname === '/' && onEstimateClick) {
      onEstimateClick();
      return;
    }
    navigate('/#contact');
    window.setTimeout(() => {
      const el = document.getElementById('contact');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'bg-[#151515]/96 border-b border-white/12'
            : 'bg-[#151515]/45 border-b border-white/10'
        }`}
      >
        <div className="w-[90%] max-w-[1440px] mx-auto h-[72px] flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Lockup */}
          <Link
            to="/"
            className="flex items-center gap-3 text-white hover:text-[#D9E600] transition-colors whitespace-nowrap shrink-0"
            aria-label="Paradise Views Landscaping Home"
          >
            <BrandMark className="w-6 h-6 shrink-0" />
            <span className="font-display font-bold text-base sm:text-lg tracking-[0.06em] whitespace-nowrap">
              PARADISE VIEWS
            </span>
          </Link>

          {/* Zone 2: 5 concise single-line text nav links */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7"
          >
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative py-2 text-xs font-medium tracking-[0.11em] transition-colors whitespace-nowrap shrink-0 ${
                    active ? 'text-[#D9E600]' : 'text-white/85 hover:text-white'
                  }`}
                >
                  {item.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-active-underline"
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#D9E600]"
                    />
                  ) : (
                    <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#D9E600] origin-left scale-x-0 transition-transform duration-200 hover:scale-x-100" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleEstimateAction}
              className="hidden sm:inline-flex items-center gap-3 bg-[#D9E600] hover:bg-[#C8D500] text-[#151515] font-display font-bold text-xs tracking-[0.08em] pl-5 pr-2 py-2 transition-transform duration-200 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>GET A FREE ESTIMATE</span>
              <span className="w-7 h-7 rounded-full bg-[#151515] text-[#D9E600] flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.25} />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="lg:hidden w-11 h-11 flex items-center justify-center border border-white/20 text-white hover:border-[#D9E600] hover:text-[#D9E600] transition-colors cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onEstimateClick={handleEstimateAction}
      />
    </>
  );
}
