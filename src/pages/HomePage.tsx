import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProjectCategory } from '../data/siteData';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { IntroductionSection } from '../components/IntroductionSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ServicesSection } from '../components/ServicesSection';
import { Backyard3DStudio } from '../components/Backyard3DStudio';
import { PortfolioGallery } from '../components/PortfolioGallery';
import { VisualStatement } from '../components/VisualStatement';
import { ProcessSection } from '../components/ProcessSection';
import { TrustSection } from '../components/TrustSection';
import { CTASection } from '../components/CTASection';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';

export function HomePage() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>(
    'Backyard Transformation',
  );
  const [selectionToken, setSelectionToken] = useState(0);

  const scrollToElement = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSelectProjectForInquiry = useCallback(
    (category: ProjectCategory) => {
      setSelectedCategory(category);
      setSelectionToken((prev) => prev + 1);
      scrollToElement('contact');
    },
    [scrollToElement],
  );

  useEffect(() => {
    if (location.hash === '#contact') {
      window.setTimeout(() => scrollToElement('contact'), 100);
    } else if (location.hash === '#services') {
      window.setTimeout(() => scrollToElement('services'), 100);
    } else if (location.hash === '#projects') {
      window.setTimeout(() => scrollToElement('projects'), 100);
    }
  }, [location.hash, scrollToElement]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#151515]">
      <Navbar onEstimateClick={() => scrollToElement('contact')} />

      <main>
        {/* Section 01 — Cinematic Hero */}
        <HeroSection
          onExploreProjects={() => scrollToElement('projects')}
          onRequestEstimate={() => scrollToElement('contact')}
        />

        {/* Section 02 — Brand Introduction */}
        <IntroductionSection />

        {/* Section 03 — Why Choose Paradise Views? */}
        <WhyChooseUs />

        {/* Section 04 — Services */}
        <ServicesSection
          onSelectCategory={handleSelectProjectForInquiry}
          onDiscussProject={() => scrollToElement('contact')}
        />

        {/* Interactive Three.js 3D Backyard Architecture Studio */}
        <Backyard3DStudio onRequestLayout={handleSelectProjectForInquiry} />

        {/* Section 05 — Featured Projects / Lead-Generating Gallery */}
        <PortfolioGallery
          onSelectProjectCategory={handleSelectProjectForInquiry}
          onTalkClick={() => scrollToElement('contact')}
        />

        {/* Section 06 — Visual Statement */}
        <VisualStatement />

        {/* Section 07 — How It Works */}
        <ProcessSection />

        {/* Section 08 — Trust & Credibility */}
        <TrustSection />

        {/* Section 09 — Conversion Section */}
        <CTASection onEstimateClick={() => scrollToElement('contact')} />

        {/* Section 10 — Short Contact Form */}
        <ContactForm
          selectedCategory={selectedCategory}
          categorySelectionToken={selectionToken}
          onCategoryChange={setSelectedCategory}
        />
      </main>

      {/* Section 11 — Footer */}
      <Footer />
    </div>
  );
}
