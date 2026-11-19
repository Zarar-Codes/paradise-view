import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { PortfolioProject, ProjectCategory } from '../data/siteData';
import { ResilientImage } from './BrandMark';

interface PortfolioLightboxProps {
  projects: PortfolioProject[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
  onRequestSimilar: (category: ProjectCategory) => void;
}

export function PortfolioLightbox({
  projects,
  activeIndex,
  onClose,
  onNavigate,
  onRequestSimilar,
}: PortfolioLightboxProps) {
  const isOpen = activeIndex !== null && Boolean(projects[activeIndex]);
  const project = activeIndex !== null ? projects[activeIndex] : null;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((activeIndex + 1) % projects.length);
      if (e.key === 'ArrowLeft') onNavigate((activeIndex - 1 + projects.length) % projects.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, activeIndex, onClose, onNavigate, projects.length]);

  return (
    <AnimatePresence>
      {isOpen && project && activeIndex !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Project showcase: ${project.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] bg-[#151515]/96 text-white flex flex-col justify-between p-4 sm:p-8"
        >
          {/* Top bar */}
          <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between gap-4 pb-4 border-b border-white/14">
            <div className="flex items-center gap-4 text-xs font-display tracking-[0.18em]">
              <span className="text-[#D9E600] font-bold tabular-nums">
                {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
              <span className="text-white/45" aria-hidden="true">
                ·
              </span>
              <span className="text-white/80 uppercase">{project.categoryLabel}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close project lightbox"
              className="w-11 h-11 flex items-center justify-center border border-white/25 text-white hover:border-[#D9E600] hover:text-[#D9E600] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center photograph & prev/next controls */}
          <div className="relative flex-1 w-full max-w-[1400px] mx-auto my-5 flex items-center justify-center min-h-0">
            <button
              type="button"
              onClick={() => onNavigate((activeIndex - 1 + projects.length) % projects.length)}
              aria-label="Previous project"
              className="hidden sm:flex w-12 h-12 shrink-0 items-center justify-center border border-white/20 hover:border-[#D9E600] hover:text-[#D9E600] transition-colors mr-5 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full max-h-[64vh] flex items-center justify-center overflow-hidden bg-[#222222] border border-white/12"
            >
              <ResilientImage
                src={project.image}
                alt={project.imageAlt}
                className="w-full h-full object-contain"
              />
            </motion.div>

            <button
              type="button"
              onClick={() => onNavigate((activeIndex + 1) % projects.length)}
              aria-label="Next project"
              className="hidden sm:flex w-12 h-12 shrink-0 items-center justify-center border border-white/20 hover:border-[#D9E600] hover:text-[#D9E600] transition-colors ml-5 cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom info & Lead-Generation CTA */}
          <div className="w-full max-w-[1400px] mx-auto pt-4 border-t border-white/14 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="max-w-2xl">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                {project.title}
              </h3>
              <p className="text-sm text-white/72 mt-1">{project.scopeSummary}</p>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
              <div className="flex sm:hidden items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate((activeIndex - 1 + projects.length) % projects.length)}
                  aria-label="Previous project"
                  className="w-11 h-11 flex items-center justify-center border border-white/25 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate((activeIndex + 1) % projects.length)}
                  aria-label="Next project"
                  className="w-11 h-11 flex items-center justify-center border border-white/25 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestSimilar(project.inquiryCategory);
                }}
                className="inline-flex items-center gap-3 bg-[#D9E600] hover:bg-[#C8D500] text-[#151515] font-display font-bold text-xs sm:text-sm tracking-[0.08em] px-6 py-3.5 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>{project.ctaAction}</span>
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
