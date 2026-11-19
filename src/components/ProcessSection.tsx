import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { PROCESS_STEPS } from '../data/siteData';

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 55%'],
  });

  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0.12, 1]);

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
      className="bg-[#E7E7E3] text-[#151515] py-[80px] lg:py-[140px]"
    >
      <div className="w-[90%] max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 lg:mb-20">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[2px] bg-[#151515]" aria-hidden="true" />
              <span className="font-display font-semibold text-xs tracking-[0.22em] text-[#777777]">
                THE PROCESS
              </span>
            </div>
            <motion.h2
              id="process-heading"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold uppercase tracking-[-0.03em] leading-[0.95] text-[clamp(2.35rem,5vw,4.5rem)]"
            >
              FROM VISION TO REALITY.
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <p className="text-sm sm:text-base text-[#222222]/75 max-w-md lg:ml-auto">
              A straightforward conversation from your first idea to a finished outdoor space—no
              complicated intake forms upfront.
            </p>
          </div>
        </div>

        {/* Animated horizontal connecting progress track (desktop) */}
        <div className="hidden lg:block relative h-[3px] bg-[#151515]/15 mb-12 overflow-hidden">
          <motion.div
            style={{ scaleX: prefersReducedMotion ? 1 : lineScaleX }}
            className="absolute inset-0 bg-[#151515] origin-left"
          />
        </div>

        {/* 4 Structured editorial process stages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {PROCESS_STEPS.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative pt-6 border-t border-[#151515]/20 lg:border-t-0 lg:pt-0 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display font-bold text-5xl lg:text-6xl leading-none tracking-[-0.04em] text-[#151515] tabular-nums">
                    {step.number}
                  </span>
                  <span className="w-8 h-[3px] bg-[#D9E600]" aria-hidden="true" />
                </div>

                <h3 className="font-display font-bold text-xl tracking-[-0.01em] text-[#151515] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-[15px] text-[#222222]/78 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-14 pt-6 border-t border-[#151515]/12 text-xs text-[#777777] tracking-[0.04em]">
          Proposed inquiry and consultation flow designed to simplify getting started with your
          outdoor project.
        </p>
      </div>
    </section>
  );
}
