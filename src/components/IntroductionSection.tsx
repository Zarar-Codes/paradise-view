import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SITE_IMAGES } from '../data/siteData';
import { ResilientImage } from './BrandMark';

export function IntroductionSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="introduction"
      aria-labelledby="intro-heading"
      className="bg-[#FFFFFF] text-[#151515] py-[75px] lg:py-[136px]"
    >
      <div className="w-[90%] max-w-[1440px] mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="flex items-center gap-3 mb-7"
        >
          <span className="w-8 h-[2px] bg-[#D9E600]" aria-hidden="true" />
          <span className="font-display font-semibold text-xs tracking-[0.2em] text-[#777777]">
            THE PARADISE VIEWS EXPERIENCE
          </span>
        </motion.div>

        {/* Asymmetric 12-column editorial heading + supporting copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <h2
              id="intro-heading"
              className="font-display font-bold uppercase tracking-[-0.03em] leading-[0.98] text-[clamp(2.25rem,4.9vw,4.35rem)] text-[#151515]"
            >
              YOUR BACKYARD.
              <br />
              A WHOLE NEW POSSIBILITY.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:pb-2"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="h-[3px] w-24 bg-[#D9E600] origin-left mb-6"
            />
            <p className="text-base sm:text-lg text-[#222222]/85 leading-relaxed max-w-md">
              From thoughtfully designed patios to complete outdoor transformations, create a space
              that feels like a natural extension of your home.
            </p>
          </motion.div>
        </div>

        {/* Large architectural landscaping photograph with smooth mask reveal */}
        <motion.figure
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { clipPath: 'inset(10% 0% 10% 0%)', opacity: 0.35 }
          }
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden bg-[#E7E7E3]"
        >
          <div className="aspect-[16/9] lg:aspect-[21/10] w-full overflow-hidden">
            <ResilientImage
              src={SITE_IMAGES.brandIntro}
              alt="Bespoke architectural backyard stone patio with sunken fire pit, built-in wood benches, limestone steps, and layered perennial beds"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
          <figcaption className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 bg-[#FFFFFF] border-t border-[#E7E7E3] text-xs tracking-[0.12em] text-[#777777]">
            <span className="font-display font-semibold text-[#151515]">
              OUTDOOR ARCHITECTURE · HARDSCAPING · PLANTING
            </span>
            <span>ETOBICOKE &amp; GREATER TORONTO AREA · DESIGN CONCEPT</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
