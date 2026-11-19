import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { SITE_IMAGES } from '../data/siteData';
import { ResilientImage } from './BrandMark';

export function VisualStatement() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['-8%', '8%'],
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1.08, 1.0],
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Outdoor Living Statement"
      className="relative w-full min-h-[70vh] lg:min-h-[82vh] overflow-hidden bg-[#151515] text-white flex items-center"
    >
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <ResilientImage
          src={SITE_IMAGES.outdoorKitchen}
          alt="Twilight architectural stone outdoor kitchen, dining terrace, built-in seating bench, and tranquil water feature"
          className="w-full h-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#151515]/88 via-[#151515]/52 to-[#151515]/62"
        />
      </motion.div>

      <div className="relative z-10 w-[90%] max-w-[1440px] mx-auto py-24 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-3 mb-7">
            <span className="w-10 h-[2px] bg-[#D9E600]" aria-hidden="true" />
            <span className="font-display font-semibold text-xs tracking-[0.24em] text-[#D9E600]">
              ARCHITECTURAL OUTDOOR LIVING
            </span>
          </div>

          <h2 className="font-display font-bold uppercase tracking-[-0.035em] leading-[0.95] text-[clamp(2.5rem,6.5vw,5.75rem)]">
            MORE THAN A BACKYARD.
            <br />
            YOUR OWN <span className="text-[#D9E600]">OUTDOOR ESCAPE.</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
