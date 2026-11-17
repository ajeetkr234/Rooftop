import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { updatePageSEO } from '../utils';
import { siteConfig } from '../config/siteConfig';
import { faqsData } from '../data/faqsData';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FAQAccordion } from '../components/sections/FAQAccordion';
import { CTASection } from '../components/sections/CTASection';
import { ResponsiveImage } from '../components/ui/ResponsiveImage';

export const RoofReplacementPage: React.FC = () => {
  useEffect(() => {
    updatePageSEO(
      "Complete Roof Replacement Services | Full Tear-Off & Structural Upgrade",
      "Full roof replacements with 100% tear-off, CDX decking replacement, ASTM D1970 ice & water shield, and manufacturer-backed lifetime warranties."
    );
  }, []);

  const replacementPhases = [
    {
      phase: "01",
      title: "Clean Tear-Off & Property Shielding",
      desc: "Our crews erect heavy-duty ground nets and plywood siding guards, removing all aged shingles and felt down to bare structural decking."
    },
    {
      phase: "02",
      title: "Forensic Decking Remediation",
      desc: "We mechanically inspect every square foot of CDX plywood or tongue-and-groove boards, replacing rotted or delaminated wood immediately."
    },
    {
      phase: "03",
      title: "Multi-Barrier Weatherproofing",
      desc: "Installation of self-adhering ASTM D1970 ice & water barrier in all valleys and eaves, followed by breathable synthetic underlayment."
    },
    {
      phase: "04",
      title: "Precision System & Ridge Ventilation",
      desc: "Precision fastening of Class 4 impact shingles or standing seam panels, culminating in continuous ridge vents and magnetic yard cleanup."
    }
  ];

  const warningSigns = [
    "Roof age exceeding 20–25 years with widespread granule shedding in gutters",
    "Curling, cupping, or brittle shingles that crack in moderate winds",
    "Spongy or sagging decking when walked on by maintenance crews",
    "Repeated recurring leaks around chimneys, valleys, or skylights",
    "High energy bills caused by trapped attic heat and degraded ridge ventilation"
  ];

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Services', path: '/services' },
          { label: 'Roof Replacement' }
        ]}
      />

      {/* Hero */}
      <section className="relative bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ResponsiveImage
            src="/images/services/service-replacement.jpg"
            alt="Complete roof replacement craftsmanship"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 hero-gradient-overlay" />
        </div>

        <div className="max-w-content mx-auto relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded bg-brand-copper text-white shadow-sm">
              Architectural Structural Upgrade
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Complete Roof Replacement
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              When recurring patches no longer protect your equity. We deliver engineered full tear-offs with fortified sub-decking and lifetime manufacturer non-prorated warranties.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/request-estimate?service=roof-replacement"
                className="px-6 py-3 rounded bg-brand-copper hover:bg-brand-copper-hover text-white font-semibold text-sm transition-colors shadow-md"
              >
                Request Replacement Estimate
              </Link>
              <Link
                to="/book-inspection"
                className="px-6 py-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors border border-slate-700"
              >
                Schedule Decking Inspection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs & Why Replace */}
      <section className="py-16 bg-white px-4 sm:px-6">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-copper mb-2 block">
                Diagnostic Indicators
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-navy mb-4">
                When Is It Time for a Full Replacement?
              </h2>
              <p className="text-sm text-brand-muted leading-relaxed mb-6">
                Band-aid repairs on an expired roof envelope only postpone the inevitable while hidden moisture rots rafters and insulation. If your property exhibits these signs, a replacement protects your structural foundation:
              </p>
              <ul className="space-y-3">
                {warningSigns.map((sign, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl">
              <h3 className="font-heading font-bold text-xl text-white mb-4">
                The {siteConfig.companyName} Replacement Advantage
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700">
                  <strong className="text-brand-copper block text-sm mb-1">Zero-Shortcut Tear-Offs</strong>
                  <span>We never shingle over old layers. We strip down to raw decking so hidden fungal rot and moisture traps are permanently resolved.</span>
                </div>
                <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700">
                  <strong className="text-brand-copper block text-sm mb-1">Catch-All Landscape Protection</strong>
                  <span>Your siding, flowerbeds, and air conditioning compressors are shielded with impact chutes and high-strength tarps throughout tear-off.</span>
                </div>
                <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700">
                  <strong className="text-brand-copper block text-sm mb-1">Magnetic Nail Sweep Guarantee</strong>
                  <span>Four-pass industrial magnetic sweeps ensure your driveways, lawns, and walkways are left completely spotless and nail-free.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="py-16 bg-slate-50 border-t border-brand-border px-4 sm:px-6">
        <div className="max-w-content mx-auto">
          <SectionHeading
            eyebrow="Process Blueprint"
            title="Our Engineered Replacement Sequence"
            description="Every project follows a documented quality checklist to ensure code compliance and maximum manufacturer warranty coverage."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {replacementPhases.map((phase) => (
              <div key={phase.phase} className="bg-white rounded-xl p-6 border border-brand-border shadow-sm hover:shadow-md transition-shadow">
                <span className="font-mono text-2xl font-black text-brand-copper mb-3 block">
                  {phase.phase}
                </span>
                <h3 className="font-heading font-bold text-base text-brand-navy mb-2">
                  {phase.title}
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white border-t border-brand-border px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            eyebrow="Common Questions"
            title="Frequently Asked About Roof Replacements"
          />
          <div className="mt-8">
            <FAQAccordion items={faqsData.slice(0, 4)} />
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
