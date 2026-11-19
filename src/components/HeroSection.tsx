import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SITE_IMAGES } from '../data/siteData';
import { ResilientImage } from './BrandMark';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onRequestEstimate: () => void;
}

export function HeroSection({ onExploreProjects, onRequestEstimate }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '18%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.08]);

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Paradise Views Landscaping Hero"
      className="relative min-h-screen w-full overflow-hidden bg-[#151515] text-white flex flex-col justify-between pt-[72px]"
    >
      {/* Background photograph with clip-path mask entrance & subtle parallax */}
      <motion.div
        initial={
          prefersReducedMotion
            ? { opacity: 1 }
            : { clipPath: 'inset(6% 4% 6% 4%)', opacity: 0.4 }
        }
        animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <ResilientImage
          src={SITE_IMAGES.hero}
          alt="Luxury contemporary backyard sanctuary with interlocking limestone patio, illuminated cedar pergola, retaining wall, and pool at twilight"
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
        />
        {/* Measured multi-layer architectural contrast scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#151515]/92 via-[#151515]/48 to-[#151515]/58"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#151515]/82 via-[#151515]/32 to-transparent"
        />
      </motion.div>

      {/* Main editorial focal composition */}
      <div className="relative z-10 w-[90%] max-w-[1440px] mx-auto my-auto py-16 lg:py-24">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-10 h-[2px] bg-[#D9E600]" aria-hidden="true" />
            <span className="font-display font-semibold text-xs sm:text-sm tracking-[0.22em] text-[#D9E600]">
              LANDSCAPE DESIGN &amp; BUILD
            </span>
          </motion.div>

          {/* Word-by-word massive Space Grotesk architectural headline */}
          <h1 className="font-display font-bold uppercase tracking-[-0.035em] leading-[0.94] text-[clamp(3.15rem,8.5vw,7.25rem)] mb-7">
            <span className="block overflow-hidden">
              <motion.span
                className="block text-white"
                initial={prefersReducedMotion ? { y: 0 } : { y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.78, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                OUTDOORS.
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block text-[#D9E600]"
                initial={prefersReducedMotion ? { y: 0, opacity: 1 } : { y: '105%', opacity: 0.2 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              >
                REIMAGINED.
              </motion.span>
            </span>
          </h1>

          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 font-normal leading-relaxed max-w-xl mb-10"
          >
            Thoughtfully designed outdoor spaces. Beautifully built for the way you live.
          </motion.p>

          {/* Staggered CTAs inspired by Reference Image 4 */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={onExploreProjects}
              className="group inline-flex items-center gap-4 bg-[#D9E600] hover:bg-[#C8D500] text-[#151515] font-display font-bold text-xs sm:text-sm tracking-[0.09em] pl-7 pr-3 py-3.5 transition-all duration-200 active:scale-[0.98] whitespace-nowrap cursor-pointer"
            >
              <span>EXPLORE OUR PROJECTS</span>
              <span className="w-8 h-8 rounded-full bg-[#151515] text-[#D9E600] flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.3} />
              </span>
            </button>

            <button
              type="button"
              onClick={onRequestEstimate}
              className="group inline-flex items-center gap-4 bg-[#151515]/70 hover:bg-[#151515] text-white border border-white/35 hover:border-[#D9E600] font-display font-bold text-xs sm:text-sm tracking-[0.09em] pl-7 pr-3 py-3.5 transition-all duration-200 active:scale-[0.98] whitespace-nowrap cursor-pointer"
            >
              <span>GET A FREE ESTIMATE</span>
              <span className="w-8 h-8 rounded-full bg-white text-[#151515] group-hover:bg-[#D9E600] flex items-center justify-center transition-colors duration-200">
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.3} />
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom editorial bar: scroll indicator left, Paradise Views label right */}
      <div className="relative z-10 w-[90%] max-w-[1440px] mx-auto pb-8 pt-4 border-t border-white/15 flex items-center justify-between gap-4">
        <a
          href="#introduction"
          className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.16em] text-white/80 hover:text-[#D9E600] transition-colors"
        >
          <motion.span
            animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-7 h-7 border border-white/30 flex items-center justify-center"
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#D9E600]" />
          </motion.span>
          <span>SCROLL TO DISCOVER</span>
        </a>

        <span className="font-display font-semibold text-xs tracking-[0.2em] text-white/75 text-right">
          PARADISE VIEWS LANDSCAPING
        </span>
      </div>
    </section>
  );
}
