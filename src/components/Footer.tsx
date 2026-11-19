import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUp, ArrowUpRight, Phone } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/siteData';
import { BrandMark } from './BrandMark';
import { NAV_ITEMS } from './Navbar';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#151515] bg-arch-grid-dark text-white pt-20 lg:pt-28 pb-12 border-t border-white/10">
      <div className="w-[90%] max-w-[1440px] mx-auto">
        {/* Large closing architectural statement + Back to Top */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold uppercase tracking-[-0.035em] leading-[0.94] text-[clamp(2.35rem,5.5vw,5rem)] max-w-4xl"
          >
            LET&apos;S MAKE YOUR
            <br />
            <span className="text-[#D9E600]">OUTDOORS EXTRAORDINARY.</span>
          </motion.h2>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group inline-flex items-center gap-3 border border-white/25 hover:border-[#D9E600] hover:bg-[#D9E600] text-white hover:text-[#151515] font-display font-bold text-xs tracking-[0.14em] px-5 py-3.5 transition-colors self-start lg:self-end whitespace-nowrap cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Animated electric lime divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-[2px] w-full bg-[#D9E600] origin-left mb-14"
        />

        {/* Footer columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/12">
          {/* Brand column */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 text-white">
              <BrandMark className="w-7 h-7" />
              <span className="font-display font-bold text-lg tracking-[0.06em]">
                PARADISE VIEWS
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Architectural landscape design and outdoor construction across Etobicoke and the
              Greater Toronto Area.
            </p>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center gap-2.5 font-display font-bold text-xl text-[#D9E600] hover:text-white transition-colors tabular-nums"
            >
              <Phone className="w-4 h-4" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-display font-semibold text-xs tracking-[0.2em] text-white/50 uppercase mb-4">
              NAVIGATION
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-white/80 hover:text-[#D9E600] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div className="lg:col-span-3">
            <h3 className="font-display font-semibold text-xs tracking-[0.2em] text-white/50 uppercase mb-4">
              SERVICES
            </h3>
            <ul className="space-y-2 text-sm text-white/75">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.number}>
                  <a href="#services" className="hover:text-[#D9E600] transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas & Social */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="font-display font-semibold text-xs tracking-[0.2em] text-white/50 uppercase mb-3">
                SERVICE AREAS
              </h3>
              <p className="text-sm text-white/72 leading-relaxed">
                {BUSINESS_INFO.serviceAreas.join(' · ')}
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold text-xs tracking-[0.2em] text-white/50 uppercase mb-3">
                SOCIAL CHANNELS
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <a
                  href={BUSINESS_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white hover:text-[#D9E600] transition-colors"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D9E600]" />
                </a>
                <a
                  href={BUSINESS_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white hover:text-[#D9E600] transition-colors"
                >
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D9E600]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Paradise Views Landscaping. {BUSINESS_INFO.location}.</p>
          <p>
            Redesign concept created by{' '}
            <a
              href="https://inodo.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D9E600] hover:underline"
            >
              InoDo
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
