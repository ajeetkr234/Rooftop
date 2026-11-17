import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, ShieldCheck, Sun, Snowflake } from 'lucide-react';
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

export const RoofMaintenancePage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<RoofingProject | null>(null);

  useEffect(() => {
    updatePageSEO(
      "Preventive Roof Maintenance & Multi-Point Inspections",
      "Extend your roof's functional lifespan. Multi-point visual inspections, debris clearing, penetration re-sealing, and detailed photographic condition reports."
    );
  }, []);

  const maintenanceProjects = projectsData.filter((p) => p.category === 'maintenance');
  const service = siteConfig.services.find((s) => s.id === 'roof-maintenance')!;

  const checklistItems = [
    "Surface evaluation for blistered, missing, or curling shingles",
    "Checking chimney flashing, counter-flashing, and mortar joint seals",
    "Pipe boot and neoprene plumbing collar inspection for UV cracking",
    "Clearing dead leaves, needles, and moss from valleys and crickets",
    "Inspection of gutters, downspouts, and low-slope scuppers",
    "Checking soffit and ridge vent baffles to confirm unhindered airflow",
    "Attic space moisture check for condensation staining or deck sag",
    "Photographic condition report with prioritized recommendations"
  ];

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Services', path: '/services' },
          { label: 'Roof Maintenance' }
        ]}
      />

      {/* Hero */}
      <section className="relative bg-brand-navy text-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ResponsiveImage
            src={service.heroImage}
            alt="Preventive roof inspection and maintenance"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 hero-gradient-overlay" />
        </div>

        <div className="max-w-content mx-auto relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded bg-brand-copper text-white shadow-sm">
              Proactive Envelope Care
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Roof Maintenance & Multi-Point Inspection
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              {service.tagline} Routine care prevents minor seal degradations from escalating into premature structural re-roofing projects.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/request-estimate?service=roof-maintenance"
                className="px-6 py-3 rounded bg-brand-copper hover:bg-brand-copper-hover text-white font-semibold text-sm transition-colors shadow-md focus-visible:outline-brand-copper"
              >
                Schedule a Maintenance Visit
              </Link>
              <a
                href="#checklist"
                className="px-6 py-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors border border-slate-700"
              >
                View Inspection Checklist
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Maintenance Matters */}
      <section className="py-20 px-4 sm:px-6 bg-brand-warm">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-copper">
                Proactive Value
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight mt-2">
                Why Regular Maintenance Saves Thousands
              </h2>
              <p className="mt-4 text-base text-brand-muted leading-relaxed">
                Roofs endure relentless ultraviolet radiation, wind buffeting, freeze-thaw cycles, and heavy precipitation. Over time, sealants shrink and organic debris traps standing water.
              </p>
              <p className="mt-3 text-sm text-brand-muted leading-relaxed">
                Our multi-point maintenance visits catch early deterioration before water enters the decking, giving building owners documentation for insurance compliance and significantly extending shingle longevity.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white border border-brand-border">
                  <span className="text-2xl font-black text-brand-copper block">30–50%</span>
                  <span className="text-xs font-semibold text-brand-navy uppercase tracking-wider block mt-1">Extended Roof Lifespan</span>
                  <p className="text-xs text-brand-muted mt-1">Compared to unmaintained roofs subjected to chronic standing moisture.</p>
                </div>
                <div className="p-4 rounded-lg bg-white border border-brand-border">
                  <span className="text-2xl font-black text-brand-copper block">100%</span>
                  <span className="text-xs font-semibold text-brand-navy uppercase tracking-wider block mt-1">Photographic Proof</span>
                  <p className="text-xs text-brand-muted mt-1">High-res images showing your roof’s true status from eaves to ridge.</p>
                </div>
              </div>
            </div>

            {/* Checklist Box */}
            <div id="checklist" className="bg-white p-8 rounded-xl border border-brand-border shadow-sm space-y-5">
              <h3 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-brand-copper" />
                <span>Multi-Point Inspection Checklist</span>
              </h3>
              <ul className="space-y-3 text-sm text-brand-dark">
                {checklistItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-brand-copper mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Considerations */}
      <section className="py-20 px-4 sm:px-6 bg-white border-y border-brand-border">
        <div className="max-w-content mx-auto">
          <SectionHeading
            eyebrow="Year-Round Preparedness"
            title="Seasonal Roofing Considerations"
            description="Weather challenges shift throughout the year. Align your maintenance timing with seasonal extremes."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl bg-brand-warm/60 border border-brand-border space-y-4">
              <div className="w-12 h-12 rounded bg-amber-100 text-brand-copper flex items-center justify-center">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy">Spring & Summer Prep</h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                Winter ice dams and thermal contractions can compromise sealants and loosen fasteners. A spring inspection clears winter debris, assesses shingle adhesion before intense summer UV, and preps gutters for summer thunderstorms.
              </p>
              <ul className="text-xs space-y-1.5 text-brand-dark pt-2">
                <li>• Inspecting flashings for winter heave and contraction gaps</li>
                <li>• Testing attic soffit ventilation to reduce extreme summer heat loads</li>
              </ul>
            </div>

            <div className="p-8 rounded-xl bg-brand-warm/60 border border-brand-border space-y-4">
              <div className="w-12 h-12 rounded bg-blue-100 text-brand-navy flex items-center justify-center">
                <Snowflake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy">Autumn & Winter Preparedness</h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                Foliage from nearby trees clogs roof valleys and downspouts. When winter temperatures drop, trapped moisture freezes, forming ice dams that push water backward underneath shingles and into the eaves.
              </p>
              <ul className="text-xs space-y-1.5 text-brand-dark pt-2">
                <li>• Full clearing of pine needles, leaves, and organic debris</li>
                <li>• Resealing pipe collars before freezing temperatures make rubber brittle</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Project Showcase */}
      {maintenanceProjects.length > 0 && (
        <section className="py-20 px-4 sm:px-6 bg-brand-warm">
          <div className="max-w-content mx-auto">
            <SectionHeading
              eyebrow="Demonstration Portfolio"
              title="Preventive Maintenance Projects"
              description="Review multi-point inspections and sealant maintenance performed on commercial and residential structures."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {maintenanceProjects.map((p) => (
                <ProjectCard key={p.id} project={p} onSelect={(proj) => setSelectedProject(proj)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <FAQAccordion
        items={faqsData.filter((f) => f.category === 'maintenance')}
        title="Roof Maintenance FAQs"
        description="Common questions about visit frequency, costs, and inspection coverage."
      />

      {/* CTA */}
      <CTASection
        title="Protect Your Investment With a Proactive Roof Inspection"
        description="Schedule a comprehensive multi-point maintenance visit for your home or commercial facility."
        primaryButtonText="Schedule Maintenance Inspection"
        primaryButtonLink="/request-estimate?service=roof-maintenance"
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
