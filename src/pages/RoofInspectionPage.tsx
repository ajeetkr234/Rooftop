import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { updatePageSEO } from '../utils';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CTASection } from '../components/sections/CTASection';
import { ResponsiveImage } from '../components/ui/ResponsiveImage';

export const RoofInspectionPage: React.FC = () => {
  useEffect(() => {
    updatePageSEO(
      "Certified Roof Inspection & 4K Drone Diagnostics",
      "Forensic 21-point roof inspections, storm damage assessments, insurance reports, and 4K aerial drone scans with millimeter precision."
    );
  }, []);

  const inspectionChecklist = [
    { category: "Roof Envelope & Surface", items: ["Granule depletion & asphalt shingle brittleness", "Hail impact fractures & shingle bruising", "Lifted or missing ridge caps & edge shingles", "Thermal expansion cracking on metal & tile"] },
    { category: "Flashing & Water Diversion", items: ["Chimney step & counter-flashing mastic seal", "Skylight perimeter rubber gasket integrity", "Valley metal convergence & sediment damming", "Plumbing pipe boot collar rubber dry-rot"] },
    { category: "Substrate & Structural", items: ["CDX plywood decking sag & soft spots", "Eave drip edge moisture penetration", "Fascia board rot behind gutters", "Attic rafter water stains & mold signs"] },
    { category: "Ventilation & Energy", items: ["Soffit intake baffle airflow obstructions", "Continuous ridge vent exhaust balance", "Attic temperature & humidity equilibrium", "Insulation displacement near eaves"] }
  ];

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Services', path: '/services' },
          { label: 'Roof Inspection' }
        ]}
      />

      {/* Hero */}
      <section className="relative bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ResponsiveImage
            src="/images/services/service-inspection.jpg"
            alt="Forensic aerial roof inspection"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 hero-gradient-overlay" />
        </div>

        <div className="max-w-content mx-auto relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded bg-brand-copper text-white shadow-sm">
              Forensic Diagnostics
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Certified Roof Inspections & Aerial Drone Scans
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              Uncover hidden moisture intrusion, hail fractures, and flashing decay before they manifest as ceiling leaks. Itemized photographic diagnostic reports for homeowners, buyers, and insurance claims.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/book-inspection"
                className="px-6 py-3 rounded bg-brand-copper hover:bg-brand-copper-hover text-white font-semibold text-sm transition-colors shadow-md"
              >
                Schedule an Inspection
              </Link>
              <Link
                to="/request-estimate"
                className="px-6 py-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors border border-slate-700"
              >
                Request Free Preliminary Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Drone Tech Section */}
      <section className="py-16 bg-white px-4 sm:px-6">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-copper/10 text-brand-copper text-xs font-bold uppercase">
                <Camera className="w-3.5 h-3.5" />
                <span>Advanced Aerial Technology</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-navy">
                FAA-Compliant 4K Drone Forensic Inspections
              </h2>
              <p className="text-sm text-brand-muted leading-relaxed">
                Walking on steep-slope roofs (8/12 pitch and above) or fragile architectural clay tiles can crack shingles and dislodge granules. Our commercial drone fleet provides millimeter-close optical zoom scans across all pitches without stepping foot on delicate materials.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <strong className="text-brand-navy block mb-1">Zero Shingle Disturbance</strong>
                  <span className="text-slate-600">Inspect fragile tile and slate without walking risk.</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <strong className="text-brand-navy block mb-1">High-Res Insurance Proof</strong>
                  <span className="text-slate-600">Macro photography of individual hail craters and wind creases.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl">
              <h3 className="font-heading font-bold text-xl text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-copper" />
                <span>Included in Every Inspection Report</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Comprehensive 21-Point Itemized Checklist:</strong> Every slope, valley, and penetration systematically documented.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>High-Resolution Photo Gallery:</strong> Date-stamped imagery showing exact wear, damaged shingles, and sealant conditions.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Estimated Remaining Useful Lifespan:</strong> Honest assessment of how many years your current system has before replacement.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Prioritized Action Plan:</strong> Clear distinction between immediate safety repairs and optional preventative upgrades.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 21-Point Scope Categories */}
      <section className="py-16 bg-slate-50 border-t border-brand-border px-4 sm:px-6">
        <div className="max-w-content mx-auto">
          <SectionHeading
            eyebrow="Inspection Scope"
            title="Our 21-Point Forensic Evaluation Matrix"
            description="We inspect beyond the surface to verify total structural envelope integrity from decking to ridge cap."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {inspectionChecklist.map((group, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-brand-border shadow-sm">
                <h3 className="font-heading font-bold text-sm text-brand-navy mb-4 pb-2 border-b border-brand-border">
                  {group.category}
                </h3>
                <ul className="space-y-2.5 text-xs text-brand-muted">
                  {group.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-copper shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/book-inspection"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-copper hover:bg-brand-copper-hover text-white font-extrabold text-sm shadow-lg transition-all"
            >
              <span>Schedule Your 21-Point Inspection Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
