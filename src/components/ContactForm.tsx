import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Info, MapPin, Phone } from 'lucide-react';
import {
  BUSINESS_INFO,
  PROJECT_CATEGORIES,
  ProjectCategory,
} from '../data/siteData';

interface ContactFormProps {
  selectedCategory: ProjectCategory;
  categorySelectionToken: number;
  onCategoryChange: (category: ProjectCategory) => void;
}

interface FormErrors {
  name?: string;
  contact?: string;
}

interface InquiryDraft {
  name: string;
  contact: string;
  projectType: ProjectCategory;
  notes: string;
  timestamp: string;
}

function isValidEmailOrPhone(value: string): boolean {
  const trimmed = value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const digits = trimmed.replace(/\D/g, '');
  return emailRegex.test(trimmed) || digits.length >= 10;
}

export function ContactForm({
  selectedCategory,
  categorySelectionToken,
  onCategoryChange,
}: ContactFormProps) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [highlightCategory, setHighlightCategory] = useState(false);
  const [submittedDraft, setSubmittedDraft] = useState<InquiryDraft | null>(null);

  useEffect(() => {
    if (categorySelectionToken === 0) return;
    setSubmittedDraft(null);
    setHighlightCategory(true);
    const timer = window.setTimeout(() => setHighlightCategory(false), 1800);
    return () => window.clearTimeout(timer);
  }, [categorySelectionToken, selectedCategory]);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (name.trim().length < 2) {
      next.name = 'Please enter your name.';
    }
    if (!isValidEmailOrPhone(contact)) {
      next.contact = 'Enter a valid email address or 10-digit phone number.';
    }
    return next;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmittedDraft({
        name: name.trim(),
        contact: contact.trim(),
        projectType: selectedCategory,
        notes: notes.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }, 450);
  };

  const handleResetForm = () => {
    setSubmittedDraft(null);
    setName('');
    setContact('');
    setNotes('');
    setErrors({});
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[#FFFFFF] text-[#151515] py-[80px] lg:py-[145px]"
    >
      <div className="w-[90%] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left column: verified Paradise Views contact details */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[2px] bg-[#D9E600]" aria-hidden="true" />
              <span className="font-display font-semibold text-xs tracking-[0.22em] text-[#777777]">
                LET&apos;S START SOMETHING GREAT
              </span>
            </div>

            <motion.h2
              id="contact-heading"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold uppercase tracking-[-0.03em] leading-[0.95] text-[clamp(2.35rem,4.8vw,4.25rem)] text-[#151515] mb-6"
            >
              WHAT ARE YOU
              <br />
              PLANNING?
            </motion.h2>

            <p className="text-base sm:text-lg text-[#222222]/80 leading-relaxed mb-10 max-w-md">
              Whether you&apos;re thinking about a new patio, retaining wall, deck, or a complete
              backyard transformation, tell us a little about your idea.
            </p>

            <div className="space-y-6 pt-8 border-t border-[#151515]/14">
              <div>
                <span className="font-display font-semibold text-xs tracking-[0.18em] text-[#777777] block mb-1.5">
                  PHONE
                </span>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-3 font-display font-bold text-2xl sm:text-3xl text-[#151515] hover:text-[#344B38] transition-colors tabular-nums"
                >
                  <Phone className="w-5 h-5 text-[#151515]" />
                  <span>{BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>

              <div>
                <span className="font-display font-semibold text-xs tracking-[0.18em] text-[#777777] block mb-1.5">
                  LOCATION
                </span>
                <p className="inline-flex items-center gap-2.5 text-base font-medium text-[#151515]">
                  <MapPin className="w-4 h-4 text-[#344B38] shrink-0" />
                  <span>{BUSINESS_INFO.location}</span>
                </p>
              </div>

              <div>
                <span className="font-display font-semibold text-xs tracking-[0.18em] text-[#777777] block mb-2">
                  SERVICE AREAS
                </span>
                <p className="text-sm sm:text-[15px] text-[#222222]/80 leading-relaxed">
                  {BUSINESS_INFO.serviceAreas.join(', ')}.
                </p>
              </div>
            </div>
          </div>

          {/* Right column: streamlined 4-field inquiry form */}
          <div className="lg:col-span-7 bg-[#F7F7F4] border border-[#151515]/14 p-7 sm:p-10 lg:p-12">
            {submittedDraft ? (
              <div className="space-y-6" role="status" aria-live="polite">
                <div className="flex items-start gap-3 pb-5 border-b border-[#151515]/14">
                  <CheckCircle2 className="w-6 h-6 text-[#344B38] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-display font-semibold text-xs tracking-[0.18em] text-[#344B38] block mb-1">
                      INQUIRY VALIDATED · CONCEPT DEMO MODE
                    </span>
                    <h3 className="font-display font-bold text-2xl text-[#151515]">
                      Ready to Connect to Paradise Views&apos; Backend
                    </h3>
                  </div>
                </div>

                <div className="bg-[#FFFFFF] border border-[#151515]/14 p-5 space-y-2.5 text-sm">
                  <div className="flex justify-between gap-4 border-b border-[#E7E7E3] pb-2">
                    <span className="text-[#777777]">Name</span>
                    <span className="font-medium text-[#151515]">{submittedDraft.name}</span>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-[#E7E7E3] pb-2">
                    <span className="text-[#777777]">Contact</span>
                    <span className="font-medium text-[#151515]">{submittedDraft.contact}</span>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-[#E7E7E3] pb-2">
                    <span className="text-[#777777]">Project Type</span>
                    <span className="font-medium text-[#151515]">{submittedDraft.projectType}</span>
                  </div>
                  {submittedDraft.notes && (
                    <div className="pt-1">
                      <span className="text-[#777777] block mb-1">Project Notes</span>
                      <p className="text-[#151515]">{submittedDraft.notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-3 bg-[#151515] text-white p-4 text-xs sm:text-sm leading-relaxed">
                  <Info className="w-4 h-4 text-[#D9E600] shrink-0 mt-0.5" />
                  <p>
                    This interactive redesign is a frontend concept demo—no message has been
                    transmitted externally yet. In production, this form submits directly to{' '}
                    <code className="text-[#D9E600]">POST /api/inquiries</code>. To reach Paradise
                    Views Landscaping immediately, call{' '}
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="underline decoration-[#D9E600] text-[#D9E600] font-medium"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                    .
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex items-center gap-3 bg-[#D9E600] hover:bg-[#C8D500] text-[#151515] font-display font-bold text-xs tracking-[0.09em] px-6 py-3.5 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>CALL {BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-2 border border-[#151515]/25 hover:border-[#151515] text-[#151515] font-display font-bold text-xs tracking-[0.09em] px-5 py-3.5 transition-colors cursor-pointer"
                  >
                    <span>EDIT OR SEND ANOTHER</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#151515]/12 pb-4">
                  <span className="font-display font-bold text-sm tracking-[0.12em] text-[#151515]">
                    QUICK ESTIMATE INQUIRY
                  </span>
                  <span className="text-xs text-[#777777]">Takes under 30 seconds</span>
                </div>

                {/* Field 1: Your Name */}
                <div>
                  <label
                    htmlFor="inquiry-name"
                    className="block font-display font-semibold text-xs tracking-[0.14em] text-[#151515] uppercase mb-2"
                  >
                    Your Name <span className="text-[#344B38]">*</span>
                  </label>
                  <input
                    id="inquiry-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="e.g. Jordan Patel"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
                    className={`w-full bg-[#FFFFFF] border px-4 py-3.5 text-base text-[#151515] placeholder:text-[#777777]/70 transition-colors focus:outline-none focus:border-[#151515] ${
                      errors.name ? 'border-red-700' : 'border-[#151515]/20'
                    }`}
                  />
                  {errors.name && (
                    <p
                      id="inquiry-name-error"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-red-700"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Field 2: Email or Phone */}
                <div>
                  <label
                    htmlFor="inquiry-contact"
                    className="block font-display font-semibold text-xs tracking-[0.14em] text-[#151515] uppercase mb-2"
                  >
                    Email or Phone <span className="text-[#344B38]">*</span>
                  </label>
                  <input
                    id="inquiry-contact"
                    name="contact"
                    type="text"
                    required
                    autoComplete="email"
                    placeholder="you@example.com or (416) 555-0192"
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                      if (errors.contact) setErrors((prev) => ({ ...prev, contact: undefined }));
                    }}
                    aria-invalid={Boolean(errors.contact)}
                    aria-describedby={errors.contact ? 'inquiry-contact-error' : undefined}
                    className={`w-full bg-[#FFFFFF] border px-4 py-3.5 text-base text-[#151515] placeholder:text-[#777777]/70 transition-colors focus:outline-none focus:border-[#151515] ${
                      errors.contact ? 'border-red-700' : 'border-[#151515]/20'
                    }`}
                  />
                  {errors.contact && (
                    <p
                      id="inquiry-contact-error"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-red-700"
                    >
                      {errors.contact}
                    </p>
                  )}
                </div>

                {/* Field 3: What type of project? */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="inquiry-project-type"
                      className="block font-display font-semibold text-xs tracking-[0.14em] text-[#151515] uppercase"
                    >
                      What type of project?
                    </label>
                    {highlightCategory && (
                      <span className="text-[11px] font-display font-bold tracking-[0.1em] bg-[#D9E600] text-[#151515] px-2 py-0.5">
                        PRESELECTED FROM GALLERY
                      </span>
                    )}
                  </div>
                  <select
                    id="inquiry-project-type"
                    name="projectType"
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value as ProjectCategory)}
                    className={`w-full bg-[#FFFFFF] border px-4 py-3.5 text-base text-[#151515] transition-colors focus:outline-none focus:border-[#151515] cursor-pointer ${
                      highlightCategory
                        ? 'border-[#151515] ring-2 ring-[#D9E600]'
                        : 'border-[#151515]/20'
                    }`}
                  >
                    {PROJECT_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Field 4: Optional project notes */}
                <div>
                  <label
                    htmlFor="inquiry-notes"
                    className="block font-display font-semibold text-xs tracking-[0.14em] text-[#151515] uppercase mb-2"
                  >
                    Tell us a little about your project{' '}
                    <span className="text-[#777777] font-normal normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="inquiry-notes"
                    name="notes"
                    rows={3}
                    placeholder="Share a quick idea or timing window—we'll cover site details together later."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#151515]/20 px-4 py-3.5 text-base text-[#151515] placeholder:text-[#777777]/70 transition-colors focus:outline-none focus:border-[#151515] resize-y"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex items-center justify-center gap-4 bg-[#151515] hover:bg-[#222222] disabled:opacity-60 text-white font-display font-bold text-xs sm:text-sm tracking-[0.1em] pl-7 pr-3 py-4 transition-all duration-200 cursor-pointer"
                  >
                    <span>{submitting ? 'PREPARING INQUIRY...' : "LET'S TALK ABOUT IT"}</span>
                    <span className="w-8 h-8 rounded-full bg-[#D9E600] text-[#151515] flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="w-4 h-4" strokeWidth={2.4} />
                    </span>
                  </button>

                  <span className="text-xs text-[#777777]">
                    No address or long specs required upfront.
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
