import React, { useEffect } from 'react';
import { ShieldCheck, HardHat, Eye, HeartHandshake } from 'lucide-react';
import { updatePageSEO } from '../utils';
import { siteConfig } from '../config/siteConfig';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CTASection } from '../components/sections/CTASection';
import { ResponsiveImage } from '../components/ui/ResponsiveImage';
import { SafetyShowcaseSection } from '../components/sections/SafetyShowcaseSection';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    updatePageSEO(
      "About Us | Architectural Roofing Craftsmanship",
      "Learn about our engineering-first roofing methodology, safety standards, transparent itemized estimates, and commitment to structural protection."
    );
  }, []);

  const values = [
    {
      title: "Meticulous Craftsmanship",
      desc: "We treat roofing as an integrated envelope system. Nail spacing, synthetic underlayments, and flashing reglets are executed to exacting tolerances.",
      icon: ShieldCheck
    },
    {
      title: "Transparent Communication",
      desc: "Every estimate is clearly itemized with material specifications, labor details, and project schedules. We never push unnecessary full replacements.",
      icon: Eye
    },
    {
      title: "Uncompromising Safety",
      desc: "OSHA-compliant tie-offs, safety harnesses, perimeter fall-protection guards, and continuous ground magnetic sweeps are non-negotiable.",
      icon: HardHat
    },
    {
      title: "Client-First Stewardship",
      desc: "We respect your time and property. Work sites are cleaned at the conclusion of every single shift, leaving landscapes and driveways protected.",
      icon: HeartHandshake
    }
  ];

  return (
    <div>
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero */}
      <section className="bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-content mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded bg-brand-copper/20 text-brand-copper border border-brand-copper/30">
              Our Craft & Values
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Built on Precision, Safety, and Structural Integrity
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              At {siteConfig.companyName}, we combine industrial craftsmanship with modern project management to deliver roofing solutions that withstand the harshest regional weather.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Approach */}
      <section className="py-20 px-4 sm:px-6 bg-brand-warm">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-copper">
                Our Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
                An Engineering-First Approach to Every Roof
              </h2>
              <p className="text-base text-brand-muted leading-relaxed">
                A roof is the most vulnerable component of any building envelope. Wind, hail, UV radiation, and thermal shifts constantly test its seams.
              </p>
              <p className="text-sm text-brand-muted leading-relaxed">
                Rather than rushing jobs or taking shortcuts with generic materials, our crews adhere strictly to manufacturer-certified installation requirements. We ensure balanced attic ventilation, install self-adhering ice membranes in every valley, and custom fabricate heavy-gauge flashing for chimneys and wall terminations.
              </p>
              <div className="pt-2 text-xs text-brand-muted border-t border-brand-border">
                <span className="font-semibold text-brand-dark">Company Credentials Notice:</span> Specific company founding history, state license registration numbers, and manufacturer tier certifications will be integrated upon official client onboarding.
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-brand-border shadow-md aspect-[16/11]">
              <ResponsiveImage
                src="/images/safety/worker-metal-crew.jpg"
                alt="Professional roofers adhering to strict safety standards"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 sm:px-6 bg-white border-y border-brand-border">
        <div className="max-w-content mx-auto">
          <SectionHeading
            eyebrow="Principles"
            title="What Guides Our Work"
            description="Our core values govern how we treat client properties, communicate proposals, and ensure jobsite safety."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div key={idx} className="p-6 rounded-lg bg-brand-warm/60 border border-brand-border flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded bg-brand-navy text-brand-copper flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-navy">{v.title}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-brand-muted leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Safety & Worker Equipment Showcase */}
      <SafetyShowcaseSection />

      {/* CTA */}
      <CTASection />
    </div>
  );
};
