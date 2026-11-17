import React, { useEffect } from 'react';
import { ShieldCheck, Clock, Calculator } from 'lucide-react';
import { updatePageSEO } from '../utils';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { EstimateForm } from '../components/forms/EstimateForm';

export const RequestEstimatePage: React.FC = () => {
  useEffect(() => {
    updatePageSEO(
      "Request an Itemized Roofing Estimate",
      "Request an itemized project estimate for roof replacement, leak repairs, or preventive inspections. Transparent pricing with clear material specifications."
    );
  }, []);

  const estimateGuarantees = [
    {
      title: "No-Obligation Proposals",
      desc: "Receive clear, itemized options outlining materials, labor, and anticipated milestones without aggressive sales pressure.",
      icon: Calculator
    },
    {
      title: "Comprehensive Roof Diagnostic",
      desc: "Where appropriate, a qualified roofer inspects flashing, decking, and attic ventilation to identify underlying issues.",
      icon: ShieldCheck
    },
    {
      title: "Prompt Coordination",
      desc: "Our project managers review submission details and confirm inspection logistics within 1 business day.",
      icon: Clock
    }
  ];

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Request an Estimate' }]} />

      {/* Hero */}
      <section className="bg-brand-navy text-white py-14 sm:py-18 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-content mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded bg-brand-copper text-white shadow-sm">
              Transparent Pricing
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Request a Roofing Estimate
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-200 leading-relaxed">
              Tell us about your property and roofing requirements. We provide itemized, honest proposals designed around structural longevity.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-brand-warm">
        <div className="max-w-content mx-auto">
          {/* Trust Guarantees */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {estimateGuarantees.map((g, idx) => {
              const Icon = g.icon;
              return (
                <div key={idx} className="p-5 rounded-lg bg-white border border-brand-border flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-brand-slate text-brand-copper flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-navy">{g.title}</h3>
                    <p className="mt-1 text-xs text-brand-muted leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Accessible Lead Form */}
          <div className="max-w-3xl mx-auto">
            <EstimateForm />
          </div>
        </div>
      </section>
    </div>
  );
};
