import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, PhoneCall, CheckCircle2, Droplets } from 'lucide-react';
import { updatePageSEO } from '../utils';
import { siteConfig } from '../config/siteConfig';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CTASection } from '../components/sections/CTASection';
import { ResponsiveImage } from '../components/ui/ResponsiveImage';

export const RoofLeakRepairPage: React.FC = () => {
  useEffect(() => {
    updatePageSEO(
      "Emergency Roof Leak Repair & Priority Weatherproofing",
      "Immediate roof leak diagnostics, pipe boot repair, chimney flashing restoration, and priority emergency tarping to stop active water intrusion."
    );
  }, []);

  const commonLeakSources = [
    { title: "Perimeter Pipe Boot Rubber Collar Rot", desc: "UV breakdown of the neoprene rubber gasket around plumbing vent stacks causes slow leaks that drip down bathroom walls." },
    { title: "Chimney Step & Counter-Flashing Gaps", desc: "Degraded mortar joints and separated copper/lead flashing let wind-driven rain cascade behind fireplace brickwork." },
    { title: "Valley Convergence Ice & Leaf Damming", desc: "Leaves or ice accumulation in roof valleys traps water, forcing it upward under shingles into the decking felt." },
    { title: "Wind-Torn or Missing Starter Shingles", desc: "High gale gusts lift unsealed shingles, exposing fastener nail penetrations directly to heavy downpours." }
  ];

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Services', path: '/services' },
          { label: 'Roof Leak Repair' }
        ]}
      />

      {/* Emergency Header Hero */}
      <section className="relative bg-slate-950 text-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <ResponsiveImage
            src="/images/services/service-leak-repair.jpg"
            alt="Roof leak diagnostic and repair"
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <div className="max-w-content mx-auto relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded bg-red-600/90 text-white shadow-md animate-pulse">
              <Droplets className="w-3.5 h-3.5" />
              <span>Priority Leak Response</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Roof Leak Repair & Emergency Tarping
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              Active water penetration causes rapid drywall collapse, wet insulation, and structural framing rot. Our crews deploy immediate temporary weatherproofing and permanent engineered leak repairs.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`tel:${siteConfig.contact.phonePlaceholder.replace(/\D/g, '')}`}
                className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm transition-all shadow-lg flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Emergency Dispatch: {siteConfig.contact.phonePlaceholder}</span>
              </a>
              <Link
                to="/request-estimate?service=roof-repair"
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors border border-slate-700"
              >
                Request Repair Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Immediate Triage Action Guide */}
      <section className="py-12 bg-amber-500/10 border-b border-amber-500/20 px-4 sm:px-6">
        <div className="max-w-content mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-amber-500 text-white rounded-lg shrink-0 mt-0.5">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900">
                  What to Do Inside Your Home Right Now If Water Is Dripping:
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  1. Place buckets under drips. 2. Puncture center of bubbling ceiling drywall with a screwdriver to relieve pooled water weight. 3. Protect valuables with plastic sheeting. 4. Do not climb on a wet roof.
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              className="shrink-0 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Request Rapid Dispatch
            </Link>
          </div>
        </div>
      </section>

      {/* Common Sources */}
      <section className="py-16 bg-white px-4 sm:px-6">
        <div className="max-w-content mx-auto">
          <SectionHeading
            eyebrow="Diagnostic Anatomy"
            title="The 4 Most Common Roof Leak Vulnerabilities"
            description="Water rarely enters directly where it drips on your ceiling. It travels along rafters from vulnerable envelope intersections."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {commonLeakSources.map((source, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-copper transition-all">
                <h3 className="font-heading font-bold text-base text-brand-navy mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-copper" />
                  <span>{source.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {source.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
