import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Home, Building2, Factory } from 'lucide-react';
import { updatePageSEO } from '../utils';
import { siteConfig } from '../config/siteConfig';
import { faqsData } from '../data/faqsData';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ProcessSteps } from '../components/sections/ProcessSteps';
import { FAQAccordion } from '../components/sections/FAQAccordion';
import { CTASection } from '../components/sections/CTASection';
import { ResponsiveImage } from '../components/ui/ResponsiveImage';

export const ServicesPage: React.FC = () => {
  useEffect(() => {
    updatePageSEO(
      "Roofing Services Overview",
      "Comprehensive roof installation, leak repair, and preventive maintenance capabilities for residential, commercial, and multi-tenant properties."
    );
  }, []);

  const propertyTypes = [
    {
      title: "Single-Family Residential",
      description: "Steep-slope architectural asphalt shingles, designer metal roofs, ventilation upgrades, and thorough clean-up.",
      icon: Home
    },
    {
      title: "Multi-Family & Townhomes",
      description: "Coordinated roof replacements with minimal resident disruption and phased staging plans.",
      icon: Building2
    },
    {
      title: "Commercial & Low-Slope",
      description: "Single-ply TPO, EPDM, and modified bitumen installations, perimeter metal coping, and scupper drain maintenance.",
      icon: Factory
    }
  ];

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Services Overview' }]} />

      {/* Hero */}
      <section className="bg-brand-navy text-white py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-content mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded bg-brand-copper/20 text-brand-copper border border-brand-copper/30">
              End-to-End Capabilities
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Professional Roofing Solutions for Every Stage of the Envelope Lifecycle
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              From new construction installations and structural replacements to surgical leak diagnostics and annual preventive check-ups, our roofing practices are engineered for longevity.
            </p>
          </div>
        </div>
      </section>

      {/* Three Deep-Dive Service Sections */}
      <section className="py-20 px-4 sm:px-6 bg-brand-warm">
        <div className="max-w-content mx-auto space-y-16">
          {siteConfig.services.map((service, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={service.id}
                id={service.id}
                className={`bg-white border border-brand-border rounded-xl p-8 sm:p-10 shadow-sm flex flex-col ${
                  isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } items-center gap-10`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2 rounded-lg overflow-hidden border border-brand-border/60 shadow-sm aspect-[16/10]">
                  <ResponsiveImage
                    src={service.heroImage}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-4">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-brand-copper">
                    Service 0{idx + 1}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
                    {service.title}
                  </h2>
                  <p className="text-base text-brand-dark leading-relaxed font-medium">
                    {service.tagline}
                  </p>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {service.fullDescription}
                  </p>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy mb-2">
                      Key Highlights:
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-brand-dark">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-brand-copper mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-brand-copper hover:bg-brand-copper-hover text-white text-sm font-semibold transition-colors focus-visible:outline-brand-copper"
                    >
                      <span>Explore {service.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to={`/request-estimate?service=${service.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-copper transition-colors"
                    >
                      <span>Request Estimate</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Suitable Property Types */}
      <section className="py-20 px-4 sm:px-6 bg-white border-y border-brand-border">
        <div className="max-w-content mx-auto">
          <SectionHeading
            eyebrow="Versatile Structures"
            title="Structures & Property Types We Service"
            description="Our specialized equipment, safety systems, and installation teams handle diverse structural pitches and requirements."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {propertyTypes.map((prop, idx) => {
              const Icon = prop.icon;
              return (
                <div key={idx} className="p-6 rounded-lg bg-brand-warm/60 border border-brand-border flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded bg-brand-navy text-brand-copper flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-navy">{prop.title}</h3>
                    <p className="mt-2 text-sm text-brand-muted leading-relaxed">{prop.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow Process */}
      <ProcessSteps />

      {/* FAQs */}
      <FAQAccordion items={faqsData} />

      {/* Bottom CTA */}
      <CTASection />
    </div>
  );
};
