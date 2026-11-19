import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Phone, X } from 'lucide-react';
import { BUSINESS_INFO } from '../data/siteData';
import { NAV_ITEMS } from './Navbar';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onEstimateClick: () => void;
}

export function MobileMenu({ isOpen, onClose, onEstimateClick }: MobileMenuProps) {
  const location = useLocation();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[60] bg-[#151515] bg-arch-grid-dark text-white flex flex-col justify-between p-6 sm:p-10"
        >
          <div className="flex items-center justify-between border-b border-white/12 pb-5">
            <span className="font-display font-bold text-base tracking-[0.08em] text-[#D9E600]">
              PARADISE VIEWS LANDSCAPING
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="w-11 h-11 flex items-center justify-center border border-white/20 text-white hover:border-[#D9E600] hover:text-[#D9E600] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-3 my-auto py-8" aria-label="Mobile links">
            {NAV_ITEMS.map((item, index) => {
              const active = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.3 }}
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-baseline justify-between py-3 border-b border-white/10 font-display font-bold text-3xl sm:text-4xl tracking-tight transition-colors ${
                      active ? 'text-[#D9E600]' : 'text-white hover:text-[#D9E600]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-sans tracking-[0.14em] text-white/45 tabular-nums">
                      0{index + 1}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="space-y-4 border-t border-white/12 pt-6">
            <button
              type="button"
              onClick={onEstimateClick}
              className="w-full flex items-center justify-between bg-[#D9E600] text-[#151515] font-display font-bold text-sm tracking-[0.08em] px-6 py-4 cursor-pointer"
            >
              <span>GET A FREE ESTIMATE</span>
              <span className="w-8 h-8 rounded-full bg-[#151515] text-[#D9E600] flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-white/70">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center gap-2 hover:text-[#D9E600] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D9E600]" />
                <span className="tabular-nums">{BUSINESS_INFO.phoneDisplay}</span>
              </a>
              <span>{BUSINESS_INFO.location}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
