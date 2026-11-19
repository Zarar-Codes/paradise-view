import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { SITE_IMAGES } from '../data/siteData';
import { ResilientImage, StarburstEmblem } from './BrandMark';

export type InodoVariant = 'why-choose-us' | 'gallery' | 'services' | 'contact';

interface InodoPromotionalPageProps {
  variant: InodoVariant;
}

const VARIANT_MEDIA: Record<InodoVariant, { image: string; alt: string }> = {
  'why-choose-us': {
    image: SITE_IMAGES.retainingSteps,
    alt: 'Architectural natural stone retaining wall and terraced garden steps',
  },
  gallery: {
    image: SITE_IMAGES.outdoorKitchen,
    alt: 'Twilight stone outdoor kitchen and dining patio',
  },
  services: {
    image: SITE_IMAGES.deckPergola,
    alt: 'Custom cedar wood deck and architectural dark timber pergola',
  },
  contact: {
    image: SITE_IMAGES.poolTerrace,
    alt: 'Modern twilight swimming pool and natural stone terrace',
  },
};

export function InodoPromotionalPage({ variant }: InodoPromotionalPageProps) {
  const prefersReducedMotion = useReducedMotion();
  const media = VARIANT_MEDIA[variant];

  const primaryCta = (
    <a
      href="https://inodo.net"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-4 bg-[#D9E600] hover:bg-[#C8D500] text-[#151515] font-display font-bold text-xs sm:text-sm tracking-[0.1em] pl-7 pr-3 py-4 transition-all duration-200 active:scale-[0.98] whitespace-nowrap"
    >
      <span>HIRE INODO TO BUILD THIS</span>
      <span className="w-8 h-8 rounded-full bg-[#151515] text-[#D9E600] flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <ArrowUpRight className="w-4 h-4" strokeWidth={2.4} />
      </span>
    </a>
  );

  const secondaryCta = (
    <Link
      to="/"
      className="group inline-flex items-center gap-3 border border-white/35 hover:border-[#D9E600] bg-[#151515]/70 hover:bg-[#151515] text-white font-display font-bold text-xs sm:text-sm tracking-[0.1em] px-6 py-4 transition-colors whitespace-nowrap"
    >
      <ArrowLeft className="w-4 h-4 text-[#D9E600] transition-transform duration-200 group-hover:-translate-x-0.5" />
      <span>BACK TO HOMEPAGE</span>
    </Link>
  );

  // Composition 3: /services — Bold left-aligned typography with animated right image mask reveal
  if (variant === 'services') {
    return (
      <main className="relative min-h-screen w-full overflow-hidden bg-[#151515] bg-arch-grid-dark text-white pt-[72px] flex flex-col justify-between">
        <div className="w-[90%] max-w-[1440px] mx-auto my-auto py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="flex items-center gap-3"
            >
              <span className="w-10 h-[2px] bg-[#D9E600]" aria-hidden="true" />
              <span className="font-display font-semibold text-xs tracking-[0.24em] text-[#D9E600]">
                A WEBSITE CONCEPT BY INODO
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold uppercase tracking-[-0.035em] leading-[0.92] text-[clamp(3rem,7.2vw,6.25rem)]"
            >
              LIKE WHAT
              <br />
              <span className="text-[#D9E600]">YOU SEE?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="text-lg sm:text-xl text-white/85 max-w-lg leading-relaxed"
            >
              Let&apos;s build something extraordinary for your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.32 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {primaryCta}
              {secondaryCta}
            </motion.div>
          </div>

          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0.5 }
            }
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden border border-white/15 bg-[#222222]"
          >
            <ResilientImage
              src={media.image}
              alt={media.alt}
              loading="eager"
              className="w-full h-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-[#151515]/55 via-transparent to-transparent"
            />
          </motion.div>
        </div>

        <div className="w-[90%] max-w-[1440px] mx-auto pb-8 pt-4 border-t border-white/12 flex items-center justify-between text-xs text-white/60 tracking-[0.12em]">
          <span>Concept designed by InoDo.</span>
          <StarburstEmblem className="w-6 h-6" color="#D9E600" />
        </div>
      </main>
    );
  }

  // Composition 2: /gallery — Asymmetric typography over full-screen landscape
  if (variant === 'gallery') {
    return (
      <main className="relative min-h-screen w-full overflow-hidden bg-[#151515] text-white pt-[72px] flex flex-col justify-between">
        <motion.div
          initial={prefersReducedMotion ? { scale: 1 } : { scale: 1.08, opacity: 0.45 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <ResilientImage
            src={media.image}
            alt={media.alt}
            loading="eager"
            className="w-full h-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#151515]/95 via-[#151515]/68 to-[#151515]/55"
          />
        </motion.div>

        <div className="relative z-10 w-[90%] max-w-[1440px] mx-auto my-auto py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="font-display font-semibold text-xs tracking-[0.24em] text-[#D9E600] mb-6"
            >
              A WEBSITE CONCEPT BY INODO
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold uppercase tracking-[-0.035em] leading-[0.9] text-[clamp(3.2rem,8.5vw,7.4rem)]"
            >
              LIKE WHAT
              <br />
              <span className="text-[#D9E600]">YOU SEE?</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-4 space-y-6 lg:pb-3"
          >
            <div className="h-[2px] w-16 bg-[#D9E600]" aria-hidden="true" />
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
              Let&apos;s build something extraordinary for your business.
            </p>
            <div className="flex flex-col sm:flex-row lg:flex-col items-start gap-3">
              {primaryCta}
              {secondaryCta}
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 w-[90%] max-w-[1440px] mx-auto pb-8 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/65 tracking-[0.12em]">
          <span>Concept designed by InoDo.</span>
          <span className="text-[#D9E600] font-display font-semibold">INODO.NET</span>
        </div>
      </main>
    );
  }

  // Composition 1 (/why-choose-us) & Composition 4 (/contact): Centered monumental & CTA-forward variants
  const isContactVariant = variant === 'contact';

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#151515] text-white pt-[72px] flex flex-col justify-between">
      <motion.div
        initial={
          prefersReducedMotion
            ? { opacity: 1 }
            : { clipPath: 'inset(6% 6% 6% 6%)', opacity: 0.4 }
        }
        animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <ResilientImage
          src={media.image}
          alt={media.alt}
          loading="eager"
          className="w-full h-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#151515]/78"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-arch-grid-dark opacity-70"
        />
      </motion.div>

      <div className="relative z-10 w-[90%] max-w-[1100px] mx-auto my-auto py-16 text-center flex flex-col items-center">
        {!isContactVariant && (
          <motion.div
            initial={{ opacity: 0, rotate: -30 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <StarburstEmblem className="w-16 h-16 sm:w-20 sm:h-20" color="#D9E600" />
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="font-display font-semibold text-xs sm:text-sm tracking-[0.24em] text-[#D9E600] mb-6"
        >
          A WEBSITE CONCEPT BY INODO
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`font-display font-bold uppercase tracking-[-0.035em] leading-[0.92] mb-6 ${
            isContactVariant
              ? 'text-[clamp(2.85rem,7.2vw,6.4rem)]'
              : 'text-[clamp(3.2rem,9vw,8rem)]'
          }`}
        >
          LIKE WHAT <span className="text-[#D9E600]">YOU SEE?</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22 }}
          className="text-lg sm:text-xl md:text-2xl text-white/88 max-w-xl leading-relaxed mb-10"
        >
          Let&apos;s build something extraordinary for your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32 }}
          className={`flex flex-wrap items-center justify-center gap-4 ${
            isContactVariant ? 'p-3 border border-[#D9E600]/45 bg-[#151515]/75' : ''
          }`}
        >
          {primaryCta}
          {secondaryCta}
        </motion.div>
      </div>

      <div className="relative z-10 w-[90%] max-w-[1440px] mx-auto pb-8 pt-4 border-t border-white/15 flex items-center justify-center text-xs text-white/65 tracking-[0.14em]">
        <span>Concept designed by InoDo.</span>
      </div>
    </main>
  );
}
