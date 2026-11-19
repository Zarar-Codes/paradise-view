import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/siteData';
import { StarburstEmblem } from './BrandMark';

interface CTASectionProps {
  onEstimateClick: () => void;
}

export function CTASection({ onEstimateClick }: CTASectionProps) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-[#D9E600] text-[#151515] py-[80px] lg:py-[130px]"
    >
      <div className="w-[90%] max-w-[1440px] mx-auto relative z-10">
        {/* Animated charcoal architectural divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="h-[2px] w-full bg-[#151515]/25 origin-left mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-9">
            <span className="font-display font-bold text-xs tracking-[0.22em] text-[#151515]/75 block mb-5">
              START THE CONVERSATION
            </span>
            <motion.h2
              id="cta-heading"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold uppercase tracking-[-0.035em] leading-[0.94] text-[clamp(2.5rem,6vw,5.4rem)] text-[#151515] mb-6"
            >
              READY TO TRANSFORM
              <br />
              YOUR OUTDOOR SPACE?
            </motion.h2>
            <p className="text-lg sm:text-xl text-[#151515]/82 max-w-xl mb-10">
              Tell us what you have in mind. Let&apos;s start with a conversation.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onEstimateClick}
                className="group inline-flex items-center gap-4 bg-[#151515] hover:bg-[#222222] text-white font-display font-bold text-xs sm:text-sm tracking-[0.09em] pl-7 pr-3 py-4 transition-all duration-200 active:scale-[0.98] whitespace-nowrap cursor-pointer"
              >
                <span>GET YOUR FREE ESTIMATE</span>
                <span className="w-8 h-8 rounded-full bg-[#D9E600] text-[#151515] flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2.4} />
                </span>
              </button>

              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center gap-3 border-2 border-[#151515] hover:bg-[#151515] text-[#151515] hover:text-[#D9E600] font-display font-bold text-xs sm:text-sm tracking-[0.09em] px-6 py-4 transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                <span>CALL PARADISE VIEWS</span>
              </a>
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-3 justify-end items-end">
            <motion.div
              initial={{ rotate: -20, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <StarburstEmblem className="w-32 h-32" color="#151515" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
