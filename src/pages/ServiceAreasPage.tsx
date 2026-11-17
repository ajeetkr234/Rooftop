import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, AlertCircle, ArrowRight } from 'lucide-react';
import { updatePageSEO } from '../utils';
import { serviceAreasData } from '../data/serviceAreasData';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CTASection } from '../components/sections/CTASection';

export const ServiceAreasPage: React.FC = () => {
  useEffect(() => {
    updatePageSEO(
      "Service Areas & Regional Coverage",
      "Review regional service coverage for roof installation, leak repairs, and preventive maintenance. Check address eligibility and inspection scheduling."
    );
  }, []);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Service Areas' }]} />

      {/* Hero */}
      <section className="bg-brand-navy text-white py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-content mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded bg-brand-copper/20 text-brand-copper border border-brand-copper/30">
              Regional Operations
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Roofing Service Areas & Operational Territory
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              We dispatch professional roofing crews for residential and commercial installation, emergency leak repair, and scheduled inspections throughout our regional operating zone.
            </p>
          </div>
        </div>
      </section>

      {/* Main Coverage Cards */}
      <section className="py-20 px-4 sm:px-6 bg-brand-warm">
        <div className="max-w-content mx-auto">
          {/* Transparency Disclaimer */}
          <div className="mb-10 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block">Service Area Transparency:</strong>
              Territory boundaries below are configured as representative regional zones. The exact operational radius is confirmed when business location coordinates and local licensing details are established.
            </div>
          </div>

          <SectionHeading
            eyebrow="Active Territories"
            title="Designated Service Zones"
            description="Our project managers coordinate crews by geographic zones to ensure punctual arrival, efficient staging, and prompt post-storm responses."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceAreasData.map((zone) => (
              <div
                key={zone.id}
                className="bg-white border border-brand-border rounded-xl p-8 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-brand-copper" />
                      <h3 className="text-xl font-bold text-brand-navy">{zone.regionName}</h3>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                        zone.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {zone.status === 'active' ? 'Active Dispatch' : 'On Request'}
                    </span>
                  </div>

                  <p className="text-sm text-brand-dark leading-relaxed font-medium">
                    {zone.coverageDescription}
                  </p>

                  <div className="mt-4 pt-4 border-t border-brand-border text-xs text-brand-muted">
                    <span className="font-semibold text-brand-dark">Scheduling note:</span> {zone.disclaimer}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-border/60">
                  <Link
                    to="/request-estimate"
                    className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-copper transition-colors"
                  >
                    <span>Check Service for Your Address</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Direct Address Check Card */}
          <div className="mt-12 bg-brand-slate text-white rounded-xl p-8 sm:p-10 border border-slate-700 text-center max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Not sure if your property is in our service zone?</h3>
            <p className="mt-2 text-sm text-slate-300">
              Submit your property address through our estimate request form. We review roof access, distance, and permitting requirements promptly.
            </p>
            <div className="mt-6">
              <Link
                to="/request-estimate"
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-brand-copper hover:bg-brand-copper-hover text-white font-semibold text-sm transition-colors shadow-md"
              >
                <span>Request Address Verification</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
};
