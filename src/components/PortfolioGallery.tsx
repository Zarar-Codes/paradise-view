import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import {
  PORTFOLIO_PROJECTS,
  PortfolioProject,
  ProjectCategory,
} from '../data/siteData';
import { PortfolioLightbox } from './PortfolioLightbox';
import { ResilientImage } from './BrandMark';

interface PortfolioGalleryProps {
  onSelectProjectCategory: (category: ProjectCategory) => void;
  onTalkClick: () => void;
}

const FILTER_TABS: PortfolioProject['filterGroup'][] = [
  'All',
  'Outdoor Kitchens',
  'Patios & Stone',
  'Pools',
  'Decks & Pergolas',
  'Turf & Gardens',
];

function getGridSpanClass(variant: PortfolioProject['layoutVariant'], isFiltered: boolean): string {
  if (isFiltered) {
    return 'lg:col-span-6';
  }
  switch (variant) {
    case 'featured-tall':
      return 'lg:col-span-7';
    case 'supporting-portrait':
      return 'lg:col-span-5';
    case 'wide-panoramic':
      return 'lg:col-span-12';
    case 'medium-left':
      return 'lg:col-span-5';
    case 'medium-right':
      return 'lg:col-span-7';
    default:
      return 'lg:col-span-6';
  }
}

function getAspectClass(variant: PortfolioProject['layoutVariant'], isFiltered: boolean): string {
  if (isFiltered) {
    return 'aspect-[4/3]';
  }
  switch (variant) {
    case 'featured-tall':
      return 'aspect-[4/3] lg:aspect-[16/12]';
    case 'supporting-portrait':
      return 'aspect-[4/3] lg:aspect-[5/6]';
    case 'wide-panoramic':
      return 'aspect-[16/9] lg:aspect-[21/9]';
    case 'medium-left':
      return 'aspect-[4/3] lg:aspect-[5/4]';
    case 'medium-right':
      return 'aspect-[4/3] lg:aspect-[16/10]';
    default:
      return 'aspect-[4/3]';
  }
}

export function PortfolioGallery({
  onSelectProjectCategory,
  onTalkClick,
}: PortfolioGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioProject['filterGroup']>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((p) => p.filterGroup === activeFilter);
  }, [activeFilter]);

  const isFiltered = activeFilter !== 'All';

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-[#FFFFFF] bg-arch-grid-light text-[#151515] py-[80px] lg:py-[145px]"
    >
      <div className="w-[90%] max-w-[1440px] mx-auto">
        {/* Editorial header inspired by Reference Image 1 (oversized index counter + clean typography) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#151515]/15">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[2px] bg-[#151515]" aria-hidden="true" />
              <span className="font-display font-semibold text-xs tracking-[0.22em] text-[#777777]">
                SELECTED PROJECTS
              </span>
            </div>
            <motion.h2
              id="projects-heading"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold uppercase tracking-[-0.03em] leading-[0.95] text-[clamp(2.35rem,5.3vw,4.75rem)] text-[#151515]"
            >
              REAL SPACES.
              <br />
              REAL TRANSFORMATIONS.
            </motion.h2>
          </div>

          <div className="flex items-end justify-between lg:flex-col lg:items-end gap-3">
            <span
              className="font-display font-bold text-6xl sm:text-7xl lg:text-8xl leading-none tracking-[-0.04em] text-[#151515]/18 tabular-nums select-none"
              aria-hidden="true"
            >
              {String(visibleProjects.length).padStart(2, '0')}
            </span>
            <p className="text-xs tracking-[0.14em] text-[#777777] uppercase text-right max-w-[260px]">
              Architectural design showcase · Click any photo to inspect or request a similar build
            </p>
          </div>
        </div>

        {/* Interactive filter bar (functional segmented buttons) */}
        <div
          className="flex flex-wrap items-center gap-2 py-8"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {FILTER_TABS.map((tab) => {
            const active = activeFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 text-xs font-display font-semibold tracking-[0.1em] uppercase border transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#151515] text-[#D9E600] border-[#151515]'
                    : 'bg-[#FFFFFF] text-[#222222] border-[#151515]/18 hover:border-[#151515]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Asymmetric editorial grid (Reference Image 1 inspired: sharp rectangular photography, clean lines) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14">
          {visibleProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.72, delay: (idx % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`${getGridSpanClass(project.layoutVariant, isFiltered)} flex flex-col`}
            >
              {/* Clickable full-bleed sharp-edged image frame */}
              <div className="group relative overflow-hidden bg-[#151515] border border-[#151515]/12">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`Open full-screen view of ${project.title}`}
                  className={`block w-full ${getAspectClass(project.layoutVariant, isFiltered)} overflow-hidden relative text-left cursor-pointer`}
                >
                  <ResilientImage
                    src={project.image}
                    alt={project.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Smooth hover scrim & category reveal */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/88 via-[#151515]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-xs tracking-[0.18em] text-[#D9E600] tabular-nums">
                        {project.index}
                      </span>
                      <span className="w-9 h-9 bg-[#151515]/85 border border-white/25 text-white flex items-center justify-center">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>

                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="font-display font-semibold text-xs tracking-[0.18em] text-[#D9E600] uppercase">
                        {project.categoryLabel}
                      </span>
                      <p className="text-sm text-white/90 mt-1.5 max-w-lg line-clamp-2">
                        {project.scopeSummary}
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Unboxed editorial metadata + contextual lead-generating CTA */}
              <div className="pt-4 pb-5 border-b border-[#151515]/15 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#777777] mb-1">
                    <span className="font-display font-bold text-[#151515] tabular-nums">
                      {project.index}
                    </span>
                    <span aria-hidden="true">/</span>
                    <span className="uppercase tracking-[0.12em]">{project.categoryLabel}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#151515] tracking-[-0.015em]">
                    {project.title}
                  </h3>
                </div>

                {/* Contextual Lead-Gen Trigger -> Preselects category in quote form */}
                <button
                  type="button"
                  onClick={() => onSelectProjectCategory(project.inquiryCategory)}
                  className="group/cta inline-flex items-center gap-3 self-start sm:self-end text-left cursor-pointer"
                >
                  <span className="flex flex-col">
                    <span className="text-[11px] font-medium tracking-[0.14em] text-[#777777]">
                      {project.ctaPrompt}
                    </span>
                    <span className="font-display font-bold text-xs sm:text-sm tracking-[0.08em] text-[#151515] group-hover/cta:underline decoration-[#D9E600] decoration-2 underline-offset-4">
                      {project.ctaAction}
                    </span>
                  </span>
                  <span className="w-9 h-9 bg-[#D9E600] group-hover/cta:bg-[#151515] text-[#151515] group-hover/cta:text-[#D9E600] flex items-center justify-center transition-colors shrink-0">
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2.4} />
                  </span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Prominent Gallery Conversion Strip */}
        <div className="mt-16 lg:mt-20 bg-[#151515] text-white p-8 sm:p-10 lg:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <span className="font-display font-semibold text-xs tracking-[0.2em] text-[#D9E600] block mb-2">
              TURN INSPIRATION INTO A PLAN
            </span>
            <h3 className="font-display font-bold uppercase text-2xl sm:text-3xl lg:text-4xl tracking-[-0.02em]">
              HAVE A PROJECT IN MIND? LET&apos;S TALK.
            </h3>
          </div>
          <button
            type="button"
            onClick={onTalkClick}
            className="group inline-flex items-center gap-4 bg-[#D9E600] hover:bg-[#C8D500] text-[#151515] font-display font-bold text-xs sm:text-sm tracking-[0.09em] pl-7 pr-3 py-3.5 transition-all duration-200 whitespace-nowrap shrink-0 self-start lg:self-auto cursor-pointer"
          >
            <span>START YOUR ESTIMATE</span>
            <span className="w-8 h-8 rounded-full bg-[#151515] text-[#D9E600] flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-4 h-4" strokeWidth={2.3} />
            </span>
          </button>
        </div>
      </div>

      <PortfolioLightbox
        projects={visibleProjects}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(nextIdx) => setLightboxIndex(nextIdx)}
        onRequestSimilar={onSelectProjectCategory}
      />
    </section>
  );
}
