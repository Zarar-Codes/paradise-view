import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ProjectCategory, ServiceItem } from '../data/siteData';
import { ResilientImage } from './BrandMark';

interface ServiceRowProps {
  service: ServiceItem;
  isActive: boolean;
  onHoverStart: () => void;
  onSelectCategory: (category: ProjectCategory) => void;
}

export function ServiceRow({
  service,
  isActive,
  onHoverStart,
  onSelectCategory,
}: ServiceRowProps) {
  return (
    <motion.div
      onMouseEnter={onHoverStart}
      onFocus={onHoverStart}
      className={`group relative border-b border-[#151515]/14 transition-colors duration-200 ${
        isActive ? 'bg-[#FFFFFF]' : 'bg-transparent hover:bg-[#FFFFFF]/80'
      }`}
    >
      <button
        type="button"
        onClick={() => onSelectCategory(service.inquiryCategory)}
        className="w-full text-left py-7 lg:py-8 px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center cursor-pointer"
      >
        {/* Index number */}
        <div className="lg:col-span-1 flex items-center justify-between lg:justify-start">
          <span
            className={`font-display font-bold text-lg sm:text-xl tabular-nums transition-colors duration-200 ${
              isActive ? 'text-[#151515] bg-[#D9E600] px-2 py-0.5' : 'text-[#777777] group-hover:text-[#151515]'
            }`}
          >
            {service.number}
          </span>
          <span
            className="lg:hidden w-9 h-9 border border-[#151515]/20 flex items-center justify-center text-[#151515] group-hover:bg-[#D9E600] group-hover:border-[#D9E600] transition-colors"
            aria-hidden="true"
          >
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

        {/* Service title */}
        <div className="lg:col-span-5">
          <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-[1.65rem] tracking-[-0.02em] text-[#151515] transition-transform duration-200 lg:group-hover:translate-x-2">
            {service.title}
          </h3>
        </div>

        {/* Concise description */}
        <div className="lg:col-span-5">
          <p className="text-sm sm:text-[15px] text-[#222222]/75 leading-relaxed max-w-md">
            {service.shortDescription}
          </p>
        </div>

        {/* Desktop lime arrow indicator */}
        <div className="hidden lg:flex lg:col-span-1 justify-end">
          <span
            className={`w-11 h-11 flex items-center justify-center border transition-all duration-200 ${
              isActive
                ? 'bg-[#D9E600] border-[#151515] text-[#151515] translate-x-1 -translate-y-0.5'
                : 'border-[#151515]/20 text-[#151515] group-hover:bg-[#D9E600] group-hover:border-[#151515]'
            }`}
            aria-hidden="true"
          >
            <ArrowUpRight className="w-5 h-5" strokeWidth={2.2} />
          </span>
        </div>

        {/* Direct mobile preview photograph (no hover needed on mobile/tablet) */}
        <div className="lg:hidden mt-3 overflow-hidden aspect-[16/9] bg-[#E7E7E3] border border-[#151515]/10">
          <ResilientImage
            src={service.image}
            alt={service.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      </button>
    </motion.div>
  );
}
