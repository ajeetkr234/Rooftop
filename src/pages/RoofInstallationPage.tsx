import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, HardHat, FileSpreadsheet, Layers, Sparkles } from 'lucide-react';
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

export const RoofInstallationPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<RoofingProject | null>(null);

  useEffect(() => {
    updatePageSEO(
      "Roof Installation & Replacement Services",
      "Precision roof installation for residential and commercial structures. Full tear-offs, deck inspections, synthetic underlayments, and balanced ventilation."
    );
  }, []);

  const installationProjects = projectsData.filter((p) => p.category === 'installation');
  const service = siteConfig.services.find((s) => s.id === 'roof-installation')!;

  const installationPhases = [
    {
      phase: "01",
      title: "Preparation & Complete Tear-Off",
      desc: "Old shingles and compromised underlayments are removed down to structural plywood or OSB decking to uncover hidden deck rot."
    },
    {
      phase: "02",
      title: "Deck Repair & Substrate Fortification",
      desc: "Rotted or sagged decking is replaced with code-compliant structural wood; drip edges and starter strips are mechanically fastened."
    },
    {
      phase: "03",
      title: "Underlayment & Weather Barriers",
      desc: "Self-adhering ice & water shield is applied to valleys and eaves, followed by heavy-duty synthetic moisture barrier."
    },
    {
      phase: "04",
      title: "System Application & Ridge Vents",
      desc: "High-grade finish materials installed with exact nail patterns and aligned ventilation baffles for balanced attic airflow."
    }
  ];

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Services', path: '/services' },
          { label: 'Roof Installation' }
        ]}
      />

      {/* Hero */}
      <section className="relative bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ResponsiveImage
            src={service.heroImage}
            alt="Roof installation craftsmanship"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 hero-gradient-overlay" />
        </div>

        <div className="max-w-content mx-auto relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded bg-brand-copper text-white shadow-sm">
              Architectural Installation
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Roof Installation & Complete Replacement
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              {service.tagline} From full tear-offs on existing residences to new construction framing integrations.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/request-estimate?service=roof-installation"
                className="px-6 py-3 rounded bg-brand-copper hover:bg-brand-copper-hover text-white font-semibold text-sm transition-colors shadow-md focus-visible:outline-brand-copper"
              >
                Request an Installation Estimate
              </Link>
              <a
                href="#materials"
                className="px-6 py-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors border border-slate-700"
              >
                View Supported Materials
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Engineering Approach */}
      <section className="py-20 px-4 sm:px-6 bg-brand-warm">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-copper">
                Engineering Integrity
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight mt-2">
                A Roof Is a Complete System, Not Just Surface Shingles
              </h2>
              <p className="mt-4 text-base text-brand-muted leading-relaxed">
                Many premature roof failures originate not from the shingles themselves, but from inadequate ventilation, improper fastener placement, or neglected flashing junctions.
              </p>
              <p className="mt-3 text-sm text-brand-muted leading-relaxed">
                Our installation methodology treats your roof as an integrated building envelope assembly: structural deck integrity, continuous thermal airflow, heavy-duty leak barriers in vulnerable valleys, and precision metal fabrications.
              </p>

              <div className="mt-6 space-y-3">
                {service.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-brand-dark">
                    <CheckCircle2 className="w-4 h-4 text-brand-copper mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-brand-border shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-copper" />
                <span>Our Quality & Safety Commitments</span>
              </h3>
              <div className="space-y-4 text-sm text-brand-muted leading-relaxed">
                <div className="flex items-start gap-3">
                  <HardHat className="w-5 h-5 text-brand-navy shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-dark block">Zero Fall-Risk Compromises</strong>
                    OSHA-compliant anchor points, harnesses, and perimeter edge barriers on every single pitch.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileSpreadsheet className="w-5 h-5 text-brand-navy shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-dark block">Transparent Milestone Proposals</strong>
                    Itemized scope detailing material manufacturers, wind warranty thresholds, and staging schedule.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-brand-navy shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-dark block">Magnetic Grounds Sweeping</strong>
                    Continuous magnetic sweeps throughout the day and post-job to protect tires, pets, and family members.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Materials Section */}
      <section id="materials" className="py-20 px-4 sm:px-6 bg-white border-y border-brand-border">
        <div className="max-w-content mx-auto">
          <SectionHeading
            eyebrow="Material Options"
            title="Supported Roofing Systems & Materials"
            description="We install proven systems from industry-leading manufacturers, matched to your building structure and architectural goals."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.materialsSupported.map((mat, idx) => (
              <div key={idx} className="p-6 rounded-lg bg-brand-warm/60 border border-brand-border flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-brand-slate text-brand-copper flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-brand-navy">{mat}</h4>
                  <p className="mt-1 text-xs text-brand-muted">
                    Engineered specifications, high tear-resistance, and compliant wind-uplift ratings.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step by step installation process */}
      <section className="py-20 px-4 sm:px-6 bg-brand-navy text-white">
        <div className="max-w-content mx-auto">
          <SectionHeading
            eyebrow="Execution Plan"
            title="The 4 Phases of Installation"
            description="From initial tear-off down to ridge vent capping, each phase undergoes supervisor quality sign-off."
            dark
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {installationPhases.map((phase, idx) => (
              <div key={idx} className="p-6 rounded-lg bg-brand-slate border border-slate-700 flex flex-col justify-between">
                <div>
                  <span className="text-2xl font-black text-brand-copper block mb-3">{phase.phase}</span>
                  <h4 className="text-base font-bold text-white mb-2">{phase.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Relevant Project Gallery */}
      {installationProjects.length > 0 && (
        <section className="py-20 px-4 sm:px-6 bg-brand-warm">
          <div className="max-w-content mx-auto">
            <SectionHeading
              eyebrow="Portfolio"
              title="Sample Installation Projects"
              description="Explore representative installation and replacement projects."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {installationProjects.map((p) => (
                <ProjectCard key={p.id} project={p} onSelect={(proj) => setSelectedProject(proj)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <FAQAccordion
        items={faqsData.filter((f) => f.category === 'installation' || f.category === 'estimates')}
        title="Roof Installation FAQs"
        description="Clarifications on project timelines, material choices, and warranty adherence."
      />

      {/* CTA */}
      <CTASection
        title="Schedule Your Roof Installation Consultation"
        description="Get a clear, itemized proposal for your residential or commercial project."
        primaryButtonText="Request Installation Estimate"
        primaryButtonLink="/request-estimate?service=roof-installation"
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
