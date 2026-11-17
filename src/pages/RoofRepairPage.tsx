import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Wind, ShieldAlert, CheckCircle2, Search, Wrench } from 'lucide-react';
import { updatePageSEO } from '../utils';
import { siteConfig } from '../config/siteConfig';
import { projectsData } from '../data/projectsData';
import { faqsData } from '../data/faqsData';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ProjectCard } from '../components/sections/ProjectCard';
import { ProjectLightbox } from '../components/sections/ProjectLightbox';
import { FAQAccordion } from '../components/sections/FAQAccordion';
import { CTASection } from '../components/sections/CTASection';
import { ResponsiveImage } from '../components/ui/ResponsiveImage';
import { RoofingProject } from '../types';

export const RoofRepairPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<RoofingProject | null>(null);

  useEffect(() => {
    updatePageSEO(
      "Roof Repair & Diagnostic Leak Assessment",
      "Systematic leak tracing, storm damage repairs, flashing restoration, and emergency tarping protocols for residential and commercial roofs."
    );
  }, []);

  const repairProjects = projectsData.filter((p) => p.category === 'repair');
  const service = siteConfig.services.find((s) => s.id === 'roof-repair')!;

  const commonProblems = [
    {
      title: "Active Water Leaks & Ceiling Stains",
      desc: "Water intrusion traveling down rafters, pooling on drywall, or emerging around light fixtures during heavy rains.",
      icon: Droplets
    },
    {
      title: "Wind-Torn & Missing Shingles",
      desc: "High winds lift adhesive sealant strips, break tabs, or expose underlayments to UV degradation.",
      icon: Wind
    },
    {
      title: "Damaged Step & Valley Flashing",
      desc: "Rusted, unseated, or corroded metal junctions at chimneys, dormers, and roof-to-wall transitions.",
      icon: Wrench
    },
    {
      title: "Cracked Plumbing Boot Collars",
      desc: "Sun-baked neoprene rubber collars dry out and crack after 8-10 years, funneling water down pipes.",
      icon: ShieldAlert
    }
  ];

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Services', path: '/services' },
          { label: 'Roof Repair' }
        ]}
      />

      {/* Hero */}
      <section className="relative bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ResponsiveImage
            src={service.heroImage}
            alt="Roof leak diagnostic and repair"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 hero-gradient-overlay" />
        </div>

        <div className="max-w-content mx-auto relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded bg-brand-copper text-white shadow-sm">
              Diagnostic Leak Solutions
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Roof Repair & Leak Restoration
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              {service.tagline} We identify the root origin of water infiltration rather than simply applying superficial patches.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/request-estimate?service=roof-repair"
                className="px-6 py-3 rounded bg-brand-copper hover:bg-brand-copper-hover text-white font-semibold text-sm transition-colors shadow-md focus-visible:outline-brand-copper"
              >
                Request a Repair Assessment
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors border border-slate-700"
              >
                Contact Repair Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Common Roof Problems */}
      <section className="py-20 px-4 sm:px-6 bg-brand-warm">
        <div className="max-w-content mx-auto">
          <SectionHeading
            eyebrow="Diagnostic Identification"
            title="Common Roofing Problems We Solve"
            description="Roofing leaks frequently travel laterally across interior trusses before dripping down ceilings. Here are the primary failure points our inspections uncover."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commonProblems.map((prob, idx) => {
              const Icon = prob.icon;
              return (
                <div key={idx} className="p-6 rounded-lg bg-white border border-brand-border shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-11 h-11 rounded bg-brand-slate text-brand-copper flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-brand-navy">{prob.title}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-brand-muted leading-relaxed">{prob.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* When to Contact a Professional */}
      <section className="py-20 px-4 sm:px-6 bg-white border-y border-brand-border">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-copper">
                Timely Intervention
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight mt-2">
                When to Schedule a Professional Roof Inspection
              </h2>
              <p className="mt-4 text-base text-brand-muted leading-relaxed">
                Delaying roof repairs frequently transforms a minor $300 pipe boot replacement into a multi-thousand dollar structural dry rot and drywall replacement emergency.
              </p>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 text-sm text-brand-dark">
                  <CheckCircle2 className="w-4 h-4 text-brand-copper mt-0.5 shrink-0" />
                  <span><strong>Discolored ceiling spots:</strong> Even faint brown rings indicate persistent slow seepage.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-brand-dark">
                  <CheckCircle2 className="w-4 h-4 text-brand-copper mt-0.5 shrink-0" />
                  <span><strong>Granule accumulation in gutters:</strong> Heavy sand in downspouts indicates advanced shingle weathering.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-brand-dark">
                  <CheckCircle2 className="w-4 h-4 text-brand-copper mt-0.5 shrink-0" />
                  <span><strong>Curling, cupping, or brittle shingles:</strong> Signals thermal exhaustion of asphalt oils.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-brand-dark">
                  <CheckCircle2 className="w-4 h-4 text-brand-copper mt-0.5 shrink-0" />
                  <span><strong>Post-Storm Wind & Hail Events:</strong> High winds break shingle tab adhesion, allowing subsequent rain to penetrate.</span>
                </div>
              </div>
            </div>

            <div className="bg-brand-slate text-white p-8 rounded-xl border border-slate-700 shadow-md">
              <div className="flex items-center gap-2 mb-4 text-brand-copper">
                <Search className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white">Our 4-Point Diagnostic Process</h3>
              </div>
              <ol className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="font-mono font-bold text-brand-copper">01.</span>
                  <span><strong>Interior Moisture Mapping:</strong> We inspect attic insulation and rafters to trace water pathways from ceiling stains.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono font-bold text-brand-copper">02.</span>
                  <span><strong>Exterior Perimeter Walk:</strong> Visual inspection of slopes, ridges, valleys, and flashing points with ladder access.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono font-bold text-brand-copper">03.</span>
                  <span><strong>Photographic Report:</strong> You receive high-resolution photos showing exact points of compromise.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono font-bold text-brand-copper">04.</span>
                  <span><strong>Targeted Repair Scope:</strong> Clear proposal detailing repair steps, material matches, and costs.</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Project Showcase */}
      {repairProjects.length > 0 && (
        <section className="py-20 px-4 sm:px-6 bg-brand-warm">
          <div className="max-w-content mx-auto">
            <SectionHeading
              eyebrow="Case Studies"
              title="Sample Repair & Restoration Work"
              description="Demonstrating methodical leak isolation and flashing rebuilds."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {repairProjects.map((p) => (
                <ProjectCard key={p.id} project={p} onSelect={(proj) => setSelectedProject(proj)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <FAQAccordion
        items={faqsData.filter((f) => f.category === 'repair')}
        title="Roof Repair FAQs"
        description="Clear guidance on emergency steps, repair vs. replacement criteria, and inspection estimates."
      />

      {/* CTA */}
      <CTASection
        title="Stop Water Intrusion Before It Damages Your Structure"
        description="Contact our repair specialists to book an on-site leak diagnostic and estimate."
        primaryButtonText="Request a Repair Inspection"
        primaryButtonLink="/request-estimate?service=roof-repair"
      />

      <ProjectLightbox
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPrev={() => {}}
        onNext={() => {}}
        hasPrev={false}
        hasNext={false}
      />
    </div>
  );
};
