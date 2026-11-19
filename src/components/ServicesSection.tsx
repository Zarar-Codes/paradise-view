import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ProjectCategory, SERVICES } from '../data/siteData';
import { ServiceRow } from './ServiceRow';
import { ResilientImage } from './BrandMark';

interface ServicesSectionProps {
  onSelectCategory: (category: ProjectCategory) => void;
  onDiscussProject: () => void;
}

export function ServicesSection({
  onSelectCategory,
  onDiscussProject,
}: ServicesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pointerOffsetY, setPointerOffsetY] = useState(0);
  const activeService = SERVICES[activeIndex];

  const handleListMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rel = (e.clientY - rect.top) / Math.max(rect.height, 1) - 0.5;
    setPointerOffsetY(rel * 28);
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-[#F7F7F4] text-[#151515] py-[80px] lg:py-[140px]"
    >
      <div className="w-[90%] max-w-[1440px] mx-auto">
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 lg:pb-16 border-b border-[#151515]/15">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[2px] bg-[#151515]" aria-hidden="true" />
              <span className="font-display font-semibold text-xs tracking-[0.22em] text-[#777777]">
                WHAT WE DO
              </span>
            </div>
            <motion.h2
              id="services-heading"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold uppercase tracking-[-0.03em] leading-[0.96] text-[clamp(2.25rem,4.9vw,4.35rem)] text-[#151515]"
            >
              FROM THE FIRST IDEA
              <br />
              TO THE FINISHED SPACE.
            </motion.h2>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <p className="text-sm sm:text-base text-[#222222]/75 mb-2">
              Hover any discipline to preview the craft, or select a service to pre-fill your
              estimate inquiry.
            </p>
            <span className="font-display font-semibold text-xs tracking-[0.18em] text-[#344B38] tabular-nums">
              08 CORE LANDSCAPING DISCIPLINES
            </span>
          </div>
        </div>

        {/* Desktop interactive split: 8 editorial rows + sticky architectural preview frame */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-4"
          onMouseMove={handleListMouseMove}
          onMouseLeave={() => setPointerOffsetY(0)}
        >
          <div className="lg:col-span-8">
            {SERVICES.map((service, index) => (
              <ServiceRow
                key={service.number}
                service={service}
                isActive={activeIndex === index}
                onHoverStart={() => setActiveIndex(index)}
                onSelectCategory={onSelectCategory}
              />
            ))}
          </div>

          {/* Sticky desktop preview photograph with mask reveal & subtle pointer follow */}
          <div className="hidden lg:block lg:col-span-4 sticky top-[104px] pt-6">
            <motion.div
              animate={{ y: pointerOffsetY }}
              transition={{ type: 'spring', stiffness: 160, damping: 24 }}
              className="bg-[#151515] border border-[#151515] overflow-hidden"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#222222]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.number}
                    initial={{ clipPath: 'inset(12% 0% 0% 0%)', opacity: 0.4, scale: 1.06 }}
                    animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.25 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <ResilientImage
                      src={activeService.image}
                      alt={activeService.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute top-4 left-4 bg-[#151515] text-[#D9E600] font-display font-bold text-xs tracking-[0.16em] px-3 py-1.5 tabular-nums">
                  {activeService.number} / 08
                </div>
              </div>

              <div className="p-6 text-white flex items-center justify-between gap-4">
                <div>
                  <p className="font-display font-bold text-sm tracking-[0.06em] text-white">
                    {activeService.title}
                  </p>
                  <p className="text-xs text-white/65 mt-1">
                    Click row to inquire about this service
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectCategory(activeService.inquiryCategory)}
                  aria-label={`Inquire about ${activeService.title}`}
                  className="w-10 h-10 bg-[#D9E600] hover:bg-[#C8D500] text-[#151515] flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105 cursor-pointer"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 pt-8 border-t border-[#151515]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="text-base text-[#222222]/80 max-w-lg">
            Combining hardscaping, stonework, carpentry, and planting into a single build? Let&apos;s
            map out your scope together.
          </p>
          <button
            type="button"
            onClick={onDiscussProject}
            className="group inline-flex items-center gap-4 bg-[#151515] hover:bg-[#222222] text-white font-display font-bold text-xs sm:text-sm tracking-[0.09em] pl-7 pr-3 py-3.5 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
          >
            <span>DISCUSS YOUR PROJECT</span>
            <span className="w-8 h-8 rounded-full bg-[#D9E600] text-[#151515] flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-4 h-4" strokeWidth={2.3} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
