import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updatePageSEO } from '../utils';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CTASection } from '../components/sections/CTASection';
import { ResponsiveImage } from '../components/ui/ResponsiveImage';

export const CommercialRoofingPage: React.FC = () => {
  useEffect(() => {
    updatePageSEO(
      "Commercial Roofing Contractor | TPO, EPDM, PVC & Flat Roof Systems",
      "Industrial and commercial roofing contractor. Heat-welded TPO membranes, EPDM rubber, restorative silicone coatings, and facility preventative maintenance."
    );
  }, []);

  const commercialSystems = [
    {
      title: "Heat-Welded TPO Single-Ply Membrane",
      features: "60-mil / 80-mil thermoplastic polyolefin with hot-air welded monolithic seams. Energy Star rated solar reflectance (Cool Roof) reducing HVAC cooling loads by up to 25%.",
      ideal: "Retail centers, warehouses, hospitals, and low-slope flat roofs."
    },
    {
      title: "EPDM Synthetic Rubber Roofing",
      features: "High-tensile thermoset rubber resistant to extreme thermal shock, ozone UV radiation, and freezing cycles. Flexible elongation up to 300%.",
      ideal: "Industrial distribution hubs and northern climate commercial facilities."
    },
    {
      title: "Restorative Elastomeric & Silicone Coatings",
      features: "Seamless liquid-applied silicone creates a waterproof ponding-water resistant barrier over aged metal or modified bitumen without costly tear-off disposal.",
      ideal: "Extending existing commercial roof life by 10–15 years at half the replacement cost."
    },
    {
      title: "Commercial Preventative Maintenance (CAM)",
      features: "Scheduled bi-annual drain cleaning, HVAC curb flashing sealing, penetration inspection, and itemized compliance documentation for building asset management.",
      ideal: "HOA property managers, corporate campuses, and multi-tenant commercial plazas."
    }
  ];

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Services', path: '/services' },
          { label: 'Commercial Roofing' }
        ]}
      />

      {/* Hero */}
      <section className="relative bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ResponsiveImage
            src="/images/services/service-commercial.jpg"
            alt="Commercial flat roofing installation"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 hero-gradient-overlay" />
        </div>

        <div className="max-w-content mx-auto relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded bg-brand-copper text-white shadow-sm">
              Commercial & Industrial
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Commercial Roofing Systems & Asset Management
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              Engineered low-slope membranes, silicone restorations, and proactive asset management for property managers, facility directors, and commercial developers.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/request-estimate?type=commercial"
                className="px-6 py-3 rounded bg-brand-copper hover:bg-brand-copper-hover text-white font-semibold text-sm transition-colors shadow-md"
              >
                Request Commercial RFP / Estimate
              </Link>
              <Link
                to="/book-inspection"
                className="px-6 py-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors border border-slate-700"
              >
                Book Commercial Facility Audit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Systems Grid */}
      <section className="py-16 bg-white px-4 sm:px-6">
        <div className="max-w-content mx-auto">
          <SectionHeading
            eyebrow="Low-Slope Technology"
            title="Engineered Commercial Membrane Solutions"
            description="Built to withstand ponding water, industrial chemical exhaust, and heavy mechanical HVAC foot traffic."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {commercialSystems.map((sys, idx) => (
              <div key={idx} className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-copper transition-all hover:shadow-lg">
                <h3 className="font-heading font-bold text-lg text-brand-navy mb-3">
                  {sys.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  {sys.features}
                </p>
                <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-500">
                  <strong className="text-slate-800">Target Application:</strong> {sys.ideal}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
