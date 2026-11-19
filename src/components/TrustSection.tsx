import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { BUSINESS_INFO, SITE_IMAGES } from '../data/siteData';
import { ResilientImage } from './BrandMark';

const BRAND_STANDARDS = [
  {
    index: '01',
    title: 'LOCAL GTA ROOTEDNESS',
    body: 'Based in Etobicoke and serving homeowners across Toronto, Mississauga, Brampton, Woodbridge, Richmond Hill, Bolton, Caledon, and Kleinburg.',
  },
  {
    index: '02',
    title: 'INTEGRATED HARD & SOFTSCAPING',
    body: 'Stone masonry, retaining walls, timber carpentry, swimming pool surrounds, artificial turf, and planting beds planned as one architectural whole.',
  },
  {
    index: '03',
    title: 'TRANSPARENT REAL-WORK SHOWCASE',
    body: 'Explore ongoing outdoor transformations and completed job-site photography directly on Paradise Views Landscaping’s official Instagram and Facebook channels.',
  },
] as const;

export function TrustSection() {
  return (
    <section
      id="credibility"
      aria-labelledby="trust-heading"
      className="bg-[#222222] text-white py-[80px] lg:py-[140px] border-t border-white/10"
    >
      <div className="w-[90%] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left editorial photography & service region anchor */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between gap-6"
          >
            <div className="relative overflow-hidden aspect-[4/3] lg:flex-1 bg-[#151515] border border-white/12">
              <ResilientImage
                src={SITE_IMAGES.deckPergola}
                alt="Custom multi-level western red cedar deck, dark timber architectural pergola, and integrated LED step illumination"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-[#151515] border border-white/12 p-6">
              <div className="flex items-center gap-2 text-xs font-display font-semibold tracking-[0.18em] text-[#D9E600] mb-3">
                <MapPin className="w-4 h-4" />
                <span>SERVICE FOOTPRINT · ONTARIO</span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                {BUSINESS_INFO.serviceAreas.join(' · ')}
              </p>
            </div>
          </motion.div>

          {/* Right editorial standards & verified channels */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[2px] bg-[#D9E600]" aria-hidden="true" />
                <span className="font-display font-semibold text-xs tracking-[0.22em] text-[#D9E600]">
                  CRAFT &amp; REGIONAL PRESENCE
                </span>
              </div>

              <motion.h2
                id="trust-heading"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold uppercase tracking-[-0.03em] leading-[0.96] text-[clamp(2.25rem,4.6vw,4rem)] mb-10"
              >
                BUILT TO STAND UP TO
                <br />
                <span className="text-[#D9E600]">ONTARIO SEASONS.</span>
              </motion.h2>

              <div className="divide-y divide-white/12 border-y border-white/12">
                {BRAND_STANDARDS.map((item) => (
                  <div key={item.index} className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <span className="sm:col-span-2 font-display font-bold text-lg text-[#D9E600] tabular-nums">
                      {item.index}
                    </span>
                    <div className="sm:col-span-10">
                      <h3 className="font-display font-bold text-base sm:text-lg tracking-[0.04em] text-white mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-[15px] text-white/75 leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified official social channels */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={BUSINESS_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#151515] hover:bg-[#D9E600] text-white hover:text-[#151515] border border-white/20 hover:border-[#D9E600] font-display font-bold text-xs tracking-[0.12em] px-5 py-3.5 transition-colors"
              >
                <span>FOLLOW @PARADISEVIEWS12</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-transparent hover:bg-white text-white hover:text-[#151515] border border-white/25 font-display font-bold text-xs tracking-[0.12em] px-5 py-3.5 transition-colors"
              >
                <span>VIEW ON FACEBOOK</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
