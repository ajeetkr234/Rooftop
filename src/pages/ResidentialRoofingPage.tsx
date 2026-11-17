import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updatePageSEO } from '../utils';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CTASection } from '../components/sections/CTASection';
import { ResponsiveImage } from '../components/ui/ResponsiveImage';

export const ResidentialRoofingPage: React.FC = () => {
  useEffect(() => {
    updatePageSEO(
      "Residential Roofing Contractor | Architectural Shingle & Metal Systems",
      "Premium residential roofing for homeowners. Architectural dimensional shingles, standing seam metal, Spanish tile, and full storm-rated replacements."
    );
  }, []);

  const residentialSystems = [
    {
      title: "Class 4 Architectural Shingles",
      lifespan: "30–50 Year Manufacturer Warranty",
      features: "UL 2218 Class 4 hail impact resistance, Scotchgard algae defense, 130 MPH wind tear-off resistance.",
      ideal: "Optimal curb appeal balance for suburban residences & HOA neighborhoods."
    },
    {
      title: "Standing Seam Architectural Metal",
      lifespan: "50–70+ Year Lifespan",
      features: "Concealed fasteners, 24-gauge Galvalume steel, solar reflectance, impervious to rot and insects.",
      ideal: "Contemporary architectural homes, modern farmhouses, and Hill Country estates."
    },
    {
      title: "Engineered Clay & Concrete Tile",
      lifespan: "50+ Year Enduring Beauty",
      features: "Class A fire resistance, thermal mass insulation keeping attics cooler in hot summers.",
      ideal: "Mediterranean, Spanish Colonial, and custom luxury residences."
    },
    {
      title: "Composite Synthetic Slate & Shake",
      lifespan: "50-Year Non-Prorated Guarantee",
      features: "Authentic quarried slate texture at half the structural load weight, Class 4 impact certified.",
      ideal: "Historic renovations, high-end homes seeking authentic slate aesthetics without structural re-framing."
    }
  ];

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Services', path: '/services' },
          { label: 'Residential Roofing' }
        ]}
      />

      {/* Hero */}
      <section className="relative bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ResponsiveImage
            src="/images/services/service-residential.jpg"
            alt="Residential architectural roofing craftsmanship"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 hero-gradient-overlay" />
        </div>

        <div className="max-w-content mx-auto relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded bg-brand-copper text-white shadow-sm">
              Homeowner Solutions
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Residential Roofing Excellence
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              Elevate your home’s curb appeal and safeguard your family with certified residential roofing systems. Installed with uncompromising craftsmanship and lifetime manufacturer non-prorated warranties.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/request-estimate?type=residential"
                className="px-6 py-3 rounded bg-brand-copper hover:bg-brand-copper-hover text-white font-semibold text-sm transition-colors shadow-md"
              >
                Request Residential Estimate
              </Link>
              <Link
                to="/#materials"
                className="px-6 py-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors border border-slate-700"
              >
                Explore Material Visualizer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Material Systems Grid */}
      <section className="py-16 bg-white px-4 sm:px-6">
        <div className="max-w-content mx-auto">
          <SectionHeading
            eyebrow="Material Options"
            title="Engineered Residential Roofing Profiles"
            description="Choose the optimal balance between architectural aesthetics, longevity, energy efficiency, and insurance discount eligibility."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {residentialSystems.map((sys, idx) => (
              <div key={idx} className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-copper transition-all hover:shadow-lg">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="font-heading font-bold text-lg text-brand-navy">
                    {sys.title}
                  </h3>
                  <span className="text-[11px] font-mono px-2.5 py-1 bg-brand-copper/10 text-brand-copper rounded-full font-bold">
                    {sys.lifespan}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  {sys.features}
                </p>
                <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-500">
                  <strong className="text-slate-800">Best Suited For:</strong> {sys.ideal}
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
