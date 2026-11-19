import React from 'react';
import { motion } from 'motion/react';
import { SITE_IMAGES, WHY_CHOOSE_ITEMS } from '../data/siteData';
import { ResilientImage, StarburstEmblem } from './BrandMark';

export function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-heading"
      className="bg-[#151515] bg-arch-grid-dark text-white py-[80px] lg:py-[140px] border-t border-white/10"
    >
      <div className="w-[90%] max-w-[1440px] mx-auto">
        {/* Top asymmetric header with signature electric-lime starburst emblem */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 lg:pb-16 border-b border-white/12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[2px] bg-[#D9E600]" aria-hidden="true" />
              <span className="font-display font-semibold text-xs tracking-[0.22em] text-[#D9E600]">
                WHY PARADISE VIEWS
              </span>
            </div>
            <motion.h2
              id="why-heading"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold uppercase tracking-[-0.03em] leading-[0.95] text-[clamp(2.35rem,5.2vw,4.6rem)]"
            >
              THE DETAILS MAKE
              <br />
              <span className="text-[#D9E600]">THE DIFFERENCE.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, rotate: -25 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block shrink-0"
          >
            <StarburstEmblem className="w-24 h-24 lg:w-28 lg:h-28" color="#D9E600" />
          </motion.div>
        </div>

        {/* 12-column editorial body: 4 numbered pillars left + tall architectural stonework photo right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 pt-12 lg:pt-16 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between divide-y divide-white/12">
            {WHY_CHOOSE_ITEMS.map((item, idx) => (
              <motion.article
                key={item.number}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group py-8 first:pt-0 last:pb-0 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-start"
              >
                <div className="sm:col-span-3 flex items-center gap-3">
                  <span className="font-display font-bold text-3xl lg:text-4xl text-[#D9E600] tabular-nums tracking-tight">
                    {item.number}
                  </span>
                  <span
                    className="h-[1px] w-10 bg-[#D9E600]/45 transition-all duration-300 group-hover:w-14 group-hover:bg-[#D9E600]"
                    aria-hidden="true"
                  />
                </div>
                <div className="sm:col-span-9">
                  <h3 className="font-display font-bold text-xl sm:text-2xl tracking-[0.02em] text-white mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/72 leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="relative flex-1 min-h-[380px] lg:min-h-full overflow-hidden border border-white/12 bg-[#222222]">
              <ResilientImage
                src={SITE_IMAGES.retainingSteps}
                alt="Hand-laid natural armour stone retaining wall and floating limestone garden steps with low-voltage landscape lighting"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#151515]/95 via-[#151515]/60 to-transparent">
                <p className="font-display font-semibold text-xs tracking-[0.18em] text-[#D9E600] mb-1">
                  ARCHITECTURAL MASONRY &amp; GRADING
                </p>
                <p className="text-sm text-white/85">
                  Precision base excavation, drainage engineering, and natural stone fitment built
                  for four-season Ontario durability.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
